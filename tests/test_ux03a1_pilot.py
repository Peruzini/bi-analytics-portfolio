import json
import unittest
from pathlib import Path

PAGES = Path(__file__).resolve().parents[1] / "powerbi/fleet/FleetAnalytics.Report/definition/pages"
PILOT = PAGES / "825c31049f384847c6ac"

def load(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))

def val(obj):
    return obj["expr"]["Literal"]["Value"]

class FleetExecutiveUXContract(unittest.TestCase):
    def test_pilot_navigation_and_reset(self):
        visuals = [load(f) for f in PILOT.glob("visuals/*/visual.json")]
        buttons = [v for v in visuals if v.get("visual", {}).get("visualType") == "actionButton"]
        self.assertEqual(len(buttons), 5)
        actions = [v["visual"]["visualContainerObjects"]["visualLink"][0]["properties"] for v in buttons]
        self.assertEqual(sum(val(a["type"]) == "'ClearAllSlicers'" for a in actions), 1)
        destinations = {val(a["navigationSection"]).strip("'") for a in actions if val(a["type"]) == "'PageNavigation'"}
        self.assertEqual(destinations, {f.parent.name for f in PAGES.glob("*/page.json")})

    def test_pilot_layout_and_delta_binding(self):
        page = load(PILOT / "page.json")
        visuals = [load(f) for f in PILOT.glob("visuals/*/visual.json")]
        self.assertEqual(len(visuals), 56)
        delta = next(v for v in visuals if v["name"] == "a103a100000000000001")
        fields = [x["queryRef"] for role in delta["visual"]["query"]["queryState"].values() for x in role["projections"]]
        self.assertIn("Medidas.UX Desvio Exibicao", fields)
        sources = {v["name"] for v in visuals if v.get("visual", {}).get("visualType") == "slicer"}
        self.assertEqual(len(sources), 4)
        targets = {i["source"] for i in page["visualInteractions"] if i["target"] == delta["name"] and i["type"] == "DataFilter"}
        self.assertTrue(sources <= targets)
        boxes = [v["position"] for v in visuals if v["name"] not in ("a103a100000000000002","a103f000000000000000") and not v.get("parentGroupName")]
        for i, a in enumerate(boxes):
            self.assertGreaterEqual(a["x"], 0)
            self.assertGreaterEqual(a["y"], 0)
            self.assertLessEqual(a["x"] + a["width"], page["width"])
            self.assertLessEqual(a["y"] + a["height"], page["height"])
            for b in boxes[i+1:]:
                self.assertFalse(a["x"] < b["x"] + b["width"] and b["x"] < a["x"] + a["width"] and a["y"] < b["y"] + b["height"] and b["y"] < a["y"] + a["height"])

    def test_hero_group_geometry(self):
        visuals = [load(f) for f in PILOT.glob("visuals/*/visual.json")]
        group = next(v for v in visuals if v["name"] == "a103d100000000000000")
        self.assertEqual(group["visualGroup"]["groupMode"], "ScaleMode")
        children = [v for v in visuals if v.get("parentGroupName") == group["name"]]
        self.assertEqual(len(children), 7)
        bg = next(v for v in children if v["name"] == "a103d200000000000001")
        self.assertEqual([bg["position"][k] for k in ("x","y","width","height")], [0,0,300,140])
        children = [v for v in children if v["name"] != bg["name"]]
        bar = next(v for v in children if v["name"] == "a103a2a0000000000001")
        self.assertEqual(bar["visual"]["visualType"], "tableEx")
        self.assertEqual(bar["visual"]["query"]["queryState"]["Values"]["projections"][0]["queryRef"], "Medidas.UX Hero Barra SVG")
        for i, v in enumerate(children):
            a = v["position"]
            self.assertGreaterEqual(a["x"], 0)
            self.assertGreaterEqual(a["y"], 0)
            self.assertLessEqual(a["x"] + a["width"], group["position"]["width"])
            self.assertLessEqual(a["y"] + a["height"], group["position"]["height"])
            for q in children[i+1:]:
                b = q["position"]
                self.assertFalse(a["x"] < b["x"] + b["width"] and b["x"] < a["x"] + a["width"] and a["y"] < b["y"] + b["height"] and b["y"] < a["y"] + a["height"])

    def test_kpi_family_groups(self):
        visuals = [load(f) for f in PILOT.glob("visuals/*/visual.json")]
        groups = [v for v in visuals if "visualGroup" in v and v["name"] != "a103f000000000000000"]
        self.assertEqual(len(groups), 5)
        self.assertEqual(sorted(g["position"]["width"] for g in groups), [180,180,240,252,300])
        for group in groups:
            if group["name"] == "a103d100000000000000":
                continue
            children = [v for v in visuals if v.get("parentGroupName") == group["name"]]
            self.assertEqual(len(children), 4)
            w = group["position"]["width"]
            bg = next(v for v in children if v["position"]["z"] == 0)
            self.assertEqual([bg["position"][k] for k in ("x","y","width","height")], [0,0,w,140])
            self.assertEqual(val(bg["visual"]["visualContainerObjects"]["border"][0]["properties"]["radius"]), "10D")
            content = sorted((v for v in children if v != bg), key=lambda v:v["position"]["y"])
            for v in content:
                a = v["position"]
                self.assertEqual(a["x"], 16)
                self.assertEqual(a["width"], w-32)
                self.assertLessEqual(a["y"]+a["height"], 140)
                self.assertEqual(val(v["visual"]["visualContainerObjects"]["background"][0]["properties"]["show"]), "false")
            for a,b in zip(content, content[1:]):
                self.assertLessEqual(a["position"]["y"]+a["position"]["height"], b["position"]["y"])

    def test_executive_table_formatting(self):
        v = load(PILOT / "visuals/3ce9f418142478f499b7/visual.json")["visual"]
        refs = [a["queryRef"] for a in v["query"]["queryState"]["Values"]["projections"]]
        self.assertEqual(len(refs), 7)
        self.assertEqual(v["query"]["sortDefinition"]["sort"][0]["direction"], "Ascending")
        o = v["objects"]
        color = next(a for a in o["values"] if "selector" in a)
        self.assertEqual(color["selector"]["metadata"], refs[3])
        self.assertEqual(color["properties"]["fontColor"]["solid"]["color"]["expr"]["Measure"]["Property"], "UX Desvio Cor")
        bars = o["columnFormatting"][0]
        self.assertEqual(bars["selector"]["metadata"], refs[4])
        self.assertEqual(val(bars["properties"]["dataBars"]["hideText"]), "false")
        self.assertEqual(val(bars["properties"]["dataBars"]["minValue"]), "0D")
        self.assertEqual(val(bars["properties"]["dataBars"]["maxValue"]), "1.1D")
        self.assertEqual(val(o["total"][0]["properties"]["totals"]), "true")

    def test_sidebar_component(self):
        visuals = [load(f) for f in PILOT.glob("visuals/*/visual.json")]
        group = next(v for v in visuals if v["name"] == "a103f000000000000000")
        self.assertEqual(group["visualGroup"]["groupMode"], "ScaleMode")
        children = [v for v in visuals if v.get("parentGroupName") == group["name"]]
        self.assertEqual(len(children), 7)
        buttons = sorted([v for v in visuals if v.get("visual",{}).get("visualType") == "actionButton" and v["position"]["x"] < 192], key=lambda v:v["position"]["y"])
        self.assertTrue(all(not v.get("parentGroupName") for v in buttons))
        self.assertEqual(len(buttons), 4)
        self.assertEqual([val(v["visual"]["visualContainerObjects"]["visualLink"][0]["properties"]["navigationSection"]).strip("'") for v in buttons], ["825c31049f384847c6ac","2faaefc8084617f504c2","4e55ab6fbe326c42fe0e","a036aa7e10b56ccb252d"])
        self.assertEqual([v["visual"]["objects"]["fill"][1]["properties"]["fillColor"]["solid"]["color"]["expr"]["Measure"]["Property"] for v in buttons], ["COR Ativo"]+["COR Inativo"]*3)
        items = [v for v in children if v["name"] != "a103a100000000000002"] + buttons
        for i,v in enumerate(items):
            a=v["position"]
            self.assertGreaterEqual(a["x"],0)
            self.assertGreaterEqual(a["y"],0)
            self.assertLessEqual(a["x"]+a["width"],192)
            self.assertLessEqual(a["y"]+a["height"],1032)
            for w in items[i+1:]:
                b=w["position"]
                self.assertFalse(a["x"]<b["x"]+b["width"] and b["x"]<a["x"]+a["width"] and a["y"]<b["y"]+b["height"] and b["y"]<a["y"]+a["height"])

    def test_semantic_ux(self):
        model = load(PAGES.parents[1].parent / "FleetAnalytics.SemanticModel/model.bim")["model"]
        tables = {t["name"]:t for t in model["tables"]}
        self.assertEqual(len(tables["Medidas"]["measures"]), 68)
        self.assertEqual(len(tables["_UX_Design"]["measures"]), 60)
        self.assertTrue(tables["_UX_Design"]["columns"][0]["isHidden"])
        self.assertEqual(len(tables["_UX_Dicionario"]["columns"]), 6)
        self.assertTrue(all(not r["fromTable"].startswith("_UX_") and not r["toTable"].startswith("_UX_") for r in model["relationships"]))
        visuals = [load(f) for f in PILOT.glob("visuals/*/visual.json")]
        cards = [v for v in visuals if v.get("parentGroupName") == "a103f000000000000000" and v.get("visual",{}).get("visualType") == "cardVisual"]
        self.assertEqual(len(cards),5)
        for v in cards:
            self.assertTrue(v["visual"]["query"]["queryState"]["Data"]["projections"][0]["queryRef"].startswith("_UX_Design.LBL "))
        buttons = [v for v in visuals if v.get("visual",{}).get("visualType") == "actionButton" and v["position"]["x"] < 192]
        self.assertEqual(len(buttons),4)
        for v in buttons:
            self.assertTrue(v["visual"]["objects"]["text"][1]["properties"]["text"]["expr"]["Measure"]["Property"].startswith("NAV "))

    def test_executive_labels(self):
        visuals=[load(f) for f in PILOT.glob("visuals/*/visual.json")]
        cards=[v for v in visuals if v.get("visual",{}).get("visualType")=="cardVisual" and v["visual"]["query"]["queryState"]["Data"]["projections"][0]["queryRef"].startswith("_UX_Design.")]
        self.assertEqual(len(cards),19)
        for v in visuals:
            z=v.get("visual",{})
            if z.get("visualType")=="textbox":
                self.assertFalse(any(r.get("value","").strip() for a in z["objects"]["general"][0]["properties"]["paragraphs"] for r in a.get("textRuns",[])))
            if z.get("visualType")=="slicer":
                self.assertTrue(z["objects"]["header"][0]["properties"]["text"]["expr"]["Measure"]["Property"].startswith("LBL Filtro "))
        for id in ("8f9e4799e28920ec4893","b2050100000000000005","3ce9f418142478f499b7"):
            v=load(PILOT/"visuals"/id/"visual.json")["visual"]
            self.assertEqual(v["visualContainerObjects"]["title"][0]["properties"]["text"]["expr"]["Measure"]["Expression"]["SourceRef"]["Entity"],"_UX_Design")
        self.assertEqual(load(PILOT/"visuals/a103a100000000000007/visual.json")["visual"]["objects"]["text"][1]["properties"]["text"]["expr"]["Measure"]["Property"],"LBL Limpar Filtros")

    def test_active_filter_status(self):
        v=load(PILOT/"visuals/a103e700000000000001/visual.json")
        self.assertEqual(v["visual"]["query"]["queryState"]["Data"]["projections"][0]["queryRef"],"_UX_Design.LBL Filtros Ativos")
        rules=load(PILOT/"page.json")["visualInteractions"]
        inbound=[r for r in rules if r["target"]==v["name"]]
        self.assertEqual(sum(r["type"]=="DataFilter" for r in inbound),4)
        self.assertEqual(sum(r["type"]=="NoFilter" for r in inbound),4)
        self.assertEqual(len(rules),152)

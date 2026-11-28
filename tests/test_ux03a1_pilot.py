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
        self.assertEqual(len(visuals), 38)
        delta = next(v for v in visuals if v["name"] == "a103a100000000000001")
        fields = [x["queryRef"] for role in delta["visual"]["query"]["queryState"].values() for x in role["projections"]]
        self.assertIn("Medidas.UX Desvio Exibicao", fields)
        sources = {v["name"] for v in visuals if v.get("visual", {}).get("visualType") == "slicer"}
        self.assertEqual(len(sources), 4)
        targets = {i["source"] for i in page["visualInteractions"] if i["target"] == delta["name"] and i["type"] == "DataFilter"}
        self.assertTrue(sources <= targets)
        boxes = [v["position"] for v in visuals if v["name"] != "a103a100000000000002" and not v.get("parentGroupName")]
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
        self.assertEqual(len(children), 5)
        for i, v in enumerate(children):
            a = v["position"]
            self.assertGreaterEqual(a["x"], 0)
            self.assertGreaterEqual(a["y"], 0)
            self.assertLessEqual(a["x"] + a["width"], group["position"]["width"])
            self.assertLessEqual(a["y"] + a["height"], group["position"]["height"])
            for q in children[i+1:]:
                b = q["position"]
                self.assertFalse(a["x"] < b["x"] + b["width"] and b["x"] < a["x"] + a["width"] and a["y"] < b["y"] + b["height"] and b["y"] < a["y"] + a["height"])

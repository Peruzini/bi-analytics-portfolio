import json, unittest
from pathlib import Path
PAGES=Path(__file__).resolve().parents[1]/"powerbi/fleet/FleetAnalytics.Report/definition/pages"
class TestFleetFunctional(unittest.TestCase):
 def test_sync_groups(self):
  groups={}
  for f in PAGES.glob("*/visuals/*/visual.json"):
   v=json.loads(f.read_text(encoding="utf-8")) .get("visual",{})
   if v.get("visualType")!="slicer":continue
   g=v["syncGroup"];field=v["query"]["queryState"]["Values"]["projections"][0]["queryRef"]
   self.assertTrue(g["filterChanges"] and g["fieldChanges"])
   groups.setdefault(g["groupName"],[]).append(field)
  self.assertEqual(len(groups),4)
  for vals in groups.values():
   self.assertEqual(len(vals),4);self.assertEqual(len(set(vals)),1)
 def test_interaction_contract(self):
  for f in PAGES.glob("*/page.json"):
   page=json.loads(f.read_text(encoding="utf-8"));v={x.parent.name:json.loads(x.read_text(encoding="utf-8")) .get("visual",{}).get("visualType","visualGroup") for x in f.parent.glob("visuals/*/visual.json")}
   pairs=page["visualInteractions"]
   self.assertEqual(len(pairs),len({(p["source"],p["target"]) for p in pairs}))
   for p in pairs:
    self.assertIn(p["source"],v);self.assertIn(p["target"],v)
    self.assertNotEqual(p["source"],p["target"])
    self.assertIn(p["type"],("DataFilter","NoFilter"))
    if v[p["source"]]=="slicer":self.assertEqual(p["type"],"DataFilter")
    if p["source"]=="6576e7c578390c306c92":self.assertEqual(p["type"],"NoFilter")
    if v[p["source"]]!="slicer" and v[p["target"]]=="slicer":self.assertEqual(p["type"],"NoFilter")

# V3-05D3F1-R1 - Fleet visual refinement

27/11/2026. Candidate: e0800699129ae71f01c422822d0fc7b4818d1256. Base: 0d672f6 (PR #9). 59 visuals / four pages. Existing 45 measures preserved verbatim (35 original + 10 auxiliary), six new visual reference measures. Source data and business rules unchanged.

## Visual acceptance
- Executive: native gauge with 98.00% adherence, 100% target, adaptive max (110% in full data); exact positive deviation labels.
- Performance: eight labeled points, weighted fleet references 9.38 t/h and R$ 44.05/t, eight utilization bars without scrolling; table displays eight rows and total.
- Maintenance: 80% reference as second series on percentage axis, not the hours axis. Full eight-row maintenance table and total visible; MTBF and MTTR remain separate.
- Criticality: weighted composition retained; native scatter reference lines 1.45% unavailable and R$ 44.05/t; eight labeled points.
- Dynamic reference measures use ALLSELECTED equipment scope and ratios, not arithmetic mean of equipment ratios. Reference lines rendered using SelectRef and selector id 0. Full-selection values verified in actual ADOMD engine. Filter interaction tests remain D3F2A.
- Native screenshots inspected, not synthetic. Four valid captures recorded with SHA256 in results/v3-05d3f1-r1-native-checks.json. Invalid captures excluded.

## Validation
225/225 historical DAX values match at absolute tolerance 1e-7, independently repeated with 225/225. 5840 operational records, 8 equipment, 3 intervention types, 24 months. All six new measure definitions executed, Pareto reference and benchmark values verified on eight equipment. 9/9 unittest. Static bounds, collision, tab order and field references validated. No merge, no deploy, no paid visual.
The initial native attempt queried before UI was ready; retry with actual refresh and row-count check worked. Incorrect capture sequence corrected with targeted performance capture. Power BI opened one instance at a time, each test process closed (fallback termination of disposable validation PID after normal close attempt); no Power BI or new Analysis Services processes remained. Source model and PBIR preserved; no round-trip Desktop save committed. Save/reopen, synchronized filters, cross-filter, filtered regression, mobile and accessibility remain distinct functional gates. PASS visual refinement only.

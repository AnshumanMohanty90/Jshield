import { useCallback, useState } from "react";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import TabSwitcher from "./TabSwitcher";
import { AnimatedNumber, useInView } from "./primitives";

const TABS = [
  {
    key: "consent",
    title: "Customer consent",
    blurb: (
      <>
        Record every customer's permission, show proof at any time, and remove it in one click when they ask.
      </>
    ),
    points: [
      "One list of reasons you collect data, used everywhere",
      "Proof that cannot be changed later",
      "Permission removed in one click, with the history kept",
      "Works on websites, apps and offline forms",
    ],
    mock: { num: 1284, suffix: "", label: "Active consents", trend: "+12% this month", bars: [62, 78, 71, 88, 95, 82, 90] },
  },
  {
    key: "breach",
    title: "Breach response",
    blurb: (
      <>
        Spot a breach, judge how serious it is and report it within the legal time limit, with every step on record.
      </>
    ),
    points: [
      "Report an incident and route it by how serious it is",
      "Affected records and root cause tracked in one place",
      "Regulator and customer notices prepared inside the legal window",
      "Every step recorded, from detection to closure",
    ],
    mock: { num: 71, suffix: "h", label: "left to report the breach", trend: "On track", bars: [30, 45, 60, 72, 55, 40, 35] },
  },
  {
    key: "record",
    title: "Data record",
    blurb: (
      <>
        Keep one live list of the personal data you hold, why you hold it and who you share it with.
      </>
    ),
    points: [
      "One live list of the personal data you hold and why",
      "How long you keep each record, and the reason you hold it",
      "Who you share it with, inside and outside India",
      "Exports ready for any auditor request",
    ],
    mock: { num: 47, suffix: "", label: "records kept", trend: "3 due for review", bars: [40, 52, 48, 60, 64, 58, 66] },
  },
];

const TAB_ITEMS = TABS.map((t) => ({ key: t.key, label: t.title }));

function GrowBars({ bars }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div ref={ref} className="mt-6 flex h-24 items-end gap-2">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 to-sky-400 transition-[height] duration-500 ease-out"
          style={{ height: inView ? `${h}%` : "0%", transitionDelay: `${i * 50}ms` }}
        />
      ))}
    </div>
  );
}

export default function ModuleShowcase() {
  const [active, setActive] = useState("consent");
  const handleTabChange = useCallback((key) => setActive(key), []);
  const tab = TABS.find((t) => t.key === active);

  return (
    <Section id="solution">
      <SectionHeading label="What JShield does" title="The three jobs that matter most under the law." />

      <TabSwitcher
        id="modules"
        items={TAB_ITEMS}
        activeKey={active}
        onChange={handleTabChange}
        autoMs={6000}
        ariaLabel="What JShield does"
      />

      <div id="modules-panel" role="tabpanel" className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <h3 className="text-white">{tab.title}</h3>
          <p className="mt-2 text-[17px] leading-[1.6] text-slate-300 text-pretty">{tab.blurb}</p>
          <ul className="mt-6">
            {tab.points.map((p) => (
              <li key={p} className="row-hover py-3 text-[17px] leading-[1.6] text-slate-300">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">{tab.mock.label}</div>
          <div className="mt-2 text-4xl font-bold text-white">
            <AnimatedNumber value={tab.mock.num} suffix={tab.mock.suffix} />
          </div>
          <p className="mt-1 text-sm text-slate-400">{tab.mock.trend}</p>
          <GrowBars bars={tab.mock.bars} />
          <p className="mt-3 text-xs text-slate-400">Sample data</p>
        </div>
      </div>
    </Section>
  );
}
import { useCallback, useState } from "react";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import TabSwitcher from "./TabSwitcher";
import { Reveal } from "./primitives";

const INDUSTRIES = [
  {
    key: "bfsi",
    label: "Banks and lenders",
    headline: "Prove consent for every loan and card",
    line: "Lenders take consent at sign-up and can show it at any later check.",
    points: [
      "Consent for every loan and card product",
      "Customer data kept as long as RBI rules require, then deleted",
      "Audit reports ready to send",
    ],
  },
  {
    key: "saas",
    label: "Software companies",
    headline: "Show clients where their data sits",
    line: "Software companies show each client where its data sits and who can see it.",
    points: [
      "Clear rules on who can see customer data",
      "Routine privacy tasks done automatically",
      "Customer requests handled in volume",
      "Data mapped for every client account",
    ],
  },
  {
    key: "health",
    label: "Healthcare",
    headline: "Record patient consent and control access",
    line: "Hospitals and clinics record patient consent and control who opens records.",
    points: [
      "Patient consent on record",
      "Controlled access to health records",
      "Data kept only as long as it is needed",
      "Risk review for clinical use of data",
    ],
  },
  {
    key: "retail",
    label: "Retail and e-commerce",
    headline: "Manage marketing consent and cookies",
    line: "Retailers manage marketing consent and cookie choices across website and app.",
    points: [
      "Marketing consent tracked",
      "Clear rules for sharing data with partners",
      "Cookie and tracking pixel control",
      "Customer requests answered on time",
    ],
  },
  {
    key: "edtech",
    label: "Education",
    headline: "Take parent consent for student data",
    line: "Schools and colleges take parent consent before using student data.",
    points: [
      "Parent consent workflows",
      "Clear rules on how long data is kept",
      "One place for every privacy task",
      "Vendor contracts on file",
    ],
  },
];

const TAB_ITEMS = INDUSTRIES.map((i) => ({ key: i.key, label: i.label }));

export default function Industries() {
  const [active, setActive] = useState("bfsi");
  const handleTabChange = useCallback((key) => setActive(key), []);
  const ind = INDUSTRIES.find((i) => i.key === active);

  return (
    <Section tone>
      <SectionHeading
        label="Built for your sector"
        title="JShield comes set up for your sector."
        intro="Each sector gets the consent forms, data retention rules and reports it needs."
      />

      <TabSwitcher
        id="sectors"
        items={TAB_ITEMS}
        activeKey={active}
        onChange={handleTabChange}
        ariaLabel="JShield comes set up for your sector"
      />

      <div id="sectors-panel" role="tabpanel" className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <h3 className="text-white">{ind.headline}</h3>
          <p className="mt-2 text-[18px] leading-[1.6] text-slate-200">{ind.line}</p>
        </div>
        <ul className="grid gap-x-8 sm:grid-cols-2 lg:-mt-3">
          {ind.points.map((p) => (
            <li key={p} className="row-hover py-3 text-[18px] leading-[1.6] text-slate-200">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
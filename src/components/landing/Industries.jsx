import { useCallback, useState } from "react";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import TabSwitcher from "./TabSwitcher";
import { Reveal } from "./primitives";

const INDUSTRIES = [
  {
    key: "bfsi",
    label: "Banks and lenders",
    headline: "Protect financial and customer data",
    line: "Lenders use JShield to take consent at loan sign-up and prove it later.",
    points: [
      "Consent for every loan and card product",
      "Customer data kept only as long as RBI rules allow",
      "Audit reports ready to send",
    ],
  },
  {
    key: "saas",
    label: "Software companies",
    headline: "Scale privacy across cloud apps",
    line: "Software companies use JShield to show clients where their data sits and who can see it.",
    points: [
      "Clear rules on who can see customer data",
      "Automated privacy work",
      "Customer requests handled at scale",
      "Data mapped across every customer and tenant",
    ],
  },
  {
    key: "health",
    label: "Healthcare",
    headline: "Protect sensitive health data",
    line: "Hospitals and clinics use JShield to record patient consent and control who opens records.",
    points: [
      "Patient consent on record",
      "Controlled access to health records",
      "Keep only the data you need, only as long as you need it",
      "Risk review for clinical processing",
    ],
  },
  {
    key: "retail",
    label: "Retail and e-commerce",
    headline: "Track consent across commerce",
    line: "Retailers use JShield to manage marketing consent and cookie choices across web and app.",
    points: [
      "Marketing consent tracked",
      "Clear rules for sharing data with third parties",
      "Cookie and pixel control",
      "Customer requests answered on deadline",
    ],
  },
  {
    key: "edtech",
    label: "Education",
    headline: "Protect student and school data",
    line: "Schools and colleges use JShield to take parent consent for student data.",
    points: [
      "Parent consent workflows",
      "Controlled retention practices",
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
        title="Set up for your sector."
        intro="JShield comes ready with the consent forms, retention rules and reports your sector needs."
      />

      <TabSwitcher
        id="sectors"
        items={TAB_ITEMS}
        activeKey={active}
        onChange={handleTabChange}
        ariaLabel="Set up for your sector"
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
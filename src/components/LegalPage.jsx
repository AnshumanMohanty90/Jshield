import LandingLayout from "@/components/landing/LandingLayout";
import PageHero from "@/components/landing/PageHero";
import Section from "@/components/landing/Section";
import usePageTitle from "@/hooks/usePageTitle";
import { LEGAL, EXTRA } from "@/content/legal";

const DOCS = { ...LEGAL, ...EXTRA };


const EMAIL = /([A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,})/;
function Linked({ text }) {
  return text.split(EMAIL).map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={`mailto:${part}`} className="whitespace-nowrap underline underline-offset-2">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

function Block({ item }) {
  if (typeof item === "string") {
    return <p className="max-w-[72ch] text-[16px] leading-[1.7] text-slate-300 text-pretty"><Linked text={item} /></p>;
  }
  if (item.h) {
    return <h3 className="pt-2 text-[18px] font-semibold text-white">{item.h}</h3>;
  }
  return (
    <ul className="max-w-[72ch] list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-slate-300 marker:text-indigo-400">
      {item.list.map((li) => (
        <li key={li} className="text-pretty"><Linked text={li} /></li>
      ))}
    </ul>
  );
}

export default function LegalPage({ doc }) {
  const d = DOCS[doc];
  usePageTitle(`${d.title} | JShield`, d.intro && typeof d.intro[0] === "string" ? d.intro[0].split(/(?<=\.)\s/)[0] : undefined);
  return (
    <LandingLayout>
      <PageHero eyebrow="Legal" title={d.title} subtitle={`Last updated ${d.updated}.`} />
      <Section tone narrow>
        <div className="flex flex-col gap-4">
          {d.intro.map((p) => (
            <Block key={p} item={p} />
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-10">
          {d.sections.map(([h, body]) => (
            <section key={h} className="flex flex-col gap-4">
              <h2 className="text-[22px] font-semibold tracking-tight text-white text-balance">{h}</h2>
              {body.map((item, i) => (
                <Block key={i} item={item} />
              ))}
            </section>
          ))}
        </div>
      </Section>
    </LandingLayout>
  );
}

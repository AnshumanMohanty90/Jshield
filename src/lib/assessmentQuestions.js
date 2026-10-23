export const PRESELECT_KEY = "jshield_assessment_preselect";

// Answer scale for every scored question, in display order.
export const ANSWER_OPTIONS = [
  { l: "Yes, in place", p: 100 },
  { l: "Partly", p: 50 },
  { l: "Not yet", p: 0 },
  { l: "Not sure", p: 0 },
];

// Step 1: about you (not scored).
export const PROFILE = [
  {
    id: "P1",
    q: "Which sector is your company in?",
    options: [
      "Banking, NBFC or insurance",
      "Health",
      "Telecom, e-commerce or social media",
      "Software and IT services",
      "Education",
      "Other",
    ],
  },
  {
    id: "P2",
    q: "How many people work at your company?",
    options: ["1 to 50", "51 to 200", "201 to 500", "501 to 1,000", "Over 1,000"],
  },
  {
    id: "P3",
    q: "How many people's data do you hold?",
    options: ["Under 1 lakh", "1 lakh to 10 lakh", "Over 10 lakh"],
  },
  {
    id: "P4",
    q: "Do you process data of anyone under 18?",
    options: ["Yes", "No", "Not sure"],
  },
];

// Step 2: scored areas, each weighted by the penalty it carries.
export const AREAS = [
  {
    id: "security",
    name: "Security safeguards",
    weight: 22,
    penalty: 250,
    questions: [
      {
        id: "Q1",
        q: "Is personal data encrypted or masked when stored and when sent?",
        critical: true,
        capNone: "Capped because personal data is not encrypted or masked. Penalty up to Rs 250 crore.",
        capPart: "Capped because encryption or masking is only partly in place. Penalty up to Rs 250 crore.",
        fix: "Encrypt personal data when stored and when sent.",
      },
      {
        id: "Q2",
        q: "Is access to personal data limited by role and reviewed at least once a year?",
        fix: "Set role-based access to personal data and review it every year.",
      },
      {
        id: "Q3",
        q: "Do you log access to personal data and keep the logs for at least one year?",
        fix: "Log access to personal data and keep the logs for one year.",
      },
    ],
  },
  {
    id: "breach",
    name: "Breach response",
    weight: 18,
    penalty: 200,
    questions: [
      {
        id: "Q4",
        q: "Do you have a written breach response plan with named owners?",
        critical: true,
        capNone: "Capped because there is no written breach plan. Penalty up to Rs 200 crore.",
        capPart: "Capped because the breach plan is only partly in place. Penalty up to Rs 200 crore.",
        fix: "Write a breach response plan with named owners.",
      },
      {
        id: "Q5",
        q: "Can you inform the Data Protection Board and send the detailed report within 72 hours?",
        fix: "Prepare the 72-hour notice and detailed report to the Data Protection Board.",
      },
      {
        id: "Q6",
        q: "Can you tell affected people about a breach quickly and in plain words?",
        fix: "Draft plain-language notices for the people affected by a breach.",
      },
    ],
  },
  {
    id: "consent",
    name: "Notice and consent",
    weight: 15,
    penalty: 50,
    questions: [
      {
        id: "Q7",
        q: "Does every place you collect data show a clear notice of what you take and why?",
        fix: "Show a clear notice of what you take and why at every collection point.",
      },
      {
        id: "Q8",
        q: "Do you record each consent with time, purpose and channel?",
        fix: "Record each consent with its time, purpose and channel.",
      },
      {
        id: "Q9",
        q: "Can people withdraw consent as easily as they gave it?",
        fix: "Make withdrawing consent as easy as giving it.",
      },
    ],
  },
  {
    id: "children",
    name: "Children's data",
    weight: 10,
    penalty: 200,
    questions: [
      {
        id: "Q10",
        q: "Do you verify a parent's consent before processing a child's data?",
        critical: true,
        capNone: "Capped because children's data is processed without verified parental consent. Penalty up to Rs 200 crore.",
        capPart: "Capped because parental consent verification is only partly in place. Penalty up to Rs 200 crore.",
        fix: "Verify a parent's consent before processing any child's data.",
      },
      {
        id: "Q11",
        q: "Have you stopped tracking, behavioural monitoring and targeted ads aimed at children?",
        fix: "Stop tracking, behavioural monitoring and targeted ads aimed at children.",
      },
    ],
  },
  {
    id: "rights",
    name: "Rights and complaints",
    weight: 9,
    penalty: 50,
    questions: [
      {
        id: "Q12",
        q: "Can you act on requests to see, correct or erase data within the legal time?",
        fix: "Set a workflow that closes data requests within the legal time.",
      },
      {
        id: "Q13",
        q: "Do you publish a grievance contact and track each complaint to closure?",
        fix: "Publish a grievance contact and track each complaint to closure.",
      },
    ],
  },
  {
    id: "retention",
    name: "Retention and accuracy",
    weight: 8,
    penalty: 50,
    questions: [
      {
        id: "Q14",
        q: "Do you have a retention schedule and erase data when its purpose ends?",
        fix: "Write a retention schedule and erase data when its purpose ends.",
      },
      {
        id: "Q15",
        q: "Do you keep personal data accurate when it is used for decisions?",
        fix: "Check accuracy wherever personal data drives a decision.",
      },
    ],
  },
  {
    id: "vendors",
    name: "Vendors and transfers",
    weight: 8,
    penalty: 50,
    questions: [
      {
        id: "Q16",
        q: "Does every vendor that handles your personal data have a signed contract with data protection terms?",
        fix: "Sign data protection terms with every vendor that handles personal data.",
      },
      {
        id: "Q17",
        q: "Do you know which countries your data goes to and check them against government restrictions?",
        fix: "List the countries your data goes to and check them against restrictions.",
      },
    ],
  },
  {
    id: "governance",
    name: "Governance",
    weight: 10,
    penalty: 50,
    questions: [
      {
        id: "Q18",
        q: "Do you keep one current map of the personal data you hold, where it sits and why?",
        fix: "Keep one current map of the personal data you hold, where it sits and why.",
      },
      {
        id: "Q19",
        q: "Is a named person accountable for DPDP compliance, reporting to leadership?",
        fix: "Name one person accountable for DPDP compliance, reporting to leadership.",
      },
      {
        id: "Q20",
        q: "Have you appointed a Data Protection Officer based in India?",
        sdf: true,
        penalty: 150,
        fix: "Appoint a Data Protection Officer based in India.",
      },
      {
        id: "Q21",
        q: "Do you run a yearly data protection impact assessment and an independent audit?",
        sdf: true,
        penalty: 150,
        fix: "Run a yearly data protection impact assessment and an independent audit.",
      },
    ],
  },
];

// The inline question shown on the home page.
export const INLINE_QUESTION = AREAS.find((a) => a.id === "governance").questions.find(
  (q) => q.id === "Q18"
);

const REGULATED = ["Banking, NBFC or insurance", "Health", "Telecom, e-commerce or social media"];

export function isSDF(profile) {
  if (profile.P3 === "Over 10 lakh") return true;
  return REGULATED.includes(profile.P1) && ["501 to 1,000", "Over 1,000"].includes(profile.P2);
}

export function childrenInScope(profile) {
  return profile.P4 === "Yes" || profile.P4 === "Not sure";
}

// Areas in use for this visitor, with adjusted weights rescaled to total 100.
export function areasInUse(profile) {
  const kids = childrenInScope(profile);
  const regulated = REGULATED.includes(profile.P1);
  const sdf = isSDF(profile);

  const list = AREAS.filter((a) => a.id !== "children" || kids).map((a) => {
    let w = a.weight;
    let questions = a.questions;
    if (a.id === "children") w = 14;
    if (a.id === "consent") w = kids ? 11 : 15;
    if (regulated && a.id === "security") w += 2;
    if (regulated && a.id === "breach") w += 2;
    if (a.id === "governance" && !sdf) questions = questions.filter((q) => !q.sdf);
    return { ...a, w, questions };
  });

  // Always rescale the weights in use to total 100.
  const total = list.reduce((s, a) => s + a.w, 0);
  const scaled = list.map((a) => ({ ...a, weight: Math.floor((a.w * 100) / total) }));
  let remainder = 100 - scaled.reduce((s, a) => s + a.weight, 0);
  const byFraction = list
    .map((a, i) => [((a.w * 100) / total) % 1, i])
    .sort((x, y) => y[0] - x[0]);
  let k = 0;
  while (remainder > 0 && byFraction.length > 0) {
    scaled[byFraction[k % byFraction.length][1]].weight += 1;
    remainder -= 1;
    k += 1;
  }
  return scaled;
}

// The flat list of scored questions this visitor will see.
export function buildQuiz(profile) {
  const areas = areasInUse(profile);
  const scored = areas.flatMap((a) =>
    a.questions.map((q) => ({
      id: q.id,
      q: q.q,
      critical: q.critical,
      fix: q.fix,
      capNone: q.capNone,
      capPart: q.capPart,
      penalty: q.sdf ? (q.penalty ?? a.penalty) : a.penalty,
      areaWeight: a.weight,
    }))
  );
  return { areas, scored };
}

export const BANDS = [
  { min: 90, name: "Audit-ready", tone: "text-emerald-400", desc: "Most duties are in place and provable. Close what is left before 13 May 2027." },
  { min: 75, name: "Ready", tone: "text-sky-400", desc: "You are close. Close the remaining gaps before the deadline." },
  { min: 55, name: "Progressing", tone: "text-indigo-300", desc: "Halfway there. Work through the top gaps below first." },
  { min: 30, name: "Developing", tone: "text-amber-400", desc: "Core duties are missing. Start with the critical items below." },
  { min: 0, name: "Exposed", tone: "text-rose-400", desc: "Most duties are not in place. Start a trial to build your first controls." },
];

export function bandFor(score) {
  return BANDS.find((b) => score >= b.min) || BANDS[BANDS.length - 1];
}

const BAND_RANK = { Exposed: 0, Developing: 1, Progressing: 2, Ready: 3, "Audit-ready": 4 };

// Full scoring: area averages, weighted overall score, critical caps and top gaps.
export function computeResult(profile, answers) {
  const areas = areasInUse(profile);
  const points = (id) => (answers[id] != null ? ANSWER_OPTIONS[answers[id]].p : 0);

  const areaResults = areas.map((a) => ({
    id: a.id,
    name: a.name,
    weight: a.weight,
    penalty: a.penalty,
    score: Math.round(a.questions.reduce((s, q) => s + points(q.id), 0) / a.questions.length),
  }));

  const weightSum = areaResults.reduce((s, a) => s + a.weight, 0);
  const score = Math.round(
    areaResults.reduce((s, a) => s + a.score * a.weight, 0) / weightSum
  );

  let band = bandFor(score);
  let capReason = null;

  const criticals = areas.flatMap((a) => a.questions.filter((q) => q.critical));
  const zeroCap = criticals.find((q) => points(q.id) === 0);
  const partCap = criticals.find((q) => points(q.id) === 50);
  if (zeroCap && BAND_RANK[band.name] > BAND_RANK.Exposed) {
    band = bandFor(29);
    capReason = zeroCap.capNone;
  } else if (partCap && BAND_RANK[band.name] > BAND_RANK.Developing) {
    band = bandFor(30);
    capReason = partCap.capPart;
  }

  const gaps = areas
    .flatMap((a) =>
      a.questions
        .filter((q) => points(q.id) < 100)
        .map((q) => ({
          id: q.id,
          q: q.q,
          fix: q.fix,
          weight: a.weight,
          penalty: q.sdf ? (q.penalty ?? a.penalty) : a.penalty,
          gapPoints: (100 - points(q.id)) * (q.sdf ? (q.penalty ?? a.penalty) : a.penalty),
        }))
    )
    .sort((x, y) => y.gapPoints - x.gapPoints || y.weight - x.weight)
    .slice(0, 3);

  return { score, band, capReason, areas: areaResults, gaps };
}
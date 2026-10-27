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
    options: ["Under 1 lakh", "1 lakh to 10 lakh", "10 lakh to 1 crore", "Over 1 crore"],
  },
  {
    id: "P4",
    q: "Do you use data of children under 18, or of persons with disabilities who have a guardian?",
    options: ["Yes", "No", "Not sure"],
  },
];

// Step 2: scored areas, each weighted by the penalty it carries.
export const AREAS = [
  {
    id: "security",
    name: "Security safeguards",
    weight: 20,
    penalty: 250,
    questions: [
      {
        id: "Q1",
        q: "Is personal data encrypted or masked wherever it is stored or sent?",
        critical: true,
        capNone: "Capped because personal data is not encrypted or masked. Penalty up to Rs 250 crore.",
        capPart: "Capped because encryption or masking is only partly in place. Penalty up to Rs 250 crore.",
        fix: "Encrypt or mask personal data wherever it is stored or sent.",
      },
      {
        id: "Q2",
        q: "Is access to personal data limited to staff who need it for their work?",
        fix: "Limit access to personal data to staff who need it for their work.",
      },
      {
        id: "Q3",
        q: "Do you keep logs of who accessed personal data for at least one year?",
        fix: "Log who accessed personal data and keep the logs for at least one year.",
      },
    ],
  },
  {
    id: "breach",
    name: "Breach response",
    weight: 16,
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
        q: "Have you tested that plan, for example with a drill, in the last 12 months?",
        fix: "Test the breach plan with a drill at least once a year.",
      },
      {
        id: "Q6",
        q: "Can you inform the Data Protection Board and file the detailed report within 72 hours?",
        fix: "Prepare the 72-hour notice and detailed report to the Data Protection Board.",
      },
      {
        id: "Q7",
        q: "Can you tell affected people about a breach quickly and in plain words?",
        fix: "Draft plain-language notices for the people affected by a breach.",
      },
    ],
  },
  {
    id: "consent",
    name: "Notice and consent",
    weight: 18,
    penalty: 50,
    questions: [
      {
        id: "Q8",
        q: "For each use of personal data, do you know whether it relies on consent or on a legitimate use the law allows?",
        fix: "List each use of personal data and mark it consent or a legitimate use the law allows.",
      },
      {
        id: "Q9",
        q: "Does every place you collect data show a clear notice of what you take and why?",
        fix: "Show a clear notice of what you take and why at every collection point.",
      },
      {
        id: "Q10",
        q: "Do you keep a record of each consent with its time, purpose and channel?",
        recordCritical: true,
        capNone: "Capped because each consent is not recorded with its time, purpose and channel. Penalty up to Rs 50 crore.",
        capPart: "Capped because consent records are only partly in place. Penalty up to Rs 50 crore.",
        fix: "Record each consent with its time, purpose and channel.",
      },
      {
        id: "Q11",
        q: "Can people withdraw consent as easily as they gave it?",
        fix: "Make withdrawing consent as easy as giving it.",
      },
    ],
  },
  {
    id: "children",
    name: "Children and guardians",
    weight: 10,
    penalty: 200,
    questions: [
      {
        id: "Q12",
        q: "Before using a child's data, or data of a person with a guardian, do you get verified consent from the parent or lawful guardian?",
        critical: true,
        capNone: "Capped because data of children or persons with a guardian is used without verified consent from a parent or lawful guardian. Penalty up to Rs 200 crore.",
        capPart: "Capped because consent from a parent or lawful guardian is only partly verified. Penalty up to Rs 200 crore.",
        fix: "Get verified consent from a parent or lawful guardian before using the data.",
      },
      {
        id: "Q13",
        q: "Have you stopped tracking, behavioural monitoring and targeted ads aimed at children?",
        fix: "Stop tracking, behavioural monitoring and targeted ads aimed at children.",
      },
    ],
  },
  {
    id: "rights",
    name: "Rights and complaints",
    weight: 11,
    penalty: 50,
    questions: [
      {
        id: "Q14",
        q: "Can you act on requests to see, correct or erase data within the time the rules set?",
        fix: "Set a workflow that closes data requests within the time the rules set.",
      },
      {
        id: "Q15",
        q: "Do you publish a grievance contact and resolve each complaint within 90 days?",
        fix: "Publish a grievance contact and resolve each complaint within 90 days.",
      },
    ],
  },
  {
    id: "retention",
    name: "Retention and accuracy",
    weight: 7,
    penalty: 50,
    questions: [
      {
        id: "Q16",
        q: "Do you erase personal data once its purpose is over, following a written retention schedule?",
        fix: "Write a retention schedule and erase personal data once its purpose is over.",
      },
      {
        id: "Q17",
        q: "Do you keep personal data accurate when it is used for decisions about people?",
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
        id: "Q18",
        q: "Does every vendor that handles your personal data have a signed contract with data protection terms?",
        fix: "Sign data protection terms with every vendor that handles personal data.",
      },
      {
        id: "Q19",
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
        id: "Q20",
        q: "Do you keep one current map of the personal data you hold, where it sits and why?",
        fix: "Keep one current map of the personal data you hold, where it sits and why.",
      },
      {
        id: "Q21",
        q: "Is a named person accountable for DPDP compliance, reporting to leadership?",
        fix: "Name one person accountable for DPDP compliance, reporting to leadership.",
      },
      {
        id: "Q22",
        q: "Have you appointed a Data Protection Officer based in India?",
        sdf: true,
        penalty: 150,
        fix: "Appoint a Data Protection Officer based in India.",
      },
      {
        id: "Q23",
        q: "Do you run a yearly data protection impact assessment (a risk review of your data use) and an independent audit?",
        sdf: true,
        penalty: 150,
        fix: "Run a yearly data protection impact assessment and an independent audit.",
      },
    ],
  },
];

// The inline question shown on the home page: the data map question.
export const INLINE_QUESTION = AREAS.find((a) => a.id === "governance").questions.find(
  (q) => q.id === "Q20"
);

const REGULATED = ["Banking, NBFC or insurance", "Health", "Telecom, e-commerce or social media"];

export function isSDF(profile) {
  if (profile.P3 === "Over 1 crore") return true;
  return (
    REGULATED.includes(profile.P1) && ["10 lakh to 1 crore", "Over 1 crore"].includes(profile.P3)
  );
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
    if (kids && a.id === "children") w = 14;
    if (kids && a.id === "consent") w = 14;
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
      recordCritical: q.recordCritical,
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
  { min: 90, name: "Strong", tone: "text-emerald-400", desc: "Most duties are in place and provable. Close what is left before 13 May 2027." },
  { min: 75, name: "Ready", tone: "text-sky-400", desc: "You are close. Close the remaining gaps before the deadline." },
  { min: 55, name: "Progressing", tone: "text-indigo-300", desc: "You are about halfway. Start with the top gaps below." },
  { min: 30, name: "Developing", tone: "text-amber-400", desc: "Core duties are missing. Start with the critical items below." },
  { min: 0, name: "Exposed", tone: "text-rose-400", desc: "Most duties are not in place. Start a trial to build your first controls." },
];

export function bandFor(score) {
  return BANDS.find((b) => score >= b.min) || BANDS[BANDS.length - 1];
}

const BAND_RANK = { Exposed: 0, Developing: 1, Progressing: 2, Ready: 3, Strong: 4 };
const bandByRank = (rank) => BANDS.find((b) => BAND_RANK[b.name] === rank);

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

  // Caps: critical questions cap at Exposed (Not yet or Not sure) or Developing (Partly);
  // the record-critical consent item caps at Developing or Progressing.
  let band = bandFor(score);
  let capReason = null;
  let capTarget = null;
  for (const a of areas) {
    for (const q of a.questions) {
      const p = points(q.id);
      let target = null;
      let reason = null;
      if (q.critical && p === 0) [target, reason] = [BAND_RANK.Exposed, q.capNone];
      else if (q.critical && p === 50) [target, reason] = [BAND_RANK.Developing, q.capPart];
      else if (q.recordCritical && p === 0) [target, reason] = [BAND_RANK.Developing, q.capNone];
      else if (q.recordCritical && p === 50) [target, reason] = [BAND_RANK.Progressing, q.capPart];
      if (target == null) continue;
      if (BAND_RANK[band.name] > target && (capTarget == null || target < capTarget)) {
        capTarget = target;
        capReason = reason;
      }
    }
  }
  if (capTarget != null) band = bandByRank(capTarget);

  // Gaps: critical and record-critical questions below 100 first (highest penalty first),
  // then the rest by (100 minus points) x the area penalty ceiling, ties by area weight.
  const flagged = [];
  const rest = [];
  for (const a of areas) {
    for (const q of a.questions) {
      const p = points(q.id);
      if (p >= 100) continue;
      const item = {
        id: q.id,
        q: q.q,
        fix: q.fix,
        weight: a.weight,
        penalty: q.sdf ? (q.penalty ?? a.penalty) : a.penalty,
        gapPoints: (100 - p) * (q.sdf ? (q.penalty ?? a.penalty) : a.penalty),
      };
      if (q.critical || q.recordCritical) flagged.push(item);
      else rest.push(item);
    }
  }
  flagged.sort((x, y) => y.penalty - x.penalty || y.weight - x.weight);
  rest.sort((x, y) => y.gapPoints - x.gapPoints || y.weight - x.weight);
  const gaps = [...flagged, ...rest].slice(0, 3);

  return { score, band, capReason, areas: areaResults, gaps };
}
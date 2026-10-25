// Sends a lead. When VITE_LEAD_ENDPOINT is set (self-hosted build), the lead goes to that
// endpoint (a Google Apps Script web app). Otherwise it goes to the Base44 captureLead function.
const LEAD_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT;

export async function submitLead(payload) {
  if (LEAD_ENDPOINT) {
    const body = { submission_id: crypto.randomUUID(), ...payload, site: "jshield" };
    // text/plain keeps this a simple request, so the browser sends it without a CORS preflight.
    const res = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) throw new Error(data.error || "Lead not saved");
    return data;
  }
  const { base44 } = await import("@/api/base44Client");
  return base44.functions.invoke("captureLead", payload);
}

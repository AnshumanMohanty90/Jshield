const FREE_EMAIL_DOMAINS = [
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.in", "yahoo.co.in", "yahoo.co.uk", "ymail.com",
  "outlook.com", "outlook.in", "hotmail.com", "hotmail.in", "hotmail.co.in", "hotmail.co.uk", "live.com", "live.in", "msn.com",
  "aol.com", "icloud.com", "me.com", "protonmail.com", "proton.me",
  "gmx.com", "gmx.net", "mail.com", "zoho.com", "yandex.com", "yandex.ru",
  "rediffmail.com", "qq.com", "163.com", "126.com",
];

// Returns "" when the email is a valid work email, or the message to show otherwise.
export function workEmailError(email) {
  const value = String(email || "").trim().toLowerCase();
  if (!value || !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(value)) {
    return "Enter a valid work email.";
  }
  if (FREE_EMAIL_DOMAINS.includes(value.split("@")[1])) {
    return "Please use your work email, not a Gmail, Yahoo or Outlook address.";
  }
  return "";
}
const FREE_EMAIL_DOMAINS = [
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.in", "ymail.com",
  "outlook.com", "outlook.in", "hotmail.com", "hotmail.in", "live.com", "live.in", "msn.com",
  "aol.com", "icloud.com", "me.com", "protonmail.com", "proton.me",
  "gmx.com", "gmx.net", "mail.com", "zoho.com", "yandex.com", "yandex.ru",
  "rediffmail.com", "qq.com", "163.com", "126.com",
];

export function workEmailError(email) {
  const value = String(email || "").trim().toLowerCase();
  if (!value) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Enter a valid email address.";
  }
  const domain = value.split("@")[1];
  if (FREE_EMAIL_DOMAINS.includes(domain)) {
    return "Please use your work email.";
  }
  return null;
}
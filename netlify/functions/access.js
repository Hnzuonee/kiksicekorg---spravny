const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  // Načtení tokenu z formuláře
  const formData = new URLSearchParams(event.body);
  const token = formData.get("cf-turnstile-response");

  if (!token) {
    return {
      statusCode: 400,
      body: "Chybí token z Turnstile."
    };
  }

  const secret = process.env.CF_TURNSTILE_SECRET;

  // Ověření tokenu u Cloudflare
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`
  });

  const data = await response.json();

  if (data.success) {
    return {
      statusCode: 302,
      headers: {
        Location: "https://onlyfans.com/kristynka.cengerova"
      }
    };
  }

  return {
    statusCode: 403,
    body: "Ověření selhalo. Přístup odepřen."
  };
};

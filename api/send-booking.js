/* Vercel serverless function — receives the booking form's JSON
 * payload and emails it via Resend (https://resend.com).
 *
 * Required environment variables (set in Vercel → Project →
 * Settings → Environment Variables, then redeploy):
 *   RESEND_API_KEY  — API key from your Resend account
 *   BOOKING_FROM    — verified sender, e.g. "Asteria Apartments <booking@asteriaapartments.gr>"
 *   BOOKING_TO      — where booking requests should land, e.g. "info@asteriaapartments.gr"
 *
 * The "from" address's domain must be verified in Resend before
 * sending will work — see the Domains section of the Resend
 * dashboard. Until then Resend will reject the send with a 4xx.
 */

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  var body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  var name      = String(body.name || "").trim();
  var email     = String(body.email || "").trim();
  var phone     = String(body.phone || "").trim();
  var arrival   = String(body.arrival || "").trim();
  var departure = String(body.departure || "").trim();
  var nights    = body.nights;
  var adults    = String(body.adults || "").trim();
  var children  = String(body.children || "").trim();
  var room      = String(body.room || "").trim();
  var message   = String(body.message || "").trim();

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !phone || !arrival || !departure) {
    return res.status(400).json({ error: "missing_fields" });
  }
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "invalid_email" });
  }

  var apiKey = process.env.RESEND_API_KEY;
  var from   = process.env.BOOKING_FROM;
  var to     = process.env.BOOKING_TO || "info@asteriaapartments.gr";

  if (!apiKey || !from) {
    console.error("send-booking: missing RESEND_API_KEY or BOOKING_FROM env var");
    return res.status(500).json({ error: "email_not_configured" });
  }

  var subject = "Νέο αίτημα κράτησης — " + name;

  var textLines = [
    "Νέο αίτημα κράτησης από την ιστοσελίδα",
    "",
    "Ονοματεπώνυμο: " + name,
    "Email: " + email,
    "Τηλέφωνο: " + phone,
    "Άφιξη: " + arrival,
    "Αναχώρηση: " + departure,
    "Διανυκτερεύσεις: " + (nights || "-"),
    "Ενήλικες: " + (adults || "-"),
    "Παιδιά: " + (children || "-"),
    "Δωμάτιο: " + (room || "-"),
    "Μήνυμα: " + (message || "-"),
  ];

  var htmlRows = [
    ["Ονοματεπώνυμο", name],
    ["Email", email],
    ["Τηλέφωνο", phone],
    ["Άφιξη", arrival],
    ["Αναχώρηση", departure],
    ["Διανυκτερεύσεις", nights || "-"],
    ["Ενήλικες", adults || "-"],
    ["Παιδιά", children || "-"],
    ["Δωμάτιο", room || "-"],
    ["Μήνυμα", message || "-"],
  ]
    .map(function (row) {
      return (
        "<tr>" +
        '<td style="padding:6px 12px;color:#5a6860;font-weight:700;white-space:nowrap;">' + escapeHtml(row[0]) + "</td>" +
        '<td style="padding:6px 12px;color:#1a2520;">' + escapeHtml(row[1]).replace(/\n/g, "<br>") + "</td>" +
        "</tr>"
      );
    })
    .join("");

  var html =
    '<div style="font-family:sans-serif;max-width:560px;margin:0 auto;">' +
    '<h2 style="color:#0d1e16;">Νέο αίτημα κράτησης</h2>' +
    '<table style="border-collapse:collapse;width:100%;">' + htmlRows + "</table>" +
    "</div>";

  try {
    var resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: from,
        to: [to],
        reply_to: email,
        subject: subject,
        text: textLines.join("\n"),
        html: html,
      }),
    });

    if (!resendRes.ok) {
      var errBody = await resendRes.text();
      console.error("send-booking: Resend error", resendRes.status, errBody);
      return res.status(502).json({ error: "email_send_failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("send-booking: unexpected error", err);
    return res.status(500).json({ error: "server_error" });
  }
};

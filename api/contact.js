var nodemailer = require("nodemailer");

var TO = "contact@aaghaaz.org.in";

module.exports = async function (req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  var body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  var name = String(body.name || "").trim().slice(0, 120);
  var email = String(body.email || "").trim().slice(0, 160);
  var message = String(body.message || "").trim().slice(0, 5000);
  var honeypot = String(body.website || "").trim();

  var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (honeypot || !emailOk) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }

  var host = process.env.SMTP_HOST || "smtpout.secureserver.net";
  var port = parseInt(process.env.SMTP_PORT || "465", 10);
  var user = process.env.SMTP_USER;
  var pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return res.status(500).json({ ok: false, error: "Email is not configured yet. Please try again later." });
  }

  var transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: port === 465,
    auth: { user: user, pass: pass }
  });

  try {
    await transporter.sendMail({
      from: "\"Aaghaaz Website\" <" + user + ">",
      to: TO,
      replyTo: "\"" + name.replace(/"/g, "") + "\" <" + email + ">",
      subject: "Website enquiry from " + name,
      text: message + "\n\n— " + name + " (" + email + ")"
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact mail failed:", err && err.message);
    return res.status(502).json({ ok: false, error: "Could not send right now. Please email us directly at " + TO + "." });
  }
};

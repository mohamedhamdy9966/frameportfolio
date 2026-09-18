import { NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Accepts a project enquiry from the homepage contact form and validates it
 * server-side so a malformed or bot-submitted body can never be trusted.
 *
 * Integration point: once the NestJS backend is reachable, swap the
 * `persistEnquiry` body for a fetch to `${process.env.API_URL}/enquiries`
 * (or send a transactional email) and keep this validation as the first gate.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const REQUIRED = ["name", "email", "message"];

const MAX_LENGTHS = {
  name: 120,
  email: 160,
  company: 120,
  phone: 40,
  projectType: 80,
  timeline: 80,
  budget: 80,
  message: 4000,
};

function validate(payload) {
  const errors = {};

  for (const field of REQUIRED) {
    if (!payload[field] || !String(payload[field]).trim()) {
      errors[field] = "This field is required.";
    }
  }

  if (payload.email && !EMAIL_RE.test(String(payload.email).trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (payload.message && String(payload.message).trim().length < 12) {
    errors.message = "Give us at least a sentence to work with.";
  }

  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const value = payload[field];
    if (value && String(value).length > max) {
      errors[field] = `Keep this under ${max} characters.`;
    }
  }

  // Honeypot: real users never fill a hidden "website" field.
  if (payload.website) {
    errors.website = "Spam detected.";
  }

  return errors;
}

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json(
      { ok: false, message: "Request body must be an object." },
      { status: 400 },
    );
  }

  const errors = validate(payload);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: "Validation failed.", errors },
      { status: 422 },
    );
  }

  const enquiry = {
    name: String(payload.name).trim(),
    email: String(payload.email).trim().toLowerCase(),
    company: payload.company ? String(payload.company).trim() : "",
    phone: payload.phone ? String(payload.phone).trim() : "",
    projectType: payload.projectType || "",
    timeline: payload.timeline || "",
    budget: payload.budget || "",
    message: String(payload.message).trim(),
    receivedAt: new Date().toISOString(),
  };

  // TODO: forward to the NestJS API / email provider here, e.g.
  // await fetch(`${process.env.API_URL}/enquiries`, { method: 'POST', ... })

  if (process.env.NODE_ENV !== "production") {
    console.info("[api/contact] enquiry received", {
      name: enquiry.name,
      email: enquiry.email,
      projectType: enquiry.projectType,
    });
  }

  return NextResponse.json(
    {
      ok: true,
      message: "Enquiry received. We will reply within 24 hours.",
      enquiry: { name: enquiry.name, email: enquiry.email },
    },
    { status: 201 },
  );
}

export async function GET() {
  return NextResponse.json(
    { ok: false, message: "Method not allowed. POST your enquiry instead." },
    { status: 405 },
  );
}

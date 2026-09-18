"use client";
import React, { useMemo, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  MdOutlineMailOutline,
  MdOutlinePhone,
  MdOutlinePlace,
  MdOutlineSchedule,
  MdOutlineWhatsapp,
} from "react-icons/md";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import {
  siteConfig,
  projectTypes,
  budgetRanges,
  timelineOptions,
} from "../../constants/constants";
import {
  ContactGrid,
  FormCard,
  FieldRow,
  Field,
  Label,
  Input,
  Select,
  TextArea,
  ErrorText,
  ChipGroup,
  Chip,
  SubmitRow,
  SubmitButton,
  Spinner,
  FormNote,
  StatusBox,
  ContactRail,
  RailCard,
  RailTitle,
  RailRow,
  RailFact,
  WhatsappButton,
} from "./ContactStyles";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const emptyForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  projectType: projectTypes[0],
  timeline: timelineOptions[0],
  budget: budgetRanges[1],
  message: "",
};

const Contact = () => {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const setField = (key) => (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  /* ── Validation ── */
  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!form.email.trim()) next.email = "We need an email to reply to.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "That email looks incomplete.";
    if (form.phone.trim() && form.phone.trim().replace(/\D/g, "").length < 7) {
      next.phone = "Please enter a reachable phone number.";
    }
    if (form.message.trim().length < 12) {
      next.message =
        "A sentence or two about the project helps us reply properly.";
    }
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    try {
      // Wired to a local route handler so the form works out of the box.
      // Swap the endpoint for your NestJS API when the backend is live.
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("success");
      setForm(emptyForm);
    } catch (error) {
      setStatus("error");
    }
  };

  /* A mailto fallback so the enquiry is never lost, even if the API is down. */
  const mailtoHref = useMemo(() => {
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company || "—"}`,
      `Phone: ${form.phone || "—"}`,
      `Project type: ${form.projectType}`,
      `Budget: ${form.budget}`,
      `Timeline: ${form.timeline}`,
      "",
      form.message,
    ].join("\n");
    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      "New project enquiry",
    )}&body=${encodeURIComponent(body)}`;
  }, [form]);

  return (
    <Section id="contact" ref={sectionRef}>
      <SectionDivider />
      <SectionTitle main>Start a Project</SectionTitle>
      <SectionText>
        Tell us what you are building and we will come back with scope, timeline
        and a fixed price. No discovery invoice, no obligation.
      </SectionText>

      <ContactGrid>
        {/* ── Enquiry form ── */}
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <FormCard onSubmit={handleSubmit} noValidate>
            {status === "success" && (
              <StatusBox $tone="success" role="status">
                <span>
                  <strong>Enquiry received.</strong> We reply to every brief
                  within {siteConfig.responseTime.toLowerCase()}. Check your
                  inbox — and your spam folder, just in case.
                </span>
              </StatusBox>
            )}

            {status === "error" && (
              <StatusBox $tone="error" role="alert">
                <span>
                  <strong>We could not send that.</strong> The form endpoint is
                  unreachable right now.{" "}
                  <a href={mailtoHref}>Email us instead</a> and we will pick it
                  up straight away.
                </span>
              </StatusBox>
            )}

            <FieldRow>
              <Field>
                <Label htmlFor="contact-name">
                  Full name<span className="required">*</span>
                </Label>
                <Input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Nour Ibrahim"
                  value={form.name}
                  onChange={setField("name")}
                  $invalid={Boolean(errors.name)}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <ErrorText>{errors.name}</ErrorText>}
              </Field>

              <Field>
                <Label htmlFor="contact-email">
                  Work email<span className="required">*</span>
                </Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={setField("email")}
                  $invalid={Boolean(errors.email)}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </Field>
            </FieldRow>

            <FieldRow>
              <Field>
                <Label htmlFor="contact-company">Company</Label>
                <Input
                  id="contact-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Optional"
                  value={form.company}
                  onChange={setField("company")}
                />
              </Field>

              <Field>
                <Label htmlFor="contact-phone">Phone / WhatsApp</Label>
                <Input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+20 1XX XXX XXXX"
                  value={form.phone}
                  onChange={setField("phone")}
                  $invalid={Boolean(errors.phone)}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
              </Field>
            </FieldRow>

            <FieldRow>
              <Field>
                <Label htmlFor="contact-type">What do you need?</Label>
                <Select
                  id="contact-type"
                  name="projectType"
                  value={form.projectType}
                  onChange={setField("projectType")}
                >
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field>
                <Label htmlFor="contact-timeline">
                  When do you want to start?
                </Label>
                <Select
                  id="contact-timeline"
                  name="timeline"
                  value={form.timeline}
                  onChange={setField("timeline")}
                >
                  {timelineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
            </FieldRow>

            <Field>
              <Label as="span" id="budget-label">
                Indicative budget
              </Label>
              <ChipGroup role="group" aria-labelledby="budget-label">
                {budgetRanges.map((range) => (
                  <Chip
                    key={range}
                    type="button"
                    $active={form.budget === range}
                    aria-pressed={form.budget === range}
                    onClick={() =>
                      setForm((prev) => ({ ...prev, budget: range }))
                    }
                  >
                    {range}
                  </Chip>
                ))}
              </ChipGroup>
            </Field>

            <Field>
              <Label htmlFor="contact-message">
                Project details<span className="required">*</span>
              </Label>
              <TextArea
                id="contact-message"
                name="message"
                placeholder="Users, key features, must-have integrations, deadline — whatever you already know."
                value={form.message}
                onChange={setField("message")}
                $invalid={Boolean(errors.message)}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message && <ErrorText>{errors.message}</ErrorText>}
            </Field>

            <SubmitRow>
              <SubmitButton type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <Spinner aria-hidden="true" /> Sending…
                  </>
                ) : (
                  "Send Enquiry"
                )}
              </SubmitButton>

              <FormNote>
                Prefer email? Write to{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
                We reply within {siteConfig.responseTime.toLowerCase()}.
              </FormNote>
            </SubmitRow>
          </FormCard>
        </motion.div>

        {/* ── Contact rail ── */}
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <ContactRail>
            <RailCard>
              <RailTitle>Direct lines</RailTitle>
              <RailRow
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <MdOutlineWhatsapp size="2rem" />
                </span>
                Start a WhatsApp chat
              </RailRow>
              <RailRow href={siteConfig.phoneHref}>
                <span className="icon">
                  <MdOutlinePhone size="2rem" />
                </span>
                {siteConfig.phoneDisplay}
              </RailRow>
              <RailRow href={`mailto:${siteConfig.email}`}>
                <span className="icon">
                  <MdOutlineMailOutline size="2rem" />
                </span>
                {siteConfig.email}
              </RailRow>
              <RailRow as="span" style={{ cursor: "default" }}>
                <span className="icon">
                  <MdOutlinePlace size="2rem" />
                </span>
                {siteConfig.address}
              </RailRow>
            </RailCard>

            <RailCard>
              <RailTitle>Working hours</RailTitle>
              <RailFact>
                <span>Sunday – Thursday</span>
                <strong>9:00 – 18:00</strong>
              </RailFact>
              <RailFact>
                <span>Friday – Saturday</span>
                <strong>Support only</strong>
              </RailFact>
              <RailFact>
                <span>Timezone</span>
                <strong>GMT+2 (Cairo)</strong>
              </RailFact>
              <RailFact>
                <span>First reply</span>
                <strong>{siteConfig.responseTime}</strong>
              </RailFact>
            </RailCard>

            <RailCard>
              <RailTitle>Not a form person?</RailTitle>
              <RailFact>
                <span>Available on</span>
                <strong>WhatsApp · Telegram · Email</strong>
              </RailFact>
              <WhatsappButton
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdOutlineSchedule size="2rem" />
                Book a 20-min intro call
              </WhatsappButton>
            </RailCard>
          </ContactRail>
        </motion.div>
      </ContactGrid>
    </Section>
  );
};

export default Contact;

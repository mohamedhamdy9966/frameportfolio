/* ── Site-wide config ─────────────────────────
   Single source of truth for contact details & brand copy.
   NOTE: the WhatsApp number is stored in international format
   (no leading 0, +20 country code for Egypt) so wa.me links
   open a real chat instead of a 404 page.
──────────────── */
export const siteConfig = {
  brand: 'Taxi Digital Solutions',
  shortBrand: 'Taxi',
  tagline: 'Marketing + software, delivered as one system.',
  phoneDisplay: '01111255279',
  phoneHref: 'tel:+201111255279',
  whatsapp: 'https://wa.me/201111255279',
  email: 'info@taxi.com',
  address: 'Cairo, Egypt',
  workingHours: 'Sun – Thu · 9:00 – 18:00 (GMT+2)',
  responseTime: 'Under 24 hours',
  founded: 2022,
};

/* ── Case studies / projects ──────────────────
   Real builds from the Taxi portfolio (client sites carry a
   “Made by Taxi Digital Solutions” credit in their footers).
──────────────── */
export const projects = [
  {
    title: 'Taxi Brand Launch System',
    description:
      'Built a complete brand-to-demand campaign for Taxi clients—positioning, creative direction, and performance ads designed to turn attention into qualified leads.',
    image: '/images/1.png',
    tags: ['Branding', 'Paid Social', 'Lead Gen'],
    // No public live URL for this engagement — both links point at the
    // enquiry section rather than a dead placeholder domain.
    source: '#contact',
    visit: '#contact',
    id: 0,
  },
  {
    title: 'Pharmaca Growth Engine',
    description:
      'Search, content and lifecycle email for a global pharmacist exam-prep platform — course landing pages, mock-exam funnels and an affiliate programme that compounds organic sign-ups.',
    image: '/images/2.png',
    tags: ['SEO', 'Content', 'EdTech'],
    source: 'https://www.pharmca.net',
    visit: 'https://www.pharmca.net',
    id: 1,
  },
  {
    title: 'Kunafa Sheek Ordering Flow',
    description:
      'Arabic-first storefront, delivery flow and paid social for a dessert brand in Qassim. Cart drop-off dropped with a checkout built around three taps.',
    image: '/images/3.jpg',
    tags: ['E-Commerce', 'RTL', 'Automation'],
    source: 'https://www.kunafa-sheek.com',
    visit: 'https://www.kunafa-sheek.com',
    id: 2,
  },
  {
    title: 'Roshetta Go-To-Market',
    description:
      'App-store and web launch support for a healthcare platform — positioning, onboarding journey, retargeting audiences and install-to-booking analytics.',
    image: '/images/4.jpg',
    tags: ['Healthcare', 'Retargeting', 'Performance'],
    source: 'https://roshetta-virid.vercel.app',
    visit: 'https://roshetta-virid.vercel.app',
    id: 3,
  },
];

export const TimeLineData = [
  { year: 2022, text: 'Taxi was founded as a performance-focused digital marketing agency', },
  { year: 2023, text: 'Expanded services: SEO, content marketing, and conversion optimization', },
  { year: 2024, text: 'Reached 50 active clients—delivering results across paid + organic', },
  { year: 2025, text: 'Opened our software division: web, mobile and custom platforms', },
  { year: 2026, text: 'Shipped Roshetta, Pharmaca and Kunafa Sheek—marketing and product under one roof', },
];
/* ── Software / product builds ────────────────────────────────
   The “software house” half of the business: platforms we have
   designed, engineered and launched end-to-end.
──────────────── */
export const softwareProjects = [
  {
    id: 'roshetta',
    name: 'Roshetta',
    type: 'Healthcare Platform',
    url: 'https://roshetta-virid.vercel.app',
    accent: '#0097A7',
    tagline: 'Clinic, pharmacy and patient journeys in one secure system.',
    description:
      'An all-in-one healthcare platform connecting patients, doctors and clinics. Patients book clinic visits, home visits and teleconsultations, order medicine and keep their full medical history. Providers get scheduling, patient records and a clinic performance dashboard.',
    features: [
      'Doctor, clinic & home-visit booking',
      'Teleconsultation scheduling',
      'Medicine ordering & fulfilment',
      'Medication reminders',
      'Centralised medical records & lab results',
      'Emergency one-tap numbers',
      'Doctor, clinic-admin & patient dashboards',
      'Arabic + English with RTL support',
    ],
    stack: ['Next.js', 'REST API', 'PostgreSQL', 'Role-based Auth', 'Vercel'],
    platforms: ['Web', 'iOS', 'Android'],
    metrics: [
      { value: '3', label: 'Role dashboards' },
      { value: '2', label: 'Languages (RTL)' },
      { value: '100%', label: 'Mobile responsive' },
    ],
  },
  {
    id: 'pharmaca',
    name: 'Pharmaca',
    type: 'E-Learning / LMS',
    url: 'https://www.pharmca.net',
    accent: '#00A79D',
    tagline: 'A global pharmacist licensing-exam platform, built to scale.',
    description:
      'A learning platform for pharmacist licensing exams covering Saudi Prometric, Pearson Vue Gulf, DHA/DOH/MOH, KAPS/OPRA, PEBC, NAPLEX and German Approbation — with a course catalogue, mock exams, clinical tools, educator and affiliate programmes, newsletter capture and analytics.',
    features: [
      'Course catalogue & category filtering',
      'Mock exams & practice question banks',
      'Clinical tools suite',
      'Free and paid course tiers',
      'Educator & affiliate onboarding',
      'Newsletter capture & lifecycle emails',
      'Multi-currency checkout',
      'SEO-first course landing pages',
    ],
    stack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Headless CMS'],
    platforms: ['Web'],
    metrics: [
      { value: '10K+', label: 'Enrolled pharmacists' },
      { value: '120+', label: 'Specialised modules' },
      { value: '98.4%', label: 'Exam pass rate' },
    ],
  },
  {
    id: 'kunafa-sheek',
    name: 'Kunafa Sheek',
    type: 'E-Commerce / Ordering',
    url: 'https://www.kunafa-sheek.com',
    accent: '#C9A227',
    tagline: 'Arabic-first dessert ordering with delivery built in.',
    description:
      'An Arabic-first storefront and ordering system for a dessert brand in Qassim: product catalogue with best-seller carousels, cart and delivery flow, order confirmation and a fully RTL layout tuned for mobile shoppers.',
    features: [
      'Product catalogue & best-seller carousel',
      'Cart and checkout flow',
      'Delivery zones & scheduling',
      'RTL Arabic-first interface',
      'Mobile-first responsive layout',
      'Order notifications',
      'Payment & wallet support',
      'Customer satisfaction reporting',
    ],
    stack: ['Next.js', 'Tailwind CSS', 'REST API', 'Payment Gateway'],
    platforms: ['Web', 'Mobile Web'],
    metrics: [
      { value: '98%', label: 'Customer satisfaction' },
      { value: '100%', label: 'Guaranteed quality' },
      { value: '24/7', label: 'Order support' },
    ],
  },
];

/* ── Product engineering services ─────────────────────────────
   What the software division actually delivers for clients.
──────────────── */
export const softwareServices = [
  {
    id: 'web',
    title: 'Web Platforms',
    icon: 'web',
    text: 'Marketing sites, portals and dashboards built on Next.js — fast, SEO-ready and easy to extend.',
    deliverables: ['Next.js / React', 'Core Web Vitals budget', 'CMS or headless data', 'Analytics wired in'],
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    icon: 'mobile',
    text: 'Cross-platform iOS and Android apps with push notifications and offline-friendly data.',
    deliverables: ['React Native / PWA', 'App Store & Play release', 'Push notifications', 'Deep links'],
  },
  {
    id: 'saas',
    title: 'SaaS & Custom Systems',
    icon: 'saas',
    text: 'Multi-tenant products, subscriptions, billing and role-based permissions from day one.',
    deliverables: ['Tenancy & RBAC', 'Subscriptions & billing', 'Admin back-office', 'Usage reporting'],
  },
  {
    id: 'commerce',
    title: 'E-Commerce & Payments',
    icon: 'commerce',
    text: 'Catalogues, carts, checkout and payment gateways with delivery and fulfilment integrations.',
    deliverables: ['Cart & checkout', 'Payment gateways', 'Delivery zones', 'Order notifications'],
  },
  {
    id: 'api',
    title: 'API & Integrations',
    icon: 'api',
    text: 'REST and GraphQL services plus ERP, CRM, WhatsApp and payment integrations.',
    deliverables: ['REST / GraphQL APIs', 'Third-party integrations', 'Webhooks & queues', 'API documentation'],
  },
  {
    id: 'cloud',
    title: 'Cloud, DevOps & QA',
    icon: 'cloud',
    text: 'CI/CD pipelines, monitoring, load testing and security hardening before you go live.',
    deliverables: ['CI/CD pipelines', 'Monitoring & alerts', 'Load & regression testing', 'Security hardening'],
  },
];

/* ── How we run software projects ─────────────────────────────
   Mirrors how the client platforms above were actually run.
──────────────── */
export const softwareProcess = [
  {
    step: '01',
    title: 'Discovery & Scoping',
    text: 'We map users, flows and success metrics, then commit to a scope you can sign off on.',
  },
  {
    step: '02',
    title: 'Design & Prototype',
    text: 'Clickable prototypes and a design system so nothing is a surprise when code starts.',
  },
  {
    step: '03',
    title: 'Build in Sprints',
    text: 'Two-week sprints with a reviewable staging link and a demo at the end of every sprint.',
  },
  {
    step: '04',
    title: 'QA & Launch',
    text: 'Cross-device QA, performance and SEO passes, then a monitored production release.',
  },
  {
    step: '05',
    title: 'Growth & Support',
    text: 'Post-launch analytics, CRO experiments and a support retainer with clear response times.',
  },
];

/* ── Engagement models ────────────────────────
   Three ways to buy software work — with indicative pricing.
──────────────── */
export const engagementModels = [
  {
    id: 'launch',
    name: 'Launch',
    priceFrom: 'EGP 25,000',
    billing: 'per project',
    tagline: 'For founders validating an idea',
    bestFor: 'MVPs, landing systems, single-purpose builds',
    features: [
      'Discovery workshop',
      'Design system + clickable prototype',
      'Responsive web build',
      'Analytics & SEO basics',
      '30-day post-launch support',
    ],
    highlighted: false,
  },
  {
    id: 'scale',
    name: 'Scale',
    priceFrom: 'EGP 90,000',
    billing: 'per project',
    tagline: 'Most popular with funded teams',
    bestFor: 'Platforms with accounts, payments or dashboards',
    features: [
      'Everything in Launch',
      'Authentication & role-based permissions',
      'Payment gateway & invoicing',
      'Admin dashboard',
      '3 months of iteration included',
      'Marketing tracking wired in',
    ],
    highlighted: true,
  },
  {
    id: 'partner',
    name: 'Product Partner',
    priceFrom: 'EGP 35,000',
    billing: 'per month',
    tagline: 'An embedded product team',
    bestFor: 'Roadmaps that need continuous delivery',
    features: [
      'Dedicated squad (design + engineering)',
      'Two-week release cadence',
      'DevOps, monitoring & on-call',
      'Quarterly roadmap planning',
      'Marketing and software in one roadmap',
    ],
    highlighted: false,
  },
];

/* ── Client testimonials ──────────────────────
   Used by the testimonial slider on the homepage.
──────────────── */
export const testimonials = [
  {
    id: 0,
    quote:
      'Taxi rebuilt our exam-prep platform and then took over the admissions funnel. Course sign-ups nearly tripled in two quarters.',
    name: 'Dr. Ahmed Hassan',
    role: 'Founder, Pharmaca',
  },
  {
    id: 1,
    quote:
      'They shipped the storefront, the delivery flow and the ads together. Orders in Qassim doubled within 90 days of launch.',
    name: 'Kunafa Sheek',
    role: 'Operations Lead',
  },
  {
    id: 2,
    quote:
      'The patient app, doctor dashboard and clinic admin all came from one team. That is why the hand-offs actually worked.',
    name: 'Roshetta Team',
    role: 'Product Owner',
  },
  {
    id: 3,
    quote:
      'We started with paid media and ended up with a custom booking system. Same team, one roadmap, no finger-pointing.',
    name: 'Mahmoud Adel',
    role: 'Marketing Director',
  },
  {
    id: 4,
    quote:
      'Reporting is finally honest. The weekly dashboard shows exactly which channel paid for itself and which one did not.',
    name: 'Sara Kamal',
    role: 'Growth Lead',
  },
];

/* ── FAQ ──────────────────────
   Answers the questions sales calls keep repeating.
──────────────── */
export const faqs = [
  {
    q: 'Do you work with clients outside Egypt?',
    a: 'Yes. We deliver remotely across the MENA region, Europe and North America. Most collaboration happens over shared boards, weekly calls and staging links you can review any time.',
  },
  {
    q: 'Can you handle both marketing and software?',
    a: 'That is the point. One team owns acquisition and the platform it points to, so tracking, landing pages and product changes never get lost between two vendors.',
  },
  {
    q: 'How long does a typical build take?',
    a: 'A Launch project runs 3–5 weeks, Scale projects 6–12 weeks, and Product Partner engagements are continuous with a release every two weeks.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every project includes a support window. After that you can move to a monthly retainer covering hosting, monitoring, bug fixes and a pool of improvement hours.',
  },
  {
    q: 'Who owns the code and the accounts?',
    a: 'You do — completely. Repositories, cloud accounts, ad accounts and analytics are created in your name and handed over at the end of the engagement.',
  },
  {
    q: 'Do you sign NDAs and service agreements?',
    a: 'Yes. We sign an NDA before discovery and a written scope with milestones, payment schedule and IP transfer terms before any invoice.',
  },
];

/* ── Quote form options ───────────────────────
   Populate the selects in the contact section.
──────────────── */
export const projectTypes = [
  'Web platform or website',
  'Mobile app (iOS / Android)',
  'SaaS or custom internal system',
  'E-commerce store & payments',
  'SEO / paid media growth',
  'Branding & creative',
  'Something else',
];

export const budgetRanges = [
  'Under EGP 50,000',
  'EGP 50,000 – 150,000',
  'EGP 150,000 – 400,000',
  'EGP 400,000+',
  'Monthly retainer',
  'Not sure yet',
];

export const timelineOptions = [
  'As soon as possible',
  'Within 1 month',
  'Within 1–3 months',
  'Just exploring',
];

/* ── Social links ─────────────────────────────
   Shared by the Header and the Footer so the two lists can
   never drift apart again. WhatsApp uses the international
   format required by wa.me links.
──────────────── */
export const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'tiktok' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { label: 'WhatsApp', href: siteConfig.whatsapp, icon: 'whatsapp' },
  { label: 'Telegram', href: 'https://t.me/taxi', icon: 'telegram' },
  { label: 'Snapchat', href: 'https://snapchat.com/add/taxi', icon: 'snapchat' },
  { label: 'Pinterest', href: 'https://pinterest.com/taxi', icon: 'pinterest' },
];

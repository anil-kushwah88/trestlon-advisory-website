import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath =
  process.env.VERCEL === '1'
    ? '/tmp/trustlon.db'
    : path.join(__dirname, '..', 'data', 'trustlon.db');

// Ensure the local data/ folder exists before opening it — it's gitignored
// (and empty, so not shipped in the zip), so a fresh clone/extract won't
// have it yet. Not needed on Vercel since /tmp always exists there.
if (process.env.VERCEL !== '1') {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

export const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS content (
    section_key TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- pending | approved | rejected
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_read INTEGER NOT NULL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

// ---------------------------------------------------------------------------
// Seed the default admin account (only if the admins table is empty).
// ---------------------------------------------------------------------------
function seedAdmin() {
  const count = db.prepare('SELECT COUNT(*) AS c FROM admins').get().c;
  if (count > 0) return;

  const email = process.env.ADMIN_EMAIL || 'admin@trustlon.com';
  const password = process.env.ADMIN_PASSWORD || 'Trustlon@2026';
  const hash = bcrypt.hashSync(password, 10);
  db.prepare('INSERT INTO admins (email, password_hash) VALUES (?, ?)').run(email, hash);
  console.log(`[seed] Admin account created -> ${email} (password from .env)`);
}

// ---------------------------------------------------------------------------
// Seed default site content, taken directly from the Trustlon Advisory
// Profile 2026 PDF. Every section is editable later from the admin panel.
// ---------------------------------------------------------------------------
const DEFAULT_CONTENT = {
  hero: {
    tagline: 'Precision in Compliance, Excellence in Practice',
    title: 'Trustlon Advisory',
    subtitle: 'Corporate Affairs & Statutory Compliance Solutions',
    established: 'ESTABLISHED 2003',
    ctaPrimary: 'Get in Touch',
    ctaSecondary: 'Our Services',
  },
  whoWeAre: {
    eyebrow: 'A Brief Introduction',
    title: 'Who We Are',
    strapline: 'Since 2003',
    paragraphs: [
      'Trustlon Advisory is a corporate affairs and statutory compliance consultancy built on more than two decades of practice, bringing together regulatory expertise, workforce management and on-ground execution under a single roof. We work with factories, contractors, developers and management teams who need support that is precise, dependable and easy to act on.',
      'We support factories, construction sites, contractors and established enterprises across Uttar Pradesh on the statutory, regulatory and operational matters that shape how a project or business is built, staffed and run — from a site\'s first approval to its ongoing compliance and workforce needs.',
      'Our commitment is simple: the calibre of support usually reserved for large corporates, delivered with the attentiveness, transparency and turnaround a growing operation deserves.',
    ],
    quote: 'We are keen to hold the same ownership of an outcome as our client — because a business\'s statutory foundation should be as considered as the business itself.',
    stat: { value: '23+', label: 'Years of Experience' },
  },
  visionMission: {
    vision: {
      title: 'Vision',
      text: "To be Uttar Pradesh's most trusted partner for corporate affairs and statutory compliance — raising the standard of everyday operational support for factories, construction and infrastructure businesses, while making dependable, execution-first solutions accessible to organisations of every size.",
    },
    mission: {
      title: 'Mission',
      text: "To combine deep statutory expertise with practical, on-ground execution — delivering compliance, workforce and operational solutions that protect our clients' interests, enable confident decisions and support smooth, well-governed project delivery.",
    },
  },
  values: {
    eyebrow: 'What We Stand For',
    title: 'Our Values',
    footer: 'These are not aspirational statements for a brochure — they are the standard every engagement at Trustlon Advisory is measured against, from the first consultation to final sign-off.',
    items: [
      { title: 'Integrity', text: 'We act with complete honesty in every engagement, upholding the highest standards of professional conduct.' },
      { title: 'Transparency', text: 'We keep clients informed at every step, with clear communication and no hidden surprises.' },
      { title: 'Quality', text: 'We hold every deliverable, from documentation to on-site execution, to a consistently high standard.' },
      { title: 'Excellence', text: 'We pursue precision and depth in every filing, certification and deployment, settling for nothing less.' },
      { title: 'Confidentiality & Trust', text: 'We safeguard client information and interests with discretion, building lasting relationships.' },
      { title: 'Client Commitment', text: 'We take ownership of our clients\u2019 objectives, working as invested partners in their success.' },
    ],
  },
  whyUs: {
    eyebrow: 'Our Approach',
    title: 'Why Trustlon',
    expertiseTitle: 'Our Expertise',
    expertiseText: 'Trustlon Advisory brings together statutory compliance expertise, workforce management and hands-on corporate affairs support under one roof. We believe support is most valuable when it is grounded in how a site or business actually operates, not just in paperwork.',
    supportTitle: 'How We Support Our Clients',
    points: [
      'We hold the same ownership and responsibility as our client — we succeed when you do.',
      'We take the time to understand your site and business before advising, so support fits your reality.',
      'We work closely with promoters and management to turn statutory complexity into clear decisions.',
      'We stay accessible — direct answers, realistic timelines, and no unnecessary jargon.',
      'We measure ourselves by outcomes delivered on-site, not hours billed.',
      'We stay current with regulatory change so your operations never fall behind.',
    ],
    badges: ['Direct Partner Access', 'Plain-Language Advice', 'Realistic Timelines'],
  },
  process: {
    eyebrow: 'How We Work',
    title: 'Our Process',
    intro: 'A straightforward, four-step engagement — built to move at the pace of your site or business, not the other way round.',
    steps: [
      { number: '01', title: 'Understand', text: 'We start on-site or on-call, learning how your business actually operates before we advise on anything.' },
      { number: '02', title: 'Assess & Scope', text: 'We map the statutory, workforce and operational requirements specific to your site, and set out a clear, realistic scope.' },
      { number: '03', title: 'Execute', text: 'Our department specialists handle filings, liaison, deployment and documentation — coordinated through one point of contact.' },
      { number: '04', title: 'Support On-Going', text: 'We track renewals and regulatory change so your operations stay audit-ready well after the initial engagement.' },
    ],
  },
  departments: {
    eyebrow: "How We're Organised",
    title: 'Our Departments',
    intro: 'Trustlon Advisory is built as a multi-disciplinary consultancy — a network of statutory consultants working across dedicated departments, so every engagement draws on the right specialists rather than a single generalist.',
    footer: 'One point of contact, coordinating a team of specialists behind the scenes — so you get depth across every department without having to manage multiple vendors yourself.',
    items: [
      { title: 'HR Services', text: 'Recruitment, onboarding, workforce policy and day-to-day personnel administration.', team: [] },
      { title: 'Technical Services', text: 'Site-level technical advisory and equipment planning support.', team: [] },
      { title: 'Statutory Services', text: 'Statutory filings, documentation and regulatory representation.', team: [] },
      { title: 'Land Acquisition & Government Coordination', text: 'Land identification, title diligence and coordination with state authorities.', team: [] },
      { title: 'Contractor & Vendor Management', text: 'Contractor onboarding, agreements and performance oversight.', team: [] },
      { title: 'Construction & Industrial Material Procurement', text: 'Sourcing, quality checks and supply coordination for construction and industrial materials.', team: [] },
      { title: 'Equipment, Tools & Machinery', text: 'Rental allocation of equipment, tools and machinery for project sites.', team: [] },
      { title: 'Laboratory Testing', text: 'Material and site testing services to verify quality and compliance.', team: [] },
    ],
  },
  services: {
    eyebrow: 'What We Do',
    title: 'Our Services',
    intro: 'Five service pillars, one coordinated consultancy — built for promoters, contractors and management teams who need statutory, workforce and operational decisions to move together.',
    pillars: [
      {
        number: '01',
        title: 'Statutory & Regulatory Compliance',
        coreAreas: ['Factory & Construction Compliance', 'Licences & Certifications', 'Labour Norms', 'Policy & Documentation'],
        whatYouGet: [
          'End-to-end statutory compliance support for factories, construction & industrial sites',
          'Licence, registration & certification management from application to renewal',
          'Workplace safety and labour-norm compliance for on-site and off-site teams',
          'Ongoing regulatory monitoring to keep operations audit-ready',
        ],
      },
      {
        number: '02',
        title: 'Land Acquisition & Government Liaison',
        coreAreas: ['Land Acquisition', 'State Authority Liaison', 'Approvals & Clearances', 'Organisation Deals'],
        whatYouGet: [
          'End-to-end support through land acquisition and title diligence',
          'Liaison with state departments and local authorities for approvals and clearances',
          'Structuring and support for organisation deals and land-related agreements',
          'Coordination across multiple government departments on your behalf',
        ],
      },
      {
        number: '03',
        title: 'HR & Workforce Solutions',
        coreAreas: ['HR Services', 'ATS-Based Hiring', 'Skilled & Unskilled Workforce', 'Labour Deployment'],
        whatYouGet: [
          'Full-cycle HR services from hiring to onboarding and workforce policy',
          'ATS-driven recruitment for faster, more structured hiring at scale',
          'Sourcing and allocation of skilled and unskilled workforce for site requirements',
          'Labour deployment planning aligned to project timelines and statutory norms',
        ],
      },
      {
        number: '04',
        title: 'Contractor & Organisation Affairs',
        coreAreas: ['Contractor Management', 'Organisation Deals', 'Vendor Onboarding', 'Documentation'],
        whatYouGet: [
          'Contractor onboarding, agreements and performance oversight',
          'Structuring and documentation for organisational and business deals',
          'Vendor and contractor compliance tracking',
          'Well-documented, dispute-free working relationships across partners',
        ],
      },
      {
        number: '05',
        title: 'Technical & Certification Services',
        coreAreas: ['Technical Services', 'Equipment Allocation', 'Certification Services', 'Site Compliance'],
        whatYouGet: [
          'Technical advisory support for site and equipment planning',
          'Coordination of equipment allocation aligned to project needs',
          'End-to-end certification services for machinery, sites & processes',
          'On-ground technical support paired with statutory sign-off',
        ],
      },
    ],
    sectors: [
      'Factories & Manufacturing Units',
      'Construction & Infrastructure Contractors',
      'Industrial Estates & Developers',
      'Real Estate & Township Projects',
      'EPC & Engineering Firms',
      'Logistics & Warehousing',
      'Corporates & Enterprises',
      'Government & PSU-Linked Projects',
    ],
  },
  caseStudies: {
    eyebrow: 'Sample Engagements',
    title: 'Outcomes We\u2019ve Delivered',
    intro: 'A few representative engagements. Client names withheld for confidentiality; real, detailed case studies are being documented and will replace these shortly.',
    items: [
      {
        tag: 'Factory Compliance',
        title: 'Case study coming soon',
        challenge: 'To be added.',
        action: 'To be added.',
        outcome: 'To be added.',
      },
      {
        tag: 'Contractor Management',
        title: 'Case study coming soon',
        challenge: 'To be added.',
        action: 'To be added.',
        outcome: 'To be added.',
      },
      {
        tag: 'Land & Government Liaison',
        title: 'Case study coming soon',
        challenge: 'To be added.',
        action: 'To be added.',
        outcome: 'To be added.',
      },
    ],
  },
  whoWeServe: {
    eyebrow: 'Our Market Focus',
    title: 'Who We Serve',
    subtitle: 'Uttar Pradesh & North India',
    footer: 'Whatever stage a project is at, the objective is the same — statutory and workforce support that keeps pace with how the work is actually progressing, not support that slows it down.',
    segments: [
      { percent: 40, title: 'Factories & Manufacturing Units', text: 'Statutory compliance, licences & certifications, workforce allocation and technical support for plants and manufacturing sites moving quickly.' },
      { percent: 35, title: 'Construction & Infrastructure Contractors', text: 'Land acquisition, state authority liaison, contractor management, labour deployment and on-site certification support for active project sites.' },
      { percent: 25, title: 'Corporates & Industrial Estates', text: 'Organisation deals, HR & workforce solutions, large-scale compliance management, and coordination with regulatory authorities.' },
    ],
  },
  location: {
    eyebrow: "Where We're Based",
    title: 'Our Strategic Location',
    placeTitle: 'Uttar Pradesh',
    points: [
      'Capital of UP & a fast-growing North Indian industrial hub',
      'Direct access to state industrial, labour & land revenue authorities',
      'Strong connectivity to Delhi–NCR & UP\'s expressway and industrial corridors',
      "Growing base of factories, contractors & developers under UP's ease-of-doing-business reforms",
    ],
    office: {
      label: 'Registered Office',
      address: 'Uttar Pradesh, India',
      note: 'Meetings by appointment · Calls & WhatsApp on +91 94154 35088',
    },
    journeyTitle: 'Our Journey',
    journeyIntro: 'Over two decades of statutory and compliance practice, now brought together under one consultancy.',
    journey: [
      { year: '2003', text: 'Practice founded — statutory & compliance consulting begins' },
      { year: '2026', text: 'Expanding practice depth & advisory team' },
    ],
    roadmapTitle: 'Where We\u2019re Headed',
    roadmapIntro: 'Our plan for the next few years — shared here for transparency, not as completed milestones.',
    roadmap: [
      { year: '2027', text: 'Presence across NCR & Tier-2 UP cities' },
      { year: '2028+', text: 'Pan-India statutory & corporate affairs network' },
    ],
    closingQuote: "Built for Uttar Pradesh's next generation of businesses.",
  },
  credentials: {
    eyebrow: 'Trust & Recognition',
    title: 'Credentials & Registrations',
    intro: 'Details of our registrations, empanelments and affiliations are being compiled and will appear here shortly.',
    items: [],
  },
  faq: {
    eyebrow: 'Common Questions',
    title: 'Frequently Asked Questions',
    intro: 'Answers to what promoters, contractors and management teams usually ask before engaging us.',
    items: [
      { q: 'What kind of businesses do you work with?', a: 'Primarily factories, construction and infrastructure contractors, industrial estates and developers across Uttar Pradesh — along with corporates and enterprises that need statutory, workforce or land-related support.' },
      { q: 'Do you only handle statutory filings, or the full compliance lifecycle?', a: 'The full lifecycle — from licences and certifications through to workforce deployment, contractor management and ongoing regulatory monitoring, so nothing falls through the gap between departments.' },
      { q: 'How is Trustlon different from a typical compliance agent?', a: 'We work as an extension of your team rather than a transaction-based vendor — one point of contact, backed by specialists across HR, technical, statutory, land and certification departments.' },
      { q: 'Where are you based, and do you work outside Uttar Pradesh?', a: 'We are based in Uttar Pradesh, and currently serve clients across the state, with plans to expand into NCR and other UP cities.' },
      { q: 'How do we get started?', a: 'Reach out through the contact section below with a short note on your site or business — we\u2019ll set up an initial call to understand your requirement before proposing scope.' },
    ],
  },
  contact: {
    eyebrow: 'Thank You',
    title: 'As We Are Your Partner in Success',
    quote: "We understand that behind every compliance requirement, contractor deal or workforce need is a business you've built with care. That's why we bring precision, discretion and genuine commitment to every engagement we handle — because your success is our success.",
    address: '704, BCC Tower, Sultanpur Road, Lucknow – 226002, Uttar Pradesh, India',
    shortLocation: 'Uttar Pradesh, India',
    phones: ['+91 99569 05174', '+91 80901 34375'],
    whatsapp: '+91 94154 35088',
    email: 'mail@trustlon.com',
    website: 'www.trustlon.com',
  },
  siteMeta: {
    companyName: 'Trustlon Advisory',
    logoInitials: 'TT',
    footerNote: 'Corporate Affairs & Statutory Compliance Solutions',
  },
};

function seedContent() {
  const insert = db.prepare(
    'INSERT INTO content (section_key, data) VALUES (?, ?) ON CONFLICT(section_key) DO NOTHING'
  );
  const tx = db.transaction((entries) => {
    for (const [key, value] of entries) {
      insert.run(key, JSON.stringify(value));
    }
  });
  tx(Object.entries(DEFAULT_CONTENT));
}

seedAdmin();
seedContent();

export { DEFAULT_CONTENT };

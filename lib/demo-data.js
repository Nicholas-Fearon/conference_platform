export const demoEvents = [
  {
    id: "evt_1",
    slug: "future-of-saas-london",
    name: "Future of SaaS London",
    category: "Flagship summit",
    status: "On sale",
    description:
      "A founder-and-operator conference designed around buyer conversations, peer networking, and product-led growth playbooks.",
    dateLabel: "18 September 2026",
    location: "Magazine London",
    audience: "Founders, revenue leaders, operators",
    coverImage:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    ticketSummary: "3 ticket tiers live",
    highlights: [
      "Personalised attendee directory filtered by role, stage, and hiring intent.",
      "Sponsor-ready lead capture tied back to attendee profile segments.",
      "Post-event recap channels with curated resources and follow-up prompts.",
      "Branded event page with positioning, social proof, and ticketing."
    ],
    ticketTypes: [
      {
        name: "Standard",
        description: "Main conference access with attendee directory and networking.",
        priceLabel: "GBP149"
      },
      {
        name: "Founder dinner",
        description: "Conference access plus private dinner and curated intros.",
        priceLabel: "GBP349"
      },
      {
        name: "Team pass",
        description: "4 tickets with shared sponsor and meeting analytics.",
        priceLabel: "GBP699"
      }
    ]
  },
  {
    id: "evt_2",
    slug: "climate-tech-forum-berlin",
    name: "Climate Tech Forum Berlin",
    category: "Investor forum",
    status: "Waitlist",
    description:
      "A capital-meets-commercialisation forum connecting climate founders, infrastructure investors, and enterprise buyers.",
    dateLabel: "09 October 2026",
    location: "Kuhlhaus Berlin",
    audience: "Climate founders, investors, corporate innovation teams",
    coverImage:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    ticketSummary: "Waitlist and sponsor packages",
    highlights: [
      "Curated investor-founder networking windows.",
      "Segmented attendee insights for sponsor prospecting.",
      "Roundtable follow-up community spaces.",
      "Shared partner and resource library after the event."
    ],
    ticketTypes: [
      {
        name: "General admission",
        description: "Forum access plus roundtables and attendee messaging.",
        priceLabel: "EUR199"
      },
      {
        name: "Investor pass",
        description: "Adds meeting concierge support and dealflow lounge access.",
        priceLabel: "EUR399"
      }
    ]
  },
  {
    id: "evt_3",
    slug: "operator-retreat-amsterdam",
    name: "Operator Retreat Amsterdam",
    category: "Private retreat",
    status: "Applications open",
    description:
      "An intimate multi-day operator retreat with curated peers, workshops, and lasting accountability groups.",
    dateLabel: "14 November 2026",
    location: "De Hallen Amsterdam",
    audience: "Senior operators, product leaders, CFOs",
    coverImage:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    ticketSummary: "Application-based access",
    highlights: [
      "Application workflow with attendee fit scoring.",
      "Retreat circles that persist into the community hub.",
      "Private attendee discovery based on role and current challenges.",
      "Session notes and curated follow-up threads."
    ],
    ticketTypes: [
      {
        name: "Retreat pass",
        description: "Two-day access, dinner, and private community circle.",
        priceLabel: "EUR799"
      }
    ]
  }
];

export const demoDashboard = {
  metrics: [
    {
      label: "Registrations this month",
      value: "1,284",
      detail: "+18% versus previous launch cycle"
    },
    {
      label: "Profile completion",
      value: "71%",
      detail: "Highest conversion from founder and investor cohorts"
    },
    {
      label: "Intro requests sent",
      value: "342",
      detail: "Pre-event networking momentum is building"
    },
    {
      label: "Community re-engagement",
      value: "46%",
      detail: "Attendees active again after event day"
    }
  ],
  workstreams: [
    {
      icon: "events",
      title: "Event creation and publishing",
      description: "Set core event details, schedule, branding, visibility, and venue metadata.",
      cta: "Own this first in the MVP"
    },
    {
      icon: "tickets",
      title: "Ticketing and registrations",
      description: "Model ticket types, inventory, promo codes, and registration state.",
      cta: "Connect to checkout next"
    },
    {
      icon: "attendees",
      title: "Attendee intelligence",
      description: "See profile completion, audience segments, and sponsor-friendly attributes.",
      cta: "Use Supabase views for rollups"
    },
    {
      icon: "networking",
      title: "Networking and discovery",
      description: "Offer searchable profiles, suggested matches, and intro requests.",
      cta: "Ship lightweight recommendations first"
    },
    {
      icon: "branding",
      title: "Branded event experience",
      description: "Control event page styling, imagery, copy, and sponsor surfaces.",
      cta: "Keep it config-driven"
    }
  ],
  segments: [
    {
      name: "Founders",
      count: "384",
      note: "Most active in AI infrastructure, revenue tooling, and hiring topics."
    },
    {
      name: "Investors",
      count: "126",
      note: "High overlap with climate, fintech, and B2B infrastructure themes."
    },
    {
      name: "Sponsors",
      count: "48",
      note: "Best engagement when lead routing is tied to attendee interests."
    }
  ],
  engagementStages: [
    { label: "Registered", value: "1,284", percent: 100 },
    { label: "Completed profile", value: "912", percent: 71 },
    { label: "Sent or received intros", value: "463", percent: 36 },
    { label: "Joined post-event community", value: "590", percent: 46 }
  ]
};

export const demoAttendees = [
  {
    id: "att_1",
    name: "Maya Chen",
    headline: "Founder building AI revenue systems",
    company: "Northline Labs",
    location: "London",
    role: "Founder",
    matchScore: 92,
    interests: ["AI go-to-market", "Hiring", "B2B partnerships"]
  },
  {
    id: "att_2",
    name: "Theo Bernard",
    headline: "Investor focused on climate infrastructure",
    company: "Peak Horizon",
    location: "Paris",
    role: "Investor",
    matchScore: 87,
    interests: ["Climate software", "Grid tech", "Enterprise pilots"]
  },
  {
    id: "att_3",
    name: "Aisha Patel",
    headline: "Head of partnerships scaling fintech ecosystems",
    company: "Ledger Loop",
    location: "Amsterdam",
    role: "Sponsor",
    matchScore: 84,
    interests: ["Embedded finance", "Distribution", "Community-led growth"]
  },
  {
    id: "att_4",
    name: "Jonas Berg",
    headline: "Operator building B2B customer education systems",
    company: "Swell Stack",
    location: "Stockholm",
    role: "Founder",
    matchScore: 81,
    interests: ["Community", "Product onboarding", "AI ops"]
  },
  {
    id: "att_5",
    name: "Nina Duarte",
    headline: "Partnerships lead connecting sponsors and buyer communities",
    company: "Forge Events",
    location: "Lisbon",
    role: "Sponsor",
    matchScore: 77,
    interests: ["Sponsors", "Lead routing", "Event growth"]
  }
];

export const demoCommunity = {
  posts: [
    {
      id: "post_1",
      channel: "Future of SaaS London",
      author: "Programme team",
      title: "Recap thread: keynote notes and operator templates",
      body: "Slides, notes, and the top five frameworks from the growth systems keynote are now available. The thread stays open for follow-up questions and attendee takeaways.",
      tags: ["recap", "resources", "operators"]
    },
    {
      id: "post_2",
      channel: "Sponsor follow-up",
      author: "Partnerships",
      title: "Introductions requested by RevOps sponsor cohort",
      body: "Sponsors can share post-event offers here and attendees can opt in to structured follow-up without losing context from onsite conversations.",
      tags: ["sponsors", "follow-up", "networking"]
    }
  ],
  cohorts: [
    {
      name: "Seed to Series A founders",
      description: "Peer group for operator intros, hiring support, and investor feedback loops."
    },
    {
      name: "Revenue leaders",
      description: "Channel for GTM strategy, systems design, and benchmark exchanges."
    }
  ]
};

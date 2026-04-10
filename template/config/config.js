export const siteConfig = {
  business: {
    name: 'Lead Capture Co.',
    tagline: 'Reusable website template',
    initials: 'LC',
    email: 'hello@example.com',
    phone: '(555) 555-0123',
    phoneHref: 'tel:+15555550123',
    ctaLabel: 'Get A Quote',
    ctaHref: '#lead-form'
  },
  colors: {
    background: '#f5f1ea',
    surface: '#fffdf9',
    surfaceStrong: '#efe6da',
    ink: '#151515',
    muted: '#645b52',
    line: 'rgba(21, 21, 21, 0.08)',
    primary: '#0b6aa2',
    primaryDark: '#08537f',
    accentGlow: 'rgba(11, 106, 162, 0.18)'
  },
  hero: {
    eyebrow: 'Service Business Growth Template',
    title: 'Turn visits into leads with a website that is ready to sell.',
    description:
      'A premium-looking service business template with real lead capture built in. Clone it, brand it, deploy it, and start collecting leads without needing a custom backend.',
    secondaryCta: 'See Services',
    highlightLabel: 'Best fit',
    highlightTitle: 'Local service businesses',
    highlightPoints: [
      'Works for detailing, cleaning, home services, health, legal, and consulting',
      'Netlify Forms captures leads without custom backend routes',
      'Easy branding updates from one config file',
      'Optional webhook support for Zapier or Make'
    ],
    highlightCta: 'Start Capturing Leads'
  },
  sections: {
    trust: [
      {
        title: 'Fast to customize',
        text: 'Change the branding, offers, and contact info in minutes instead of rebuilding from scratch.'
      },
      {
        title: 'Reliable lead handling',
        text: 'Netlify Forms collects submissions in production without depending on broken backend routes.'
      },
      {
        title: 'Easy to sell again',
        text: 'Use the same structure across different local-service clients and just swap the config.'
      }
    ],
    benefits: {
      eyebrow: 'Why This Template Works',
      title: 'Built around clarity, trust, and fast follow-up.',
      cards: [
        {
          title: 'Clear structure',
          text: 'Each section is focused on getting the visitor to understand the offer and take action.'
        },
        {
          title: 'Simple form system',
          text: 'Leads go into Netlify automatically, and you can add webhook automation later if needed.'
        },
        {
          title: 'Reusable across niches',
          text: 'The copy blocks and form fields are easy to adapt to different industries and client types.'
        }
      ]
    },
    services: {
      eyebrow: 'Offer Structure',
      title: 'Simple packages or services people understand fast.',
      description:
        'Use these cards for offers, packages, retainers, consultations, or anything else you want visitors to compare quickly.',
      cards: [
        {
          title: 'Starter Offer',
          price: 'From $149',
          description: 'A low-friction entry offer for buyers who want a simple first step.'
        },
        {
          title: 'Core Offer',
          price: 'Most Popular',
          description: 'Your main revenue offer with the clearest value and easiest buying decision.'
        },
        {
          title: 'Premium Offer',
          price: 'Custom',
          description: 'A higher-touch option for buyers who want more support, speed, or customization.'
        }
      ]
    },
    process: {
      eyebrow: 'How It Works',
      title: 'Three simple steps from first click to qualified lead.',
      steps: [
        {
          title: 'Visitor sees the offer',
          text: 'Use the hero and service sections to explain the value fast.'
        },
        {
          title: 'They submit the form',
          text: 'The reusable form captures the lead in Netlify without needing a backend.'
        },
        {
          title: 'You follow up fast',
          text: 'Use email notifications or webhook automation to respond right away.'
        }
      ]
    },
    results: {
      eyebrow: 'Proof',
      title: 'The layout is designed to support action, not just look good.',
      description:
        'Swap the placeholders below for screenshots, before-and-after images, team photos, or outcome visuals.',
      gallery: [
        {
          image:
            'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80',
          alt: 'Service business website mockup',
          caption: 'Use real proof images here'
        },
        {
          image:
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
          alt: 'Business team reviewing leads',
          caption: 'Show team credibility or process'
        }
      ]
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'Use social proof to reduce hesitation fast.',
      description:
        'If the client has no reviews yet, this section can be repurposed for guarantees, credentials, or proof points.',
      cards: [
        {
          quote: 'The template made it easy to launch a polished lead generation site without rebuilding everything from zero.',
          author: 'Client Name | Industry'
        },
        {
          quote: 'We were able to rebrand it quickly and start collecting leads through Netlify almost immediately.',
          author: 'Client Name | Industry'
        }
      ]
    },
    about: {
      eyebrow: 'About',
      title: 'This section is ready for the owner story, trust angle, or brand promise.',
      description:
        'Keep this short. For most local service businesses, clarity, professionalism, and proof will convert better than long paragraphs.'
    },
    finalCta: {
      eyebrow: 'Ready To Clone',
      title: 'Use this as your repeatable website plus lead system in a box.'
    }
  },
  form: {
    name: 'lead-capture',
    endpoint: '/',
    redirectUrl: '/thank-you.html',
    title: 'Request a quote or book a call.',
    description: 'This form works with Netlify Forms by default and can optionally send leads to a webhook too.',
    successTitle: 'Thanks. Your request is in.',
    successMessage: 'We received your information and will follow up shortly.',
    submitLabel: 'Send My Request',
    fields: [
      {
        type: 'text',
        name: 'name',
        label: 'Full name',
        placeholder: 'Your full name',
        required: true
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email address',
        placeholder: 'you@example.com',
        required: true
      },
      {
        type: 'tel',
        name: 'phone',
        label: 'Phone number',
        placeholder: 'Your phone number',
        required: true
      },
      {
        type: 'text',
        name: 'service',
        label: 'What service are you interested in?',
        placeholder: 'Example: Weekly cleaning, legal consult, roof repair',
        required: true
      },
      {
        type: 'textarea',
        name: 'message',
        label: 'Project details',
        placeholder: 'Tell us what you need, your timeline, and any key details.',
        rows: 4,
        required: true
      }
    ]
  },
  webhook: {
    enabled: true,
    url: 'https://hooks.zapier.com/hooks/catch/25236541/u7axflv/'
  },
  sidebarFeatures: [
    'Netlify Forms enabled by default',
    'Optional Zapier or Make webhook support',
    'Config-driven branding and lead form fields',
    'No custom backend required in production'
  ],
  footerDescription:
    'A reusable lead capture template for service businesses that need fast setup and dependable form handling.'
};

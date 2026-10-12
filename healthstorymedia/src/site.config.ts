// Central settings for HealthStoryMedia.com — edit here, not in templates.
export const SITE = {
  name: 'HealthStoryMedia',
  url: 'https://healthstorymedia.com',
  tagline: 'Real Stories. Honest Reviews. Better Health.',
  description:
    'Expert-reviewed health guides, honest product reviews and real health stories to help you sleep, feel and live better.',
  // Paste your AdSense publisher ID (ca-pub-XXXXXXXXXXXXXXXX). Leave empty to disable ads.
  adsenseClient: '',
  // Google Analytics 4 measurement ID (G-XXXXXXX). Leave empty to disable.
  gaId: '',
  // Form action URL from MailerLite/ConvertKit embed. Leave empty to hide signup forms.
  newsletterAction: '',
  contactEmail: 'hello@healthstorymedia.com',
  // Toggle seasonal promo in header + homepage.
  promo: {
    enabled: true,
    label: 'Black Friday Health Deals 🔥',
    href: '/deals/black-friday-health-deals/',
  },
};

export const CATEGORIES = {
  'weight-loss': { name: 'Weight Loss', blurb: 'GLP-1 programs, telehealth and diets that actually work.' },
  'mental-health': { name: 'Mental Health', blurb: 'Online therapy, stress relief and emotional wellbeing.' },
  sleep: { name: 'Sleep', blurb: 'Mattresses, sleep apnea and science-backed sleep fixes.' },
  'womens-health': { name: "Women's Health", blurb: 'Menopause, hormones and supplements for women.' },
  'mens-health': { name: "Men's Health", blurb: 'Testosterone, hair loss and at-home testing.' },
  'senior-health': { name: 'Senior Health', blurb: 'Hearing aids, vision and dental care for 60+.' },
  reviews: { name: 'Reviews', blurb: 'Honest, hands-on reviews of health products and services.' },
  compare: { name: 'Comparisons', blurb: 'Side-by-side breakdowns to help you pick the right one.' },
  deals: { name: 'Deals', blurb: 'Verified discounts on health products and programs.' },
  gifts: { name: 'Gift Guides', blurb: 'Thoughtful wellness gifts for everyone on your list.' },
  stories: { name: 'Health Stories', blurb: 'Real people, real health journeys.' },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

// Shown in the main menu, in order.
export const NAV: CategorySlug[] = [
  'weight-loss',
  'mental-health',
  'sleep',
  'womens-health',
  'mens-health',
  'senior-health',
  'reviews',
];

export const AUTHORS: Record<string, { name: string; role: string; bio: string }> = {
  editorial: {
    name: 'HealthStoryMedia Editorial Team',
    role: 'Health Writers & Researchers',
    bio: 'Our editors research every guide using peer-reviewed studies and official health sources.',
  },
  // Add real reviewers here, e.g.
  // 'jane-doe-rn': { name: 'Jane Doe, RN', role: 'Medical Reviewer', bio: '...' },
};

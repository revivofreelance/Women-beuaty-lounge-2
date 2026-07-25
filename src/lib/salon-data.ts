import type { SalonImageKey } from "./salon-images";

/* ============================================================
   SALON BUSINESS INFO
   ============================================================ */
export const salonInfo = {
  name: "Lumière Beauty Lounge",
  shortName: "Lumière",
  tagline: "Where modern beauty meets timeless care",
  established: 2014,
  email: "hello@lumierebeauty.com",
  bookingEmail: "bookings@lumierebeauty.com",
  address: {
    line1: "248 Hayes Street",
    line2: "San Francisco, CA 94102",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
  },
  mapQuery: "Hayes Valley San Francisco",
  mapEmbed: "https://www.google.com/maps?q=Hayes+Valley+San+Francisco&output=embed",
  hours: [
    { day: "Monday", open: "10:00 AM", close: "8:00 PM", note: "" },
    { day: "Tuesday", open: "10:00 AM", close: "8:00 PM", note: "" },
    { day: "Wednesday", open: "10:00 AM", close: "8:00 PM", note: "" },
    { day: "Thursday", open: "10:00 AM", close: "9:00 PM", note: "Late night" },
    { day: "Friday", open: "9:00 AM", close: "9:00 PM", note: "" },
    { day: "Saturday", open: "9:00 AM", close: "7:00 PM", note: "Busy" },
    { day: "Sunday", open: "10:00 AM", close: "5:00 PM", note: "Bridal only" },
  ],
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    pinterest: "https://pinterest.com",
    tiktok: "https://tiktok.com",
  },
  stats: {
    years: 11,
    clients: "28,000+",
    stylists: 18,
    rating: 4.9,
    reviews: 2140,
    services: 120,
    brides: 640,
    awards: 8,
  },
  landmarks: [
    "2-minute walk from Civic Center BART station",
    "Corner of Hayes & Octavia, above the coffee roastery",
    "Validated parking at the Octavia Street garage (first 2 hours free)",
    "Bike racks available on Hayes Street",
  ],
  branches: [
    {
      name: "Hayes Valley Flagship",
      address: "248 Hayes Street, San Francisco, CA 94102",
      hours: "Mon–Sat 9 AM – 9 PM · Sun 10 AM – 5 PM",
      isFlagship: true,
    },
  ],
};

/* ============================================================
   PRICE TIERS (stylist seniority)
   ============================================================ */
export type StylistTier = "Junior" | "Senior" | "Master" | "Director";

export const stylistTiers: { tier: StylistTier; description: string }[] = [
  { tier: "Junior", description: "1–3 years experience. Excellent for maintenance & simple services." },
  { tier: "Senior", description: "4–7 years experience. Confident across most services." },
  { tier: "Master", description: "8–12 years experience. Specialists & complex work." },
  { tier: "Director", description: "13+ years. Our most seasoned artists & educators." },
];

/* ============================================================
   SERVICE CATEGORIES
   ============================================================ */
export type ServiceCategory =
  | "Hair"
  | "Hair Coloring"
  | "Hair Treatments"
  | "Hair Extensions"
  | "Skin & Facial"
  | "Spa & Massage"
  | "Makeup"
  | "Bridal"
  | "Waxing & Threading"
  | "Nails"
  | "Kids Services"
  | "Special Packages";

export const serviceCategories: { name: ServiceCategory; icon: string; blurb: string; description: string }[] = [
  { name: "Hair", icon: "scissors", blurb: "Cuts, styling & blow-dries", description: "Precision cuts, restyles, blow-dries and occasion styling tailored to your face, lifestyle and hair type." },
  { name: "Hair Coloring", icon: "palette", blurb: "Global, highlights & balayage", description: "Full-colour, highlights, balayage, colour correction and gloss — using premium, low-ammonia formulas." },
  { name: "Hair Treatments", icon: "sparkles", blurb: "Keratin, spa & repair", description: "Smoothing, deep-conditioning, scalp therapy and bond-building treatments for healthy, manageable hair." },
  { name: "Hair Extensions", icon: "waves", blurb: "Tape-in & clip-in volume", description: "Premium Remy extensions for instant length and volume, applied and blended by certified specialists." },
  { name: "Skin & Facial", icon: "flower", blurb: "Facials & advanced skincare", description: "Customised facials, advanced skin therapies and results-driven treatments for every skin type." },
  { name: "Spa & Massage", icon: "leaf", blurb: "Relaxing body therapies", description: "Aromatherapy, deep tissue, reflexology and couples therapies in our private spa suites." },
  { name: "Makeup", icon: "brush", blurb: "Party, HD & editorial", description: "HD and airbrush makeup for parties, events, photo shoots and special occasions." },
  { name: "Bridal", icon: "crown", blurb: "Complete bridal looks", description: "Trials, wedding-day artistry, on-location service and multi-function packages for the full celebration." },
  { name: "Waxing & Threading", icon: "thread", blurb: "Smooth, precise hair removal", description: "Hygienic waxing and threading with low-temp, sensitive-skin-friendly options." },
  { name: "Nails", icon: "hand", blurb: "Manicure, pedicure & nail art", description: "Manicures, pedicures, gel, extensions and bespoke nail art by certified nail artists." },
  { name: "Kids Services", icon: "baby", blurb: "Gentle cuts for little ones", description: "Patient, kid-friendly cuts and services for children aged 2–12 in a calming environment." },
  { name: "Special Packages", icon: "gift", blurb: "Curated combos & gift cards", description: "Thoughtfully bundled services at member pricing — perfect for gifting and self-care." },
];

/* ============================================================
   ADD-ONS (shared)
   ============================================================ */
export interface AddOn {
  name: string;
  price: number;
  description: string;
}

export const commonAddOns: AddOn[] = [
  { name: "Olaplex Bond Treatment", price: 25, description: "Prevents breakage during chemical services." },
  { name: "Scalp Massage (15 min)", price: 18, description: "Pressure-point scalp massage to boost circulation." },
  { name: "Blow-Dry Styling", price: 20, description: "Professional finish with hot tools." },
  { name: "Deep-Conditioning Mask", price: 22, description: "Intensive moisture mask processed under steam." },
  { name: "Aromatherapy Add-on", price: 15, description: "Essential-oil blend added to any service." },
];

/* ============================================================
   SERVICES (detailed)
   ============================================================ */
export interface ServiceFaq { q: string; a: string; }
export interface PriceTier { tier: StylistTier; price: number; }
export interface ServiceStep { title: string; description: string; duration: string; }

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  overview: string;
  process: ServiceStep[];
  benefits: string[];
  suitableFor: string[];
  notSuitableFor?: string[];
  duration: string;
  longevity: string;
  startingPrice: number;
  priceTiers: PriceTier[];
  addOns?: AddOn[];
  products: { name: string; description: string }[];
  preparation: string[];
  aftercare: string[];
  results: string;
  faqs: ServiceFaq[];
  relatedSlugs: string[];
  recommendedStylistSlug: string;
  imageKey: SalonImageKey;
  galleryKeys: SalonImageKey[];
  popular?: boolean;
}

export const services: Service[] = [
  {
    slug: "womens-haircut-styling",
    name: "Women's Haircut & Styling",
    category: "Hair",
    shortDescription: "Precision cut tailored to your face shape, finished with a wash and blow-dry.",
    overview:
      "A signature Lumière haircut begins with a complimentary hair and scalp analysis, followed by an in-depth consultation to understand your lifestyle, face shape, hair density and maintenance preference. Our stylists use a combination of dry-cutting and wet-cutting techniques with texturising to create a shape that grows out beautifully. Every cut is finished with a cleansing wash, a conditioning rinse, and a blow-dry styled to suit the occasion — be it sleek, voluminous or natural. Whether you're after a refresh, a restyle, or a dramatic transformation, your stylist will guide you through what works for your hair and how to recreate the look at home.",
    process: [
      { title: "Consultation & analysis", description: "Your stylist assesses your hair type, face shape, growth patterns and discusses your goals and lifestyle.", duration: "10 min" },
      { title: "Cut & shape", description: "Precision cutting using wet or dry techniques, tailored to your hair's natural movement.", duration: "25–35 min" },
      { title: "Wash & conditioning rinse", description: "A gentle cleanse with a sulphate-free shampoo and a conditioning rinse matched to your hair needs.", duration: "10 min" },
      { title: "Blow-dry & finish", description: "A professional blow-dry with hot tools to style your cut and show you at-home techniques.", duration: "15–20 min" },
    ],
    benefits: [
      "Customised to your face shape, hair texture and lifestyle",
      "Wash, conditioning rinse and blow-dry included",
      "Personalised at-home styling guidance",
      "A shape that grows out cleanly for 8–10 weeks",
      "Suitable for all hair types — straight, wavy, curly, coily",
    ],
    suitableFor: [
      "All hair lengths and textures",
      "Clients wanting a fresh new look",
      "Maintaining an existing style",
      "Growing out a previous cut",
    ],
    notSuitableFor: [
      "Clients with active scalp infections (we'll refer you to a dermatologist first)",
    ],
    duration: "60–75 min",
    longevity: "6–10 weeks between trims",
    startingPrice: 35,
    priceTiers: [
      { tier: "Junior", price: 35 },
      { tier: "Senior", price: 48 },
      { tier: "Master", price: 60 },
      { tier: "Director", price: 75 },
    ],
    addOns: commonAddOns,
    products: [
      { name: "L'Oréal Professionnel", description: "Sulphate-free cleansers and conditioners." },
      { name: "Kérastase", description: "Targeted care for scalp and lengths." },
      { name: "Oribe", description: "Luxury styling and finishing products." },
    ],
    preparation: [
      "Wash hair 24 hours prior if heavily oiled or styled",
      "Come with dry, unstyled hair for the most accurate consultation",
      "Bring 2–3 reference photos if you have a specific look in mind",
      "Avoid heavy products on the day of your appointment",
    ],
    aftercare: [
      "Use a sulphate-free shampoo to preserve the shape and shine",
      "Schedule a trim every 8–10 weeks to maintain the silhouette",
      "Apply heat protectant before any heat styling",
      "Sleep on a silk pillowcase to reduce friction and frizz",
      "Use a wide-tooth comb on wet hair to avoid breakage",
    ],
    results: "A flattering, wearable shape that grows out beautifully and is easy to style at home.",
    faqs: [
      { q: "Will the cut suit my face shape?", a: "Absolutely. Our consultation covers face shape, hair density and growth patterns so the cut flatters your features and fits your lifestyle. Your stylist will suggest variations if needed." },
      { q: "Is the blow-dry included?", a: "Yes, every haircut includes a wash, conditioning rinse and a finished blow-dry styled by your stylist." },
      { q: "Can I bring a reference photo?", a: "We encourage it. Reference photos help us understand the vibe you're after and fine-tune the cut to your hair type." },
      { q: "What if I don't like the result?", a: "Your happiness is guaranteed. If something isn't right within 7 days, we'll adjust it free of charge." },
    ],
    relatedSlugs: ["hair-spa-treatment", "global-hair-color", "keratin-smoothing"],
    recommendedStylistSlug: "ananya-rao",
    imageKey: "haircut",
    galleryKeys: ["galleryHaircut", "galleryBob"],
    popular: true,
  },
  {
    slug: "global-hair-color",
    name: "Global Hair Color",
    category: "Hair Coloring",
    shortDescription: "Full-head colour using ammonia-free, salon-grade formulas.",
    overview:
      "Our global hair colour service covers the entire head in a single, flattering shade using ammonia-free L'Oréal and Wella formulas that are gentle on the scalp and kind to hair fibre. Your colourist will assess your natural tone, skin undertone, grey coverage needs and lifestyle before mixing a custom shade. The application is followed by a colour-safe wash, a bond-building treatment to protect integrity, and a conditioning blow-dry finish. Whether you want to cover greys, refresh faded colour, or go a shade deeper, our colourists create natural-looking, even-toned results that grow out softly.",
    process: [
      { title: "Consultation & patch test", description: "We assess your hair, skin tone and goals, and perform a patch test for first-time clients.", duration: "10 min" },
      { title: "Custom shade mixing", description: "Your colourist hand-mixes a shade matched to your natural tone and coverage needs.", duration: "5 min" },
      { title: "Application", description: "Colour is applied root-to-tip with precision, section by section.", duration: "30–40 min" },
      { title: "Processing", description: "Colour processes under gentle heat while you relax.", duration: "30–35 min" },
      { title: "Rinse & bond treatment", description: "Colour-safe rinse followed by a bond-builder to protect hair integrity.", duration: "15 min" },
      { title: "Blow-dry finish", description: "A blow-dry to reveal the final result and add shine.", duration: "15 min" },
    ],
    benefits: [
      "100% grey coverage with even, natural tone",
      "Ammonia-free, low-odour formulas — gentle on scalp",
      "Custom shade matched to your skin undertone",
      "Adds shine and depth to flat, dull hair",
      "Bond-building treatment included to protect hair",
    ],
    suitableFor: [
      "First-time colour clients",
      "Grey coverage",
      "Refreshing a faded global colour",
      "Going a shade deeper or richer",
    ],
    notSuitableFor: [
      "Clients with henna in their hair (requires colour correction instead)",
      "Pregnant clients in the first trimester (we offer plant-based alternatives)",
    ],
    duration: "90–120 min",
    longevity: "4–6 weeks before regrowth shows",
    startingPrice: 65,
    priceTiers: [
      { tier: "Junior", price: 65 },
      { tier: "Senior", price: 80 },
      { tier: "Master", price: 95 },
      { tier: "Director", price: 115 },
    ],
    addOns: commonAddOns,
    products: [
      { name: "L'Oréal Majirel", description: "Permanent, ammonia-free colour with grey coverage." },
      { name: "Wella Koleston", description: "Rich, even tone with shine-boosting technology." },
      { name: "Olaplex No.3", description: "At-home bond builder to maintain colour health." },
    ],
    preparation: [
      "Do not wash hair for 48 hours before colour (natural oils protect the scalp)",
      "Avoid oiling for 3 days prior",
      "Patch test recommended for first-time clients (book 24 hrs ahead)",
      "Come with dry, product-free hair",
    ],
    aftercare: [
      "Wait 72 hours before your first wash to lock in colour",
      "Use a colour-protect shampoo and cool water",
      "Apply a weekly colour-deposit conditioner if recommended",
      "Reapply colour every 4–6 weeks to cover regrowth",
      "Use UV protection on hair in direct sun",
    ],
    results: "Even, vibrant colour with 100% grey coverage and a glossy finish that lasts 4–6 weeks.",
    faqs: [
      { q: "Will the colour damage my hair?", a: "Our ammonia-free formulas are designed to minimise damage, and every colour service includes a bond-building treatment to protect the hair fibre." },
      { q: "How long will the colour last?", a: "A global colour typically lasts 4–6 weeks before regrowth becomes visible. Using colour-safe products extends vibrancy." },
      { q: "Can you cover 100% greys?", a: "Yes. Our colourists are trained in full grey coverage and will select the right depth and tone for a natural finish." },
      { q: "Can I colour over henna?", a: "Colouring over henna can give unpredictable results. Book a consultation — we may recommend a colour-correction service." },
    ],
    relatedSlugs: ["balayage-highlights", "hair-spa-treatment", "womens-haircut-styling"],
    recommendedStylistSlug: "meera-nair",
    imageKey: "hairColor",
    galleryKeys: ["galleryColor", "hairColor"],
    popular: true,
  },
  {
    slug: "balayage-highlights",
    name: "Balayage & Highlights",
    category: "Hair Coloring",
    shortDescription: "Hand-painted, sun-kissed dimension that grows out seamlessly.",
    overview:
      "Balayage is a freehand painting technique that creates soft, sun-kissed dimension with no harsh regrowth line. Our colourists hand-paint each strand to flatter your face and movement, focusing brightness where the sun would naturally hit. Unlike traditional foil highlights that create uniform brightness from the root, balayage grows out gracefully — making it the lowest-maintenance way to add brightness and movement to your hair. The service includes toning to neutralise brass, a gloss for shine, and a finishing blow-dry. Ideal for first-time colour clients and those wanting a lived-in, effortless look.",
    process: [
      { title: "Consultation", description: "We discuss the look, tones and maintenance level you're after.", duration: "10 min" },
      { title: "Hand-painting", description: "Your colourist freehand-paints each strand, placing brightness around the face and ends.", duration: "60–90 min" },
      { title: "Processing", description: "Colour processes at room temperature or under gentle heat.", duration: "30–45 min" },
      { title: "Tone & gloss", description: "A toner neutralises brass; a gloss adds shine and seals the cuticle.", duration: "20 min" },
      { title: "Rinse & finish", description: "Colour-safe rinse, bond treatment and blow-dry.", duration: "20 min" },
    ],
    benefits: [
      "Soft, natural-looking dimension",
      "Low-maintenance — grows out without a harsh line",
      "Customised placement to flatter your face",
      "Adds brightness, depth and movement",
      "Less frequent touch-ups than traditional highlights",
    ],
    suitableFor: [
      "Low-maintenance colour lovers",
      "Adding dimension to flat, one-tone colour",
      "First-time highlight clients",
      "Growing out existing highlights",
    ],
    notSuitableFor: [
      "Clients wanting uniform brightness from the root (choose foil highlights)",
    ],
    duration: "150–180 min",
    longevity: "3–4 months between full repaints",
    startingPrice: 130,
    priceTiers: [
      { tier: "Junior", price: 130 },
      { tier: "Senior", price: 160 },
      { tier: "Master", price: 195 },
      { tier: "Director", price: 240 },
    ],
    addOns: commonAddOns,
    products: [
      { name: "L'Oréal Blondifier", description: "Lightener designed for hand-painting techniques." },
      { name: "Wella Blondor", description: "Controlled lift with bond protection." },
      { name: "Olaplex No.1 & No.2", description: "In-salon bond building during the service." },
    ],
    preparation: [
      "Come with unwashed hair (natural oils protect the scalp)",
      "Avoid heat styling for 24 hours prior",
      "Share inspiration photos during consultation",
      "Avoid henna or box dye for 6 months before balayage",
    ],
    aftercare: [
      "Use a purple shampoo weekly to neutralise brass",
      "Deep condition every 2 weeks with a moisture mask",
      "Book a gloss refresh every 6–8 weeks",
      "Avoid chlorinated pools for 2 weeks after",
      "Use heat protectant before styling",
    ],
    results: "Soft, sun-kissed dimension that grows out beautifully and lasts 3–4 months between repaints.",
    faqs: [
      { q: "What's the difference between balayage and highlights?", a: "Highlights use foils for uniform brightness from the root, while balayage is freehand-painted for a softer, sun-kissed grow-out with no harsh line." },
      { q: "Will it suit my skin tone?", a: "Yes — we tailor the tones to complement your undertone. Warm caramel and toffee flatter most complexions; we'll recommend the right tone for you." },
      { q: "How often do I need to touch up?", a: "Balayage is low-maintenance — a gloss refresh every 6–8 weeks keeps it fresh, with a full repaint every 3–4 months." },
    ],
    relatedSlugs: ["global-hair-color", "hair-spa-treatment", "hair-extensions"],
    recommendedStylistSlug: "meera-nair",
    imageKey: "galleryColor",
    galleryKeys: ["galleryColor", "hairColor"],
    popular: true,
  },
  {
    slug: "foil-highlights",
    name: "Foil Highlights",
    category: "Hair Coloring",
    shortDescription: "Classic foiled highlights for uniform brightness and contrast.",
    overview:
      "Foil highlights use the traditional foiling technique to lift sections of hair from the root, creating uniform brightness and contrast throughout. Ideal for clients wanting a more dramatic, dimensional look with visible brightness at the crown. Your colourist will customise the placement — full head, half head or T-zone — based on your desired result. Includes toning, gloss and a blow-dry finish.",
    process: [
      { title: "Consultation", description: "We assess your hair and choose placement and tone.", duration: "10 min" },
      { title: "Foiling", description: "Sections are weaved, lightened and wrapped in foils.", duration: "60–90 min" },
      { title: "Processing", description: "Lightener processes under gentle heat.", duration: "30–45 min" },
      { title: "Tone & gloss", description: "Toner for tone, gloss for shine.", duration: "20 min" },
      { title: "Rinse & finish", description: "Bond treatment and blow-dry.", duration: "20 min" },
    ],
    benefits: [
      "Uniform brightness from the root",
      "Dramatic, dimensional contrast",
      "Customisable placement (full/half/T-zone)",
      "Long-lasting brightness",
    ],
    suitableFor: ["Dramatic brightness", "Adding dimension to darker hair", "Maintaining existing highlights"],
    duration: "150–180 min",
    longevity: "6–8 weeks between touch-ups",
    startingPrice: 120,
    priceTiers: [
      { tier: "Junior", price: 120 },
      { tier: "Senior", price: 150 },
      { tier: "Master", price: 180 },
      { tier: "Director", price: 220 },
    ],
    addOns: commonAddOns,
    products: [
      { name: "Wella Blondor", description: "Controlled lift with anti-yellow technology." },
      { name: "Olaplex No.1 & No.2", description: "Bond protection during lightening." },
    ],
    preparation: ["Come with unwashed hair", "Avoid heat styling 24 hrs prior"],
    aftercare: ["Use purple shampoo weekly", "Deep condition every 2 weeks", "Touch up every 6–8 weeks"],
    results: "Bright, uniform highlights with dramatic dimension, refreshed every 6–8 weeks.",
    faqs: [
      { q: "Full head vs half head?", a: "Full head covers the entire head for maximum brightness; half head focuses on the top and sides for a subtler, more affordable result." },
    ],
    relatedSlugs: ["balayage-highlights", "global-hair-color"],
    recommendedStylistSlug: "meera-nair",
    imageKey: "foilHighlights",
    galleryKeys: ["foilHighlights", "galleryColor"],
  },
  {
    slug: "keratin-smoothing",
    name: "Keratin Smoothing Treatment",
    category: "Hair Treatments",
    shortDescription: "Frizz-control smoothing that lasts up to 5 months.",
    overview:
      "Our formaldehyde-free keratin treatment infuses the hair with keratin protein, sealing the cuticle for smooth, frizz-free, manageable hair. It reduces styling time by up to 60% and lasts 4–5 months with proper care. Unlike chemical straightening, keratin preserves your natural wave while eliminating frizz — giving you sleek, healthy-looking hair that's easy to manage. The service includes a clarifying wash, keratin application, steam processing, and a flat-iron finish. Perfect for humid climates and anyone tired of fighting frizz daily.",
    process: [
      { title: "Clarifying wash", description: "A deep-cleansing shampoo opens the cuticle to receive keratin.", duration: "10 min" },
      { title: "Keratin application", description: "Keratin is applied section by section, saturating each strand.", duration: "30–40 min" },
      { title: "Processing", description: "Keratin processes under steam for deep penetration.", duration: "20–30 min" },
      { title: "Flat-iron seal", description: "A flat-iron seals the keratin into the cuticle for a smooth finish.", duration: "30–40 min" },
    ],
    benefits: [
      "Reduces frizz by up to 90%",
      "Cuts blow-dry time in half",
      "Lasts 4–5 months with proper care",
      "Formaldehyde-free and safe",
      "Preserves natural wave while eliminating frizz",
    ],
    suitableFor: [
      "Frizzy, unruly hair",
      "Humidity-prone climates",
      "Clients wanting low-maintenance styling",
      "Curly hair wanting to relax the pattern",
    ],
    notSuitableFor: [
      "Pregnant clients (formaldehyde-free but we recommend consulting your doctor)",
      "Severely damaged hair (we'll recommend a bond treatment first)",
    ],
    duration: "150–180 min",
    longevity: "4–5 months",
    startingPrice: 160,
    priceTiers: [
      { tier: "Junior", price: 160 },
      { tier: "Senior", price: 190 },
      { tier: "Master", price: 220 },
      { tier: "Director", price: 260 },
    ],
    addOns: commonAddOns,
    products: [
      { name: "Brazilian Blowout", description: "Original, formaldehyde-free smoothing." },
      { name: "GK Hair", description: "Keratin with juvexin for lasting smoothness." },
      { name: "Schwarzkopf BC", description: "Aftercare for treated hair." },
    ],
    preparation: [
      "Wash hair with a clarifying shampoo before arrival",
      "Avoid colour 7 days before or after treatment",
      "Come with dry, product-free hair",
    ],
    aftercare: [
      "Wait 72 hours before washing or tying hair",
      "Use sulphate-free shampoo only",
      "Avoid chlorine and salt water for 2 weeks",
      "Sleep with hair loose for the first 3 nights",
      "Book a touch-up every 4–5 months",
    ],
    results: "Smooth, frizz-free hair that lasts 4–5 months and cuts styling time in half.",
    faqs: [
      { q: "Is keratin safe for coloured hair?", a: "Yes. We use formaldehyde-free keratin compatible with colour. We recommend colouring 7 days before or after the treatment." },
      { q: "Will it make my hair pin-straight?", a: "No — keratin smooths frizz and reduces curl by 50–70% while keeping natural body. For pin-straight hair, ask about our straightening service." },
      { q: "How long does it last?", a: "4–5 months with sulphate-free aftercare. Humidity and washing frequency affect longevity." },
    ],
    relatedSlugs: ["hair-spa-treatment", "global-hair-color", "womens-haircut-styling"],
    recommendedStylistSlug: "rohan-kapoor",
    imageKey: "hairTreatment",
    galleryKeys: ["galleryHaircut", "hairTreatment"],
    popular: true,
  },
  {
    slug: "hair-spa-treatment",
    name: "Hair Spa & Deep Conditioning",
    category: "Hair Treatments",
    shortDescription: "Scalp diagnosis, massage & nutrient-rich mask for healthy hair.",
    overview:
      "A relaxing 60-minute hair spa that begins with a scalp analysis, followed by a 20-minute pressure-point massage to boost circulation and relieve stress. A customised nutrient mask — chosen for your scalp type and hair concerns — is then applied and processed under steam, allowing the actives to penetrate deeply. The treatment finishes with a rinse and a light blow-dry. Recommended every 3–4 weeks to maintain scalp health, reduce hair fall, and restore shine and softness. Our premium spa uses Kérastase and L'Oréal Powermix actives mixed fresh for your hair.",
    process: [
      { title: "Scalp analysis", description: "We examine your scalp under magnification to identify concerns.", duration: "5 min" },
      { title: "Pressure-point massage", description: "A 20-minute scalp and neck massage boosts circulation.", duration: "20 min" },
      { title: "Custom mask application", description: "A nutrient mask mixed fresh for your hair is applied root-to-tip.", duration: "10 min" },
      { title: "Steam processing", description: "Steam opens the cuticle for deep penetration of actives.", duration: "15 min" },
      { title: "Rinse & blow-dry", description: "A gentle rinse and light blow-dry finish.", duration: "10 min" },
    ],
    benefits: [
      "Reduces hair fall and breakage",
      "Nourishes dry, damaged scalp",
      "Relieves stress with a pressure-point massage",
      "Restores shine and softness",
      "Customised to your scalp type and concerns",
    ],
    suitableFor: [
      "Dry or damaged hair",
      "Stress-related hair fall",
      "Post-colour repair",
      "Monthly maintenance",
    ],
    duration: "60 min",
    longevity: "3–4 weeks between sessions",
    startingPrice: 38,
    priceTiers: [
      { tier: "Junior", price: 38 },
      { tier: "Senior", price: 48 },
      { tier: "Master", price: 58 },
      { tier: "Director", price: 70 },
    ],
    addOns: commonAddOns,
    products: [
      { name: "Kérastase Specifique", description: "Scalp-specific treatments for every concern." },
      { name: "L'Oréal Powermix", description: "Actives mixed fresh for your hair." },
      { name: "Wella SP", description: "Professional hair therapy." },
    ],
    preparation: ["Come with dry, product-free hair", "Avoid oiling for 2 days prior"],
    aftercare: [
      "Don't wash for 24 hours",
      "Use a wide-tooth comb on wet hair",
      "Repeat every 3–4 weeks for best results",
    ],
    results: "A nourished scalp, reduced fall, and visibly softer, shinier hair after one session.",
    faqs: [
      { q: "How often should I do a hair spa?", a: "Every 3–4 weeks is ideal for maintenance. For damaged or coloured hair, fortnightly sessions give faster recovery." },
      { q: "Will it reduce my hair fall?", a: "Regular hair spas improve scalp health and circulation, which reduces stress-related fall. For clinical fall, we recommend a tricho consultation." },
    ],
    relatedSlugs: ["keratin-smoothing", "global-hair-color", "womens-haircut-styling"],
    recommendedStylistSlug: "ananya-rao",
    imageKey: "hairSpa",
    galleryKeys: ["hairSpa", "hairTreatment"],
    popular: true,
  },
  {
    slug: "hair-extensions",
    name: "Hair Extensions",
    category: "Hair Extensions",
    shortDescription: "Premium tape-in extensions for instant length and volume.",
    overview:
      "Add instant length, volume or both with our 100% Remy human-hair tape-in extensions. We colour-match to your natural shade, apply the wefts gently, and blend with a complimentary cut. Reusable for up to 9 months with proper care, and removable without damage. Our extensions are heat-styleable, can be coloured, and look completely natural. Includes a consultation, application, cut, and style — plus a take-home care kit.",
    process: [
      { title: "Consultation & colour match", description: "We match extensions to your hair colour and discuss your goals.", duration: "15 min" },
      { title: "Application", description: "Tape-in wefts are applied section by section, close to the root.", duration: "60–90 min" },
      { title: "Cut & blend", description: "A complimentary cut blends extensions with your natural hair.", duration: "20 min" },
      { title: "Style & care briefing", description: "A finishing style and a take-home care kit with instructions.", duration: "15 min" },
    ],
    benefits: [
      "Instant length & volume",
      "100% Remy human hair — heat-styleable",
      "Reusable up to 9 months",
      "Damage-free application & removal",
      "Colour-match for a seamless blend",
    ],
    suitableFor: [
      "Fine or thinning hair",
      "Special-occasion length",
      "Growing out a short cut",
      "Adding thickness to fine hair",
    ],
    duration: "120–150 min",
    longevity: "6–8 weeks between adjustments; 9 months total reuse",
    startingPrice: 220,
    priceTiers: [
      { tier: "Junior", price: 220 },
      { tier: "Senior", price: 260 },
      { tier: "Master", price: 300 },
      { tier: "Director", price: 350 },
    ],
    addOns: [],
    products: [
      { name: "Donna Bella", description: "Premium Remy hair, ethically sourced." },
      { name: "Hotheads", description: "Tape-in system designed for comfort." },
      { name: "Babe Hair", description: "Affordable, high-quality Remy." },
    ],
    preparation: [
      "Wash with clarifying shampoo, no conditioner",
      "Hair must be dry and product-free",
      "Avoid oiling for 3 days prior",
    ],
    aftercare: [
      "Don't wash for 48 hours",
      "Brush gently 2× daily with a loop brush",
      "Sleep with hair in a loose plait",
      "Use sulphate-free, extension-safe products",
      "Book maintenance every 6–8 weeks",
    ],
    results: "Instant length and volume that looks natural and lasts up to 9 months with care.",
    faqs: [
      { q: "Will extensions damage my hair?", a: "When applied and removed by trained professionals, tape-in extensions do not damage natural hair. We also advise maintenance every 6–8 weeks." },
      { q: "Can I style them like normal hair?", a: "Yes. Our Remy extensions can be curled, straightened and coloured. Always use heat protectant." },
      { q: "How many packs do I need?", a: "It depends on your hair density and goals. A half head needs 1–2 packs; a full head 3–4. We'll advise at consultation." },
    ],
    relatedSlugs: ["balayage-highlights", "womens-haircut-styling", "hair-spa-treatment"],
    recommendedStylistSlug: "meera-nair",
    imageKey: "hairExtensions",
    galleryKeys: ["hairExtensions", "galleryColor"],
  },
  {
    slug: "signature-facial",
    name: "Lumière Signature Facial",
    category: "Skin & Facial",
    shortDescription: "Customised facial with cleanse, exfoliation, massage & mask.",
    overview:
      "Our most-loved facial begins with a detailed skin analysis to identify your concerns — dehydration, pigmentation, sensitivity, ageing or congestion. Your therapist then customises a 75-minute journey: a double-cleanse, exfoliation, steam, gentle extractions, a relaxing facial massage, a treatment mask, and SPF finish. Skin looks instantly brighter and feels deeply nourished. Recommended monthly to maintain a healthy, glowing complexion. Suitable for all skin types including sensitive.",
    process: [
      { title: "Skin analysis", description: "We analyse your skin under magnification to personalise every step.", duration: "5 min" },
      { title: "Double-cleanse & exfoliate", description: "A gentle double-cleanse followed by exfoliation suited to your skin.", duration: "10 min" },
      { title: "Steam & extractions", description: "Warm steam softens pores; gentle extractions clear congestion.", duration: "15 min" },
      { title: "Facial massage", description: "A relaxing massage boosts circulation and lymphatic drainage.", duration: "15 min" },
      { title: "Treatment mask", description: "A mask chosen for your skin concern is applied and processed.", duration: "15 min" },
      { title: "Serum, eye & SPF", description: "Targeted serums, eye cream and SPF finish.", duration: "15 min" },
    ],
    benefits: [
      "Deeply cleansed, glowing skin",
      "Improves circulation & lymphatic drainage",
      "Customised to your skin type",
      "Visible glow after one session",
      "Relaxing, stress-relieving experience",
    ],
    suitableFor: [
      "All skin types, including sensitive",
      "Pre-event glow",
      "Monthly skin maintenance",
      "First-time facial clients",
    ],
    duration: "75 min",
    longevity: "4–6 weeks between sessions",
    startingPrice: 55,
    priceTiers: [
      { tier: "Junior", price: 55 },
      { tier: "Senior", price: 70 },
      { tier: "Master", price: 85 },
      { tier: "Director", price: 100 },
    ],
    addOns: [
      { name: "LED light therapy", price: 25, description: "Boosts collagen and reduces redness." },
      { name: "Microcurrent lift", price: 35, description: "Tones and lifts facial muscles." },
      { name: "Gua sha massage", price: 20, description: "Sculpting massage with a jade stone." },
    ],
    products: [
      { name: "Dermalogica", description: "Professional-grade, skin-therapist-led formulas." },
      { name: "O3+", description: "Indian-made, results-driven skincare." },
      { name: "Image Skincare", description: "Clinical actives for visible results." },
    ],
    preparation: [
      "Avoid retinol 3 days prior",
      "Come without makeup if possible",
      "Avoid sun exposure 24 hours before",
    ],
    aftercare: [
      "Avoid sun exposure for 24 hours",
      "Don't use active ingredients for 48 hours",
      "Hydrate well and use SPF daily",
      "Avoid heavy makeup for 12 hours",
    ],
    results: "Instantly brighter, deeply cleansed skin with a visible glow that lasts for days.",
    faqs: [
      { q: "How often should I get a facial?", a: "Every 4–6 weeks aligns with the skin's natural renewal cycle for sustained glow and clarity." },
      { q: "Will it suit sensitive skin?", a: "Yes. We use gentle, fragrance-free products and adapt pressure and exfoliation for reactive skin." },
      { q: "Is there downtime?", a: "None — you'll leave with a glow and can head straight to an event. Mild redness from extractions fades within hours." },
    ],
    relatedSlugs: ["hydra-glow-facial", "de-tan-facial", "spa-relaxation"],
    recommendedStylistSlug: "priya-shetty",
    imageKey: "facial",
    galleryKeys: ["facial", "blogSkin"],
    popular: true,
  },
  {
    slug: "hydra-glow-facial",
    name: "Hydra-Glow Facial",
    category: "Skin & Facial",
    shortDescription: "Hydrating infusion with hyaluronic acid for plump, dewy skin.",
    overview:
      "A deeply hydrating facial that layers hyaluronic acid, vitamin B5 and antioxidants to plump fine lines and restore dewy radiance. Includes a hydrating massage, sheet mask and LED light therapy. Perfect before weddings, parties or whenever skin looks dull and depleted. Skin looks instantly plumper and more luminous, with no downtime.",
    process: [
      { title: "Cleanse & exfoliate", description: "Gentle cleanse and lactic-acid exfoliation.", duration: "10 min" },
      { title: "Hyaluronic infusion", description: "Layered hyaluronic acid and vitamin B5 serum.", duration: "10 min" },
      { title: "Hydrating massage", description: "A facial massage with a hydrating oil.", duration: "15 min" },
      { title: "Sheet mask & LED", description: "A sheet mask processed under LED light therapy.", duration: "20 min" },
      { title: "Seal & SPF", description: "Moisturiser, eye cream and SPF.", duration: "10 min" },
    ],
    benefits: [
      "Intense, lasting hydration",
      "Plumps fine lines",
      "Dewy, lit-from-within glow",
      "LED therapy boosts collagen",
      "No downtime — event-ready",
    ],
    suitableFor: ["Dehydrated skin", "Dull, tired complexion", "Pre-event prep", "Mature skin"],
    duration: "75 min",
    longevity: "3–4 weeks",
    startingPrice: 75,
    priceTiers: [
      { tier: "Junior", price: 75 },
      { tier: "Senior", price: 90 },
      { tier: "Master", price: 110 },
      { tier: "Director", price: 130 },
    ],
    addOns: [
      { name: "LED light therapy", price: 25, description: "Included in this facial." },
      { name: "Neck & décolleté", price: 20, description: "Extend the treatment to neck and chest." },
    ],
    products: [
      { name: "Dermalogica", description: "Hydrating formulas with hyaluronic acid." },
      { name: "O3+", description: "Brightening and hydrating actives." },
    ],
    preparation: ["Avoid exfoliation 3 days prior", "Hydrate well before arrival"],
    aftercare: ["Use hydrating serum daily", "Apply SPF every morning", "Avoid actives for 48 hours"],
    results: "Plump, dewy, luminous skin with reduced fine lines — event-ready immediately.",
    faqs: [
      { q: "Is there downtime?", a: "None at all — you'll leave with an immediate glow and can head straight to an event." },
      { q: "Can I get this before my wedding?", a: "Yes — it's our most-requested pre-bridal facial. Book 2–3 days before the event for best results." },
    ],
    relatedSlugs: ["signature-facial", "de-tan-facial", "bridal-makeup"],
    recommendedStylistSlug: "priya-shetty",
    imageKey: "hydraFacial",
    galleryKeys: ["hydraFacial", "blogSkin"],
  },
  {
    slug: "de-tan-facial",
    name: "De-Tan & Brightening Facial",
    category: "Skin & Facial",
    shortDescription: "Removes tan and evens tone for brighter skin.",
    overview:
      "Formulated for sun-exposed and pigmented skin, this facial uses natural de-tan actives, fruit enzymes and a brightening mask to lift tan, fade dark spots and even skin tone. Includes a cooling massage and SPF finish. Ideal post-summer or before a fresh makeup look. Repeat fortnightly for tan-prone skin for cumulative brightening.",
    process: [
      { title: "Cleanse & exfoliate", description: "Fruit-enzyme exfoliation lifts dead, tanned cells.", duration: "10 min" },
      { title: "De-tan mask", description: "A brightening mask with natural de-tan actives.", duration: "15 min" },
      { title: "Cooling massage", description: "A cooling gel massage soothes and calms.", duration: "15 min" },
      { title: "Brightening serum & SPF", description: "Vitamin C serum and SPF finish.", duration: "10 min" },
    ],
    benefits: [
      "Visibly reduces tan",
      "Fades dark spots over time",
      "Evens skin tone",
      "Cooling, soothing finish",
    ],
    suitableFor: ["Tanned skin", "Pigmentation", "Outdoor enthusiasts", "Dull, uneven skin"],
    duration: "60 min",
    longevity: "2–3 weeks",
    startingPrice: 45,
    priceTiers: [
      { tier: "Junior", price: 45 },
      { tier: "Senior", price: 58 },
      { tier: "Master", price: 72 },
      { tier: "Director", price: 85 },
    ],
    addOns: [],
    products: [
      { name: "O3+", description: "De-tan and brightening actives." },
      { name: "Image Skincare", description: "Vitamin C brightening." },
    ],
    preparation: ["Avoid sun exposure 24 hours prior"],
    aftercare: ["Apply SPF 50 daily", "Repeat every 2 weeks for tan-prone skin", "Use vitamin C serum at home"],
    results: "Visibly lighter tan and a brighter, more even skin tone after one session.",
    faqs: [
      { q: "How many sessions to remove tan?", a: "Most clients see visible lightening after one session. For deep tan, 3–4 sessions fortnightly give best results." },
    ],
    relatedSlugs: ["signature-facial", "hydra-glow-facial"],
    recommendedStylistSlug: "priya-shetty",
    imageKey: "deTanFacial",
    galleryKeys: ["deTanFacial", "blogSkin"],
  },
  {
    slug: "spa-relaxation",
    name: "Aromatherapy Relaxation Spa",
    category: "Spa & Massage",
    shortDescription: "Full-body aromatherapy massage with essential oils.",
    overview:
      "Unwind with a 60-minute full-body aromatherapy massage using a custom blend of essential oils chosen for your mood — calming lavender, uplifting citrus or grounding sandalwood. Long, flowing strokes release tension, improve circulation and leave you deeply relaxed. Includes a warm foot soak to begin and a herbal tea to finish. Perfect for stress relief, better sleep and total-body reset.",
    process: [
      { title: "Foot soak & consult", description: "A warm herbal foot soak and a mood consult to choose your oil blend.", duration: "10 min" },
      { title: "Aromatherapy massage", description: "A full-body massage with your custom essential-oil blend.", duration: "45 min" },
      { title: "Rest & tea", description: "Time to rest and a cup of herbal tea to ground.", duration: "5 min" },
    ],
    benefits: [
      "Relieves stress & muscle tension",
      "Improves sleep quality",
      "Boosts circulation",
      "Deeply relaxing, mood-lifting",
      "Customisable oil blend for your mood",
    ],
    suitableFor: ["Stress relief", "Tired muscles", "Self-care days", "Sleep issues"],
    duration: "60 min",
    longevity: "Weekly to monthly for maintenance",
    startingPrice: 65,
    priceTiers: [
      { tier: "Junior", price: 65 },
      { tier: "Senior", price: 80 },
      { tier: "Master", price: 95 },
      { tier: "Director", price: 115 },
    ],
    addOns: [
      { name: "Hot stone", price: 25, description: "Warm stones melt deeper tension." },
      { name: "Extended 90 min", price: 30, description: "Add 30 minutes for full relaxation." },
    ],
    products: [
      { name: "Forest Essentials", description: "Ayurvedic essential-oil blends." },
      { name: "Kama Ayurveda", description: "Cold-pressed botanical oils." },
    ],
    preparation: ["Avoid heavy meals 1 hour prior", "Hydrate well", "Arrive 10 minutes early"],
    aftercare: ["Rest for 30 minutes", "Drink plenty of water", "Avoid caffeine for 2 hours", "Take a warm bath before bed"],
    results: "Deep relaxation, reduced muscle tension and improved sleep — a full-body reset.",
    faqs: [
      { q: "Is the pressure customisable?", a: "Yes — choose light, medium or firm pressure. Communicate any discomfort and your therapist will adjust." },
      { q: "Can I choose my oil blend?", a: "Yes — we'll consult with you at the start and blend oils for your mood: calming, uplifting or grounding." },
    ],
    relatedSlugs: ["signature-facial", "spa-foot-reflexology", "spa-deep-tissue"],
    recommendedStylistSlug: "priya-shetty",
    imageKey: "spa",
    galleryKeys: ["spa", "ambiance"],
    popular: true,
  },
  {
    slug: "spa-deep-tissue",
    name: "Deep Tissue Massage",
    category: "Spa & Massage",
    shortDescription: "Targeted pressure for chronic tension and tight muscles.",
    overview:
      "A therapeutic deep-tissue massage that uses slow, firm pressure to release chronic tension in the back, shoulders and neck. Ideal for desk workers, athletes and anyone carrying stress in their muscles. Your therapist will work with you to find the right depth and focus areas. Includes a hot towel finish.",
    process: [
      { title: "Consultation", description: "We discuss your tension areas and pressure preference.", duration: "5 min" },
      { title: "Deep-tissue massage", description: "Slow, firm strokes release deep tension.", duration: "45 min" },
      { title: "Hot towel finish", description: "Warm towels soothe the worked areas.", duration: "10 min" },
    ],
    benefits: [
      "Releases chronic muscle tension",
      "Improves mobility and posture",
      "Reduces stress headaches",
      "Speeds up muscle recovery",
    ],
    suitableFor: ["Desk workers", "Athletes", "Chronic back/shoulder tension", "Stress headaches"],
    duration: "60 min",
    longevity: "2–4 weeks",
    startingPrice: 75,
    priceTiers: [
      { tier: "Junior", price: 75 },
      { tier: "Senior", price: 90 },
      { tier: "Master", price: 110 },
      { tier: "Director", price: 130 },
    ],
    addOns: [],
    products: [{ name: "Kama Ayurveda", description: "Warming botanical oils." }],
    preparation: ["Hydrate well before", "Avoid heavy meals"],
    aftercare: ["Drink water", "Warm bath with Epsom salts", "Rest"],
    results: "Released tension, improved mobility and lasting relief from chronic tightness.",
    faqs: [
      { q: "Will it hurt?", a: "Deep tissue uses firm pressure but should never be painful. Communicate with your therapist — 'good pain' is fine, sharp pain is not." },
    ],
    relatedSlugs: ["spa-relaxation", "spa-foot-reflexology"],
    recommendedStylistSlug: "priya-shetty",
    imageKey: "deepTissue",
    galleryKeys: ["deepTissue", "ambiance"],
  },
  {
    slug: "spa-foot-reflexology",
    name: "Foot Reflexology",
    category: "Spa & Massage",
    shortDescription: "Pressure-point foot massage for total-body relaxation.",
    overview:
      "A 45-minute reflexology session focusing on pressure points in the feet that correspond to organs and systems across the body. Begins with a warm herbal foot soak and scrub, followed by targeted pressure work. Eases fatigue, improves circulation and leaves you feeling grounded and relaxed.",
    process: [
      { title: "Foot soak & scrub", description: "A warm herbal soak and exfoliating scrub.", duration: "10 min" },
      { title: "Reflexology", description: "Targeted pressure on reflex points.", duration: "30 min" },
      { title: "Massage finish", description: "A lower-leg massage to finish.", duration: "5 min" },
    ],
    benefits: ["Relieves foot & leg fatigue", "Improves circulation", "Promotes deep sleep", "Grounds and relaxes"],
    suitableFor: ["Standing professionals", "Travel fatigue", "Relaxation", "Plantar fasciitis relief"],
    duration: "45 min",
    longevity: "2–4 weeks",
    startingPrice: 35,
    priceTiers: [
      { tier: "Junior", price: 35 },
      { tier: "Senior", price: 45 },
      { tier: "Master", price: 55 },
      { tier: "Director", price: 65 },
    ],
    addOns: [],
    products: [{ name: "Forest Essentials", description: "Herbal foot soak and oils." }],
    preparation: ["Remove nail polish if pedicure not booked"],
    aftercare: ["Hydrate well", "Avoid strenuous activity for 2 hours"],
    results: "Relieved fatigue, improved circulation and a deep sense of relaxation.",
    faqs: [
      { q: "Will it tickle?", a: "Our therapists use firm, controlled pressure — most clients find it deeply relaxing, not ticklish." },
    ],
    relatedSlugs: ["spa-relaxation", "manicure-pedicure"],
    recommendedStylistSlug: "priya-shetty",
    imageKey: "reflexology",
    galleryKeys: ["reflexology", "ambiance"],
  },
  {
    slug: "party-makeup-hd",
    name: "HD Party Makeup",
    category: "Makeup",
    shortDescription: "Camera-ready makeup for parties, receptions & events.",
    overview:
      "Flawless, long-wearing HD makeup that looks natural in person and on camera. Includes skin prep, primer, full-coverage foundation, contour, eye makeup, false lashes and lip colour. We use HD and airbrush formulas that photograph beautifully and last up to 12 hours. Perfect for parties, receptions, engagements and photo shoots.",
    process: [
      { title: "Skin prep", description: "Cleanse, moisturise and prime for a flawless base.", duration: "10 min" },
      { title: "Base & contour", description: "HD foundation, concealer and contour.", duration: "15 min" },
      { title: "Eye makeup", description: "Custom eye look with lashes.", duration: "20 min" },
      { title: "Lips & finish", description: "Lip colour and setting spray.", duration: "10 min" },
    ],
    benefits: [
      "Camera-ready, flawless finish",
      "Lasts up to 12 hours",
      "Customised to your outfit & occasion",
      "Includes false lashes",
      "HD and airbrush options",
    ],
    suitableFor: ["Parties & receptions", "Engagement functions", "Photo shoots", "Galas"],
    duration: "60 min",
    longevity: "12 hours",
    startingPrice: 95,
    priceTiers: [
      { tier: "Junior", price: 95 },
      { tier: "Senior", price: 120 },
      { tier: "Master", price: 150 },
      { tier: "Director", price: 180 },
    ],
    addOns: [
      { name: "Airbrush upgrade", price: 30, description: "Lightweight, long-wearing airbrush finish." },
      { name: "Hair styling", price: 45, description: "Add a blow-dry or updo." },
    ],
    products: [
      { name: "MAC", description: "Pro-quality HD foundation and colour." },
      { name: "Bobbi Brown", description: "Natural-finish, skin-loving formulas." },
      { name: "NARS", description: "Long-wearing, camera-ready colour." },
    ],
    preparation: ["Come with clean, moisturised skin", "Wear a button-down top", "Bring outfit reference"],
    aftercare: ["Blot, don't wipe, to refresh", "Remove with a cleansing oil", "Moisturise well post-removal"],
    results: "Flawless, 12-hour wear makeup that photographs beautifully.",
    faqs: [
      { q: "Will it look cakey in photos?", a: "No. HD and airbrush formulas are designed to diffuse light, giving a smooth, natural finish in flash photography." },
      { q: "Do you provide lashes?", a: "Yes, false lashes are included. We have natural and dramatic options." },
    ],
    relatedSlugs: ["bridal-makeup", "engagement-makeup", "signature-facial"],
    recommendedStylistSlug: "kavya-reddy",
    imageKey: "makeup",
    galleryKeys: ["galleryMakeup", "makeup"],
    popular: true,
  },
  {
    slug: "bridal-makeup",
    name: "Bridal Makeup & Trial",
    category: "Bridal",
    shortDescription: "Complete bridal look with trial, HD makeup & on-location service.",
    overview:
      "Your wedding-day look, crafted to last tears, hugs and 14 hours of celebration. Includes a pre-wedding trial where we finalise your look, skin prep on the day, HD or airbrush makeup, false lashes, hair styling or draping, and on-call touch-ups. We travel to your venue across the Bay Area. Our lead artist Kavya has styled over 640 brides and counting.",
    process: [
      { title: "Consultation", description: "We discuss your wedding timeline, outfits and vision.", duration: "30 min" },
      { title: "Trial session", description: "A full trial 4–6 weeks before to finalise your look.", duration: "90 min" },
      { title: "Skin prep (day of)", description: "On the day, we prep your skin for long-wear makeup.", duration: "15 min" },
      { title: "Makeup & hair", description: "HD or airbrush makeup, lashes and hair styling.", duration: "120 min" },
      { title: "Touch-ups", description: "On-call touch-ups available for the first 2 hours.", duration: "as needed" },
    ],
    benefits: [
      "Pre-wedding trial to lock your look",
      "14+ hour wear with no touch-ups",
      "On-location across the Bay Area",
      "Hairstyling & draping included",
      "HD or airbrush formulas",
      "Lead artist with 640+ brides",
    ],
    suitableFor: ["Brides-to-be", "Reception looks", "Milestone celebrations", "Vow renewals"],
    duration: "Trial 90 min · Wedding day 2–3 hrs",
    longevity: "14+ hours",
    startingPrice: 480,
    priceTiers: [
      { tier: "Junior", price: 480 },
      { tier: "Senior", price: 600 },
      { tier: "Master", price: 750 },
      { tier: "Director", price: 950 },
    ],
    addOns: [
      { name: "Additional function", price: 220, description: "Engagement, mehendi or reception looks." },
      { name: "Bridal party", price: 95, description: "Per bridesmaid makeup." },
      { name: "Mother of bride", price: 130, description: "Makeup for mother of the bride/groom." },
    ],
    products: [
      { name: "MAC", description: "Long-wear HD foundation." },
      { name: "Bobbi Brown", description: "Natural-finish, skin-loving." },
      { name: "Charlotte Tilbury", description: "Luxury bridal formulas." },
      { name: "Huda Beauty", description: "Pigmented, long-wearing colour." },
    ],
    preparation: [
      "Book trial 4–6 weeks before wedding",
      "Bring reference looks & outfit swatches",
      "Schedule facials weekly for a month prior",
      "Avoid new skincare 2 weeks before",
    ],
    aftercare: [
      "Blot, don't wipe, to refresh",
      "Use a setting spray for longevity",
      "Remove gently with cleansing oil at end of day",
    ],
    results: "A flawless, 14+ hour bridal look that survives tears, hugs and dancing — and photographs beautifully.",
    faqs: [
      { q: "Do you travel to my venue?", a: "Yes. We cover all of the Bay Area. Outstation travel is available on request — please mention this when booking." },
      { q: "How early should I book?", a: "Peak season (May–October) books 4–6 months ahead. We recommend securing your date as soon as it's fixed." },
      { q: "Is the trial included?", a: "The trial is a separate session booked 4–6 weeks before. It's charged separately and can be credited toward your package." },
      { q: "Do you do airbrush?", a: "Yes — airbrush is available as an upgrade. It's lighter and longer-wearing than traditional HD makeup." },
    ],
    relatedSlugs: ["engagement-makeup", "party-makeup-hd", "hydra-glow-facial"],
    recommendedStylistSlug: "kavya-reddy",
    imageKey: "bridal",
    galleryKeys: ["bridal", "galleryBridal", "bridal2"],
    popular: true,
  },
  {
    slug: "engagement-makeup",
    name: "Engagement & Reception Makeup",
    category: "Bridal",
    shortDescription: "Soft, romantic makeup perfect for engagement ceremonies.",
    overview:
      "A softer, romantic look designed for engagement, mehendi and reception functions. Features dewy skin, soft smokey eyes and a fresh lip — beautiful in person and in photographs. Includes skin prep, HD makeup, lashes and light hairstyling. Each function's look is tailored so your photos have variety while staying cohesive.",
    process: [
      { title: "Skin prep", description: "Cleanse, moisturise and prime.", duration: "10 min" },
      { title: "Base & eyes", description: "Dewy base with soft smokey eyes.", duration: "30 min" },
      { title: "Lashes & lips", description: "Natural lashes and a fresh lip.", duration: "10 min" },
      { title: "Hair styling", description: "Light hairstyling to complete the look.", duration: "20 min" },
    ],
    benefits: ["Romantic, photo-ready finish", "Long-wearing HD formulas", "Light hairstyling included", "Cohesive across functions"],
    suitableFor: ["Engagement", "Reception", "Mehendi & sangeet", "Anniversary portraits"],
    duration: "75 min",
    longevity: "10–12 hours",
    startingPrice: 220,
    priceTiers: [
      { tier: "Junior", price: 220 },
      { tier: "Senior", price: 280 },
      { tier: "Master", price: 350 },
      { tier: "Director", price: 420 },
    ],
    addOns: [],
    products: [{ name: "MAC", description: "HD foundation and colour." }, { name: "NARS", description: "Dewy-finish base." }],
    preparation: ["Schedule 2 days after facial", "Bring outfit reference"],
    aftercare: ["Blot to refresh", "Remove gently with cleansing oil"],
    results: "A soft, romantic, photo-ready look that lasts all function long.",
    faqs: [
      { q: "Can I change the look between functions?", a: "Yes — we tailor each function's look so your photos have variety while staying cohesive." },
    ],
    relatedSlugs: ["bridal-makeup", "party-makeup-hd"],
    recommendedStylistSlug: "kavya-reddy",
    imageKey: "bridal2",
    galleryKeys: ["bridal2", "galleryBridal"],
  },
  {
    slug: "full-arm-leg-waxing",
    name: "Full Arms & Legs Waxing",
    category: "Waxing & Threading",
    shortDescription: "Smooth, hygienic waxing with roll-on and Rica options.",
    overview:
      "Hygienic, low-temperature waxing using single-use applicators. Choose from our rich-chocolate roll-on wax for normal hair or Rica sensitive wax for delicate skin. Every service includes a pre-wax cleanse, post-wax soothing gel and a light dusting of talc. Skin stays smooth for 3–4 weeks. Rica wax is gentler, less painful and ideal for sensitive skin.",
    process: [
      { title: "Cleanse & prep", description: "Skin is cleansed and a light dusting of talc applied.", duration: "5 min" },
      { title: "Wax application", description: "Low-temp wax applied with single-use applicators.", duration: "25 min" },
      { title: "Soothing finish", description: "Post-wax soothing gel and oil to remove residue.", duration: "10 min" },
    ],
    benefits: [
      "Single-use, hygienic applicators",
      "Low-temperature, less painful wax",
      "Smooth skin for 3–4 weeks",
      "Soothing aftercare included",
      "Rica option for sensitive skin",
    ],
    suitableFor: ["All skin types", "Sensitive skin (Rica option)", "Regular maintenance"],
    duration: "45 min",
    longevity: "3–4 weeks",
    startingPrice: 28,
    priceTiers: [
      { tier: "Junior", price: 28 },
      { tier: "Senior", price: 35 },
      { tier: "Master", price: 45 },
      { tier: "Director", price: 55 },
    ],
    addOns: [],
    products: [{ name: "Rica", description: "Sensitive, low-temp wax." }, { name: "GiGi", description: "Professional wax." }],
    preparation: ["Hair should be 1/4 inch long", "Avoid waxing during menstruation if sensitive", "Exfoliate 2 days before"],
    aftercare: ["No sun or heat for 24 hours", "Moisturise daily to prevent ingrowns", "Exfoliate 2× weekly"],
    results: "Smooth, hair-free skin for 3–4 weeks with reduced regrowth over time.",
    faqs: [
      { q: "Is it painful?", a: "Our low-temp wax and quick technique minimise discomfort. Rica wax is gentler for sensitive skin." },
      { q: "Roll-on vs Rica?", a: "Roll-on is efficient for normal hair; Rica is a cream wax that's gentler, less painful and ideal for sensitive skin." },
    ],
    relatedSlugs: ["eyebrow-threading", "signature-facial"],
    recommendedStylistSlug: "priya-shetty",
    imageKey: "waxing",
    galleryKeys: ["waxing", "threading"],
  },
  {
    slug: "eyebrow-threading",
    name: "Eyebrow Threading & Shaping",
    category: "Waxing & Threading",
    shortDescription: "Precise eyebrow shaping with the threading technique.",
    overview:
      "Define your brows with our signature threading service. Our therapists map your brow to your face shape, then thread for clean, precise arches. Includes a complimentary brow brush and tint consultation. Quick, hygienic and ideal for sensitive skin — threading removes hair from the root without irritating the skin around it.",
    process: [
      { title: "Brow mapping", description: "We map your ideal brow shape to your face.", duration: "3 min" },
      { title: "Threading", description: "Precise threading for clean arches.", duration: "8 min" },
      { title: "Soothe & finish", description: "A soothing gel and brow brush.", duration: "4 min" },
    ],
    benefits: ["Precise, defined arches", "Hygienic single-use thread", "Suitable for sensitive skin", "Quick and affordable"],
    suitableFor: ["All skin types", "Quick touch-ups", "Sensitive skin (alternative to waxing)"],
    duration: "15 min",
    longevity: "2–3 weeks",
    startingPrice: 10,
    priceTiers: [
      { tier: "Junior", price: 10 },
      { tier: "Senior", price: 14 },
      { tier: "Master", price: 18 },
      { tier: "Director", price: 22 },
    ],
    addOns: [{ name: "Brow tint", price: 12, description: "Add a tint to define brows further." }],
    products: [{ name: "Berenice", description: "Post-thread soothing products." }],
    preparation: ["Avoid retinol 24 hours prior"],
    aftercare: ["Apply aloe gel if skin feels warm", "Avoid sun for 4 hours"],
    results: "Cleanly defined arches that frame your face, lasting 2–3 weeks.",
    faqs: [
      { q: "Will it hurt?", a: "Threading is quick and precise. First-timers may feel mild discomfort that eases with regular sessions." },
    ],
    relatedSlugs: ["full-arm-leg-waxing", "signature-facial"],
    recommendedStylistSlug: "priya-shetty",
    imageKey: "threading",
    galleryKeys: ["threading"],
  },
  {
    slug: "manicure-pedicure",
    name: "Manicure & Pedicure",
    category: "Nails",
    shortDescription: "Soak, scrub, massage & polish for hands and feet.",
    overview:
      "A pampering 60-minute manicure and pedicure that begins with a warm soak, followed by cuticle care, exfoliation, a relaxing hand-and-foot massage and a long-lasting gel or regular polish. Choose from 80+ shades. Hygiene-grade sterilised tools used for every client. Gel polish lasts 2–3 weeks chip-free.",
    process: [
      { title: "Soak & soften", description: "A warm soak with aromatherapy softens skin and nails.", duration: "10 min" },
      { title: "Cuticle care & shape", description: "Cuticles are pushed and trimmed; nails shaped.", duration: "10 min" },
      { title: "Exfoliation & massage", description: "A scrub and a relaxing hand-and-foot massage.", duration: "20 min" },
      { title: "Polish", description: "Gel or regular polish from 80+ shades.", duration: "20 min" },
    ],
    benefits: [
      "Neat, healthy nails & cuticles",
      "Soft, smooth hands & feet",
      "Relaxing massage included",
      "80+ polish shades to choose from",
      "Gel option lasts 2–3 weeks",
    ],
    suitableFor: ["Monthly nail care", "Special occasions", "Gifting", "Self-care"],
    duration: "60 min",
    longevity: "Regular 1 week · Gel 2–3 weeks",
    startingPrice: 38,
    priceTiers: [
      { tier: "Junior", price: 38 },
      { tier: "Senior", price: 48 },
      { tier: "Master", price: 58 },
      { tier: "Director", price: 70 },
    ],
    addOns: [
      { name: "Gel polish upgrade", price: 18, description: "Chip-free wear for 2–3 weeks." },
      { name: "Paraffin wax", price: 15, description: "Deeply hydrating warm wax treatment." },
    ],
    products: [{ name: "OPI", description: "80+ shades and treatments." }, { name: "Essie", description: "Trend-led polish colours." }],
    preparation: ["Remove old polish before arrival if possible"],
    aftercare: ["Moisturise daily", "Reapply top coat every 3 days (regular polish)", "Gel lasts 2–3 weeks; soak-off removal included next visit"],
    results: "Polished, pampered hands and feet with healthy cuticles and chip-free colour.",
    faqs: [
      { q: "How long does gel polish last?", a: "Gel polish lasts 2–3 weeks chip-free. Removal is included in your next service." },
      { q: "Are your tools sterilised?", a: "Yes — all metal tools are autoclaved between clients. Single-use files and buffers are used per client." },
    ],
    relatedSlugs: ["nail-art-design", "spa-foot-reflexology"],
    recommendedStylistSlug: "priya-shetty",
    imageKey: "manicure",
    galleryKeys: ["galleryNails", "manicure"],
    popular: true,
  },
  {
    slug: "nail-art-design",
    name: "Nail Art & Extensions",
    category: "Nails",
    shortDescription: "Custom nail art, gel extensions & chrome finishes.",
    overview:
      "Express yourself with bespoke nail art — from minimalist line work to elaborate festive designs. We offer gel extensions, chrome, mirror and encapsulated glitter finishes. All art is sealed with a UV top coat for 3-week wear. Our nail artists stay current with trends and can recreate any reference or design something original just for you.",
    process: [
      { title: "Consultation", description: "We discuss your design and choose colours and finishes.", duration: "5 min" },
      { title: "Prep & base", description: "Nails are prepped; extensions applied if needed.", duration: "20 min" },
      { title: "Art application", description: "Your design is hand-painted or applied.", duration: "40–60 min" },
      { title: "Top coat & cure", description: "A UV top coat seals the design.", duration: "10 min" },
    ],
    benefits: ["Custom, one-of-a-kind designs", "3-week chip-free wear", "Gel & extension options", "Chrome, mirror and glitter finishes"],
    suitableFor: ["Festive looks", "Special occasions", "Nail-art enthusiasts", "Bridal nails"],
    duration: "75–120 min",
    longevity: "3 weeks",
    startingPrice: 25,
    priceTiers: [
      { tier: "Junior", price: 25 },
      { tier: "Senior", price: 35 },
      { tier: "Master", price: 48 },
      { tier: "Director", price: 60 },
    ],
    addOns: [],
    products: [{ name: "OPI", description: "Gel polish and extensions." }, { name: "Gelish", description: "Long-wear gel." }, { name: "Kiara Sky", description: "Dip and extension systems." }],
    preparation: ["Remove old gel before arrival"],
    aftercare: ["Wear gloves while cleaning", "Reapply cuticle oil daily", "Book removal in 3 weeks"],
    results: "Bespoke nail art that lasts 3 weeks chip-free.",
    faqs: [
      { q: "Will extensions damage my nails?", a: "When applied and removed professionally, extensions are safe. We never force-remove — gel is soaked off gently." },
      { q: "Can you recreate a design I saw online?", a: "Yes — bring a reference photo and our artists will recreate it or design something inspired by it." },
    ],
    relatedSlugs: ["manicure-pedicure"],
    recommendedStylistSlug: "priya-shetty",
    imageKey: "galleryNails",
    galleryKeys: ["galleryNails", "manicure"],
  },
  {
    slug: "kids-haircut",
    name: "Kids Haircut (under 12)",
    category: "Kids Services",
    shortDescription: "Patient, gentle cuts for little ones — toys included.",
    overview:
      "A calm, kid-friendly haircut experience with stylists trained to keep children at ease. We have a dedicated chair with cartoon screens, gentle products and a small gift at the end. Suitable for children aged 2–12. First-cut keepsake certificate included for our youngest clients.",
    process: [
      { title: "Settle in", description: "We help your child settle with cartoons and toys.", duration: "5 min" },
      { title: "Gentle cut", description: "A patient, gentle cut at the child's pace.", duration: "20 min" },
      { title: "Finish & gift", description: "A quick style and a small gift at the end.", duration: "5 min" },
    ],
    benefits: ["Kid-friendly environment", "Gentle, tear-free products", "Keepsake first-cut certificate", "Patient, trained stylists"],
    suitableFor: ["Children aged 2–12"],
    duration: "30 min",
    longevity: "4–6 weeks",
    startingPrice: 18,
    priceTiers: [
      { tier: "Junior", price: 18 },
      { tier: "Senior", price: 22 },
      { tier: "Master", price: 28 },
      { tier: "Director", price: 35 },
    ],
    addOns: [],
    products: [{ name: "Mamaearth", description: "Tear-free, gentle kids' shampoo." }, { name: "Sebamed Kids", description: "pH-balanced, hypoallergenic." }],
    preparation: ["Bring a favourite toy or snack", "Avoid booking during nap time"],
    aftercare: ["Use a gentle kids shampoo", "Comb daily to avoid tangles"],
    results: "A neat, age-appropriate cut — and a happy child.",
    faqs: [
      { q: "What if my child is fussy?", a: "Our stylists are patient and trained in distraction techniques. We never force a cut — we take breaks as needed." },
      { q: "Do you do first cuts?", a: "Yes — we include a keepsake first-cut certificate with a lock of hair for our youngest clients." },
    ],
    relatedSlugs: ["womens-haircut-styling"],
    recommendedStylistSlug: "ananya-rao",
    imageKey: "kidsHaircut",
    galleryKeys: ["kidsHaircut"],
  },
];

/* ============================================================
   STYLISTS
   ============================================================ */
export interface Stylist {
  slug: string;
  name: string;
  position: string;
  tier: StylistTier;
  experience: string;
  imageKey: SalonImageKey;
  imageIndex: number;
  certifications: string[];
  expertise: string[];
  favoriteStyles: string[];
  languages: string[];
  rating: number;
  reviews: number;
  bio: string;
  longBio: string;
  availability: string;
  signatureServices: string[];
  social: { instagram?: string };
}

export const stylists: Stylist[] = [
  {
    slug: "ananya-rao",
    name: "Ananya Rao",
    position: "Creative Director & Master Stylist",
    tier: "Director",
    experience: "14 years",
    imageKey: "stylist1",
    imageIndex: 0,
    certifications: ["L'Oréal Professionnel ID Artist", "Vidal Sassoon Certified", "Wella Master Colour Expert", "Olaplex Educator"],
    expertise: ["Precision Cutting", "Curly Hair", "Hair Spa Design", "Bridal Styling", "Restyles"],
    favoriteStyles: ["Soft curtain bangs", "Layered shag", "Lived-in waves"],
    languages: ["English", "Hindi", "Kannada", "Telugu"],
    rating: 4.9,
    reviews: 612,
    bio: "Ananya founded Lumière in 2014 after a decade training with Vidal Sassoon in London. She leads our creative team and is known for cuts that grow out beautifully.",
    longBio: "Ananya's philosophy is simple: a great cut should flatter your face and fit your life. After a decade training and teaching at Vidal Sassoon in London, she returned to San Francisco to open Lumière in 2014. She leads our creative team, mentors every junior stylist, and still takes a full chair of clients each week. Ananya is known for her dry-cutting technique, her eye for curly hair, and her ability to translate a vague 'I want something different' into a cut you'll love. When she's not at the salon, she's teaching at industry events or writing for beauty publications.",
    availability: "Tue–Sat · 10 AM – 7 PM",
    signatureServices: ["Women's Haircut & Styling", "Curly Hair Cut", "Hair Spa Treatment"],
    social: { instagram: "https://instagram.com" },
  },
  {
    slug: "meera-nair",
    name: "Meera Nair",
    position: "Senior Colourist",
    tier: "Master",
    experience: "11 years",
    imageKey: "stylist3",
    imageIndex: 0,
    certifications: ["Wella Master Colour Expert", "L'Oréal Colour Trophy finalist 2022", "Olaplex Certified", "Balayage Specialist"],
    expertise: ["Balayage", "Global Colour", "Colour Correction", "Grey Coverage", "Highlights"],
    favoriteStyles: ["Caramel balayage", "Toffee money piece", "Soft copper global"],
    languages: ["English", "Malayalam", "Hindi"],
    rating: 4.9,
    reviews: 488,
    bio: "Meera's hand-painted balayage has earned her a loyal following. She specialises in tones that complement warm skin and low-maintenance colour that grows out gracefully.",
    longBio: "Meera joined Lumière in 2017 and has built a reputation as one of the Bay Area's finest colourists. Her balayage is hand-painted, never foiled, and she's known for tones that flatter warm undertones — caramel, toffee, honey, soft copper. Meera is also our go-to for colour correction, having rescued many a box-dye disaster. She trains every quarter with Wella and L'Oréal, and was a L'Oréal Colour Trophy finalist in 2022. Clients describe her as meticulous, warm and genuinely invested in their hair health.",
    availability: "Wed–Sun · 11 AM – 8 PM",
    signatureServices: ["Balayage & Highlights", "Global Hair Color", "Colour Correction"],
    social: { instagram: "https://instagram.com" },
  },
  {
    slug: "rohan-kapoor",
    name: "Rohan Kapoor",
    position: "Hair Treatment Specialist",
    tier: "Master",
    experience: "9 years",
    imageKey: "stylist2",
    imageIndex: 0,
    certifications: ["Schwarzkopf BC Certified", "Brazilian Blowout Pro", "GK Hair Specialist", "Tricho Consultant"],
    expertise: ["Keratin Smoothing", "Hair Botox", "Scalp Treatments", "Hair Repair", "Smoothing"],
    favoriteStyles: ["Glass-hair blowout", "Frizz-free waves", "Sleek straight finish"],
    languages: ["English", "Hindi", "Punjabi"],
    rating: 4.8,
    reviews: 354,
    bio: "Rohan is our go-to expert for frizz control and hair health. His treatment plans combine keratin, scalp therapy and at-home rituals to transform damaged hair.",
    longBio: "Rohan specialises in the science of hair health. After training with Schwarzkopf in New York, he joined Lumière to lead our treatment division. He's the expert clients see for keratin smoothing, scalp therapy, and rescuing over-processed hair. Rohan believes great hair starts with a healthy scalp, and his consultations include a scalp analysis and a personalised treatment plan. He's patient, thorough, and never oversells — if a treatment isn't right for you, he'll tell you.",
    availability: "Mon–Sat · 10 AM – 7 PM",
    signatureServices: ["Keratin Smoothing Treatment", "Hair Spa Treatment", "Scalp Therapy"],
    social: { instagram: "https://instagram.com" },
  },
  {
    slug: "kavya-reddy",
    name: "Kavya Reddy",
    position: "Lead Makeup Artist",
    tier: "Director",
    experience: "10 years",
    imageKey: "stylist4",
    imageIndex: 0,
    certifications: ["MAC Certified Pro", "Charlotte Tilbury Bridal Course", "Airbrush Certified", "HD Makeup Specialist"],
    expertise: ["Bridal Makeup", "HD & Airbrush", "Party Looks", "Editorial", "Reception Makeup"],
    favoriteStyles: ["Soft romantic bridal", "Dewy party glow", "Smokey reception"],
    languages: ["English", "Telugu", "Kannada", "Hindi"],
    rating: 5.0,
    reviews: 421,
    bio: "Kavya has styled over 640 brides and counting. Her signature is dewy, romantic makeup that looks flawless in person and in photos.",
    longBio: "Kavya leads our bridal and makeup team. She's styled over 640 brides across every tradition — South Asian, Western, East Asian and fusion — and her signature is dewy, romantic makeup that survives tears, hugs and 14 hours of celebration. Kavya trains every new makeup artist at Lumière and runs our bridal trials programme. She's known for her calm energy on wedding mornings, her attention to detail, and her ability to make every bride feel like the best version of herself. She travels on-location across the Bay Area and beyond.",
    availability: "By appointment",
    signatureServices: ["Bridal Makeup & Trial", "Engagement Makeup", "HD Party Makeup"],
    social: { instagram: "https://instagram.com" },
  },
  {
    slug: "priya-shetty",
    name: "Priya Shetty",
    position: "Skin & Spa Therapist",
    tier: "Master",
    experience: "8 years",
    imageKey: "stylist5",
    imageIndex: 0,
    certifications: ["Dermalogica Expert", "CIDESCO certified", "Kaya Skin Clinic trained", "Reflexology Certified"],
    expertise: ["Facials", "Skin Analysis", "Aromatherapy", "Reflexology", "Deep Tissue"],
    favoriteStyles: ["Hydra-glow facial", "De-tan brightening", "Aromatherapy massage"],
    languages: ["English", "Kannada", "Hindi"],
    rating: 4.9,
    reviews: 296,
    bio: "Priya believes great skin starts with understanding it. She begins every facial with a detailed skin analysis and personalises every step.",
    longBio: "Priya is our skin and spa lead, with CIDESCO and Dermalogica certifications. She's the therapist clients book months in advance for pre-event glow. Priya believes in results-driven skincare — every facial begins with a magnified skin analysis, and every step is tailored to what your skin needs that day. She's also our reflexology and aromatherapy specialist, with a loyal following for her deeply relaxing treatments. Priya keeps up with the latest in skin science and is known for honest, no-nonsense advice.",
    availability: "Tue–Sun · 10 AM – 6 PM",
    signatureServices: ["Lumière Signature Facial", "Hydra-Glow Facial", "Aromatherapy Spa"],
    social: { instagram: "https://instagram.com" },
  },
  {
    slug: "sara-chen",
    name: "Sara Chen",
    position: "Senior Stylist & Nail Artist",
    tier: "Senior",
    experience: "6 years",
    imageKey: "stylist6",
    imageIndex: 0,
    certifications: ["OPI Certified", "Gelish Pro", "L'Oréal Cutting Diploma"],
    expertise: ["Nail Art", "Manicure & Pedicure", "Blow-Dries", "Updos"],
    favoriteStyles: ["Chrome nails", "Minimalist line art", "Soft blow-dries"],
    languages: ["English", "Mandarin"],
    rating: 4.8,
    reviews: 218,
    bio: "Sara leads our nail studio and is known for her intricate, trend-led nail art. She also takes blow-dry and updo appointments.",
    longBio: "Sara is our nail studio lead and a senior stylist for blow-dries and updos. She trained with OPI in Los Angeles and brings a trend-led, editorial eye to nail art — from chrome finishes to intricate hand-painted designs. Sara also takes hair appointments for blow-dries, updos and occasion styling. Clients love her attention to detail and her Instagram-worthy finishes. She's our go-to for pre-event nails and hair.",
    availability: "Wed–Sun · 11 AM – 7 PM",
    signatureServices: ["Nail Art & Extensions", "Manicure & Pedicure", "Blow-Dry Styling"],
    social: { instagram: "https://instagram.com" },
  },
];

/* ============================================================
   GALLERY
   ============================================================ */
export type GalleryCategory =
  | "Haircuts"
  | "Hair Coloring"
  | "Bridal Looks"
  | "Makeup"
  | "Nail Art"
  | "Facials"
  | "Hair Treatments"
  | "Spa"
  | "Special Events";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageKey: SalonImageKey;
  imageIndex: number;
  stylistSlug?: string;
}

export const galleryCategories: GalleryCategory[] = [
  "Haircuts", "Hair Coloring", "Bridal Looks", "Makeup", "Nail Art",
  "Facials", "Hair Treatments", "Spa", "Special Events",
];

export const galleryItems: GalleryItem[] = [
  { id: "g1", title: "Soft Layered Cut", category: "Haircuts", imageKey: "galleryHaircut", imageIndex: 0, stylistSlug: "ananya-rao" },
  { id: "g2", title: "Modern Bob", category: "Haircuts", imageKey: "galleryBob", imageIndex: 0, stylistSlug: "ananya-rao" },
  { id: "g3", title: "Curtain Bangs & Waves", category: "Haircuts", imageKey: "galleryHaircut", imageIndex: 1, stylistSlug: "ananya-rao" },
  { id: "g4", title: "Long Layered Blowout", category: "Haircuts", imageKey: "galleryHaircut", imageIndex: 2, stylistSlug: "sara-chen" },
  { id: "g5", title: "Caramel Balayage", category: "Hair Coloring", imageKey: "galleryColor", imageIndex: 5, stylistSlug: "meera-nair" },
  { id: "g6", title: "Toffee Money Piece", category: "Hair Coloring", imageKey: "galleryColor", imageIndex: 1, stylistSlug: "meera-nair" },
  { id: "g7", title: "Soft Copper Global", category: "Hair Coloring", imageKey: "galleryColor", imageIndex: 2, stylistSlug: "meera-nair" },
  { id: "g8", title: "Sun-kissed Highlights", category: "Hair Coloring", imageKey: "hairColor", imageIndex: 2, stylistSlug: "meera-nair" },
  { id: "g9", title: "South Asian Bride", category: "Bridal Looks", imageKey: "galleryBridal", imageIndex: 0, stylistSlug: "kavya-reddy" },
  { id: "g10", title: "Romantic Bridal Updo", category: "Bridal Looks", imageKey: "galleryUpdo", imageIndex: 0, stylistSlug: "kavya-reddy" },
  { id: "g11", title: "Modern Bride", category: "Bridal Looks", imageKey: "bridal", imageIndex: 3, stylistSlug: "kavya-reddy" },
  { id: "g12", title: "Western Bridal Glow", category: "Bridal Looks", imageKey: "bridal2", imageIndex: 2, stylistSlug: "kavya-reddy" },
  { id: "g13", title: "Evening Smokey Eye", category: "Makeup", imageKey: "galleryMakeup", imageIndex: 0, stylistSlug: "kavya-reddy" },
  { id: "g14", title: "Dewy Party Look", category: "Makeup", imageKey: "galleryMakeup", imageIndex: 1, stylistSlug: "kavya-reddy" },
  { id: "g15", title: "Glam Reception Makeup", category: "Makeup", imageKey: "makeup", imageIndex: 2, stylistSlug: "kavya-reddy" },
  { id: "g16", title: "Floral Nail Art", category: "Nail Art", imageKey: "galleryNails", imageIndex: 2, stylistSlug: "sara-chen" },
  { id: "g17", title: "Chrome Finish Set", category: "Nail Art", imageKey: "galleryNails", imageIndex: 1, stylistSlug: "sara-chen" },
  { id: "g18", title: "Gel Extension Set", category: "Nail Art", imageKey: "manicure", imageIndex: 1, stylistSlug: "sara-chen" },
  { id: "g19", title: "Signature Glow Facial", category: "Facials", imageKey: "facial", imageIndex: 2, stylistSlug: "priya-shetty" },
  { id: "g20", title: "Hydra-Glow Result", category: "Facials", imageKey: "facial", imageIndex: 1, stylistSlug: "priya-shetty" },
  { id: "g21", title: "Keratin Smooth Finish", category: "Hair Treatments", imageKey: "hairTreatment", imageIndex: 6, stylistSlug: "rohan-kapoor" },
  { id: "g22", title: "Glass-Hair Blowout", category: "Hair Treatments", imageKey: "hairTreatment", imageIndex: 1, stylistSlug: "rohan-kapoor" },
  { id: "g23", title: "Hair Spa Shine", category: "Hair Treatments", imageKey: "hairTreatment", imageIndex: 2, stylistSlug: "rohan-kapoor" },
  { id: "g24", title: "Aromatherapy Spa", category: "Spa", imageKey: "spa", imageIndex: 4, stylistSlug: "priya-shetty" },
  { id: "g25", title: "Relaxation Therapy", category: "Spa", imageKey: "spa", imageIndex: 1, stylistSlug: "priya-shetty" },
  { id: "g26", title: "Festive Special Look", category: "Special Events", imageKey: "bridal", imageIndex: 6, stylistSlug: "kavya-reddy" },
  { id: "g27", title: "Seasonal Glam", category: "Special Events", imageKey: "galleryMakeup", imageIndex: 2, stylistSlug: "kavya-reddy" },
  { id: "g28", title: "Editorial Updo", category: "Special Events", imageKey: "galleryUpdo", imageIndex: 1, stylistSlug: "sara-chen" },
];

/* Before & After transformations */
export interface BeforeAfter {
  id: string;
  title: string;
  service: string;
  beforeKey: SalonImageKey;
  beforeIndex: number;
  afterKey: SalonImageKey;
  afterIndex: number;
}
export const beforeAfter: BeforeAfter[] = [
  { id: "ba1", title: "Balayage Transformation", service: "Balayage & Highlights", beforeKey: "beforeAfter", beforeIndex: 0, afterKey: "galleryColor", afterIndex: 4 },
  { id: "ba2", title: "Hair Cut Makeover", service: "Women's Haircut & Styling", beforeKey: "beforeAfter", beforeIndex: 1, afterKey: "galleryBob", afterIndex: 1 },
  { id: "ba3", title: "Colour Refresh", service: "Global Hair Color", beforeKey: "beforeAfter", beforeIndex: 2, afterKey: "galleryColor", afterIndex: 3 },
  { id: "ba4", title: "Keratin Smoothing", service: "Keratin Smoothing Treatment", beforeKey: "beforeAfter", beforeIndex: 3, afterKey: "hairTreatment", afterIndex: 3 },
  { id: "ba5", title: "Bridal Glow Up", service: "Bridal Makeup & Trial", beforeKey: "beforeAfter", beforeIndex: 4, afterKey: "galleryBridal", afterIndex: 1 },
];

/* ============================================================
   PACKAGES
   ============================================================ */
export interface SalonPackage {
  slug: string;
  name: string;
  description: string;
  services: string[];
  price: number;
  originalPrice: number;
  duration: string;
  save: number;
  popular?: boolean;
  imageKey: SalonImageKey;
  imageIndex: number;
  bestFor?: string;
}

export const packages: SalonPackage[] = [
  {
    slug: "bridal-essentials",
    name: "Bridal Essentials",
    description: "Everything a bride needs for the big day — prep, trial and wedding-day look, on-location.",
    services: ["Pre-bridal facial (4 sessions)", "Hair spa (2 sessions)", "Bridal makeup trial", "Wedding-day makeup & hairstyling", "Manicure & pedicure", "On-location service"],
    price: 850,
    originalPrice: 1100,
    duration: "Over 4 weeks",
    save: 23,
    popular: true,
    imageKey: "bridal",
    imageIndex: 1,
    bestFor: "Brides wanting the complete experience",
  },
  {
    slug: "pre-bridal-glow",
    name: "Pre-Bridal Glow",
    description: "A month of skin and hair prep for a radiant wedding-day canvas.",
    services: ["Signature facial (4 sessions)", "Hair spa (3 sessions)", "De-tan facial", "Manicure & pedicure", "Full arms & legs waxing"],
    price: 380,
    originalPrice: 490,
    duration: "Over 4 weeks",
    save: 22,
    imageKey: "facial",
    imageIndex: 3,
    bestFor: "Brides prepping skin & hair",
  },
  {
    slug: "party-ready",
    name: "Party Ready",
    description: "Get glowing and camera-ready for any special evening.",
    services: ["Hydra-glow facial", "HD party makeup", "Hairstyling", "Manicure"],
    price: 170,
    originalPrice: 220,
    duration: "Half day",
    save: 23,
    popular: true,
    imageKey: "makeup",
    imageIndex: 1,
    bestFor: "Pre-event prep",
  },
  {
    slug: "weekly-reset",
    name: "Weekly Reset Spa",
    description: "Total-body unwind for stressed skin and tired muscles.",
    services: ["Aromatherapy massage (60 min)", "Foot reflexology", "Signature facial", "Hair spa"],
    price: 145,
    originalPrice: 190,
    duration: "3 hours",
    save: 24,
    imageKey: "spa",
    imageIndex: 3,
    bestFor: "Self-care days",
  },
  {
    slug: "colour-protection",
    name: "Colour Protection",
    description: "Keep your colour fresh and your hair healthy between salon visits.",
    services: ["Global hair colour", "Hair spa", "Colour-care take-home kit", "Gloss refresh (after 4 weeks)"],
    price: 135,
    originalPrice: 175,
    duration: "2 visits",
    save: 23,
    imageKey: "hairColor",
    imageIndex: 1,
    bestFor: "Colour clients",
  },
  {
    slug: "monthly-glow",
    name: "Monthly Glow Bundle",
    description: "Your monthly essentials bundled at member pricing.",
    services: ["Signature facial", "Hair spa", "Eyebrow & upper-lip threading", "Manicure"],
    price: 85,
    originalPrice: 115,
    duration: "Monthly",
    save: 26,
    imageKey: "facial",
    imageIndex: 4,
    bestFor: "Regulars",
  },
  {
    slug: "complete-hair-makeover",
    name: "Complete Hair Makeover",
    description: "A full hair transformation — cut, colour and treatment.",
    services: ["Women's haircut & styling", "Balayage or global colour", "Keratin or hair spa treatment", "Take-home care kit"],
    price: 290,
    originalPrice: 375,
    duration: "Half day",
    save: 23,
    imageKey: "galleryColor",
    imageIndex: 6,
    bestFor: "A fresh new look",
  },
  {
    slug: "spa-day-for-two",
    name: "Spa Day for Two",
    description: "Relax together with side-by-side massages and facials.",
    services: ["Two aromatherapy massages (60 min)", "Two express facials", "Foot reflexology for two", "Herbal tea & snacks"],
    price: 240,
    originalPrice: 310,
    duration: "2.5 hours",
    save: 23,
    imageKey: "spa",
    imageIndex: 6,
    bestFor: "Couples & friends",
  },
];

/* ============================================================
   OFFERS
   ============================================================ */
export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  validUntil: string;
  badge: string;
  imageKey: SalonImageKey;
  imageIndex: number;
  terms: string;
}

export const offers: Offer[] = [
  { id: "o1", title: "First Visit 20% Off", description: "New to Lumière? Enjoy 20% off your first service — any category, any stylist.", code: "FIRSTGLOW20", discount: "20% OFF", validUntil: "Ongoing for new clients", badge: "New Clients", imageKey: "hero", imageIndex: 2, terms: "Applies to first service only. Not valid with other offers. One per client." },
  { id: "o2", title: "Midweek Spa Tuesdays", description: "Book any spa or facial on a Tuesday and save 25%. Perfect midweek unwind.", code: "TUESDAY25", discount: "25% OFF", validUntil: "Every Tuesday", badge: "Weekly", imageKey: "spa", imageIndex: 2, terms: "Tuesday appointments only. Cannot be combined with other offers." },
  { id: "o3", title: "Student Salon Days", description: "Show a valid student ID and get 15% off haircuts, hair spa and nails — Mon to Thu.", code: "STUDENT15", discount: "15% OFF", validUntil: "Mon–Thu", badge: "Students", imageKey: "haircut", imageIndex: 1, terms: "Valid student ID required. Monday–Thursday only. Excludes bridal." },
  { id: "o4", title: "Refer a Friend, Both Get $15", description: "Refer a friend and you'll both receive $15 off your next service.", code: "REFER15", discount: "$15 OFF", validUntil: "Ongoing", badge: "Referral", imageKey: "testimonial1", imageIndex: 6, terms: "Friend must be a new client. Credit issued after their first visit." },
  { id: "o5", title: "Festive Bridal Early Bird", description: "Book your bridal package 4 months in advance and save 15% on the total.", code: "EARLYBRIDE15", discount: "15% OFF", validUntil: "Limited dates", badge: "Bridal", imageKey: "bridal", imageIndex: 2, terms: "Booking must be 4+ months in advance. Bridal packages only." },
  { id: "o6", title: "Birthday Month Treat", description: "It's your birthday month! Enjoy a complimentary hair spa with any colour service.", code: "HBDSPAFREE", discount: "Free Hair Spa", validUntil: "Your birthday month", badge: "Birthday", imageKey: "hairTreatment", imageIndex: 4, terms: "ID required for birthday verification. With any colour service." },
];

/* ============================================================
   MEMBERSHIP
   ============================================================ */
export interface MembershipTier {
  name: string;
  price: number;
  period: string;
  tagline: string;
  benefits: string[];
  popular?: boolean;
  /** Paid yearly — two months free vs. paying monthly. */
  annualPrice?: number;
  /** What lands in your account every month, in plain words. */
  credits?: string;
  /** À la carte worth of the included credits + discount. */
  monthlyValue?: number;
  bestFor?: string;
}

export const membershipTiers: MembershipTier[] = [
  { name: "Glow", price: 39, period: "month", annualPrice: 390, credits: "1 service credit / month", monthlyValue: 75, bestFor: "One visit a month", tagline: "For your monthly self-care ritual", benefits: ["15% off all services", "1 complimentary facial per month", "Priority booking", "Birthday free hair spa", "10% off products"] },
  { name: "Luxe", price: 79, period: "month", annualPrice: 790, credits: "2 service credits / month", monthlyValue: 165, bestFor: "Every two to three weeks", tagline: "Our most-loved plan for regulars", benefits: ["25% off all services", "1 facial + 1 hair spa per month", "15% off products & packages", "Free birthday makeover", "Bring-a-friend 20% off", "Complimentary brow shaping monthly", "Free gel polish upgrade"], popular: true },
  { name: "Élite", price: 149, period: "month", annualPrice: 1490, credits: "4 service credits / month", monthlyValue: 320, bestFor: "Weekly regulars & brides-to-be", tagline: "The full Lumière experience, unlimited perks", benefits: ["35% off all services", "2 facials + 2 hair spas per month", "20% off products & packages", "Dedicated stylist on call", "Free bridal trial annually", "Quarterly spa day for two", "Early access to new services", "Complimentary add-ons"] },
];

/** The fine print that applies to every plan — same on the pricing and membership pages. */
export const membershipTerms = [
  "Month-to-month. Cancel or pause anytime with 7 days' notice before your billing date.",
  "Unused credits roll over for 90 days, so a busy month never goes to waste.",
  "Credits are transferable — send a friend in your place whenever you like.",
  "Member pricing stacks with package savings, but not with promo codes.",
];

/* ============================================================
   PREPAID SERIES (buy four, fifth is on us)
   ============================================================ */
export interface PrepaidSeries {
  slug: string;
  name: string;
  description: string;
  /** Sessions you receive. */
  sessions: number;
  /** Sessions you actually pay for. */
  paidSessions: number;
  /** Single-session à la carte price. */
  sessionPrice: number;
  price: number;
  value: number;
  validFor: string;
  popular?: boolean;
}

export const prepaidSeries: PrepaidSeries[] = [
  { slug: "cut-style-five", name: "Cut & Style Five", description: "Five haircut-and-blow-dry visits, so your shape never has a chance to drop.", sessions: 5, paidSessions: 4, sessionPrice: 35, price: 140, value: 175, validFor: "12 months" },
  { slug: "signature-facial-five", name: "Signature Facial Five", description: "The series our estheticians actually recommend — five Signature Facials spaced four to six weeks apart.", sessions: 5, paidSessions: 4, sessionPrice: 55, price: 220, value: 275, validFor: "12 months", popular: true },
  { slug: "hair-spa-five", name: "Hair Spa Five", description: "Five deep-conditioning hair spas to rebuild colour-treated or heat-tired hair.", sessions: 5, paidSessions: 4, sessionPrice: 38, price: 152, value: 190, validFor: "12 months" },
  { slug: "massage-five", name: "Deep Tissue Five", description: "Five 60-minute deep tissue sessions — the honest fix for a desk-and-commute back.", sessions: 5, paidSessions: 4, sessionPrice: 75, price: 300, value: 375, validFor: "12 months" },
  { slug: "mani-pedi-five", name: "Mani-Pedi Five", description: "Five manicure-and-pedicure visits. Book them monthly and you are covered until next spring.", sessions: 5, paidSessions: 4, sessionPrice: 38, price: 152, value: 190, validFor: "12 months" },
  { slug: "brow-ten", name: "Brow Shaping Ten", description: "Ten threading visits for the price of eight — brows stay sharp on a three-week cycle.", sessions: 10, paidSessions: 8, sessionPrice: 10, price: 80, value: 100, validFor: "12 months" },
];

/* ============================================================
   TESTIMONIALS
   ============================================================ */
export interface Testimonial {
  id: string;
  name: string;
  service: string;
  rating: number;
  date: string;
  text: string;
  imageKey: SalonImageKey;
  imageIndex: number;
  source: "Google" | "Instagram" | "In-salon" | "Yelp";
  detail?: string;
}

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Sneha Iyer", service: "Balayage & Highlights", rating: 5, date: "2 weeks ago", text: "Meera understood exactly what I wanted — soft, sun-kissed and low-maintenance. The balayage grew out beautifully and I've had so many compliments. Best colour experience in the city, hands down.", imageKey: "testimonial1", imageIndex: 0, source: "Google", detail: "Bay Area" },
  { id: "t2", name: "Divya Menon", service: "Bridal Makeup", rating: 5, date: "1 month ago", text: "Kavya did my wedding and reception looks and I felt like the best version of myself. The makeup lasted 14 hours through tears, hugs and dancing. The trial a month before put me completely at ease.", imageKey: "testimonial2", imageIndex: 0, source: "Google", detail: "Bride" },
  { id: "t3", name: "Aishwarya K", service: "Keratin Treatment", rating: 5, date: "3 weeks ago", text: "My frizz is finally gone. Rohan explained the whole process and the aftercare routine. Three weeks in and my hair still looks like a salon blowout every morning. Worth every dollar.", imageKey: "testimonial1", imageIndex: 1, source: "Yelp", detail: "Regular" },
  { id: "t4", name: "Ritu Sharma", service: "Signature Facial", rating: 5, date: "1 week ago", text: "Priya's facial analysis was so thorough — she picked up on dehydration no one else had. My skin glowed for days after. I've now booked monthly sessions with her.", imageKey: "testimonial2", imageIndex: 1, source: "Google", detail: "Member" },
  { id: "t5", name: "Lakshmi N", service: "Women's Haircut & Styling", rating: 5, date: "2 months ago", text: "Ananya gave me the curtain bangs I'd been scared to try for years. She explained exactly how they'd suit my face shape and how to style them. The cut has grown out beautifully — going back for sure.", imageKey: "testimonial1", imageIndex: 2, source: "Instagram", detail: "First visit" },
  { id: "t6", name: "Pooja Hegde", service: "Party Ready Package", rating: 5, date: "3 weeks ago", text: "Booked the Party Ready package for a friend's reception. Facial, makeup, hair and nails all in one afternoon. I walked in tired and walked out glowing. Such a smooth experience.", imageKey: "testimonial2", imageIndex: 2, source: "Google", detail: "Package" },
  { id: "t7", name: "Maya Patel", service: "Hydra-Glow Facial", rating: 5, date: "2 weeks ago", text: "Got this facial 3 days before my engagement and my skin was glowing in every photo. Priya is a wizard. Booking again before the wedding.", imageKey: "testimonial1", imageIndex: 3, source: "In-salon", detail: "Bride-to-be" },
  { id: "t8", name: "Carla Mendes", service: "Deep Tissue Massage", rating: 5, date: "1 month ago", text: "I carry all my stress in my shoulders and Priya worked out knots I didn't know I had. Walked out feeling two inches taller. Best massage in Hayes Valley.", imageKey: "testimonial2", imageIndex: 3, source: "Yelp", detail: "Monthly regular" },
  { id: "t9", name: "Jennifer Liu", service: "Nail Art & Extensions", rating: 5, date: "1 week ago", text: "Sara recreated a chrome design I saw on Instagram and it came out even better. Three weeks in and not a chip. I'm a regular for life now.", imageKey: "testimonial1", imageIndex: 4, source: "Google", detail: "Nail art lover" },
  { id: "t10", name: "Fatima Khan", service: "Global Hair Color", rating: 5, date: "3 weeks ago", text: "First time colouring my hair and Meera made me feel so comfortable. She talked me through the shade and the patch test. The result is gorgeous and my hair feels healthy.", imageKey: "testimonial2", imageIndex: 4, source: "Google", detail: "First-time colour" },
  { id: "t11", name: "Emily Chen", service: "Aromatherapy Spa", rating: 5, date: "2 months ago", text: "The most relaxing 60 minutes of my month. The foot soak, the custom oil blend, the massage — I nearly fell asleep. Booked my next one before I left.", imageKey: "testimonial1", imageIndex: 5, source: "In-salon", detail: "Member" },
  { id: "t12", name: "Grace Kim", service: "Bridal Makeup", rating: 5, date: "6 weeks ago", text: "Kavya and her team did me, my mom and 4 bridesmaids — all on time, all stunning. She kept everyone calm on a stressful morning. I cannot recommend Lumière bridal enough.", imageKey: "testimonial2", imageIndex: 5, source: "Google", detail: "Bride" },
];

/* ============================================================
   BLOG / BEAUTY TIPS
   ============================================================ */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Hair Care" | "Skin Care" | "Bridal" | "Trends" | "Seasonal" | "Wellness";
  author: string;
  date: string;
  readTime: string;
  imageKey: SalonImageKey;
  imageIndex: number;
  tags: string[];
  content: string[];
}

export const blogPosts: BlogPost[] = [
  { slug: "balayage-for-indian-hair", title: "Balayage for Every Skin Tone: A Complete Guide", excerpt: "Everything you need to know about balayage — tones that flatter your skin, maintenance, and what to expect at your appointment.", category: "Hair Care", author: "Meera Nair", date: "Oct 12, 2025", readTime: "6 min read", imageKey: "galleryColor", imageIndex: 9, tags: ["Balayage", "Hair Color", "Trends"], content: ["Balayage has become one of the most-requested colour services at Lumière, and for good reason. Unlike traditional foils that create uniform brightness from the root, balayage is a freehand painting technique that produces soft, sun-kissed dimension with no harsh regrowth line. It is the lowest-maintenance way to add brightness and movement to your hair.", "For warm skin tones specifically, we recommend warm tones — caramel, toffee, soft copper and honey — over ashy or platinum shades. Warm tones complement the yellow and olive undertones in your skin and grow out softly. Ash tones, by contrast, can clash and require more upkeep to avoid brassiness.", "A typical balayage appointment takes 2.5 to 3 hours. We start with a consultation to understand the look you want and your maintenance preference. Your colourist then hand-paints each strand, focusing lightness around your face and ends. The colour is processed, toned to neutralise brass, and finished with a gloss and blow-dry.", "To keep your balayage looking fresh, use a purple shampoo once a week, deep condition every two weeks, and book a gloss refresh every 6–8 weeks. With proper care, a balayage can last 4–6 months before needing a full repaint.", "Considering balayage? Book a free consultation with our colour team — we'll assess your hair, discuss your options, and create a look that's uniquely yours."] },
  { slug: "winter-skincare-routine", title: "Your Winter Skincare Routine, Simplified", excerpt: "Cold weather strips moisture from skin. Here's a simple, effective routine to keep skin hydrated and glowing all winter.", category: "Seasonal", author: "Priya Shetty", date: "Nov 3, 2025", readTime: "5 min read", imageKey: "blogSkin", imageIndex: 0, tags: ["Skin Care", "Winter", "Hydration"], content: ["Winter air — both cold outdoors and dry from indoor heating — pulls moisture from your skin, leaving it tight, dull and sometimes flaky. The fix isn't a dozen new products; it's a few smart swaps.", "Swap your gel cleanser for a cream or oil-based one. Gel cleansers are great in humidity but strip winter skin. A cream cleanser removes makeup and grime while leaving your lipid barrier intact.", "Layer a hydrating serum with hyaluronic acid under your moisturiser. Apply it to slightly damp skin — hyaluronic acid needs water to bind to. Follow with a richer moisturiser than you'd use in summer.", "Don't skip SPF. UV rays are present year-round and winter sun can still cause pigmentation. Choose a broad-spectrum SPF 50 and reapply if you're outdoors.", "Once a week, exfoliate gently with lactic acid or a mild enzyme mask to remove dead cell buildup. Avoid harsh scrubs that can worsen winter sensitivity. And book a hydrating facial monthly — professional hydration makes a visible difference you can't get at home."] },
  { slug: "pre-bridal-timeline", title: "The 3-Month Pre-Bridal Beauty Timeline", excerpt: "A month-by-month guide to skin, hair and self-care for the bride-to-be. Start early, glow naturally.", category: "Bridal", author: "Kavya Reddy", date: "Sep 20, 2025", readTime: "7 min read", imageKey: "bridal", imageIndex: 4, tags: ["Bridal", "Skincare", "Planning"], content: ["The secret to that effortless bridal glow isn't a last-minute facial — it's a steady, months-long routine. Here's the timeline we recommend to every bride who books with us.", "Three months out: Start monthly facials with your therapist. This is also the time to begin any hair treatments like keratin or colour, so they settle before the wedding. Begin a consistent home skincare routine with your therapist's guidance.", "Two months out: Schedule your bridal makeup trial. Bring your outfit swatches, jewellery and reference photos. Finalise the look so the wedding-day appointment is stress-free. Book hair spa every two weeks.", "One month out: Avoid any new treatments or products — this is not the time to experiment. Stick to what your skin knows. Get your final facial 5–7 days before the wedding. Avoid waxing or threading in the last 3 days.", "The week of: Hydrate well, sleep 8 hours, and avoid salt and alcohol to reduce puffiness. On the day, arrive with clean, moisturised skin. Your artist will handle the rest — relax and enjoy the most beautiful day."] },
  { slug: "curly-hair-routine", title: "Caring for Curly Hair: A Stylist's Routine", excerpt: "Curls need moisture, gentle handling and the right cut. Here's how to keep your curls defined and frizz-free.", category: "Hair Care", author: "Ananya Rao", date: "Aug 28, 2025", readTime: "6 min read", imageKey: "galleryHaircut", imageIndex: 6, tags: ["Curly Hair", "Hair Care", "Routine"], content: ["Curly hair is drier than straight hair because natural oils from the scalp take longer to travel down the curl pattern. The foundation of curl care is moisture — lots of it, and often.", "Wash with a sulphate-free shampoo no more than twice a week. Sulphates strip natural oils that curls desperately need. Co-wash (conditioner-only wash) in between if your scalp feels fine.", "Apply a leave-in conditioner and a curl cream to soaking-wet hair, scrunching upward. Never towel-rub — use a cotton t-shirt or microfibre towel to gently squeeze out water. Diffuse on low or air-dry.", "Refresh curls on day two and three with a spray bottle of water and a little leave-in. Avoid touching dry curls — that causes frizz. Sleep on a silk pillowcase to reduce friction.", "Most importantly, get a cut specifically for curls. A dry cut, curl-by-curl, lets your stylist see each curl's natural pattern and shape your hair accordingly. Book with a curl-trained stylist every 10–12 weeks."] },
  { slug: "festival-beauty-tips", title: "Festival-Proof Beauty: Looks That Last All Night", excerpt: "From sweat-proof makeup to quick touch-ups, here's how to stay radiant through every festival celebration.", category: "Trends", author: "Kavya Reddy", date: "Oct 20, 2025", readTime: "5 min read", imageKey: "galleryMakeup", imageIndex: 3, tags: ["Makeup", "Festival", "Long-wear"], content: ["Festival season means long hours, dancing and cameras — your beauty look needs to keep up. Here are our pro tips for festival-proof makeup.", "Start with a mattifying primer on the T-zone and a hydrating one on the cheeks. This balances oil control with a natural glow. Use a long-wear foundation and set with a thin layer of translucent powder only where you shine.", "For eyes, use a cream shadow as a base, then layer powder shadow on top — this doubles the wear. Waterproof mascara and liner are non-negotiable. Finish with a setting spray.", "Carry a small touch-up kit: blotting papers, a mini powder, your lipstick. Blot first, then powder — never powder over sweat, or you'll get a cakey finish.", "For hair, prep with a texturising spray so styles hold longer. An updo or half-up style survives dancing better than loose hair. Finish with a flexible-hold hairspray.", "Most importantly, hydrate from within. Drink water through the day — dehydrated skin looks dull no matter how good the makeup. Book a hydrating facial a few days before for that lit-from-within glow."] },
  { slug: "hair-fall-solutions", title: "Hair Fall: What Actually Works", excerpt: "Stress, diet, hormones and scalp health all play a role. Here's an honest, expert guide to reducing hair fall.", category: "Wellness", author: "Rohan Kapoor", date: "Jul 15, 2025", readTime: "8 min read", imageKey: "blogHair", imageIndex: 0, tags: ["Hair Fall", "Scalp Care", "Wellness"], content: ["Hair fall is one of the most common concerns we hear — and one of the most misunderstood. First, some context: losing 50–100 hairs a day is normal. Noticeable thinning or clumps in the drain is not, and deserves attention.", "The causes are varied. Stress, post-illness shedding, thyroid imbalance, iron or vitamin D deficiency, post-pregnancy hormones and harsh styling can all trigger fall. Identify the trigger and you're halfway to a solution.", "Start with the basics: a balanced diet with enough protein, iron and biotin. Stay hydrated. Manage stress with sleep and movement. These alone can reduce fall within 3–4 months.", "Scalp health matters enormously. A monthly hair spa improves circulation and removes buildup. Use a gentle, sulphate-free shampoo. Avoid tight hairstyles that pull on the roots.", "If fall persists beyond three months despite good habits, see a dermatologist. Clinical causes like androgenetic alopecia need medical treatment, not salon care alone. We're happy to refer trusted specialists."] },
  { slug: "facial-frequency-guide", title: "How Often Should You Really Get a Facial?", excerpt: "Monthly? Seasonally? The answer depends on your skin. Here's our therapist's guide to facial frequency.", category: "Skin Care", author: "Priya Shetty", date: "Jun 8, 2025", readTime: "4 min read", imageKey: "facial", imageIndex: 5, tags: ["Facials", "Skin Care", "Routine"], content: ["'How often should I get a facial?' is the question I hear most. The short answer: every 4–6 weeks for most skin types. Here's why — and the exceptions.", "Your skin renews itself roughly every 28 days. A facial timed to this cycle supports natural renewal, keeping skin clear, glowing and balanced. Monthly facials are the sweet spot for maintenance.", "If you're targeting a specific concern — acne, pigmentation, ageing — we may recommend a course of 6–8 weekly sessions, then drop to monthly maintenance. Your therapist will personalise this.", "Seasonal changes also matter. Book a hydrating facial at the start of winter, a brightening facial at the start of summer. Your skin's needs shift with the weather.", "And remember: the best facial is the one you'll actually book consistently. A monthly facial you keep beats a quarterly one you skip. Find a rhythm that fits your life and budget."] },
  { slug: "scalp-care-guide", title: "Scalp Care Is the New Skin Care", excerpt: "A healthy scalp is the foundation of healthy hair. Here's how to care for yours — and why it matters.", category: "Hair Care", author: "Rohan Kapoor", date: "May 22, 2025", readTime: "5 min read", imageKey: "hairTreatment", imageIndex: 5, tags: ["Scalp", "Hair Care", "Wellness"], content: ["Your scalp is skin — and like the skin on your face, it needs care. A healthy scalp grows healthy hair. An unhealthy one sheds more, gets oily or flaky, and can even slow growth.", "Start by knowing your scalp type: oily, dry, balanced or sensitive. Your shampoo should match. Oily scalps benefit from a clarifying shampoo weekly; dry scalps need gentle, moisturising formulas.", "Exfoliate your scalp once a week with a scalp scrub or a chemical exfoliant. This removes product buildup and dead skin that can clog follicles. Be gentle — the scalp is delicate.", "Massage your scalp daily for 2 minutes. This boosts circulation, which feeds the follicles. A hair spa monthly takes this further with professional pressure-point techniques.", "Avoid hot water — it strips natural oils and can trigger irritation. Wash with warm or cool water. And never sleep with wet hair — it creates a damp environment that encourages bacteria and fungus."] },
];

/* ============================================================
   FAQ (general)
   ============================================================ */
export interface Faq { q: string; a: string; category: string; }

export const faqs: Faq[] = [
  { category: "Booking", q: "How do I book an appointment?", a: "Book online through our website or email us at bookings@lumierebeauty.com. Online booking is fastest — you get instant confirmation and can see real-time stylist availability." },
  { category: "Booking", q: "Can I choose my stylist?", a: "Absolutely. You can pick any stylist based on their expertise, or let us recommend one for your service. Senior stylists and our Creative Director are in higher demand, so we recommend booking 1–2 weeks ahead." },
  { category: "Booking", q: "Do you accept walk-ins?", a: "We do, subject to stylist availability. To avoid a wait, we always recommend booking ahead, especially on weekends and evenings." },
  { category: "Booking", q: "How early should I arrive?", a: "Please arrive 5–10 minutes before your appointment to settle in and enjoy a complimentary beverage. First-time clients should arrive 10 minutes early for a brief consultation." },
  { category: "Booking", q: "Can I book a group or bridal party?", a: "Yes! We host bridal parties, birthday groups and corporate pampering events. Please call or email us at least 2 weeks in advance to arrange." },
  { category: "Pricing", q: "Are the prices on the website final?", a: "Prices shown are starting prices and vary by stylist seniority (Junior, Senior, Master, Director) and hair length or density. Your stylist will confirm the exact price after a free consultation before beginning any service." },
  { category: "Pricing", q: "Do you offer student discounts?", a: "Yes — show a valid student ID Monday to Thursday and get 15% off haircuts, hair spa and nail services. See our Offers page for current promotions." },
  { category: "Pricing", q: "What payment methods do you accept?", a: "We accept cash, all major cards (Visa, Mastercard, Amex), Apple Pay, Google Pay and contactless. Gift cards are available in any denomination." },
  { category: "Pricing", q: "Do you offer price matching?", a: "We don't price-match, but we're transparent about our pricing and the expertise behind it. Our prices reflect premium products, certified stylists and a hygiene-first experience." },
  { category: "Pricing", q: "Is there a service charge or gratuity?", a: "Gratuity is never required but always appreciated. There's no automatic service charge added to your bill." },
  { category: "Cancellation", q: "What is your cancellation policy?", a: "We kindly ask for 4 hours' notice to cancel or reschedule. Repeated no-shows may require a deposit for future bookings. Bridal bookings have a separate policy shared at the time of booking." },
  { category: "Cancellation", q: "Can I reschedule my appointment?", a: "Yes, free of charge with 4 hours' notice. Just use the reschedule link in your confirmation email." },
  { category: "Cancellation", q: "What if I'm running late?", a: "Email us as soon as you can — we'll do our best to accommodate. If you're more than 15 minutes late, we may need to shorten your service or reschedule to respect the next client's appointment." },
  { category: "Services", q: "Are your products safe for sensitive skin?", a: "We use premium, salon-grade products and offer sensitive-skin alternatives for every service. Please inform your stylist of any allergies during consultation." },
  { category: "Services", q: "Do you offer services for kids?", a: "Yes! We have a dedicated kids' haircut service for children aged 2–12, with patient stylists and a kid-friendly chair. We also offer gentle threading for teens." },
  { category: "Services", q: "Do you provide bridal services at home or venue?", a: "Yes. Our bridal team travels across the Bay Area for weddings and related functions. Outstation travel is available on request — please mention this when booking." },
  { category: "Services", q: "Can I get a consultation before booking a service?", a: "Yes, consultations are free and encouraged for colour, keratin and bridal services. Book a 10-minute slot and your stylist will assess your hair and recommend the right service." },
  { category: "Services", q: "Do you do men's haircuts?", a: "Lumière is a women's salon, but we welcome all clients for most services. For men's-specific cuts, we're happy to recommend a partner barber." },
  { category: "Hygiene", q: "What hygiene measures do you follow?", a: "All tools are sterilised in a UV steriliser between clients. Towels are single-use and laundered at 90°C. Wax is single-use, and nail tools are either disposable or autoclaved. Your safety is non-negotiable." },
  { category: "Hygiene", q: "Can I bring my own products?", a: "We use premium, professional products chosen for results and safety. If you have a specific allergy or preference, please discuss with your stylist — we'll do our best to accommodate." },
  { category: "Membership", q: "How does the membership work?", a: "Members pay a monthly fee for discounted services, complimentary treatments and priority booking. You can pause or cancel anytime with 30 days' notice — no lock-in." },
  { category: "Membership", q: "Can I share my membership?", a: "Luxe and Élite members get a 'bring-a-friend' perk — your friend receives 20% off their first service. The membership itself is per person." },
  { category: "Membership", q: "Do unused treatments roll over?", a: "Complimentary monthly treatments don't roll over, encouraging you to enjoy them each month. Unused service discounts don't apply — you simply get your discount on every service you book." },
  { category: "Gift Cards", q: "Do you sell gift cards?", a: "Yes — digital and physical gift cards in any denomination. They never expire and can be used for any service or product. Order online or in-salon." },
  { category: "Gift Cards", q: "Can I get a refund on a gift card?", a: "Gift cards are non-refundable but transferable — you can gift them to anyone. They never expire." },
  { category: "Parking", q: "Is there parking nearby?", a: "Yes — we validate parking at the Octavia Street garage (first 2 hours free). There's also street parking on Hayes and parallel streets. Bike racks are available on Hayes." },
];

/* ============================================================
   ABOUT — values, certifications, awards, brands, timeline
   ============================================================ */
export const salonValues = [
  { title: "Care First", description: "Every service starts with a consultation. We listen, then we style.", icon: "heart" },
  { title: "Honest Pricing", description: "Transparent pricing with no surprises. You approve before we begin.", icon: "shield" },
  { title: "Hygiene, Always", description: "Single-use tools, UV-sterilised equipment and 90°C-laundered towels.", icon: "sparkles" },
  { title: "Continuous Learning", description: "Our stylists train every quarter with global brands.", icon: "award" },
];

export const salonTimeline = [
  { year: "2014", title: "Lumière opens", description: "Ananya Rao opens Lumière in Hayes Valley with 3 chairs and a vision." },
  { year: "2016", title: "Bridal division launches", description: "Kavya Reddy joins to lead our now-famous bridal team." },
  { year: "2018", title: "Skin & spa suite", description: "We expand with private treatment rooms for facials and spa therapies." },
  { year: "2020", title: "Hygiene-first commitment", description: "We invest in hospital-grade sterilisation and single-use protocols." },
  { year: "2022", title: "Awards & recognition", description: "Named Best Salon in Hayes Valley and L'Oréal Colour Salon of the Year." },
  { year: "2024", title: "640+ brides styled", description: "Our bridal team celebrates a milestone and counting." },
];

export const certifications = [
  "L'Oréal Professionnel Partner Salon",
  "Wella Master Studio",
  "Kérastase Preferred Salon",
  "CIDESCO Accredited Skin Clinic",
  "Dermalogica Skin Bar Partner",
  "Olaplex Salon Certified",
];

export const awards = [
  { year: "2024", title: "Best Salon in Hayes Valley — SF Beauty Awards" },
  { year: "2023", title: "Bridal Artist of the Year (Kavya Reddy) — Vogue" },
  { year: "2022", title: "Colour Salon of the Year — L'Oréal Trophy" },
  { year: "2022", title: "Top 10 Salons in San Francisco — Wellness Mirror" },
  { year: "2021", title: "Best Facial in SF — SF Weekly" },
  { year: "2020", title: "Hygiene Excellence Award — Beauty Industry Council" },
];

export const brandsUsed = [
  "L'Oréal Professionnel", "Kérastase", "Wella Professionals", "Schwarzkopf BC",
  "Olaplex", "Oribe", "MAC Cosmetics", "Bobbi Brown", "Charlotte Tilbury",
  "Dermalogica", "Image Skincare", "O3+", "OPI", "Essie", "Forest Essentials", "Kama Ayurveda",
];

export const sustainabilityInitiatives = [
  { title: "Refill programme", description: "Bring back empty product bottles for $2 off your refill." },
  { title: "Green energy", description: "Our salon runs on 100% renewable electricity." },
  { title: "Towel recycling", description: "Retired towels are donated to local animal shelters." },
  { title: "Cruelty-free", description: "We prioritise cruelty-free and vegan product lines." },
];

export const communityWork = [
  { title: "Women's shelter partnerships", description: "Quarterly free grooming and confidence sessions at Bay Area women's shelters." },
  { title: "Vocational training", description: "A portion of every bridal package funds vocational training for women re-entering the workforce." },
  { title: "Student mentorship", description: "We offer paid internships to cosmetology students from local schools each quarter." },
  { title: "Beauty for all", description: "Monthly free haircut days for seniors and those experiencing financial hardship." },
];

export const careers = [
  { title: "Senior Hair Stylist", location: "Hayes Valley, San Francisco", type: "Full-time", experience: "5+ years", description: "Lead a chair at SF's most-loved salon. L'Oréal or Wella certification preferred. We offer the city's best commission structure and ongoing international training." },
  { title: "Bridal Makeup Artist", location: "Hayes Valley, San Francisco", type: "Full-time / Freelance", experience: "3+ years", description: "Join Kavya's bridal team. Must have a strong portfolio of bridal and HD makeup. Wedding-season workload with premium compensation." },
  { title: "Skin Therapist", location: "Hayes Valley, San Francisco", type: "Full-time", experience: "2+ years", description: "CIDESCO or Dermalogica certification preferred. Deliver facials, skin analysis and spa therapies to our discerning clientele." },
  { title: "Nail Artist", location: "Hayes Valley, San Francisco", type: "Full-time", experience: "2+ years", description: "Lead our nail studio. Must be skilled in gel, extensions and nail art. OPI or Gelish certification preferred." },
  { title: "Salon Receptionist", location: "Hayes Valley, San Francisco", type: "Full-time", experience: "1+ years", description: "Be the warm first impression of Lumière. Manage bookings, greet clients and keep the front-of-house running smoothly." },
  { title: "Cosmetology Intern", location: "Hayes Valley, San Francisco", type: "Internship", experience: "Student", description: "Paid quarterly internship for cosmetology students. Shadow senior stylists, assist on the floor, and build your skills." },
];

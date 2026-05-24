const express = require('express');
const router = express.Router();

// ── Restaurant Data ──
const restaurant = {
  name: 'Spice Mandal',
  tagline: 'Authentic Indian Fine Dining',
  established: '2012',
  phone: '+91 98765 43210',
  email: 'reservations@spicemandal.in',
  address: {
    street: '12, Connaught Place',
    area: 'Inner Circle, Block F',
    city: 'New Delhi',
    state: 'Delhi',
    pin: '110001',
    full: '12, Connaught Place, Inner Circle, New Delhi – 110001'
  },
  hours: {
    weekdays: { days: 'Mon – Thu', time: '12:00 PM – 11:00 PM' },
    weekend:  { days: 'Fri – Sat', time: '12:00 PM – 11:30 PM' },
    sunday:   { days: 'Sunday',    time: '12:00 PM – 10:30 PM' }
  },
  social: {
    instagram: 'https://instagram.com/spicemandal',
    facebook:  'https://facebook.com/spicemandal',
    twitter:   'https://twitter.com/spicemandal'
  }
};

const awards = [
  { icon: '⭐', label: 'Times Food\nAward 2024' },
  { icon: '🏆', label: 'Best Fine Dining\nDelhi 2023' },
  { icon: '🌿', label: '100% Organic\nIngredients' },
  { icon: '4.8', label: 'Google\nRating' }
];

const menu = {
  starters: [
    { tag: '🌿 Vegetarian', name: 'Galouti Kebab', desc: 'Melt-in-mouth minced lamb patties, kewra water, saffron, rosewater chutney — a Lucknowi legend', price: '₹580', badges: ['GF'] },
    { tag: '🔥 Chef\'s Pick', name: 'Tandoori Jhinga', desc: 'Tiger prawns, yoghurt marinade, ajwain, charcoal-fired tandoor, mint coriander chutney', price: '₹720', badges: ['GF', 'DF'] },
    { tag: '🏆 Signature', name: 'Dahi Ke Sholay', desc: 'Crispy hung curd rolls, pomegranate, walnut, tamarind & date chutney, micro herbs', price: '₹420', badges: ['V', 'VG'] },
    { tag: '🦀 Coastal', name: 'Malabar Crab Tikka', desc: 'Kerala blue swimmer crab, coconut yoghurt, curry leaf oil, raw mango salsa', price: '₹880', badges: ['GF'] }
  ],
  mains: [
    { tag: '🔥 Wood-Fired', name: 'Dal Makhani Spice Mandal', desc: 'Black urad lentils slow-cooked 72 hours over coal, hand-churned butter, cream, secret masala blend', price: '₹680', badges: ['V', 'GF'] },
    { tag: '🏆 Signature', name: 'Raan-e-Mandal', desc: 'Whole leg of lamb, 24-hour papaya marinade, dum-cooked in sealed handi, saffron jus, warqi paratha', price: '₹1,800', badges: ['GF'] },
    { tag: '🌿 Vegetarian', name: 'Subz Dum Biryani', desc: 'Seasonal vegetables, aged Basmati, saffron, caramelised onion, mint, edible silver leaf', price: '₹760', badges: ['V', 'GF'] },
    { tag: '🦞 Coastal', name: 'Butter Pepper Lobster Masala', desc: 'Fresh Andaman lobster, Chettinad pepper masala, curry leaf butter, appam', price: '₹2,400', badges: ['GF'] }
  ],
  desserts: [
    { tag: '🥇 Heritage', name: 'Shahi Tukda', desc: 'Double bread fried in ghee, reduced rabri, Banarasi saffron, pistachios, edible rose', price: '₹380', badges: ['V'] },
    { tag: '🌿 Seasonal', name: 'Mango Phirni', desc: 'Alphonso mango, rice milk phirni set in clay pot, cardamom, rose water, chironji nuts', price: '₹320', badges: ['V', 'GF'] },
    { tag: '🔥 Chef\'s Pick', name: 'Gulab Jamun Cheesecake', desc: 'Indo-fusion: house gulab jamun, mascarpone cheesecake base, kesar caramel, pistachio dust', price: '₹420', badges: ['V'] },
    { tag: '🍵 Classic', name: 'Kulfi Falooda', desc: 'Hand-churned pistachio kulfi, rose falooda, sabja seeds, vermicelli, condensed milk', price: '₹360', badges: ['V', 'GF'] }
  ],
  drinks: [
    { tag: '🍹 Signature', name: 'Mandal Mule', desc: 'Ginger beer, fresh tulsi, kokum shrub, lime, Himalayan salt rim', price: '₹380' },
    { tag: '🥛 Heritage', name: 'Thandai Martini', desc: 'Spiced thandai milk, cardamom, fennel, rose, served over ice with silver leaf garnish', price: '₹420' },
    { tag: '🫚 Non-Alcoholic', name: 'Aam Panna Spritz', desc: 'Raw mango, cumin, black salt, mint, sparkling water — the classic Indian summer cooler', price: '₹280' },
    { tag: '☕ After Dinner', name: 'Masala Chai Old Fashioned', desc: 'Aged single malt, house chai concentrate, cardamom bitters, orange twist', price: '₹580' }
  ]
};

const chefs = [
  {
    emoji: '👨‍🍳',
    badge: 'Head Chef',
    award: 'Times Food\nAward 2024',
    name: 'Arjun Sharma',
    role: 'Executive Chef & Co-Founder',
    bio: 'Trained at IHM Mumbai and honed his craft at Bukhara & Dum Pukht. Chef Arjun pioneered modern Awadhi cuisine in Delhi, earning the Times Food Award for Best Chef three years running.'
  },
  {
    emoji: '👩‍🍳',
    badge: 'Pastry Chef',
    award: 'India\'s Best\nMithai Artisan',
    name: 'Priya Nair',
    role: 'Head Pastry & Mithai Chef',
    bio: 'A graduate of the Culinary Academy of India, Chef Priya reimagines traditional Indian sweets with French pastry technique — creating desserts that honour heritage while surprising the palate.'
  },
  {
    emoji: '🧑‍🍳',
    badge: 'Sommelier',
    award: 'Wine & Spirits\nIndia Certified',
    name: 'Rohan Malhotra',
    role: 'Beverage Director & Sommelier',
    bio: 'Certified by Wine & Spirits Education Trust, Rohan curates a cellar spanning Indian craft spirits, Himalayan wines, and global labels — each pairing chosen to elevate authentic Indian flavours.'
  }
];

const testimonials = [
  {
    stars: '★★★★★',
    text: 'The Raan-e-Mandal is the finest lamb preparation I have had anywhere in the country. Chef Arjun\'s kitchen understands spice like poetry — every layer revealing something new. An extraordinary evening.',
    initials: 'RV',
    name: 'Raghav Verma',
    source: 'The Hindu — Food Critic'
  },
  {
    stars: '★★★★★',
    text: 'We hosted our entire wedding party here and every single guest was completely blown away. The Galouti Kebab starter alone had the elders from Lucknow saying it was the best they\'d ever tasted.',
    initials: 'PA',
    name: 'Preethi & Aditya',
    source: 'Mumbai, Maharashtra'
  },
  {
    stars: '★★★★★',
    text: 'In twelve years of writing about Indian food, Spice Mandal stands apart. It is the rare restaurant that can simultaneously honour tradition and innovate with total confidence. A must-visit in Delhi.',
    initials: 'SM',
    name: 'Sonal Mehta',
    source: 'Condé Nast Traveller India'
  }
];

const experiences = [
  {
    emoji: '🏺',
    num: '01 / 03',
    title: 'Heirloom\nRecipes',
    body: 'Over 60 recipes sourced directly from royal Rajput and Mughal courts — cooked the same way they were 400 years ago, with the finest ingredients available today.'
  },
  {
    emoji: '🌶️',
    num: '02 / 03',
    title: 'Live Tandoor\nKitchen',
    body: 'Our open kitchen features a traditional clay tandoor fired to 480°C. Watch our karigars (artisans) hand-shape naans and kebabs at your table.'
  },
  {
    emoji: '🍵',
    num: '03 / 03',
    title: 'Curated\nIndian Spirits',
    body: 'India\'s finest craft gins, single malts, and Himalayan wines — paired precisely with each course by our in-house sommelier Rohan Malhotra.'
  }
];

// ── HOME ──
router.get('/', (req, res) => {
  res.render('home', {
    title: 'Spice Mandal — Authentic Indian Fine Dining | New Delhi',
    restaurant,
    awards,
    menu,
    chefs,
    testimonials,
    experiences,
    activePage: 'home'
  });
});

// ── MENU PAGE ──
router.get('/menu', (req, res) => {
  res.render('menu', {
    title: 'Our Menu | Spice Mandal',
    restaurant,
    menu,
    activePage: 'menu'
  });
});

// ── ABOUT PAGE ──
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'Our Story | Spice Mandal',
    restaurant,
    chefs,
    activePage: 'about'
  });
});

// ── CONTACT PAGE ──
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact & Location | Spice Mandal',
    restaurant,
    activePage: 'contact'
  });
});

module.exports = router;

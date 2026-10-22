// Amazon.com Catalog - 24 Rich Products across 8 Categories
const PRODUCTS = [
  // 1. Electronics
  {
    id: 1,
    name: "Apple AirPods Pro (2nd Generation) Wireless Earbuds with Active Noise Cancelling, Transparency Mode, and USB-C MagSafe Case",
    category: "Electronics",
    brand: "Apple",
    price: 189.99,
    typicalPrice: 249.00,
    discountPercent: 24,
    rating: 4.8,
    reviewCount: 38450,
    prime: true,
    badge: "Overall Pick",
    stock: 15,
    isDealOfDay: true,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=700&q=80",
    description: "AirPods Pro feature up to 2x more Active Noise Cancellation, plus Adaptive Audio and Transparency mode. Next-level acoustics powered by the Apple H2 headphone chip.",
    features: [
      "Up to 2x more Active Noise Cancellation than the previous generation",
      "Adaptive Audio dynamically blends Transparency mode and Active Noise Cancellation",
      "Personalized Spatial Audio with dynamic head tracking surrounds you with sound",
      "Up to 6 hours of listening time with ANC enabled, 30 hours total with MagSafe Case",
      "Dust, sweat, and water resistant (IP54) for both earbuds and charging case"
    ]
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones with Auto NC Optimizer and Crystal Clear Hands-Free Calling, Black",
    category: "Electronics",
    brand: "Sony",
    price: 328.00,
    typicalPrice: 399.99,
    discountPercent: 18,
    rating: 4.7,
    reviewCount: 14210,
    prime: true,
    badge: "#1 Best Seller",
    stock: 22,
    isDealOfDay: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
    description: "The WH-1000XM5 headphones rewrite the rules for distraction-free listening. Two processors control 8 microphones for unprecedented noise cancellation.",
    features: [
      "Magnificent Sound engineered with the new Integrated Processor V1",
      "Crystal clear hands-free calling with 4 beamforming microphones",
      "Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)",
      "Ultra-comfortable, lightweight design with soft fit leather",
      "Speak-to-chat and Quick Attention mode to effortlessly pause your audio"
    ]
  },
  {
    id: 3,
    name: "Apple iPad Air 11-inch (M2): Liquid Retina Display, 128GB, Landscape 12MP Front Camera, Touch ID, All-Day Battery Life - Space Gray",
    category: "Electronics",
    brand: "Apple",
    price: 549.00,
    typicalPrice: 599.00,
    discountPercent: 8,
    rating: 4.9,
    reviewCount: 9280,
    prime: true,
    badge: "Limited time deal",
    stock: 9,
    isDealOfDay: false,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=700&q=80",
    description: "The redesigned 11-inch iPad Air is supercharged by the astonishingly fast Apple M2 chip. It features a stunning Liquid Retina display and all-day battery life.",
    features: [
      "Stunning 11-inch Liquid Retina display with P3 wide color and True Tone",
      "Apple M2 chip with 8-core CPU and 10-core GPU for phenomenal performance",
      "Landscape 12MP Ultra Wide front camera with Center Stage support",
      "Touch ID built into top button for fast, easy, and secure authentication",
      "Wi-Fi 6E connectivity for blazing fast wireless downloads and streaming"
    ]
  },

  // 2. Clothing & Fashion
  {
    id: 4,
    name: "Levi's Men's 501 Original Fit Jeans, Classic Straight Leg Stretch Denim, Rinse Finish",
    category: "Clothing",
    brand: "Levi's",
    price: 49.99,
    typicalPrice: 79.50,
    discountPercent: 37,
    rating: 4.6,
    reviewCount: 42100,
    prime: true,
    badge: "#1 Best Seller",
    stock: 50,
    isDealOfDay: true,
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=700&q=80",
    description: "The original blue jean since 1873. Iconic straight fit with signature button fly and timeless copper rivets.",
    features: [
      "100% Premium Cotton denim woven for rugged everyday durability",
      "Classic straight leg silhouette that sits comfortably at your waist",
      "Authentic signature 5-pocket styling and leather patch on back waistband",
      "Pre-shrunk fabric to retain original fit wash after wash",
      "Machine washable with cold water for optimal color preservation"
    ]
  },
  {
    id: 5,
    name: "Hanes Men's Ecosmart Fleece Crewneck Sweatshirt, Heavyweight Cotton Blend Pullover, Dark Heather",
    category: "Clothing",
    brand: "Hanes",
    price: 13.98,
    typicalPrice: 22.00,
    discountPercent: 36,
    rating: 4.5,
    reviewCount: 128900,
    prime: true,
    badge: "Overall Pick",
    stock: 80,
    isDealOfDay: false,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80",
    description: "A cozy classic fleece sweatshirt made from a warm and plush cotton-polyester blend that stays soft wash after wash.",
    features: [
      "Medium weight 7.8-oz fleece made with up to 5% recycled polyester fibers",
      "Ribbed crewneck collar, cuffs, and hem keep their shape over time",
      "Double-needle cover-seamed neck and armholes for extended longevity",
      "Tag-free collar interior eliminates scratching for pure comfort",
      "Available in over 20 everyday classic heather and solid tones"
    ]
  },
  {
    id: 6,
    name: "Amazon Essentials Women's Lightweight Water-Resistant Packable Hooded Puffer Jacket",
    category: "Clothing",
    brand: "Amazon Essentials",
    price: 39.90,
    typicalPrice: 49.90,
    discountPercent: 20,
    rating: 4.4,
    reviewCount: 31200,
    prime: true,
    badge: "Popular Pick",
    stock: 35,
    isDealOfDay: false,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce667883?auto=format&fit=crop&w=700&q=80",
    description: "Cold-weather style is easy with this versatile water-resistant lightweight puffer jacket featuring a full-zip front and contoured seams.",
    features: [
      "Shell and lining constructed from 100% durable water-resistant nylon",
      "Fills with synthetic down alternative that packs effortlessly into matching carrying pouch",
      "Contoured feminine quilting seams flatter the figure comfortably",
      "Elasticized cuffs and hood securely lock out chilly breezes",
      "Two hidden on-seam zippered exterior pockets to safeguard essentials"
    ]
  },

  // 3. Books
  {
    id: 7,
    name: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones (Hardcover) by James Clear",
    category: "Books",
    brand: "Avery Publishing",
    price: 13.79,
    typicalPrice: 27.00,
    discountPercent: 49,
    rating: 4.9,
    reviewCount: 165400,
    prime: true,
    badge: "#1 Best Seller",
    stock: 120,
    isDealOfDay: true,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies to form good habits and break bad ones.",
    features: [
      "Over 15 Million copies sold worldwide across 50+ languages",
      "Practical behavioral psychology framework broken down into 4 simple laws",
      "Includes real-world examples from Olympic gold medalists and business titans",
      "High quality hardcover edition with protective dust jacket and ribbon",
      "Contains visual habit loops, tracking templates, and cheat sheets"
    ]
  },
  {
    id: 8,
    name: "The Creative Act: A Way of Being (Deluxe Clothbound Edition) by Rick Rubin",
    category: "Books",
    brand: "Penguin Press",
    price: 19.49,
    typicalPrice: 32.00,
    discountPercent: 39,
    rating: 4.8,
    reviewCount: 18900,
    prime: true,
    badge: "Overall Pick",
    stock: 45,
    isDealOfDay: false,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80",
    description: "A profound, poetic work of wisdom by legendary nine-time Grammy-winning producer Rick Rubin on the nature of inspiration and art.",
    features: [
      "#1 New York Times Bestseller in Non-Fiction and Creative Arts",
      "Minimalist clothbound silver-embossed hardcover design",
      "78 meditative short chapters designed for daily contemplation",
      "Printed on archival heavyweight Munken book paper",
      "Endorsed by leading artists, writers, and thinkers globally"
    ]
  },
  {
    id: 9,
    name: "Lessons in Chemistry: A Novel (Hardcover) by Bonnie Garmus",
    category: "Books",
    brand: "Doubleday",
    price: 17.98,
    typicalPrice: 29.00,
    discountPercent: 38,
    rating: 4.7,
    reviewCount: 245000,
    prime: true,
    badge: "#1 Best Seller",
    stock: 65,
    isDealOfDay: false,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=700&q=80",
    description: "Meet Elizabeth Zott: a formidable, uncompromising chemist in 1960s California whose career takes an unexpected detour when she becomes the star of a beloved TV cooking show.",
    features: [
      "Goodreads Choice Award Winner for Best Debut Novel",
      "Selected as Barnes & Noble and Waterstones Book of the Year",
      "Adapted into the critically acclaimed streaming television series",
      "Compelling blend of sharp wit, feminist triumph, and heart",
      "Deluxe hardcover edition with illustrated endpapers"
    ]
  },

  // 4. Home & Kitchen
  {
    id: 10,
    name: "Ninja AF101 Air Fryer that Crisps, Roasts, Reheats, & Dehydrates, 4-Quart Capacity, High Gloss Black/Grey Finish",
    category: "Home & Kitchen",
    brand: "Ninja",
    price: 89.99,
    typicalPrice: 129.99,
    discountPercent: 31,
    rating: 4.8,
    reviewCount: 68900,
    prime: true,
    badge: "#1 Best Seller",
    stock: 28,
    isDealOfDay: true,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=700&q=80",
    description: "Now you can enjoy guilt-free fried food. Air fry with up to 75 percent less fat than traditional frying methods tested against hand-cut deep-fried French fries.",
    features: [
      "4-Quart ceramic-coated nonstick basket fits 2 lbs of french fries",
      "Wide temperature range from 105°F to 400°F allows gentle dehydrating or flash crisping",
      "One-touch control panel with 4 programmable cooking functions",
      "Dishwasher-safe parts: basket, crisper plate, and multi-layer rack",
      "1500 Watts of convection heat delivers rapid and even golden browning"
    ]
  },
  {
    id: 11,
    name: "Keurig K-Elite Single-Serve K-Cup Pod Coffee Maker with Iced Coffee Setting, Brushed Slate Finish",
    category: "Home & Kitchen",
    brand: "Keurig",
    price: 119.00,
    typicalPrice: 189.99,
    discountPercent: 37,
    rating: 4.7,
    reviewCount: 48300,
    prime: true,
    badge: "Overall Pick",
    stock: 14,
    isDealOfDay: false,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=700&q=80",
    description: "The Keurig K-Elite brewer blends a premium brushed finish and metal accents with customizable beverage brewing at the touch of a button.",
    features: [
      "Brews multiple cup sizes: 4, 6, 8, 10, and 12 oz cups in under a minute",
      "Strong Brew button boosts the strength and bold taste of your coffee flavor",
      "Iced setting brews hot over ice at the optimal temperature for rich flavor",
      "Large 75-oz removable water reservoir lets you brew 8 cups before refilling",
      "Hot water on demand button for instant soups, oatmeal, and tea"
    ]
  },
  {
    id: 12,
    name: "Lodge 6 Quart Enameled Cast Iron Dutch Oven with Lid, Dual Handles, Caribbean Blue Enamel",
    category: "Home & Kitchen",
    brand: "Lodge",
    price: 79.90,
    typicalPrice: 99.90,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 38200,
    prime: true,
    badge: "Amazon's Choice",
    stock: 18,
    isDealOfDay: false,
    image: "https://images.unsplash.com/photo-1584990347449-39b4bfa2542a?auto=format&fit=crop&w=700&q=80",
    description: "A flawless pairing of form and function that doesn't quit, the Lodge Enameled Dutch Oven is a classic for cooking and serving memorable meals.",
    features: [
      "Porcelain enamel interior is resistant to staining and does not react with acidic foods",
      "Superior heat distribution and retention of cast iron for braising, baking, and soups",
      "Oven-safe up to 500° Fahrenheit with stainless steel lid knob",
      "Tight-fitting lid seals in moisture with continuous interior condensation rings",
      "Vibrant gloss colored exterior transitions seamlessly from oven directly to dinner table"
    ]
  },

  // 5. Sports & Outdoors
  {
    id: 13,
    name: "YETI Rambler 30 oz Stainless Steel Vacuum Insulated Tumbler with MagSlider Lid, Navy",
    category: "Sports",
    brand: "YETI",
    price: 38.00,
    typicalPrice: 38.00,
    discountPercent: 0,
    rating: 4.8,
    reviewCount: 61500,
    prime: true,
    badge: "#1 Best Seller",
    stock: 40,
    isDealOfDay: false,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80",
    description: "Days on the dock are made better with the Rambler 30 oz. Tumbler. It'll keep your dinnertime drink cool well past sundown or your coffee piping hot all morning.",
    features: [
      "Made with kitchen-grade 18/8 stainless steel, puncture- and rust-resistant",
      "Double-wall vacuum insulation keeps cold drinks cold and hot drinks hot to the last sip",
      "MagSlider Lid uses the power of magnets for smooth opening and spill prevention",
      "DuraCoat color coating won't crack, peel, or fade through rugged outdoor use",
      "Dishwasher safe and fits standard size car and boat cup holders"
    ]
  },
  {
    id: 14,
    name: "Bowflex SelectTech 552 Adjustable Dumbbells (Pair), Rapid Weight Adjustment from 5 to 52.5 lbs",
    category: "Sports",
    brand: "Bowflex",
    price: 379.00,
    typicalPrice: 429.00,
    discountPercent: 12,
    rating: 4.7,
    reviewCount: 22400,
    prime: true,
    badge: "Overall Pick",
    stock: 8,
    isDealOfDay: false,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=700&q=80",
    description: "Replace 15 sets of dumbbells with a single pair. Adjusts from 5 to 52.5 lbs in 2.5 lb increments for total body home workouts.",
    features: [
      "Unique dial system lets you rapidly select weight resistance with a quick turn",
      "Space-efficient design replaces 15 individual sets of traditional dumbbells",
      "Durable molding around metal plates creates a smooth lift and quiet clank-free workout",
      "Includes 1-year JRNY Fitness membership with on-demand strength training classes",
      "Contoured ergonomic handles ensure safe, firm grip during heavy lifting sets"
    ]
  },
  {
    id: 15,
    name: "Fitbit Charge 6 Fitness Tracker with Google Apps, Heart Rate on Exercise Equipment, 6-Month Premium",
    category: "Sports",
    brand: "Fitbit",
    price: 139.95,
    typicalPrice: 159.95,
    discountPercent: 13,
    rating: 4.4,
    reviewCount: 8900,
    prime: true,
    badge: "Popular Pick",
    stock: 25,
    isDealOfDay: true,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=700&q=80",
    description: "Give your fitness routine a boost with Charge 6, the only tracker with helpful Google features built right into your wristband.",
    features: [
      "Built-in Google Maps navigation and Google Wallet contactless tap-to-pay",
      "Real-time heart rate streaming directly to compatible exercise machines (NordicTrack, Peloton)",
      "40+ exercise modes with built-in GPS for pace and outdoor distance tracking",
      "ECG sensor for atrial fibrillation detection and EDA sensor for stress management",
      "Up to 7-day battery life on a single charge and 50m water resistance"
    ]
  },

  // 6. Beauty & Personal Care
  {
    id: 16,
    name: "CeraVe Moisturizing Cream with Hyaluronic Acid and 3 Essential Ceramides for Normal to Dry Skin, 19 Ounce Jar",
    category: "Beauty",
    brand: "CeraVe",
    price: 17.78,
    typicalPrice: 19.99,
    discountPercent: 11,
    rating: 4.8,
    reviewCount: 112000,
    prime: true,
    badge: "#1 Best Seller",
    stock: 75,
    isDealOfDay: false,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80",
    description: "Developed with dermatologists, CeraVe Moisturizing Cream has a unique formula that provides 24-hour hydration and helps restore the protective skin barrier.",
    features: [
      "Formulated with 3 essential ceramides (1, 3, 6-II) that restore the natural skin barrier",
      "Patented MVE technology continually releases moisturizing ingredients for 24-hour hydration",
      "Non-comedogenic, oil-free, fragrance-free, and hypoallergenic formula",
      "National Eczema Association (NEA) Seal of Acceptance",
      "Rich velvety texture absorbs quickly without leaving a greasy or sticky residue"
    ]
  },
  {
    id: 17,
    name: "Dyson Supersonic Hair Dryer, Iron/Fuchsia with 5 Styling Attachments including Flyaway Attachment",
    category: "Beauty",
    brand: "Dyson",
    price: 399.99,
    typicalPrice: 429.99,
    discountPercent: 7,
    rating: 4.7,
    reviewCount: 15300,
    prime: true,
    badge: "Overall Pick",
    stock: 11,
    isDealOfDay: false,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80",
    description: "Engineered for different hair types, the Dyson Supersonic hair dryer dries hair quickly without extreme heat damage thanks to intelligent heat control.",
    features: [
      "Powerful Dyson digital motor V9 spins up to 110,000 rpm for ultra-fast drying",
      "Intelligent heat control measures air temperature over 40 times a second to prevent burns",
      "Air Multiplier technology produces a high-pressure, high-velocity jet of controlled air",
      "Magnetic 360° rotating styling attachments: Flyaway, Diffuser, Styling concentrator",
      "Acoustically tuned motor is engineered to reduce harsh operational noise"
    ]
  },
  {
    id: 18,
    name: "COSRX Snail Mucin 96% Power Repairing Essence Serum for Face, Hydrating & Soothing Formula, 3.38 fl oz",
    category: "Beauty",
    brand: "COSRX",
    price: 13.99,
    typicalPrice: 25.00,
    discountPercent: 44,
    rating: 4.6,
    reviewCount: 95400,
    prime: true,
    badge: "#1 Best Seller",
    stock: 90,
    isDealOfDay: true,
    image: "https://images.unsplash.com/photo-1608248597359-25f385c70624?auto=format&fit=crop&w=700&q=80",
    description: "Formulated with 96.3% Snail Secretion Filtrate, this essence repairs and rejuvenates skin from dryness and aging by replenishing essential moisture.",
    features: [
      "96.3% Snail Secretion Filtrate deeply moisturizes and improves skin elasticity",
      "Lightweight hydrating essence absorbs into skin immediately without sticky residue",
      "Soothes damaged skin, fades dark spots, and smooths uneven skin texture",
      "100% cruelty-free snail mucin harvested in ethical and environmentally friendly conditions",
      "Hypoallergenic, dermatologist-tested, free of parabens, sulfates, and phthalates"
    ]
  },

  // 7. Toys & Games
  {
    id: 19,
    name: "LEGO Icons Bonsai Tree 10281 Building Set, Botanical Collection for Adults, Customizable Blossom Branches",
    category: "Toys",
    brand: "LEGO",
    price: 39.99,
    typicalPrice: 49.99,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 31800,
    prime: true,
    badge: "#1 Best Seller",
    stock: 42,
    isDealOfDay: false,
    image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=700&q=80",
    description: "Enjoy a sense of calm as you build the LEGO Bonsai Tree model kit with classic green leaves or vibrant pink cherry blossom blooms.",
    features: [
      "Includes interchangeable pieces: classic green leaves and pink cherry blossoms",
      "Comes with a rectangular plant pot and a slatted wood-effect LEGO display stand",
      "Elements made from plant-based plastic sourced from sustainably grown sugarcane",
      "878 pieces providing a mindful, rewarding building project for adults and teens",
      "Measures over 7 inches high, 8.5 inches long, and 7.5 inches wide when displayed"
    ]
  },
  {
    id: 20,
    name: "Catan Board Game (Base Game) | Trade, Build, Settle | Family Strategy Board Game for Ages 10+",
    category: "Toys",
    brand: "CATAN Studio",
    price: 43.99,
    typicalPrice: 59.99,
    discountPercent: 27,
    rating: 4.8,
    reviewCount: 39200,
    prime: true,
    badge: "Overall Pick",
    stock: 24,
    isDealOfDay: true,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=700&q=80",
    description: "Collect and trade resource cards to build roads, settlements, and cities in the iconic game of discovery, competition, and strategy.",
    features: [
      "World-renowned modern classic board game with over 30 million copies sold",
      "Variable modular hex board ensures no two games ever play the same way",
      "3 to 4 players, 60 minutes playtime, engaging for adults, families, and teens",
      "Promotes strategic negotiation, resource management, and social engagement",
      "Winner of Game of the Century award and countless international accolades"
    ]
  },
  {
    id: 21,
    name: "Mattel Games UNO Card Game with Customizable Wild Cards and Storage Tin, Family Card Game",
    category: "Toys",
    brand: "Mattel",
    price: 6.99,
    typicalPrice: 10.99,
    discountPercent: 36,
    rating: 4.9,
    reviewCount: 88500,
    prime: true,
    badge: "#1 Best Seller",
    stock: 150,
    isDealOfDay: false,
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=700&q=80",
    description: "The classic card game of matching colors and numbers comes in a sturdy collector's tin for easy travel and storage.",
    features: [
      "112-card deck includes customizable wild cards to create your own family game rules",
      "Fast fun for everyone! Simple to learn and impossible to put down",
      "Collector's decorative tin keeps cards crisp and organized on road trips",
      "For 2 to 10 players, ages 7 and up",
      "Don't forget to shout 'UNO!' when you only have one card left!"
    ]
  },

  // 8. Automotive
  {
    id: 22,
    name: "NOCO Boost Plus GB40 1000A UltraSafe Car Battery Jump Starter, 12V Jump Pack for up to 6.0L Gas and 3.0L Diesel Engines",
    category: "Automotive",
    brand: "NOCO",
    price: 99.95,
    typicalPrice: 124.95,
    discountPercent: 20,
    rating: 4.7,
    reviewCount: 78900,
    prime: true,
    badge: "#1 Best Seller",
    stock: 30,
    isDealOfDay: true,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=80",
    description: "Safely jump start a dead battery in seconds with this compact, yet powerful 1000-amp lithium jump starter pack.",
    features: [
      "Mistake-proof design with spark-proof technology and reverse polarity protection",
      "Delivers up to 20 jump starts on a single charge for cars, trucks, motorcycles, and boats",
      "Integrated 100-lumen LED flashlight with 7 light modes including SOS and emergency strobe",
      "Recharge smartphones, tablets, and USB devices with high-speed 2.1A USB port",
      "Ultra-compact and lightweight housing weighs only 2.4 pounds with heavy-duty clamps"
    ]
  },
  {
    id: 23,
    name: "Chemical Guys HOL169 16-Piece Arsenal Builder Car Wash Kit with Foam Gun, Buckets, and Premium Soaps",
    category: "Automotive",
    brand: "Chemical Guys",
    price: 99.99,
    typicalPrice: 129.99,
    discountPercent: 23,
    rating: 4.6,
    reviewCount: 19400,
    prime: true,
    badge: "Overall Pick",
    stock: 16,
    isDealOfDay: false,
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=700&q=80",
    description: "Everything you need for a showroom shine. Connects directly to any standard garden hose to coat your vehicle with thick slick foam.",
    features: [
      "TORQ professional foam blaster connects to standard household garden hose",
      "Includes Citrus Wash & Gloss, Butter Wet Wax, Diablo Wheel Gel, and Silk Shine Dressing",
      "Heavy duty wash bucket with Dirt Trap cyclone insert prevents wash swirl marks",
      "Ultra-soft microfiber wash mitts and plush drying towels safeguard automotive clear coat",
      "Safe for all automotive finishes, vinyl wraps, glass, chrome, and alloy wheels"
    ]
  },
  {
    id: 24,
    name: "AstroAI Digital Tire Pressure Gauge 150 PSI 4 Settings for Car Truck Bicycle with Backlit LCD Screen, Silver",
    category: "Automotive",
    brand: "AstroAI",
    price: 10.99,
    typicalPrice: 15.99,
    discountPercent: 31,
    rating: 4.6,
    reviewCount: 65100,
    prime: true,
    badge: "#1 Best Seller",
    stock: 110,
    isDealOfDay: false,
    image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=700&q=80",
    description: "Lighted nozzle and display screen gives you ultimate visibility in dimly lit garages or at night roadside checks.",
    features: [
      "Accurate readings in 4 measurement ranges: 0-150 PSI, 0-10 Bar, 0-1000 KPA, 0-10 kgf/cm²",
      "Backlit LCD display and lighted nozzle tip provides clear visibility in dark conditions",
      "Simple one-button operation turns on, selects measurement range, and auto shuts off after 30s",
      "Non-slip ergonomic texture fits comfortably in the palm of your hand",
      "Maintains optimal tire pressure to reduce tire wear and improve vehicle fuel economy"
    ]
  }
];

if (typeof window !== 'undefined') {
  window.PRODUCTS = PRODUCTS;
}
if (typeof module !== 'undefined') {
  module.exports = PRODUCTS;
}

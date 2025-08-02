// seedBags.js
import mongoose from "mongoose";
import Product from "../models/productModel.js"; // adjust the path as needed
// for MongoDB URI from .env if needed

const bags = [
  {
    name: "Heritage Leather Backpack",
    type: "bag",
    price: 3499,
    imageUrl: "/bags/bag1.png",
    stock: 15,
    description: {
      short: "A handcrafted leather backpack blending style with utility.",
      long: "Crafted from premium full-grain leather, the Heritage Backpack offers a refined silhouette with practical storage. Perfect for urban professionals, students, or weekend explorers seeking durability and timeless design.",
      features: [
        "Premium full-grain leather",
        "Padded 15-inch laptop sleeve",
        "Antique brass hardware",
        "Adjustable shoulder straps",
      ],
      specifications: {
        material: "Full-Grain Leather",
        color: "Rich Black",
        dimensions: "42cm x 30cm x 12cm",
        capacity: "18L",
        care: "Wipe clean with leather conditioner",
      },
    },
  },
  {
    name: "Urban Rolltop Backpack",
    type: "bag",
    price: 2899,
    imageUrl: "/bags/bag2.png",
    stock: 25,
    description: {
      short: "A modern rolltop backpack designed for the fast-paced city life.",
      long: "With its minimalist design and functional build, the Urban Rolltop Backpack combines form and function for daily commuting. Water-resistant fabric and a spacious rolltop closure make it ideal for unpredictable weather and tech-savvy users.",
      features: [
        "Water-resistant polyester",
        "Laptop compartment up to 17-inch",
        "Magnetic rolltop buckle",
        "Hidden back pocket",
      ],
      specifications: {
        material: "900D Polyester",
        color: "Charcoal Grey",
        dimensions: "48cm x 28cm x 15cm",
        capacity: "22L",
        care: "Wipe clean with damp cloth",
      },
    },
  },
  {
    name: "Canvas Duffle Travel Bag",
    type: "bag",
    price: 1999,
    imageUrl: "/bags/bag3.png",
    stock: 30,
    description: {
      short: "A rugged duffle built for weekend getaways and road trips.",
      long: "Built from heavy-duty canvas with leather accents, this duffle bag offers classic aesthetics and impressive functionality. The spacious interior and multiple compartments make packing efficient and stylish.",
      features: [
        "Heavy-duty canvas body",
        "Removable padded shoulder strap",
        "Zippered interior pockets",
        "Leather base and handles",
      ],
      specifications: {
        material: "Waxed Canvas & Leather",
        color: "Tan Brown",
        dimensions: "55cm x 28cm x 25cm",
        capacity: "30L",
        care: "Hand wash recommended",
      },
    },
  },
  {
    name: "EcoLite Recycled Tote",
    type: "bag",
    price: 799,
    imageUrl: "/bags/bag4.png",
    stock: 50,
    description: {
      short: "An eco-conscious tote made from 100% recycled materials.",
      long: "The EcoLite Tote combines sustainability with a sleek design. Lightweight, durable, and crafted from post-consumer recycled fabric, it’s your everyday carry for groceries, books, or beach days.",
      features: [
        "100% recycled PET fabric",
        "Wide carry straps",
        "Foldable and lightweight",
        "Available in 5 color options",
      ],
      specifications: {
        material: "Recycled Polyester",
        color: "Sand Beige",
        dimensions: "38cm x 36cm x 10cm",
        capacity: "16L",
        care: "Cold wash only",
      },
    },
  },
  {
    name: "Metro Slim Messenger Bag",
    type: "bag",
    price: 2599,
    imageUrl: "/bags/bag5.png",
    stock: 20,
    description: {
      short: "A sleek messenger bag for professionals on the move.",
      long: "Designed with the city commuter in mind, the Metro Messenger features a slim, professional profile with padded compartments for laptops, tablets, and everyday essentials. Crafted for mobility and elegance.",
      features: [
        "Durable ballistic nylon exterior",
        "Internal laptop and tablet sleeves",
        "Front zipper pocket",
        "Magnetic flap closure",
      ],
      specifications: {
        material: "Ballistic Nylon",
        color: "Black",
        dimensions: "40cm x 28cm x 8cm",
        capacity: "12L",
        care: "Spot clean only",
      },
    },
  },
  {
    name: "Weekender Convertible Bag",
    type: "bag",
    price: 3199,
    imageUrl: "/bags/bag6.png",
    stock: 18,
    description: {
      short: "A versatile weekender that transforms from tote to backpack.",
      long: "Perfect for short getaways or overnight stays, the Weekender Convertible offers flexible carry options and premium organization. The rich cotton twill and reinforced leather trims deliver durability without sacrificing style.",
      features: [
        "Convertible tote/backpack straps",
        "Multiple compartments",
        "Padded bottom",
        "Zippered interior mesh pocket",
      ],
      specifications: {
        material: "Cotton Twill & Leather",
        color: "Navy Blue & White",
        dimensions: "50cm x 32cm x 20cm",
        capacity: "28L",
        care: "Dry clean only",
      },
    },
  },
  {
    name: "Compact Anti-Theft Sling Bag",
    type: "bag",
    price: 1499,
    imageUrl: "/bags/bag7.png",
    stock: 35,
    description: {
      short:
        "A compact crossbody with anti-theft features for daily essentials.",
      long: "Stay light, stay secure. The Compact Sling Bag features RFID-blocking pockets, lockable zippers, and a cut-resistant strap, all in a stylish compact design that’s ideal for city exploration and daily commutes.",
      features: [
        "RFID-protected compartments",
        "Adjustable anti-cut strap",
        "Quick-access front pocket",
        "Water-repellent fabric",
      ],
      specifications: {
        material: "Nylon & Mesh Lining",
        color: "Off White , Red , Green",
        dimensions: "30cm x 20cm x 8cm",
        capacity: "8L",
        care: "Hand wash only",
      },
    },
  },
  {
    name: "Executive Leather Briefcase",
    type: "bag",
    price: 3999,
    imageUrl: "/bags/bag8.png",
    stock: 12,
    description: {
      short: "A timeless leather briefcase for the modern professional.",
      long: "With a structured body and premium leather finish, this executive briefcase complements formal wear and provides safe storage for documents and devices. Ideal for business meetings or daily office use.",
      features: [
        "Top-grain leather construction",
        "Dedicated laptop sleeve",
        "Pen holders and card slots",
        "Detachable shoulder strap",
      ],
      specifications: {
        material: "Top-Grain Leather",
        color: "Charcoal Gray",
        dimensions: "43cm x 30cm x 10cm",
        capacity: "14L",
        care: "Use leather conditioner regularly",
      },
    },
  },
  {
    name: "Adventure Hydration Backpack",
    type: "bag",
    price: 2299,
    imageUrl: "/bags/bag9.png",
    stock: 22,
    description: {
      short: "A hydration-ready backpack made for hiking and biking.",
      long: "Engineered for outdoor activities, this backpack is hydration pack compatible and features breathable mesh support. Stay organized and energized on your adventures with this ergonomic and rugged design.",
      features: [
        "Hydration bladder ready",
        "Breathable mesh back panel",
        "Adjustable chest and waist straps",
        "Reflective accents for night safety",
      ],
      specifications: {
        material: "Ripstop Nylon",
        color: "Silver",
        dimensions: "45cm x 25cm x 14cm",
        capacity: "20L",
        care: "Rinse bladder area after use",
      },
    },
  },
  {
    name: "Vintage Satchel Bag",
    type: "bag",
    price: 1899,
    imageUrl: "/bags/bag10.png",
    stock: 28,
    description: {
      short: "A retro-styled satchel for books, gadgets, and more.",
      long: "The Vintage Satchel brings back old-school charm with modern functionality. With buckle closures and brass fittings, it’s ideal for students or creatives who value design and practicality equally.",
      features: [
        "Faux-leather straps with magnetic closure",
        "Inner laptop sleeve",
        "Adjustable shoulder strap",
        "Vintage canvas body",
      ],
      specifications: {
        material: "Canvas & Faux Leather",
        color: "Rustic Brown",
        dimensions: "40cm x 30cm x 10cm",
        capacity: "15L",
        care: "Clean with soft damp cloth",
      },
    },
  },
  {
    name: "Classic Slim Fit Chinos",
    type: "pant",
    price: 1499,
    imageUrl: "/pants/pant1.png",
    stock: 40,
    description: {
      short: "Versatile slim-fit chinos for work or weekend wear.",
      long: "Crafted from soft, breathable cotton, these chinos offer a slim silhouette that's both sharp and comfortable. Ideal for business casual and laid-back settings alike.",
      features: [
        "98% cotton, 2% elastane",
        "Stretchable fabric",
        "Button closure and zip fly",
        "Two side and back pockets",
      ],
      specifications: {
        material: "Cotton Stretch Blend",
        color: "Navy Blue",
        sizeRange: "30-38",
        care: "Machine wash cold",
      },
    },
  },
  {
    name: "Urban Jogger Pants",
    type: "pant",
    price: 1299,
    imageUrl: "/pants/pant2.png",
    stock: 35,
    description: {
      short: "Stylish joggers perfect for travel or lounging.",
      long: "Made from soft terry cotton with tapered legs and cuffed hems, these joggers combine functionality and street-ready aesthetics for daily wear.",
      features: [
        "Elastic waistband with drawstring",
        "Tapered fit with ribbed cuffs",
        "Side zipper pockets",
        "Moisture-wicking fabric",
      ],
      specifications: {
        material: "Terry Cotton",
        color: "Charcoal Grey",
        sizeRange: "28-36",
        care: "Cold gentle wash",
      },
    },
  },
  {
    name: "Heritage Denim Jeans",
    type: "pant",
    price: 1799,
    imageUrl: "/pants/pant3.png",
    stock: 50,
    description: {
      short: "Classic washed jeans with a modern fit.",
      long: "Durable and stylish, the Heritage Jeans provide a tailored fit with traditional 5-pocket design and a slightly tapered leg.",
      features: [
        "Washed denim",
        "Reinforced stitching",
        "Button fly",
        "Mid-rise waist",
      ],
      specifications: {
        material: "100% Cotton Denim",
        color: "Indigo Blue",
        sizeRange: "30-40",
        care: "Wash inside out",
      },
    },
  },
  {
    name: "Cargo Utility Pants",
    type: "pant",
    price: 1599,
    imageUrl: "/pants/pant4.png",
    stock: 20,
    description: {
      short: "Heavy-duty pants with multiple utility pockets.",
      long: "Designed for both fashion and function, these cargo pants feature flap pockets and reinforced knees, making them ideal for outdoor or casual urban wear.",
      features: [
        "Six-pocket design",
        "Reinforced stitching",
        "Relaxed fit",
        "Velcro closures on side pockets",
      ],
      specifications: {
        material: "Ripstop Cotton",
        color: "Army Green",
        sizeRange: "30-38",
        care: "Machine wash warm",
      },
    },
  },
  {
    name: "Smart Formal Trousers",
    type: "pant",
    price: 1999,
    imageUrl: "/pants/pant5.png",
    stock: 25,
    description: {
      short: "Tailored formal trousers for business wear.",
      long: "A smart, sharp fit and crease-resistant fabric make these trousers an essential for professional environments or formal events.",
      features: [
        "Crease-resistant finish",
        "Belt loops",
        "Flat front design",
        "Side and rear pockets",
      ],
      specifications: {
        material: "Poly-Viscose Blend",
        color: "Black",
        sizeRange: "32-40",
        care: "Dry clean only",
      },
    },
  },
  {
    name: "Linen Summer Pants",
    type: "pant",
    price: 1699,
    imageUrl: "/pants/pant6.png",
    stock: 30,
    description: {
      short: "Breathable linen pants for hot weather comfort.",
      long: "These relaxed-fit pants are tailored from lightweight linen, making them perfect for tropical vacations or summer casuals.",
      features: [
        "100% linen fabric",
        "Elasticated waistband",
        "Breathable and airy",
        "Tapered cut",
      ],
      specifications: {
        material: "Pure Linen",
        color: "Beige",
        sizeRange: "30-38",
        care: "Hand wash recommended",
      },
    },
  },
  {
    name: "Tapered Drawstring Pants",
    type: "pant",
    price: 1399,
    imageUrl: "/pants/pant7.png",
    stock: 27,
    description: {
      short: "A hybrid between joggers and trousers for everyday use.",
      long: "With tailored seams and a relaxed drawstring waist, these pants bring a blend of comfort and casual style into one unique design.",
      features: [
        "Tapered cut",
        "Adjustable waistband",
        "Lightweight fabric",
        "Wrinkle resistant",
      ],
      specifications: {
        material: "Viscose-Polyester",
        color: "Olive Green",
        sizeRange: "28-36",
        care: "Machine wash gentle",
      },
    },
  },
  {
    name: "Tech Stretch Travel Pants",
    type: "pant",
    price: 1899,
    imageUrl: "/pants/pant8.png",
    stock: 19,
    description: {
      short: "Quick-drying travel pants with 4-way stretch.",
      long: "Perfect for travel or active days, these pants feature a lightweight, quick-dry fabric and ergonomic stretch for easy movement.",
      features: [
        "4-way stretch",
        "Quick dry and water repellent",
        "Hidden zip pockets",
        "Elastic waistband",
      ],
      specifications: {
        material: "Polyamide-Spandex",
        color: "Steel Blue",
        sizeRange: "30-38",
        care: "Air dry only",
      },
    },
  },
  {
    name: "Corduroy Tapered Pants",
    type: "pant",
    price: 1599,
    imageUrl: "/pants/pant9.png",
    stock: 23,
    description: {
      short: "Retro-inspired corduroy pants with a modern silhouette.",
      long: "Stay warm and stylish with these soft corduroy pants featuring a tapered ankle cut and classic fit.",
      features: [
        "Wale corduroy fabric",
        "Two front and back pockets",
        "Button and zip closure",
        "Mid-rise fit",
      ],
      specifications: {
        material: "100% Cotton Corduroy",
        color: "Maroon",
        sizeRange: "30-36",
        care: "Wash cold with similar colors",
      },
    },
  },
  {
    name: "Performance Track Pants",
    type: "pant",
    price: 1199,
    imageUrl: "/pants/pant10.png",
    stock: 38,
    description: {
      short: "Athletic fit pants designed for workouts and beyond.",
      long: "Moisture-wicking and breathable, these track pants are ideal for fitness sessions or sporty casual looks.",
      features: [
        "Elastic waist with drawcord",
        "Zipped ankle cuffs",
        "Moisture-wicking fabric",
        "Slim tapered leg",
      ],
      specifications: {
        material: "Poly-Spandex Blend",
        color: "Black",
        sizeRange: "28-36",
        care: "Machine wash cold",
      },
    },
  },

  // SHIRTS
  {
    name: "Oxford Button-Down Shirt",
    type: "shirt",
    price: 999,
    imageUrl: "/shirts/shirt1.png",
    stock: 45,
    description: {
      short: "A wardrobe staple with timeless Oxford fabric.",
      long: "This Oxford shirt pairs perfectly with jeans or trousers, offering both comfort and style in any setting. Ideal for business casual looks.",
      features: [
        "Button-down collar",
        "Rounded hem",
        "Chest patch pocket",
        "Breathable cotton weave",
      ],
      specifications: {
        material: "Oxford Cotton",
        color: "Light Blue",
        sizeRange: "S-XXL",
        care: "Machine wash warm",
      },
    },
  },
  {
    name: "Linen Blend Short Sleeve Shirt",
    type: "shirt",
    price: 1099,
    imageUrl: "/shirts/shirt2.png",
    stock: 35,
    description: {
      short: "Stay cool in this breathable summer-ready shirt.",
      long: "Crafted from a lightweight linen blend, this shirt features a relaxed collar and airy sleeves for ultimate warm-weather comfort.",
      features: [
        "Short sleeves",
        "Spread collar",
        "Button-up front",
        "Linen-cotton blend",
      ],
      specifications: {
        material: "Linen Cotton",
        color: "White",
        sizeRange: "S-XL",
        care: "Cold gentle wash",
      },
    },
  },
  {
    name: "Printed Casual Shirt",
    type: "shirt",
    price: 899,
    imageUrl: "/shirts/shirt3.png",
    stock: 42,
    description: {
      short: "A relaxed-fit shirt with all-over tropical print.",
      long: "Great for holidays or casual Fridays, this printed shirt brings a vibrant aesthetic to everyday wear with breathable comfort.",
      features: ["All-over print", "Relaxed fit", "Curved hem", "Button front"],
      specifications: {
        material: "100% Rayon",
        color: "Multicolor",
        sizeRange: "M-XL",
        care: "Hand wash only",
      },
    },
  },
  {
    name: "Checks Flannel Shirt",
    type: "shirt",
    price: 1299,
    imageUrl: "/shirts/shirt4.png",
    stock: 30,
    description: {
      short: "Soft flannel shirt with classic check patterns.",
      long: "A must-have for chilly days, this flannel shirt delivers warmth and timeless style, whether layered or worn solo.",
      features: [
        "Brushed flannel fabric",
        "Button cuffs",
        "Double chest pockets",
        "Tartan pattern",
      ],
      specifications: {
        material: "Cotton Flannel",
        color: "Red & Black",
        sizeRange: "S-XXL",
        care: "Machine wash cold",
      },
    },
  },
  {
    name: "Formal Solid Shirt",
    type: "shirt",
    price: 1199,
    imageUrl: "/shirts/shirt5.png",
    stock: 38,
    description: {
      short: "Crisp formal shirt for office or events.",
      long: "Made with wrinkle-resistant fabric and a slim fit, this solid shirt is your go-to for work presentations or elegant evenings.",
      features: [
        "Slim fit design",
        "Stiff spread collar",
        "Long sleeves with button cuffs",
        "Easy-care fabric",
      ],
      specifications: {
        material: "Polyester-Cotton",
        color: "White",
        sizeRange: "S-XL",
        care: "Warm machine wash",
      },
    },
  },
  {
    name: "Henley Neck T-Shirt",
    type: "shirt",
    price: 799,
    imageUrl: "/shirts/shirt6.png",
    stock: 50,
    description: {
      short: "A casual alternative to the classic tee.",
      long: "Featuring a buttoned placket and soft cotton feel, the Henley tee adds a rugged flair to your everyday wardrobe.",
      features: [
        "Henley neckline",
        "Short sleeves",
        "3-button placket",
        "Regular fit",
      ],
      specifications: {
        material: "100% Cotton",
        color: "Olive",
        sizeRange: "M-XL",
        care: "Wash inside out",
      },
    },
  },
  {
    name: "Mandarin Collar Shirt",
    type: "shirt",
    price: 1049,
    imageUrl: "/shirts/shirt7.png",
    stock: 28,
    description: {
      short: "A modern take on traditional styling.",
      long: "Elevate your casual or ethnic outfits with this mandarin collar shirt made from soft fabric and tailored for a clean silhouette.",
      features: [
        "Band collar",
        "Concealed placket",
        "Full sleeves",
        "Minimalist look",
      ],
      specifications: {
        material: "Rayon Blend",
        color: "Peach",
        sizeRange: "S-L",
        care: "Delicate wash only",
      },
    },
  },
  {
    name: "Oversized Streetwear Shirt",
    type: "shirt",
    price: 1349,
    imageUrl: "/shirts/shirt8.png",
    stock: 24,
    description: {
      short: "Trendy oversized fit with bold design.",
      long: "Street-style inspired, this oversized shirt features graphic accents and a laid-back fit, ideal for fashion-forward casual wear.",
      features: [
        "Oversized silhouette",
        "Drop shoulders",
        "Chest patch logo",
        "Soft cotton blend",
      ],
      specifications: {
        material: "Cotton Blend",
        color: "Black",
        sizeRange: "Free Size / XL+",
        care: "Do not bleach",
      },
    },
  },
  {
    name: "Basic Crew Neck Tee",
    type: "shirt",
    price: 599,
    imageUrl: "/shirts/shirt9.png",
    stock: 70,
    description: {
      short: "Everyday essential cotton t-shirt.",
      long: "Keep it simple with this crew neck t-shirt that fits well, feels soft, and layers effortlessly under shirts or jackets.",
      features: [
        "Short sleeves",
        "Ribbed crew neck",
        "Regular fit",
        "Pre-shrunk fabric",
      ],
      specifications: {
        material: "100% Cotton",
        color: "White",
        sizeRange: "S-XXL",
        care: "Machine wash normal",
      },
    },
  },
  {
    name: "Printed Resort Shirt",
    type: "shirt",
    price: 999,
    imageUrl: "/shirts/shirt10.png",
    stock: 32,
    description: {
      short: "Relaxed, bold print shirt for vacation vibes.",
      long: "Stay breezy with this loose-fit shirt featuring floral prints, side slits, and lightweight fabric perfect for beach days or hangouts.",
      features: [
        "Floral or tropical print",
        "Side slits",
        "Short sleeves",
        "Camp collar",
      ],
      specifications: {
        material: "Rayon",
        color: "Multicolor",
        sizeRange: "M-XL",
        care: "Hand wash cool",
      },
    },
  },
];

async function AddData() {
  try {
    // or your MongoDB URI directly
    console.log("Items to insert:", bags.length);
    await mongoose.connect("mongodb://localhost:27017/skatchel");
    await Product.insertMany(bags);
    console.log("🎒 Bag products seeded successfully.");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  }
}

AddData();

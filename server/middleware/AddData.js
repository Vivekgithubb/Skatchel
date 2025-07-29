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

// =============================================
// HariOM Hotel - Menu Data
// =============================================

const menuData = {
  breakfast: [
    { id: 1, name: "Masala Omelette", desc: "3-egg omelette with onions, tomatoes, green chillies & spices", price: 120, rating: 4.5, reviews: 128, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80", badge: "Popular", category: "breakfast" },
    { id: 2, name: "Aloo Paratha", desc: "Crispy stuffed flatbread with spiced potato filling, served with butter & curd", price: 90, rating: 4.8, reviews: 245, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", badge: "Best Seller", category: "breakfast" },
    { id: 3, name: "Idli Sambar", desc: "Soft steamed rice cakes with aromatic lentil soup & coconut chutney", price: 80, rating: 4.6, reviews: 189, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80", badge: null, category: "breakfast" },
    { id: 4, name: "Poha", desc: "Flattened rice with mustard seeds, curry leaves, peanuts & fresh coriander", price: 70, rating: 4.4, reviews: 156, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80", badge: null, category: "breakfast" },
    { id: 5, name: "Pancake Stack", desc: "Fluffy buttermilk pancakes with maple syrup, fresh berries & whipped cream", price: 180, rating: 4.7, reviews: 98, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80", badge: "Chef's Pick", category: "breakfast" },
    { id: 6, name: "Upma", desc: "Savory semolina porridge with vegetables, cashews & aromatic tempering", price: 75, rating: 4.3, reviews: 112, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80", badge: null, category: "breakfast" }
  ],
  lunch: [
    { id: 7, name: "Dal Makhani", desc: "Slow-cooked black lentils in rich tomato-butter gravy, a timeless classic", price: 220, rating: 4.9, reviews: 312, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80", badge: "Best Seller", category: "lunch" },
    { id: 8, name: "Butter Chicken", desc: "Tender chicken in velvety tomato-cream sauce with aromatic spices", price: 320, rating: 4.8, reviews: 428, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80", badge: "Popular", category: "lunch" },
    { id: 9, name: "Paneer Tikka Masala", desc: "Grilled cottage cheese cubes in spiced onion-tomato gravy", price: 280, rating: 4.7, reviews: 267, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", badge: null, category: "lunch" },
    { id: 10, name: "Biryani", desc: "Fragrant basmati rice layered with spiced meat/vegetables & saffron", price: 350, rating: 4.9, reviews: 521, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", badge: "Chef's Pick", category: "lunch" },
    { id: 11, name: "Thali", desc: "Complete meal with dal, sabzi, roti, rice, salad, pickle & dessert", price: 250, rating: 4.6, reviews: 198, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80", badge: "Value Meal", category: "lunch" },
    { id: 12, name: "Chole Bhature", desc: "Spiced chickpea curry with fluffy deep-fried bread, a North Indian delight", price: 160, rating: 4.5, reviews: 234, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80", badge: null, category: "lunch" }
  ],
  dinner: [
    { id: 13, name: "Grilled Salmon", desc: "Atlantic salmon fillet with herb butter, roasted vegetables & lemon", price: 580, rating: 4.8, reviews: 145, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80", badge: "Premium", category: "dinner" },
    { id: 14, name: "Lamb Rogan Josh", desc: "Slow-braised lamb in Kashmiri spices with aromatic whole spices", price: 480, rating: 4.7, reviews: 189, image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80", badge: "Chef's Pick", category: "dinner" },
    { id: 15, name: "Tandoori Platter", desc: "Assorted tandoor-grilled meats & paneer with mint chutney & naan", price: 650, rating: 4.9, reviews: 267, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", badge: "Best Seller", category: "dinner" },
    { id: 16, name: "Pasta Arrabiata", desc: "Al dente penne in spicy tomato sauce with garlic, basil & parmesan", price: 320, rating: 4.5, reviews: 156, image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80", badge: null, category: "dinner" },
    { id: 17, name: "Mushroom Risotto", desc: "Creamy arborio rice with wild mushrooms, truffle oil & aged parmesan", price: 380, rating: 4.6, reviews: 112, image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80", badge: "Vegetarian", category: "dinner" },
    { id: 18, name: "Prawn Masala", desc: "Juicy prawns in spiced coconut-tomato gravy, coastal style", price: 520, rating: 4.8, reviews: 198, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", badge: "Seafood", category: "dinner" }
  ],
  beverages: [
    { id: 19, name: "Mango Lassi", desc: "Thick yogurt-based drink blended with fresh Alphonso mangoes", price: 120, rating: 4.8, reviews: 345, image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80", badge: "Popular", category: "beverages" },
    { id: 20, name: "Masala Chai", desc: "Aromatic spiced tea with ginger, cardamom, cinnamon & fresh milk", price: 60, rating: 4.9, reviews: 512, image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80", badge: "Best Seller", category: "beverages" },
    { id: 21, name: "Fresh Lime Soda", desc: "Refreshing lime juice with soda, mint & a hint of black salt", price: 80, rating: 4.6, reviews: 234, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80", badge: null, category: "beverages" },
    { id: 22, name: "Cold Coffee", desc: "Rich espresso blended with chilled milk, ice cream & chocolate syrup", price: 150, rating: 4.7, reviews: 289, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80", badge: null, category: "beverages" },
    { id: 23, name: "Virgin Mojito", desc: "Muddled mint, lime juice, sugar syrup & sparkling water over ice", price: 130, rating: 4.5, reviews: 178, image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80", badge: null, category: "beverages" },
    { id: 24, name: "Rose Sharbat", desc: "Chilled rose syrup drink with basil seeds, milk & a floral aroma", price: 90, rating: 4.4, reviews: 145, image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&q=80", badge: null, category: "beverages" }
  ],
  desserts: [
    { id: 25, name: "Gulab Jamun", desc: "Soft milk-solid dumplings soaked in rose-cardamom sugar syrup", price: 100, rating: 4.9, reviews: 456, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80", badge: "Best Seller", category: "desserts" },
    { id: 26, name: "Chocolate Lava Cake", desc: "Warm chocolate cake with molten center, served with vanilla ice cream", price: 220, rating: 4.8, reviews: 312, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80", badge: "Popular", category: "desserts" },
    { id: 27, name: "Kulfi", desc: "Traditional Indian ice cream with pistachios, saffron & cardamom", price: 120, rating: 4.7, reviews: 234, image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&q=80", badge: null, category: "desserts" },
    { id: 28, name: "Tiramisu", desc: "Classic Italian dessert with espresso-soaked ladyfingers & mascarpone", price: 250, rating: 4.8, reviews: 189, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80", badge: "Chef's Pick", category: "desserts" },
    { id: 29, name: "Rasmalai", desc: "Soft cottage cheese patties in chilled saffron-cardamom milk", price: 130, rating: 4.9, reviews: 378, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80", badge: "Traditional", category: "desserts" },
    { id: 30, name: "Cheesecake", desc: "New York style baked cheesecake with berry compote & graham crust", price: 280, rating: 4.7, reviews: 156, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80", badge: null, category: "desserts" }
  ],
  special: [
    { id: 31, name: "HariOM Special Thali", desc: "Our signature grand thali with 12 items — the ultimate dining experience", price: 499, rating: 5.0, reviews: 678, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80", badge: "Signature", category: "special" },
    { id: 32, name: "Royal Biryani Feast", desc: "Dum-cooked biryani for 2 with raita, salan, salad & dessert", price: 799, rating: 4.9, reviews: 423, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", badge: "For 2", category: "special" },
    { id: 33, name: "Chef's Tasting Menu", desc: "7-course curated experience showcasing the best of HariOM's kitchen", price: 1499, rating: 5.0, reviews: 234, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", badge: "Premium", category: "special" },
    { id: 34, name: "Seafood Extravaganza", desc: "Grilled prawns, fish tikka, crab masala & lobster bisque for 2", price: 1299, rating: 4.8, reviews: 167, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80", badge: "Seafood", category: "special" }
  ]
};

// Featured dishes for homepage slider
const featuredDishes = [
  menuData.lunch[1],   // Butter Chicken
  menuData.lunch[3],   // Biryani
  menuData.dinner[2],  // Tandoori Platter
  menuData.special[0], // HariOM Special Thali
  menuData.desserts[1],// Chocolate Lava Cake
  menuData.breakfast[1]// Aloo Paratha
];

CREATE TABLE cargo_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid();,
    category_class VARCHAR(255) NOT NULL,
    category_desc VARCHAR(255) NOT NULL,
    category_premium INT
);

INSERT INTO cargo_categories (category_class, category_desc, category_premium) VALUES
    -- Vehicles
    ('Vehicles, Personal', 'Cars', 500),
    ('Vehicles, Personal', 'Motorcycles', 400),
    ('Vehicles, Commercial', 'Trucks & Trailers', 600),
    ('Vehicles, Accessories', 'Spare Parts & Accessories', 200),
    ('Vehicles, Personal', 'Other Vehicles', 300),
    ('Vehicles, Watercraft', 'Boats & Watercraft', 700),
    ('Vehicles, Recreational', 'RVs & Campers', 650),
    ('Vehicles, Commercial', 'Commercial Trucks', 600),
    ('Vehicles, Personal', 'Classic Cars', 550),
    ('Vehicles, Recreational', 'Off-Road Vehicles', 500),
    ('Vehicles, Personal', 'Bicycles', 150),
    ('Vehicles, Services', 'Auto Services', 250),
    ('Vehicles, Accessories', 'Car Accessories', 200),
    ('Vehicles, Electronics', 'Car Audio & GPS', 300),

    -- Electronics
    ('Electronics', 'Computers & Laptops', 400),
    ('Electronics', 'TV, Audio & Video', 350),
    ('Electronics', 'Cameras & Accessories', 300),
    ('Electronics', 'Video Games & Consoles', 250),
    ('Electronics', 'Other Electronics', 200),
    ('Electronics', 'Computer Accessories', 150),
    ('Electronics', 'Headphones & Speakers', 200),
    ('Electronics', 'DVD & Blu-ray Players', 100),
    ('Electronics', 'Home Theater Systems', 350),
    ('Electronics', 'Gaming Accessories', 250),
    ('Electronics', 'Camera Accessories', 150),
    ('Electronics', 'Video Game Accessories', 200),
    ('Electronics', 'Electronic Components', 150),
    ('Electronics', 'Printers & Scanners', 200),
    ('Electronics', 'Networking Products', 150),

    -- Home and Furniture
    ('Home & Furniture', 'Home Appliances', 300),
    ('Home & Furniture', 'Kitchen & Dining', 200),
    ('Home & Furniture', 'Decor, Garden & Accessories', 150),
    ('Home & Furniture', 'Other Home Items', 100),
    ('Home & Furniture', 'Bedroom Furniture', 350),
    ('Home & Furniture', 'Living Room Furniture', 300),
    ('Home & Furniture', 'Dining Room Furniture', 300),
    ('Home & Furniture', 'Home Decor', 150),
    ('Home & Furniture', 'Outdoor Furniture', 200),
    ('Home & Furniture', 'Kitchen Appliances', 250),
    ('Home & Furniture', 'Bedding & Linens', 150),
    ('Home & Furniture', 'Lighting & Fans', 100),
    ('Home & Furniture', 'Household Supplies', 100),

    -- Tools and Supplies
    ('Tools & Supplies', 'Power Tools', 200),
    
    -- Fashion and Accessories
    ('Fashion', 'Clothing', 100),
    ('Fashion', 'Shoes', 150),
    ('Fashion', 'Bags & Accessories', 120),
    ('Fashion', 'Jewelry', 200),
    ('Fashion', 'Watches', 250),
    ('Fashion', 'Wedding Wear', 300),
    ('Fashion', 'Men''s Clothing', 150),
    ('Fashion', 'Women''s Clothing', 150),
    ('Fashion', 'Children'wa's Clothing', 100),
    ('Fashion', 'Fashion Accessories', 120),
    ('Fashion', 'Designer Clothing', 350),
    ('Fashion', 'Footwear', 150),
    ('Fashion', 'Handbags & Wallets', 180),
    ('Fashion', 'Fine Jewelry', 400),
    ('Fashion', 'Luxury Watches', 500),

    -- Sports and Hobbies
    ('Sports & Hobbies', 'Sports Equipment', 200),
    ('Sports & Hobbies', 'Arts & Crafts', 100),
    ('Sports & Hobbies', 'Books, CDs & DVDs', 80),
    ('Sports & Hobbies', 'Musical Instruments', 250),
    ('Sports & Hobbies', 'Other Hobby, Sport & Kids Items', 100),
    ('Sports & Hobbies', 'Outdoor Sports Equipment', 200),
    ('Sports & Hobbies', 'Indoor Sports Equipment', 180),
    ('Sports & Hobbies', 'Musical Accessories', 150),
    ('Sports & Hobbies', 'Art Supplies', 120),
    ('Sports & Hobbies', 'Craft Supplies', 100),
    ('Sports & Hobbies', 'Books & Magazines', 80),
    ('Sports & Hobbies', 'Musical Equipment', 250),
    ('Sports & Hobbies', 'Collectibles', 200),
    ('Sports & Hobbies', 'Photography Equipment', 300),
    ('Sports & Hobbies', 'Hunting & Fishing Gear', 250),

    -- Animals and Agriculture
    ('Agriculture & Animals', 'Farm Animals', 400),
    ('Agriculture & Animals', 'Other Animals', 150),
    ('Agriculture & Animals', 'Pet Food & Supplies', 100),
    ('Agriculture & Animals', 'Fish', 100),
    ('Agriculture & Animals', 'Birds', 100),
    ('Agriculture & Animals', 'Reptiles & Amphibians', 120),
    ('Agriculture & Animals', 'Farm Produce', 150),
    ('Agriculture & Animals', 'Feeds, Supplements & Seeds', 100),
    ('Agriculture & Animals', 'Livestock & Poultry', 400),
    ('Agriculture & Animals', 'Meals & Drinks', 150),
    ('Agriculture & Animals', 'Farm Machinery & Equipment', 500),
    ('Agriculture & Animals', 'Fish & Aquaculture', 300),
    ('Agriculture & Animals', 'Crops, Seeds & Seedlings', 150),
    ('Agriculture & Animals', 'Agrochemicals & Fertilizers', 200),
    ('Agriculture & Animals', 'Food Services', 150),
    ('Agriculture & Animals', 'Agricultural Consultancy', 200),
    ('Agriculture & Animals', 'Groceries', 100),
    ('Agriculture & Animals', 'Beverages', 100),
    ('Agriculture & Animals', 'Farm Equipment Rental', 300),
    ('Agriculture & Animals', 'Livestock Services', 250),

    -- Commercial Equipment
    ('Commercial Equipment', 'Restaurants', 400),
    ('Commercial Equipment', 'Industrial Ovens', 500),
    ('Commercial Equipment', 'Manufacturing Equipment', 600),
    ('Commercial Equipment', 'Restaurant & Catering Equipment', 450),
    ('Commercial Equipment', 'Medical Equipment', 500),
    ('Commercial Equipment', 'Other Commercial Equipment & Tools', 350),
    ('Commercial Equipment', 'Printing Equipment', 400),
    ('Commercial Equipment', 'Industrial Tools', 450),
    ('Commercial Equipment', 'Safety & Security Equipment', 300),
    ('Commercial Equipment', 'Industrial Generator', 550),
    ('Commercial Equipment', 'Industrial Sewing Machines', 500),
    ('Commercial Equipment', 'Heavy Equipment', 600),
    ('Commercial Equipment', 'Office Equipment', 350),
    ('Commercial Equipment', 'Medical Supplies', 300),
    ('Commercial Equipment', 'Retail & Shop Equipment', 400),
    ('Commercial Equipment', 'Cleaning Equipment', 250),

    -- Weapons
    ('Weapons', 'Artillery', 800),
    ('Weapons', 'Biological Weaponry', 900),
    ('Weapons', 'Chemical Weaponry', 900),
    ('Weapons', 'Close Range Combat Weapons', 700),
    ('Weapons', 'Long Distance Combat Weapons', 750),
    ('Weapons', 'Explosives', 800),
    ('Weapons', 'Explosive Substances', 800),
    ('Weapons', 'Ballistic Missiles', 1000),
    ('Weapons', 'Cruise Missiles', 1000),
    ('Weapons', 'Rockets', 950),
    ('Weapons', 'Manual Firearms', 600),
    ('Weapons', 'Semiautomatic Firearms', 650),
    ('Weapons', 'Automatic Firearms', 700),
    ('Weapons', 'Handguns', 550),
    ('Weapons', 'Nuclear Weapons', 1200),
    ('Weapons', 'Siege Weapons', 850),
    ('Weapons', 'Laser Weapons', 950),
    ('Weapons', 'Laser Material', 700),
    ('Weapons', 'Starcrushers', 1500),
    ('Weapons', 'Black Holes', 2000),

    -- Modern Tech
    ('Modern Tech', 'Smart Home Devices', 250),
    ('Modern Tech', 'Wearable Technology', 200),
    ('Modern Tech', 'Virtual Reality Headsets', 300),
    ('Modern Tech', 'Drones', 400),
    ('Modern Tech', 'Electric Vehicles', 500),
    ('Modern Tech', '3D Printers', 350),
    ('Modern Tech', 'Robotics', 600),
    ('Modern Tech', 'Renewable Energy Systems', 500),
    ('Modern Tech', 'Solar Panels', 450),
    ('Modern Tech', 'Wind Turbines', 500),
    ('Modern Tech', 'Hydroponic Systems', 400),

    -- Home Improvement
    ('Home Improvement', 'Gardening Tools', 150),
    ('Home Improvement', 'Fitness Equipment', 200),
    ('Home Improvement', 'Camping Gear', 250),
    ('Home Improvement', 'Travel Accessories', 150),
    ('Home Improvement', 'Office Supplies', 100),
    ('Home Improvement', 'Stationery', 80),
    ('Home Improvement', 'Toys & Games', 150),
    ('Home Improvement', 'Baby Products', 120),
    ('Home Improvement', 'Skincare', 100),
    ('Home Improvement', 'Haircare', 100),
    ('Home Improvement', 'Makeup', 150),
    ('Home Improvement', 'Fragrances', 200),
    ('Home Improvement', 'Personal Care', 120),
    ('Home Improvement', 'Medical Devices', 300),
    ('Home Improvement', 'Pharmaceuticals', 200),
    ('Home Improvement', 'Supplements', 150),

    -- Educational
    ('Educational', 'Educational Materials', 100),
    ('Educational', 'Learning Toys', 120),
    ('Educational', 'School Supplies', 80),

    -- Safety Equipment
    ('Safety Equipment', 'Safety Equipment', 250),
    ('Safety Equipment', 'Home Security Systems', 300),
    ('Safety Equipment', 'Fire Safety Equipment', 200),
    ('Safety Equipment', 'Emergency Kits', 150),

    -- Construction Materials
    ('Construction Materials', 'Construction Materials', 350),
    ('Construction Materials', 'Building Tools', 300),
    ('Construction Materials', 'Home Improvement', 250),
    ('Construction Materials', 'DIY Tools', 200),
    ('Construction Materials', 'Paint & Supplies', 150),

    -- Outdoor Equipment
    ('Outdoor Equipment', 'Garden Furniture', 200),
    ('Outdoor Equipment', 'Pool & Spa', 350),
    ('Outdoor Equipment', 'Water Sports Equipment', 300),
    ('Outdoor Equipment', 'Winter Sports Equipment', 300),
    ('Outdoor Equipment', 'Martial Arts Equipment', 250),
    ('Outdoor Equipment', 'Cycling Accessories', 150),
    ('Outdoor Equipment', 'Skateboarding Gear', 150),
    ('Outdoor Equipment', 'Surfing Gear', 200),
    ('Outdoor Equipment', 'Fishing Equipment', 250),
    ('Outdoor Equipment', 'Boating Accessories', 300),

    -- Vehicle Repair
    ('Vehicle Repair', 'Car Repair Tools', 200),
    ('Vehicle Repair', 'Diagnostic Equipment', 250),

    -- Industrial and Aerospace
    ('Industrial & Aerospace', 'Aerospace Equipment', 700),
    ('Industrial & Aerospace', 'Marine Equipment', 650),
    ('Industrial & Aerospace', 'Railway Equipment', 600),
    ('Industrial & Aerospace', 'Military Equipment', 750),
    ('Industrial & Aerospace', 'Telecommunications Equipment', 500),
    ('Industrial & Aerospace', 'Broadcasting Equipment', 550),

    -- Event Supplies
    ('Event Supplies', 'Event & Party Supplies', 200),
    ('Event Supplies', 'Cleaning Supplies', 150),

    -- Eco-Friendly Products
    ('Eco-Friendly', 'Eco-friendly Products', 150),
    ('Eco-Friendly', 'Handmade Crafts', 100),
    ('Eco-Friendly', 'Vintage Items', 200);

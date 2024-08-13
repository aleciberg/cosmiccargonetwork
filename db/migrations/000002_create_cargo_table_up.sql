CREATE TABLE cargo_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid();,
    category_class VARCHAR(255) NOT NULL,
    category_desc VARCHAR(255) NOT NULL,
    category_premium INT
);

CREATE TABLE cargo_classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid();,
    category_class VARCHAR(255) NOT NULL,
    base_rate INT NOT NULL
)

INSERT INTO cargo_classes (catgegory_class, base_rate) VALUES 
    ("Vehicles, Personal", 100)
    ("Vehicles, Commercial", 100)
    ("Vehicles, Government", 100)
    ("Vehicle Parts", 100)
    ("Marine Vehicle, Personal", 100)
    ("Electronics, Consumer", 100)
    ("Electronics, Commercial", 100)
    ("Electronics, Government", 100)
    ("Appliances", 100)
    ("Home & Furniture", 100)
    ("Construction Equipment", 100)
    ("Fashion", 100)
    ("Hobby", 100)
    ("Sports Equipment", 100)
    ("Hobby", 100)
    ("Agriculture & Animals", 100)
    ("Commercial Equipment", 100)
    ("Weapons, Personal", 100)
    ("Weapons, Commercial", 100)
    ("Weapons, Government", 100)
    ("Electronics, Personal", 100)
    ("Electronics, Commercial", 100)
    ("Electronics, Government", 100)
    ("Educational", 100)
    ("Safety Equipment", 100)
    ("Construction Materials, Personal", 100)
    ("Construction Materials, Commercial", 100)
    ("Construction Materials, Government" 100)

INSERT INTO cargo_categories (category_class, category_desc, category_premium) VALUES
    -- Vehicles
    ('Vehicles, Personal', 'Cars', 100),
    ('Vehicles, Commercial', 'Cars', 100),
    ('Vehicles, Government', 'Cars', 100),
    ('Vehicles, Personal', 'Motorcycles', 100),
    ('Vehicles, Commercial', 'Motorcycles', 100),
    ('Vehicles, Government', 'Motorcycles', 100),
    ('Vehicles, Personal', 'Trucks & Trailers', 100),
    ('Vehicles, Commercial', 'Trucks & Trailers', 100),
    ('Vehicles, Government', 'Trucks & Trailers', 100),
    ('Vehicle Parts', 'Spare Parts & Accessories', 100),
    ('Vehicles, Personal', 'Other Vehicles', 100),
    ('Vehicles, Commercial', 'Other Vehicles', 100),
    ('Vehicles, Government', 'Other Vehicles', 100),
    ('Marine Vehicle, Personal', 'Boats & Watercraft', 100),
    ('Marine Vehicle, Comercial', 'Boats & Watercraft', 100),
    ('Marine Vehicle, Government', 'Boats & Watercraft', 100),
    ('Vehicles, Personal', 'RVs & Campers', 100),
    ('Vehicles, Personal', 'Classic Cars', 100),
    ('Vehicles, Personal', 'Off-Road Vehicles', 100),
    ('Vehicles, Personal', 'Bicycles', 100),
    ('Vehicles Parts', 'Car Accessories', 100),
    ('Vehicles Parts', 'Car Audio & GPS', 100),
    ('Vehicle Parts', 'Car Repair Tools', 100),
    ('Vehicle Parts', 'Diagnostic Equipment', 10),

    -- Electronics
    ('Electronics, Consumer', 'Computers & Laptops', 100),
    ('Electronics, Commercial', 'Computers & Laptops', 100),
    ('Electronics, Government', 'Computers & Laptops', 100),
    ('Electronics, Commercial', 'TV, Audio & Video', 100),
    ('Electronics, Personal', 'TV, Audio & Video', 100),
    ('Electronics, Government', 'TV, Audio & Video', 100),
    ('Electronics, Personal', 'Cameras & Accessories', 100),
    ('Electronics, Commercial', 'Cameras & Accessories', 100),
    ('Electronics, Government', 'Cameras & Accessories', 100),
    ('Electronics, Personal', 'Video Games & Consoles', 100),
    ('Electronics, Personal', 'Other Electronics', 100),
    ('Electronics, Commercial', 'Other Electronics', 100),
    ('Electronics, Government', 'Other Electronics', 100),
    ('Electronics, Personal', 'Computer Accessories', 100),
    ('Electronics, Commercial', 'Computer Accessories', 100),
    ('Electronics, Government', 'Computer Accessories', 100),
    ('Electronics, Personal', 'Networking Products', 100),
    ('Electronics, Commercial', 'Networking Products', 100),
    ('Electronics, Government', 'Networking Products', 100),

    -- Home and Furniture
    ('Appliances', 'Home Appliances', 100),
    ('Appliances', 'Production Appliances', 100)
    ('Home & Furniture', 'Kitchen & Dining', 100),
    ('Home & Furniture', 'Decor, Garden & Accessories', 100),
    ('Home & Furniture', 'Other Home Items', 100),
    ('Home & Furniture', 'Bedroom Furniture', 100),
    ('Home & Furniture', 'Living Room Furniture', 100),
    ('Home & Furniture', 'Dining Room Furniture', 100),
    ('Home & Furniture', 'Home Decor', 100),
    ('Home & Furniture', 'Outdoor Furniture', 100),
    ('Home & Furniture', 'Bedding & Linens', 100),
    ('Home & Furniture', 'Lighting & Fans', 100),
    ('Home & Furniture', 'Household Supplies', 100),

    -- Tools and Supplies
    ('Construction Equipment', 'Power Tools', 100),
    ('Construction Equipment', 'Hand Tools', 100),
    ('Construction Equipment', 'Building Materials', 100),
    
    -- Fashion and Accessories
    ('Fashion', 'Clothing', 100),
    ('Fashion', 'Shoes', 100),
    ('Fashion', 'Bags & Accessories', 100),
    ('Fashion', 'Jewelry', 100),
    ('Fashion', 'Watches', 100),
    ('Fashion', 'Wedding Wear', 100),
    ('Fashion', 'Men''s Clothing', 100),
    ('Fashion', 'Women''s Clothing', 100),
    ('Fashion', 'Children''s Clothing', 100),
    ('Fashion', 'Fashion Accessories', 100),
    ('Fashion', 'Designer Clothing', 100),
    ('Fashion', 'Footwear', 100),
    ('Fashion', 'Handbags & Wallets', 100),
    ('Fashion', 'Fine Jewelry', 100),
    ('Fashion', 'Luxury Watches', 100),

    -- Sports and Hobbies
    ('Hobby', 'Arts & Crafts', 100),
    ('Hobby', 'Books, CDs & DVDs', 100),
    ('Hobby', 'Musical Instruments', 100),
    ('Hobby', 'Other Hobby, Sport & Kids Items', 100),
    ('Sports Equpment', 'Outdoor Sports Equipment', 100),
    ('Sports Equpment', 'Indoor Sports Equipment', 100),
    ('Hobby', 'Musical Accessories', 100),
    ('Hobby', 'Art Supplies', 100),
    ('Hobby', 'Craft Supplies', 100),
    ('Hobby', 'Books & Magazines', 100),
    ('Hobby', 'Musical Equipment', 100),
    ('Hobby', 'Collectibles', 100),
    ('Hobby', 'Photography Equipment', 100),
    ('Sports Equpment', 'Hunting & Fishing Gear', 100),

    -- Animals and Agriculture
    ('Agriculture & Animals', 'Farm Animals', 100),
    ('Agriculture & Animals', 'Other Animals', 100),
    ('Agriculture & Animals', 'Pet Food & Supplies', 100),
    ('Agriculture & Animals', 'Fish', 100),
    ('Agriculture & Animals', 'Birds', 100),
    ('Agriculture & Animals', 'Reptiles & Amphibians', 100),
    ('Agriculture & Animals', 'Farm Produce', 100),
    ('Agriculture & Animals', 'Feeds, Supplements & Seeds', 100),
    ('Agriculture & Animals', 'Livestock & Poultry', 100),
    ('Agriculture & Animals', 'Meals & Drinks', 100),
    ('Agriculture & Animals', 'Farm Machinery & Equipment', 100),
    ('Agriculture & Animals', 'Fish & Aquaculture', 100),
    ('Agriculture & Animals', 'Crops, Seeds & Seedlings', 100),
    ('Agriculture & Animals', 'Agrochemicals & Fertilizers', 100),
    ('Agriculture & Animals', 'Food Services', 100),
    ('Agriculture & Animals', 'Agricultural Consultancy', 100),
    ('Agriculture & Animals', 'Groceries', 100),
    ('Agriculture & Animals', 'Beverages', 100),
    ('Agriculture & Animals', 'Farm Equipment Rental', 100),
    ('Agriculture & Animals', 'Livestock Services', 100),

    -- Commercial Equipment
    ('Commercial Equipment', 'Restaurants', 100),
    ('Commercial Equipment', 'Industrial Ovens', 100),
    ('Commercial Equipment', 'Manufacturing Equipment', 100),
    ('Commercial Equipment', 'Restaurant & Catering Equipment', 100),
    ('Commercial Equipment', 'Medical Equipment', 100),
    ('Commercial Equipment', 'Other Commercial Equipment & Tools', 100),
    ('Commercial Equipment', 'Printing Equipment', 100),
    ('Commercial Equipment', 'Industrial Tools', 100),
    ('Commercial Equipment', 'Safety & Security Equipment', 100),
    ('Commercial Equipment', 'Industrial Generator', 100),
    ('Commercial Equipment', 'Industrial Sewing Machines', 100),
    ('Commercial Equipment', 'Heavy Equipment', 100),
    ('Commercial Equipment', 'Office Equipment', 100),
    ('Commercial Equipment', 'Medical Supplies', 100),
    ('Commercial Equipment', 'Retail & Shop Equipment', 100),
    ('Commercial Equipment', 'Cleaning Equipment', 100),

    -- Weapons
    ('Weapons, Government', 'Artillery', 100),
    ('Weapons, Government', 'Biological Weaponry', 100),
    ('Weapons, Government', 'Chemical Weaponry', 100),
    ('Weapons, Personal', 'Close Range Combat Weapons', 100),
    ('Weapons, Governement', 'Close Range Combat Weapons', 100),
    ('Weapons, Personal', 'Long Distance Combat Weapons', 100),
    ('Weapons, Government', 'Long Distance Combat Weapons', 100),
    ('Weapons, Government', 'Explosives', 100),
    ('Weapons, Government', 'Explosive Substances', 100),
    ('Weapons, Government', 'Ballistic Missiles', 100),
    ('Weapons, Government', 'Cruise Missiles', 100),
    ('Weapons, Government', 'Rockets', 950),
    ('Weapons, Personal', 'Manual Firearms', 600),
    ('Weapons, Government', 'Manual Firearms', 600),
    ('Weapons, Personal', 'Semiautomatic Firearms', 650),
    ('Weapons, Government', 'Semiautomatic Firearms', 650),
    ('Weapons, Personal', 'Automatic Firearms', 700),
    ('Weapons, Government', 'Automatic Firearms', 700),
    ('Weapons, Personal', 'Handguns', 550),
    ('Weapons, Government', 'Handguns', 550),
    ('Weapons, Governement', 'Nuclear Weapons', 1200),
    ('Weapons, Government', 'Siege Weapons', 850),
    ('Weapons, Government', 'Laser Weapons', 950),
    ('Weapons, Government', 'Laser Material', 700),
    ('Weapons, Government', 'Starcrushers', 1500),
    ('Weapons, Government', 'Black Holes', 2000),

    -- Modern Tech
    ('Electronics, Personal', 'Smart Home Devices', 100),
    ('Electronics, Commercial', 'Smart Home Devices', 100),
    ('Electronics, Personal', 'Wearable Technology', 100),
    ('Electronics, Commercial', 'Wearable Technology', 100),
    ('Electronics, Personal', 'Virtual Reality Headsets', 100),
    ('Electronics, Governement', 'Virtual Reality Headsets', 100),
    ('Electronics, Personal', 'Drones', 100),
    ('Electronics, Commercial', 'Drones', 100),
    ('Electronics, Government', 'Drones', 100),
    ('Electronics, Personal', '3D Printers', 100),
    ('Electronics, Commercial', '3D Printers', 100),
    ('Electronics, Governement', '3D Printers', 100),
    ('Electronics, Personal', 'Robotics', 100),
    ('Electronics, Commercial', 'Robotics', 100),
    ('Electronics, Government', 'Robotics', 100),
    ('Electronics, Personal', 'Renewable Energy Systems', 100),
    ('Electronics, Commercial', 'Renewable Energy Systems', 100),
    ('Electronics, Government', 'Renewable Energy Systems', 100),
    ('Electronics, Personal', 'Solar Panels', 100),
    ('Electronics, Commercial', 'Solar Panels', 100),
    ('Electronics, Governement', 'Solar Panels', 100),
    ('Electronics, Personal', 'Wind Turbines', 100),
    ('Electronics, Commercial', 'Wind Turbines', 100),
    ('Electronics, Governement', 'Wind Turbines', 100),
    ('Electronics, Personal', 'Hydroponic Systems', 100),
    ('Electronics, Commercial', 'Hydroponic Systems', 100),
    ('Electronics, Government', 'Hydroponic Systems', 100),

    -- Educational
    ('Educational', 'Educational Materials', 100),
    ('Educational', 'Learning Toys', 100),
    ('Educational', 'School Supplies', 100),

    -- Safety Equipment
    ('Safety Equipment', 'Safety Equipment', 100),
    ('Safety Equipment', 'Home Security Systems', 100),
    ('Safety Equipment', 'Fire Safety Equipment', 100),
    ('Safety Equipment', 'Emergency Kits', 100),

    -- Construction Materials
    ('Construction Materials, Personal', 'Construction Materials', 100),
    ('Construction Materials, Commercial', 'Construction Materials', 100),
    ('Construction Materials, Government', 'Construction Materials', 100),
    ('Construction Materials, Personal', 'Building Tools', 100),
    ('Construction Materials, Commercial', 'Building Tools', 100),
    ('Construction Materials, Government', 'Building Tools', 100),
    ('Construction Materials, Personal', 'Home Improvement', 100),
    ('Construction Materials, Personal', 'DIY Tools', 100),
    ('Construction Materials, Personal', 'Paint & Supplies', 100),
    ('Construction Materials, Commercial', 'Paint & Supplies', 100),
    ('Construction Materials, Government', 'Paint & Supplies', 100),

    -- Outdoor Equipment
    ('Outdoor Equipment', 'Garden Furniture', 100),
    ('Outdoor Equipment', 'Pool & Spa', 100),
    ('Outdoor Equipment', 'Water Sports Equipment', 100),
    ('Outdoor Equipment', 'Winter Sports Equipment', 100),
    ('Outdoor Equipment', 'Martial Arts Equipment', 100),
    ('Outdoor Equipment', 'Cycling Accessories', 100),
    ('Outdoor Equipment', 'Skateboarding Gear', 100),
    ('Outdoor Equipment', 'Surfing Gear', 100),
    ('Outdoor Equipment', 'Fishing Equipment', 100),
    ('Outdoor Equipment', 'Boating Accessories', 100),


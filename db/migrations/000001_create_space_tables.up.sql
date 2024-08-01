-- Up migration

-- Create the superclusters table
CREATE TABLE superclusters (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    number_of_galaxies INT NOT NULL
);

-- Create the galaxies table
CREATE TABLE galaxies (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    supercluster UUID NOT NULL,
    number_of_planets INT NOT NULL,
    FOREIGN KEY (supercluster) REFERENCES superclusters(id)
);

-- Create the planets table
CREATE TABLE planets (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    galaxy UUID NOT NULL,
    climate VARCHAR(50) CHECK (climate IN ('Tropical Rainforest', 'Savanna', 'Desert', 'Mediterranean', 'Tundra', 'Temperate Deciduous Forest', 'Boreal Forest', 'Polar', 'Highland', 'Monsoon')) NOT NULL,
    number_of_docks INT NOT NULL,
    tax_rate INT CHECK (tax_rate >= 0 AND tax_rate <= 100) NOT NULL,
    political_fee INT CHECK (political_fee >= 0) NOT NULL,
    FOREIGN KEY (galaxy) REFERENCES galaxies(id)
);

-- Insert fake data into superclusters
INSERT INTO superclusters (id, name, number_of_galaxies) VALUES
    ('182b1bd8-5fb2-4b67-8981-ac798d0ac3dc', 'Supercluster Alpha', 3),
    ('e1d6588f-e07b-48c1-b151-28c03fc553a4', 'Supercluster Beta', 3),
    ('38e209a4-e821-4b0a-8974-f46f00f36599', 'Supercluster Gamma', 3);

-- Insert fake data into galaxies
INSERT INTO galaxies (id, name, supercluster, number_of_planets) VALUES
    ('c671a14f-9552-4707-bc8d-a065597c351a', 'Acostas', '182b1bd8-5fb2-4b67-8981-ac798d0ac3dc', 6),
    ('0f023e67-0156-441f-bcf5-d03ff20f60ef', 'Fright', '182b1bd8-5fb2-4b67-8981-ac798d0ac3dc', 7),
    ('f2914e97-c74b-4e44-80fe-fa2f6df691ac', 'Citra', '182b1bd8-5fb2-4b67-8981-ac798d0ac3dc', 5),
    ('765487ee-87cd-4f38-b1f3-ac7fd05681b4', 'Alakakis', 'e1d6588f-e07b-48c1-b151-28c03fc553a4', 5),
    ('bfe83c9e-e8fc-4d42-828e-7985975c7719', 'Columbus', 'e1d6588f-e07b-48c1-b151-28c03fc553a4', 6),
    ('c0c45c28-53ee-4cd4-a769-57c8a9202463', 'D3432', 'e1d6588f-e07b-48c1-b151-28c03fc553a4', 7),
    ('6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 'Fractoloah', '38e209a4-e821-4b0a-8974-f46f00f36599', 5),
    ('2a176758-74ed-43e4-a27c-66881929b91d', 'Empusheray', '38e209a4-e821-4b0a-8974-f46f00f36599', 4),
    ('96d608c4-e164-4752-b0ab-690915c6f8ba', 'Bree', '38e209a4-e821-4b0a-8974-f46f00f36599', 5);

-- Insert fake data into planets
INSERT INTO planets (id, name, galaxy, climate, number_of_docks, tax_rate, political_fee) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Alderaan', 'c671a14f-9552-4707-bc8d-a065597c351a', 'Tropical Rainforest', 2, 15, 100),
    ('00000000-0000-0000-0000-000000000002', 'Arrakis', 'c671a14f-9552-4707-bc8d-a065597c351a', 'Savanna', 3, 10, 200),
    ('00000000-0000-0000-0000-000000000003', 'Tatooine', 'c671a14f-9552-4707-bc8d-a065597c351a', 'Desert', 1, 20, 150),
    ('00000000-0000-0000-0000-000000000004', 'Krypton', 'c671a14f-9552-4707-bc8d-a065597c351a', 'Mediterranean', 4, 25, 300),
    ('00000000-0000-0000-0000-000000000005', 'Hoth', 'c671a14f-9552-4707-bc8d-a065597c351a', 'Tundra', 2, 5, 250),
    ('00000000-0000-0000-0000-000000000006', 'Endor', 'c671a14f-9552-4707-bc8d-a065597c351a', 'Temperate Deciduous Forest', 3, 18, 100),
    ('00000000-0000-0000-0000-000000000007', 'Dagobah', '0f023e67-0156-441f-bcf5-d03ff20f60ef', 'Boreal Forest', 2, 10, 100),
    ('00000000-0000-0000-0000-000000000008', 'Hoth Prime', '0f023e67-0156-441f-bcf5-d03ff20f60ef', 'Polar', 1, 30, 200),
    ('00000000-0000-0000-0000-000000000009', 'Bespin', '0f023e67-0156-441f-bcf5-d03ff20f60ef', 'Highland', 3, 12, 150),
    ('00000000-0000-0000-0000-000000000010', 'Kamino', '0f023e67-0156-441f-bcf5-d03ff20f60ef', 'Monsoon', 4, 22, 300),
    ('00000000-0000-0000-0000-000000000011', 'Felucia', '0f023e67-0156-441f-bcf5-d03ff20f60ef', 'Tropical Rainforest', 3, 14, 130),
    ('00000000-0000-0000-0000-000000000012', 'Pandora', 'f2914e97-c74b-4e44-80fe-fa2f6df691ac', 'Savanna', 2, 16, 140),
    ('00000000-0000-0000-0000-000000000013', 'Dune', 'f2914e97-c74b-4e44-80fe-fa2f6df691ac', 'Desert', 1, 15, 120),
    ('00000000-0000-0000-0000-000000000014', 'Vulcan', 'f2914e97-c74b-4e44-80fe-fa2f6df691ac', 'Mediterranean', 4, 20, 160),
    ('00000000-0000-0000-0000-000000000015', 'Naboo', 'f2914e97-c74b-4e44-80fe-fa2f6df691ac', 'Tundra', 3, 5, 180),
    ('00000000-0000-0000-0000-000000000016', 'Oregonia', 'f2914e97-c74b-4e44-80fe-fa2f6df691ac', 'Temperate Deciduous Forest', 2, 3, 4),
    ('00000000-0000-0000-0000-000000000017', 'Yavin', '765487ee-87cd-4f38-b1f3-ac7fd05681b4', 'Boreal Forest', 3, 12, 150),
    ('00000000-0000-0000-0000-000000000018', 'Ice', '765487ee-87cd-4f38-b1f3-ac7fd05681b4', 'Polar', 2, 25, 180),
    ('00000000-0000-0000-0000-000000000019', 'Eden', '765487ee-87cd-4f38-b1f3-ac7fd05681b4', 'Highland', 4, 15, 170),
    ('00000000-0000-0000-0000-000000000020', 'Waterworld', '765487ee-87cd-4f38-b1f3-ac7fd05681b4', 'Monsoon', 3, 20, 160),
    ('00000000-0000-0000-0000-000000000021', 'Endor Prime', 'bfe83c9e-e8fc-4d42-828e-7985975c7719', 'Tropical Rainforest', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000022', 'Terra Nova', 'bfe83c9e-e8fc-4d42-828e-7985975c7719', 'Savanna',2, 10, 150),
    ('00000000-0000-0000-0000-000000000023', 'Gaia', 'c0c45c28-53ee-4cd4-a769-57c8a9202463', 'Savanna',2, 10, 150), 
    ('00000000-0000-0000-0000-000000000024', 'Artemis', 'c0c45c28-53ee-4cd4-a769-57c8a9202463', 'Tropical Rainforest', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000025', 'Prometheus', 'c0c45c28-53ee-4cd4-a769-57c8a9202463', 'Savanna', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000026', 'Borealis', '6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 'Polar', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000027', 'Hoth II', '6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 'Polar', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000028', 'Pandora Prime', '6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 'Tropical Rainforest', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000029', 'Hyperion', '6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 'Polar', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000030', 'Aquaria', '6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 'Monsoon', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000031', 'Arrakis Prime', '6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 'Desert', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000032', 'Gliese', '6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 'Tundra', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000033', 'Vega', '2a176758-74ed-43e4-a27c-66881929b91d', 'Savanna', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000034', 'Orion', '2a176758-74ed-43e4-a27c-66881929b91d', 'Mediterranean', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000035', 'Nereus', '2a176758-74ed-43e4-a27c-66881929b91d', 'Temperate Deciduous Forest', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000036', 'Altair', '2a176758-74ed-43e4-a27c-66881929b91d', 'Temperate Deciduous Forest', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000037', 'Nyx', '2a176758-74ed-43e4-a27c-66881929b91d', 'Tropical Rainforest', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000038', 'Zeta', '2a176758-74ed-43e4-a27c-66881929b91d', 'Desert', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000039', 'Elara', '2a176758-74ed-43e4-a27c-66881929b91d', 'Highland', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000040', 'LeBronia', '2a176758-74ed-43e4-a27c-66881929b91d', 'Savanna', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000041', 'Scranton', '2a176758-74ed-43e4-a27c-66881929b91d', 'Savanna', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000042', 'Cannabitica', '96d608c4-e164-4752-b0ab-690915c6f8ba', 'Highland', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000043', 'Portlandia', '96d608c4-e164-4752-b0ab-690915c6f8ba', 'Temperate Deciduous Forest', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000044', 'Caladan', '96d608c4-e164-4752-b0ab-690915c6f8ba', 'Tropical Rainforest', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000045', 'Seas of Grass', '96d608c4-e164-4752-b0ab-690915c6f8ba', 'Savanna', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000046', 'Dune 2', '96d608c4-e164-4752-b0ab-690915c6f8ba', 'Desert', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000047', 'Pridelands', '96d608c4-e164-4752-b0ab-690915c6f8ba', 'Savanna', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000048', 'Higherlands', '96d608c4-e164-4752-b0ab-690915c6f8ba', 'Highland', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000049', 'Buriedaldia', '96d608c4-e164-4752-b0ab-690915c6f8ba', 'Desert', 2, 10, 150),
    ('00000000-0000-0000-0000-000000000050', 'Tblisis', '96d608c4-e164-4752-b0ab-690915c6f8ba', 'Mediterranean', 2, 10, 150);
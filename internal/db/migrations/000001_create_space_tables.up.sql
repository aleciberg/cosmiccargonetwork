-- Up migration

-- Create the superclusters table
CREATE TABLE superclusters (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    number_of_galaxies INT NOT NULL,
    x FLOAT NOT NULL DEFAULT 0.0,
    z FLOAT NOT NULL DEFAULT 0.0,
    y FLOAT NOT NULL DEFAULT 0.0,
);

-- Create the galaxies table
CREATE TABLE galaxies (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    supercluster UUID NOT NULL,
    number_of_planets INT NOT NULL,
    FOREIGN KEY (supercluster) REFERENCES superclusters(id),
    x FLOAT NOT NULL DEFAULT 0.0,
    z FLOAT NOT NULL DEFAULT 0.0,
    y FLOAT NOT NULL DEFAULT 0.0,
);

-- Create the planets table
CREATE TABLE planets (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    galaxy UUID NOT NULL,
    climate INT CHECK (climate BETWEEN 0 AND 9) NOT NULL,
    number_of_docks INT NOT NULL,
    tax_rate INT CHECK (tax_rate >= 0 AND tax_rate <= 100) NOT NULL,
    political_fee INT CHECK (political_fee >= 0) NOT NULL,
    FOREIGN KEY (galaxy) REFERENCES galaxies(id),
    x FLOAT NOT NULL DEFAULT 0.0,
    z FLOAT NOT NULL DEFAULT 0.0,
    y FLOAT NOT NULL DEFAULT 0.0,
);

-- Insert fake data into superclusters
INSERT INTO superclusters (id, name, number_of_galaxies, x_coordinate, y_coordinate, z_coordinate) VALUES
    ('182b1bd8-5fb2-4b67-8981-ac798d0ac3dc', 'Supercluster Alpha', 3, 132.34, -569.78, 9100.01),
    ('e1d6588f-e07b-48c1-b151-28c03fc553a4', 'Supercluster Beta', 3, -354.56, 780.90, -1221.34),
    ('38e209a4-e821-4b0a-8974-f46f00f36599', 'Supercluster Gamma', 3, 4578.67, -23.45, 670.89);


-- Insert fake data into galaxies
INSERT INTO galaxies (id, name, supercluster, number_of_planets, x_coordinate, y_coordinate, z_coordinate) VALUES
    ('c671a14f-9552-4707-bc8d-a065597c351a', 'Acostas', '182b1bd8-5fb2-4b67-8981-ac798d0ac3dc', 6, 167.23, -459.56, 7001.89),

    ('0f023e67-0156-441f-bcf5-d03ff20f60ef', 'Fright', '182b1bd8-5fb2-4b67-8981-ac798d0ac3dc', 7, 12.45, -666.89, 8413.34),

    ('f2914e97-c74b-4e44-80fe-fa2f6df691ac', 'Citra', '182b1bd8-5fb2-4b67-8981-ac798d0ac3dc', 5, 889.90, -1201.34, 4533.67),

    ('765487ee-87cd-4f38-b1f3-ac7fd05681b4', 'Alakakis', 'e1d6588f-e07b-48c1-b151-28c03fc553a4', 5, -1244.34, 457.67, -2312.45),

    ('bfe83c9e-e8fc-4d42-828e-7985975c7719', 'Columbus', 'e1d6588f-e07b-48c1-b151-28c03fc553a4', 6, -245.89, 690.45, -1337.90),

    ('c0c45c28-53ee-4cd4-a769-57c8a9202463', 'D3432', 'e1d6588f-e07b-48c1-b151-28c03fc553a4', 7, -789.56, 910.01, -1000.34),

    ('6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 'Fractoloah', '38e209a4-e821-4b0a-8974-f46f00f36599', 5, 2355.45, -12.34, 560.78),

    ('2a176758-74ed-43e4-a27c-66881929b91d', 'Empusheray', '38e209a4-e821-4b0a-8974-f46f00f36599', 4, 4189.78, 23.45, 671.89),

    ('96d608c4-e164-4752-b0ab-690915c6f8ba', 'Bree', '38e209a4-e821-4b0a-8974-f46f00f36599', 5, 3773.01, -45.67, 235.45);
    -- these are all updated, need to do planets


-- next step need to update galaxy and planet counts
-- and fix all of the planet coords
-- time for a hot bath

-- Insert fake data into planets
INSERT INTO planets (id, name, galaxy, climate, number_of_docks, tax_rate, political_fee) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Alderaan', 'c671a14f-9552-4707-bc8d-a065597c351a', 0, 2, 15, 100),
    ('00000000-0000-0000-0000-000000000002', 'Arrakis', 'c671a14f-9552-4707-bc8d-a065597c351a', 1, 3, 10, 200),
    ('00000000-0000-0000-0000-000000000003', 'Tatooine', 'c671a14f-9552-4707-bc8d-a065597c351a', 2, 1, 20, 150),
    ('00000000-0000-0000-0000-000000000004', 'Krypton', 'c671a14f-9552-4707-bc8d-a065597c351a', 3, 4, 25, 300),
    ('00000000-0000-0000-0000-000000000005', 'Hoth', 'c671a14f-9552-4707-bc8d-a065597c351a', 4, 2, 5, 250),
    ('00000000-0000-0000-0000-000000000006', 'Endor', 'c671a14f-9552-4707-bc8d-a065597c351a', 5, 3, 18, 100),

    ('00000000-0000-0000-0000-000000000007', 'Dagobah', '0f023e67-0156-441f-bcf5-d03ff20f60ef', 6, 2, 10, 100),
    ('00000000-0000-0000-0000-000000000008', 'Hoth Prime', '0f023e67-0156-441f-bcf5-d03ff20f60ef', 7, 1, 30, 200),
    ('00000000-0000-0000-0000-000000000009', 'Bespin', '0f023e67-0156-441f-bcf5-d03ff20f60ef', 8, 3, 12, 150),
    ('00000000-0000-0000-0000-000000000010', 'Kamino', '0f023e67-0156-441f-bcf5-d03ff20f60ef', 9, 4, 22, 300),
    ('00000000-0000-0000-0000-000000000011', 'Felucia', '0f023e67-0156-441f-bcf5-d03ff20f60ef', 0, 3, 14, 130),

    ('00000000-0000-0000-0000-000000000012', 'Pandora', 'f2914e97-c74b-4e44-80fe-fa2f6df691ac', 1, 2, 16, 140),
    ('00000000-0000-0000-0000-000000000013', 'Dune', 'f2914e97-c74b-4e44-80fe-fa2f6df691ac', 2, 1, 15, 120),
    ('00000000-0000-0000-0000-000000000014', 'Vulcan', 'f2914e97-c74b-4e44-80fe-fa2f6df691ac', 3, 4, 20, 160),
    ('00000000-0000-0000-0000-000000000015', 'Naboo', 'f2914e97-c74b-4e44-80fe-fa2f6df691ac', 4, 3, 5, 180),
    ('00000000-0000-0000-0000-000000000016', 'Oregonia', 'f2914e97-c74b-4e44-80fe-fa2f6df691ac', 5, 2, 3, 4),

    ('00000000-0000-0000-0000-000000000017', 'Yavin', '765487ee-87cd-4f38-b1f3-ac7fd05681b4', 6, 3, 12, 150),
    ('00000000-0000-0000-0000-000000000018', 'Ice', '765487ee-87cd-4f38-b1f3-ac7fd05681b4', 7, 2, 25, 180),
    ('00000000-0000-0000-0000-000000000019', 'Eden', '765487ee-87cd-4f38-b1f3-ac7fd05681b4', 8, 4, 15, 170),
    ('00000000-0000-0000-0000-000000000020', 'Waterworld', '765487ee-87cd-4f38-b1f3-ac7fd05681b4', 9, 3, 20, 160),

    ('00000000-0000-0000-0000-000000000021', 'Endor Prime', 'bfe83c9e-e8fc-4d42-828e-7985975c7719', 0, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000022', 'Terra Nova', 'bfe83c9e-e8fc-4d42-828e-7985975c7719', 1,2, 10, 150),

    ('00000000-0000-0000-0000-000000000023', 'Gaia', 'c0c45c28-53ee-4cd4-a769-57c8a9202463', 1,2, 10, 150), 
    ('00000000-0000-0000-0000-000000000024', 'Artemis', 'c0c45c28-53ee-4cd4-a769-57c8a9202463', 0, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000025', 'Prometheus', 'c0c45c28-53ee-4cd4-a769-57c8a9202463', 1, 2, 10, 150),

    ('00000000-0000-0000-0000-000000000026', 'Borealis', '6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 7, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000027', 'Hoth II', '6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 7, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000028', 'Pandora Prime', '6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 0, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000029', 'Hyperion', '6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 7, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000030', 'Aquaria', '6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 9, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000031', 'Arrakis Prime', '6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 2, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000032', 'Gliese', '6f21dba6-9bf5-4d94-9b68-72c06f8007dc', 4, 2, 10, 150),

    ('00000000-0000-0000-0000-000000000033', 'Vega', '2a176758-74ed-43e4-a27c-66881929b91d', 1, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000034', 'Orion', '2a176758-74ed-43e4-a27c-66881929b91d', 3, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000035', 'Nereus', '2a176758-74ed-43e4-a27c-66881929b91d', 5, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000036', 'Altair', '2a176758-74ed-43e4-a27c-66881929b91d', 5, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000037', 'Nyx', '2a176758-74ed-43e4-a27c-66881929b91d', 0, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000038', 'Zeta', '2a176758-74ed-43e4-a27c-66881929b91d', 2, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000039', 'Elara', '2a176758-74ed-43e4-a27c-66881929b91d', 8, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000040', 'LeBronia', '2a176758-74ed-43e4-a27c-66881929b91d', 1, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000041', 'Scranton', '2a176758-74ed-43e4-a27c-66881929b91d', 1, 2, 10, 150),

    ('00000000-0000-0000-0000-000000000042', 'Cannabitica', '96d608c4-e164-4752-b0ab-690915c6f8ba', 8, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000043', 'Portlandia', '96d608c4-e164-4752-b0ab-690915c6f8ba', 5, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000044', 'Caladan', '96d608c4-e164-4752-b0ab-690915c6f8ba', 0, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000045', 'Seas of Grass', '96d608c4-e164-4752-b0ab-690915c6f8ba', 1, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000046', 'Dune 2', '96d608c4-e164-4752-b0ab-690915c6f8ba', 2, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000047', 'Pridelands', '96d608c4-e164-4752-b0ab-690915c6f8ba', 1, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000048', 'Higherlands', '96d608c4-e164-4752-b0ab-690915c6f8ba', 8, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000049', 'Buriedaldia', '96d608c4-e164-4752-b0ab-690915c6f8ba', 2, 2, 10, 150),
    ('00000000-0000-0000-0000-000000000050', 'Tblisis', '96d608c4-e164-4752-b0ab-690915c6f8ba', 3, 2, 10, 150);
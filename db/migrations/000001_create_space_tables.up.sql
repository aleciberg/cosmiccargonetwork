-- Migration SQL for creating the superclusters, galaxies, and planets tables

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

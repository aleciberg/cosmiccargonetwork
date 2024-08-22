-- Down migration SQL for dropping the planets, galaxies, and superclusters tables

-- Drop the planets table
DROP TABLE IF EXISTS planets;

-- Drop the galaxies table
DROP TABLE IF EXISTS galaxies;

-- Drop the superclusters table
DROP TABLE IF EXISTS superclusters;

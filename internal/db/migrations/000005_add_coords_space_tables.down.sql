-- Down migration (to rollback the changes)
-- Drop the new columns if you need to roll back
ALTER TABLE superclusters
DROP COLUMN x,
DROP COLUMN y,
DROP COLUMN z;

ALTER TABLE galaxies
DROP COLUMN x,
DROP COLUMN y,
DROP COLUMN z;

ALTER TABLE planets
DROP COLUMN x,
DROP COLUMN y,
DROP COLUMN z;
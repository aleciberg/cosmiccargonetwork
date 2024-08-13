CREATE TABLE "planets" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "galaxy" uuid,
  "climate" int,
  "number_of_docks" int,
  "tax_rate" int,
  "political_fee" int
);

CREATE TABLE "galaxies" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "supercluster" uuid,
  "number_of_planets" int
);

CREATE TABLE "superclusters" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "number_of_galaxies" int
);

CREATE TABLE "cargo_categories" (
  "id" uuid,
  "category_class" int,
  "category_desc" int,
  "category_premium" int
);

CREATE TABLE "cargo_classes" (
  "id" uuid,
  "category_class" int,
  "base_rate" int
);

ALTER TABLE "planets" ADD FOREIGN KEY ("galaxy") REFERENCES "galaxies" ("id");

ALTER TABLE "galaxies" ADD FOREIGN KEY ("supercluster") REFERENCES "superclusters" ("id");

ALTER TABLE "cargo_categories" ADD FOREIGN KEY ("category_class") REFERENCES "cargo_classes" ("id");

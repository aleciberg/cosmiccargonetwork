CREATE TABLE shipping_quotes (
    id UUID PRIMARY KEY,
    shipment_date VARCHAR(250),
    origin_planet VARCHAR(250),
    destination_planet VARCHAR(250),
    required_delivery_date VARCHAR(250),
    cargo_class VARCHAR(250),
    units int,
    client VARCHAR(250),
    recipient VARCHAR(250),
    quote NUMBER
);



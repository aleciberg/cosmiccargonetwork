CREATE TABLE shipping_quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_date timestamptz DEFAULT now(),
    shipment_date timestamptz,
    origin_planet timestamptz,
    destination_planet VARCHAR(250),
    required_delivery_date timestamptz,
    cargo_class VARCHAR(250),
    units int,
    client VARCHAR(250),
    recipient VARCHAR(250),
    quote NUMERIC
);



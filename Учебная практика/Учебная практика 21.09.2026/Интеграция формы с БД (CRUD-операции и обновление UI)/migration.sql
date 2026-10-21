ALTER TABLE partners
    ADD COLUMN IF NOT EXISTS partner_type VARCHAR(3) NOT NULL DEFAULT 'ООО',
    ADD COLUMN IF NOT EXISTS address VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS director_name VARCHAR(255) NOT NULL DEFAULT '';

ALTER TABLE partners
    DROP CONSTRAINT IF EXISTS partners_rating_check,
    ADD CONSTRAINT partners_rating_check CHECK (rating >= 0);

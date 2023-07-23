/* Replace with your SQL commands */
ALTER TABLE doctor
ADD COLUMN rate integer NOT NULL CHECK (rate >= 0 AND rate <= 5);
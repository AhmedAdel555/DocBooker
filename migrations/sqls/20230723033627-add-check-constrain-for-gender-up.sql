/* Replace with your SQL commands */
ALTER TABLE doctor
ADD CONSTRAINT gender_check
CHECK (gender IN ('Male', 'Female'));

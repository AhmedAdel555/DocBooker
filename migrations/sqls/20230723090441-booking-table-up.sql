/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE booking(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  clin_id uuid NOT NULL REFERENCES client(id) ON DELETE CASCADE,
  ent_id uuid NOT NULL,
  date_of_day DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  FOREIGN KEY (ent_id, date_of_day, start_time, end_time) REFERENCES entity_appointment(ent_id, date_of_day, start_time, end_time)
);
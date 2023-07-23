/* Replace with your SQL commands */
create table entity_appointment(
  ent_id uuid NOT NULL REFERENCES entity(id) ON DELETE CASCADE,
  date_of_day DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(50) NOT NULL check(status = 'available' or status = 'unavailable'),
  number_of_patients int NOT NULL,
  PRIMARY KEY (ent_id, date_of_day, start_time, end_time)
);
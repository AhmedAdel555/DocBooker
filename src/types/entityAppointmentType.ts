type entityAppointment = {
  ent_id: string,
  date_of_day : Date,
  start_time : Date,
  end_time : Date,
  status?: string,
  number_of_patients?: number,
}

export default entityAppointment;
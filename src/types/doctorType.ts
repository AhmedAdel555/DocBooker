type doctor = {
  id?: string;
  name: string;
  main_specialization: string;
  description: string;
  gender: 'Male' | 'Female';
  email: string;
  password: string;
  rate: number
}

export default doctor;
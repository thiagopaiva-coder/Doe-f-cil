export interface Donation {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  amount: number; // raw numeric value
  date: string; // ISO date string
}

export interface AdminUser {
  email: string;
  name: string;
}

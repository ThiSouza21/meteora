export interface IDto {
  nome: string;
  email: string;
  senha: string;
  role?: "admin" | "user";
}

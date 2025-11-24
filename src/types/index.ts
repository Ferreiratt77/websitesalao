export interface Cliente {
  id?: number;
  nome: string;
  telefone: string;
}

export interface Servico {
  id?: number;
  nome: string;
  preco: number;
}

export interface Agendamento {
  id?: number;
  data: string;
  horario: string;
  cliente: Cliente;
  servico: Servico;
}

import { Cliente, Servico, Agendamento } from "@/types";

const API_BASE_URL = "http://localhost:8080/api";

// Clientes
export const getClientes = async (): Promise<Cliente[]> => {
  const response = await fetch(`${API_BASE_URL}/clientes`);
  if (!response.ok) throw new Error("Erro ao buscar clientes");
  return response.json();
};

export const createCliente = async (cliente: Cliente): Promise<Cliente> => {
  const response = await fetch(`${API_BASE_URL}/cliente`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  if (!response.ok) throw new Error("Erro ao criar cliente");
  return response.json();
};

// Serviços
export const getServicos = async (): Promise<Servico[]> => {
  const response = await fetch(`${API_BASE_URL}/servicos`);
  if (!response.ok) throw new Error("Erro ao buscar serviços");
  return response.json();
};

export const createServico = async (servico: Servico): Promise<Servico> => {
  const response = await fetch(`${API_BASE_URL}/servico`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(servico),
  });
  if (!response.ok) throw new Error("Erro ao criar serviço");
  return response.json();
};

// Agendamentos
export const getAgendamentos = async (): Promise<Agendamento[]> => {
  const response = await fetch(`${API_BASE_URL}/agendamentos`);
  if (!response.ok) throw new Error("Erro ao buscar agendamentos");
  return response.json();
};

export const createAgendamento = async (agendamento: Agendamento): Promise<Agendamento> => {
  const response = await fetch(`${API_BASE_URL}/agendamento`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(agendamento),
  });
  if (!response.ok) throw new Error("Erro ao criar agendamento");
  return response.json();
};

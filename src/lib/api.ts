import { supabase } from "@/integrations/supabase/client";
import { Cliente, Servico, Agendamento } from "@/types";

// Clientes
export const getClientes = async (): Promise<Cliente[]> => {
  const { data, error } = await supabase
    .from("clientes")
    .select("*")
    .order("id", { ascending: true });
  
  if (error) throw new Error(error.message);
  return data || [];
};

export const createCliente = async (cliente: Omit<Cliente, 'id'>): Promise<Cliente> => {
  const { data, error } = await supabase
    .from("clientes")
    .insert([cliente])
    .select()
    .single();
  
  if (error) throw new Error(error.message);
  return data;
};

// Serviços
export const getServicos = async (): Promise<Servico[]> => {
  const { data, error } = await supabase
    .from("servicos")
    .select("*")
    .order("id", { ascending: true });
  
  if (error) throw new Error(error.message);
  return data || [];
};

export const createServico = async (servico: Omit<Servico, 'id'>): Promise<Servico> => {
  const { data, error } = await supabase
    .from("servicos")
    .insert([servico])
    .select()
    .single();
  
  if (error) throw new Error(error.message);
  return data;
};

// Agendamentos
export const getAgendamentos = async (): Promise<Agendamento[]> => {
  const { data, error } = await supabase
    .from("agendamentos")
    .select(`
      *,
      cliente:clientes(*),
      servico:servicos(*)
    `)
    .order("data", { ascending: false })
    .order("horario", { ascending: false });
  
  if (error) throw new Error(error.message);
  return data || [];
};

export const createAgendamento = async (agendamento: {
  data: string;
  horario: string;
  cliente_id: number;
  servico_id: number;
}): Promise<Agendamento> => {
  const { data, error } = await supabase
    .from("agendamentos")
    .insert([agendamento])
    .select(`
      *,
      cliente:clientes(*),
      servico:servicos(*)
    `)
    .single();
  
  if (error) throw new Error(error.message);
  return data;
};

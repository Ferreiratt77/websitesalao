-- Criar tabela de clientes
CREATE TABLE public.clientes (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de serviços
CREATE TABLE public.servicos (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de agendamentos
CREATE TABLE public.agendamentos (
  id BIGSERIAL PRIMARY KEY,
  data DATE NOT NULL,
  horario TIME NOT NULL,
  cliente_id BIGINT NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,
  servico_id BIGINT NOT NULL REFERENCES public.servicos(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS nas tabelas
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agendamentos ENABLE ROW LEVEL SECURITY;

-- Criar políticas de acesso público (sistema interno do salão)
CREATE POLICY "Permitir acesso total a clientes"
ON public.clientes
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir acesso total a servicos"
ON public.servicos
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir acesso total a agendamentos"
ON public.agendamentos
FOR ALL
USING (true)
WITH CHECK (true);
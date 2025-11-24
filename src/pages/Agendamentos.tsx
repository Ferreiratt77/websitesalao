import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAgendamentos, createAgendamento, getClientes, getServicos } from "@/lib/api";
import { Agendamento } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar, Plus, CalendarDays, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";

const Agendamentos = () => {
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [clienteId, setClienteId] = useState<string>("");
  const [servicoId, setServicoId] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: agendamentos = [], isLoading } = useQuery({
    queryKey: ["agendamentos"],
    queryFn: getAgendamentos,
  });

  const { data: clientes = [] } = useQuery({
    queryKey: ["clientes"],
    queryFn: getClientes,
  });

  const { data: servicos = [] } = useQuery({
    queryKey: ["servicos"],
    queryFn: getServicos,
  });

  const mutation = useMutation({
    mutationFn: createAgendamento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agendamentos"] });
      toast.success("Agendamento criado com sucesso!");
      setData("");
      setHorario("");
      setClienteId("");
      setServicoId("");
    },
    onError: () => {
      toast.error("Erro ao criar agendamento");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !horario || !clienteId || !servicoId) {
      toast.error("Preencha todos os campos");
      return;
    }

    const cliente = clientes.find((c) => c.id === parseInt(clienteId));
    const servico = servicos.find((s) => s.id === parseInt(servicoId));

    if (!cliente || !servico) {
      toast.error("Cliente ou serviço inválido");
      return;
    }

    mutation.mutate({
      data,
      horario,
      cliente,
      servico,
    });
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
          <Calendar className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Agendamentos</h1>
          <p className="text-muted-foreground">Gerencie a agenda do salão</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Novo Agendamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente</Label>
                <Select value={clienteId} onValueChange={setClienteId}>
                  <SelectTrigger id="cliente" className="border-border/50 bg-background">
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border z-50">
                    {clientes.map((cliente) => (
                      <SelectItem key={cliente.id} value={String(cliente.id)}>
                        {cliente.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="servico">Serviço</Label>
                <Select value={servicoId} onValueChange={setServicoId}>
                  <SelectTrigger id="servico" className="border-border/50 bg-background">
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border z-50">
                    {servicos.map((servico) => (
                      <SelectItem key={servico.id} value={String(servico.id)}>
                        {servico.nome} - R$ {servico.preco.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data" className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  Data
                </Label>
                <Input
                  id="data"
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="horario" className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Horário
                </Label>
                <Input
                  id="horario"
                  type="time"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  className="border-border/50 focus:border-primary"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Criando..." : "Criar Agendamento"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-card border-border/50">
          <CardHeader>
            <CardTitle>Lista de Agendamentos</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center text-muted-foreground py-8">Carregando...</p>
            ) : agendamentos.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhum agendamento ainda
              </p>
            ) : (
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Cliente</TableHead>
                      <TableHead className="font-semibold">Serviço</TableHead>
                      <TableHead className="font-semibold">Data</TableHead>
                      <TableHead className="font-semibold">Horário</TableHead>
                      <TableHead className="font-semibold text-right">Preço</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agendamentos.map((agendamento) => (
                      <TableRow key={agendamento.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">
                          {agendamento.cliente.nome}
                        </TableCell>
                        <TableCell>{agendamento.servico.nome}</TableCell>
                        <TableCell>{formatDate(agendamento.data)}</TableCell>
                        <TableCell>{agendamento.horario}</TableCell>
                        <TableCell className="text-right font-medium">
                          R$ {agendamento.servico.preco.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Agendamentos;

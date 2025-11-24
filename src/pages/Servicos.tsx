import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getServicos, createServico } from "@/lib/api";
import { Servico } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Scissors, Plus, DollarSign } from "lucide-react";
import { Label } from "@/components/ui/label";

const Servicos = () => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const queryClient = useQueryClient();

  const { data: servicos = [], isLoading } = useQuery({
    queryKey: ["servicos"],
    queryFn: getServicos,
  });

  const mutation = useMutation({
    mutationFn: createServico,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servicos"] });
      toast.success("Serviço cadastrado com sucesso!");
      setNome("");
      setPreco("");
    },
    onError: () => {
      toast.error("Erro ao cadastrar serviço");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !preco.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }
    const precoNumerico = parseFloat(preco);
    if (isNaN(precoNumerico) || precoNumerico <= 0) {
      toast.error("Preço inválido");
      return;
    }
    mutation.mutate({ nome, preco: precoNumerico });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center">
          <Scissors className="h-6 w-6 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Serviços</h1>
          <p className="text-muted-foreground">Gerencie os serviços do salão</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-accent" />
              Novo Serviço
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome-servico" className="flex items-center gap-2">
                  <Scissors className="h-4 w-4 text-muted-foreground" />
                  Nome do Serviço
                </Label>
                <Input
                  id="nome-servico"
                  placeholder="Ex: Corte de cabelo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="border-border/50 focus:border-accent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preco" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  Preço
                </Label>
                <Input
                  id="preco"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  className="border-border/50 focus:border-accent"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-accent hover:opacity-90 text-accent-foreground"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Cadastrando..." : "Cadastrar Serviço"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-card border-border/50">
          <CardHeader>
            <CardTitle>Lista de Serviços</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center text-muted-foreground py-8">Carregando...</p>
            ) : servicos.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhum serviço cadastrado ainda
              </p>
            ) : (
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">ID</TableHead>
                      <TableHead className="font-semibold">Serviço</TableHead>
                      <TableHead className="font-semibold text-right">Preço</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {servicos.map((servico) => (
                      <TableRow key={servico.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{servico.id}</TableCell>
                        <TableCell>{servico.nome}</TableCell>
                        <TableCell className="text-right font-medium">
                          R$ {servico.preco.toFixed(2)}
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

export default Servicos;

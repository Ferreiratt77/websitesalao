import { Link } from "react-router-dom";
import { Users, Scissors, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Home = () => {
  const features = [
    {
      icon: Users,
      title: "Clientes",
      description: "Gerencie sua base de clientes com facilidade",
      link: "/clientes",
      color: "text-primary",
    },
    {
      icon: Scissors,
      title: "Serviços",
      description: "Cadastre e organize todos os serviços oferecidos",
      link: "/servicos",
      color: "text-accent",
    },
    {
      icon: Calendar,
      title: "Agendamentos",
      description: "Controle completo da agenda do salão",
      link: "/agendamentos",
      color: "text-primary",
    },
  ];

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4 py-12">
        <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Bem-vindo ao Salão Elegance
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Sistema completo de gerenciamento para seu salão de beleza. 
          Simples, elegante e eficiente.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.title}
              className="group hover:shadow-soft transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardHeader>
                <div className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center mb-4",
                  "group-hover:scale-110 transition-transform duration-300"
                )}>
                  <Icon className={cn("h-6 w-6", feature.color)} />
                </div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  className="w-full group/btn"
                  variant="outline"
                >
                  <Link to={feature.link}>
                    Acessar
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
};

export default Home;

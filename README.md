# Controle de Gastos Residenciais

Sistema simples para cadastrar pessoas de uma residência e lançar as receitas
e despesas de cada uma, com consulta de totais por pessoa e total geral.

- **Back-end**: .NET 8 (ASP.NET Core Web API) + Entity Framework Core + SQLite
- **Front-end**: React + TypeScript (Vite)

## Regra de negócio importante

Pessoas **menores de 18 anos** só podem cadastrar transações do tipo
**Despesa**. Se tentar cadastrar uma **Receita** para uma pessoa menor de
idade, a API retorna erro (400) explicando o motivo, e o front-end mostra
essa mensagem na tela.

Além disso, ao excluir uma pessoa, todas as transações dela são excluídas
automaticamente junto (exclusão em cascata).

## Como rodar o back-end

Pré-requisito: [SDK do .NET 8](https://dotnet.microsoft.com/download) instalado.

```bash
cd backend/GastosResidenciais.Api
dotnet run
```

A API sobe em `http://localhost:5274`. O banco de dados SQLite
(`gastos.db`) é criado automaticamente na primeira execução, junto com as
tabelas (via migrations já aplicadas no projeto).

Para explorar e testar os endpoints pelo navegador, acesse o Swagger:

```
http://localhost:5274/swagger
```

## Como rodar o front-end

Pré-requisito: [Node.js](https://nodejs.org/) (LTS) instalado.

```bash
cd frontend
npm install
npm run dev
```

O front-end sobe em `http://localhost:5173` e já está configurado para
chamar a API em `http://localhost:5274`.

> Importante: rode o back-end **antes** do front-end, para que as chamadas à
> API funcionem.

## Estrutura do projeto

```
backend/
  GastosResidenciais.Api/
    Controllers/   -> endpoints da API (Pessoas, Transacoes, Totais)
    Models/         -> classes Pessoa e Transacao
    Data/           -> configuração do banco (AppDbContext)
    Migrations/     -> histórico de mudanças no banco (EF Core)
frontend/
  src/
    pages/          -> telas (Pessoas, Transacoes, Totais)
    services/api.ts -> chamadas à API
    types/          -> tipos TypeScript espelhando os modelos do back-end
```

## Uso de IA

O desenvolvimento deste projeto contou com o **auxílio** de inteligência
artificial (Claude Code) como **ferramenta de apoio**, utilizada em tarefas como
revisão de código e elaboração da documentação.

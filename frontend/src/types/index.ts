export enum TipoTransacao {
  Receita = 0,
  Despesa = 1,
}

export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  pessoaId: number;
}

export interface TotalPorPessoa {
  pessoaId: number;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface TotaisResponse {
  porPessoa: TotalPorPessoa[];
  totalGeral: {
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
  };
}

import type { Pessoa, Transacao, TipoTransacao, TotaisResponse } from "../types";

// URL base da API do back-end (ver Properties/launchSettings.json no back-end)
export const API_BASE_URL = "http://localhost:5274/api";

async function lancarErro(response: Response): Promise<never> {
  const mensagem = await response.text();
  throw new Error(mensagem || "Ocorreu um erro inesperado.");
}

// Pessoas 
export async function getPessoas(): Promise<Pessoa[]> {
  const response = await fetch(`${API_BASE_URL}/pessoas`);
  if (!response.ok) {
    return lancarErro(response);
  }
  return response.json();
}

export async function createPessoa(nome: string, idade: number): Promise<Pessoa> {
  const response = await fetch(`${API_BASE_URL}/pessoas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, idade }),
  });
  if (!response.ok) {
    return lancarErro(response);
  }
  return response.json();
}

export async function deletePessoa(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/pessoas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    return lancarErro(response);
  }
}

// Transações 
export async function getTransacoes(): Promise<Transacao[]> {
  const response = await fetch(`${API_BASE_URL}/transacoes`);
  if (!response.ok) {
    return lancarErro(response);
  }
  return response.json();
}

export async function createTransacao(
  descricao: string,
  valor: number,
  tipo: TipoTransacao,
  pessoaId: number
): Promise<Transacao> {
  const response = await fetch(`${API_BASE_URL}/transacoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ descricao, valor, tipo, pessoaId }),
  });
  if (!response.ok) {
    return lancarErro(response);
  }
  return response.json();
}

// Totais 
export async function getTotais(): Promise<TotaisResponse> {
  const response = await fetch(`${API_BASE_URL}/totais`);
  if (!response.ok) {
    return lancarErro(response);
  }
  return response.json();
}

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Pessoa, Transacao } from "../types";
import { TipoTransacao } from "../types";
import { getPessoas, getTransacoes, createTransacao } from "../services/api";
import { formatarMoeda } from "../utils/formatarMoeda";

function Transacoes() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<TipoTransacao>(TipoTransacao.Receita);
  const [pessoaId, setPessoaId] = useState("");
  const [erro, setErro] = useState("");

  async function carregarPessoas() {
    const dados = await getPessoas();
    setPessoas(dados);
  }

  async function carregarTransacoes() {
    const dados = await getTransacoes();
    setTransacoes(dados);
  }

  useEffect(() => {
    carregarPessoas();
    carregarTransacoes();
  }, []);

  async function handleSubmit(evento: FormEvent) {
    evento.preventDefault();
    setErro("");

    try {
      await createTransacao(descricao, Number(valor), tipo, Number(pessoaId));
      setDescricao("");
      setValor("");
      await carregarTransacoes();
    } catch (erroCriado) {
      if (erroCriado instanceof Error) {
        setErro(erroCriado.message);
      }
    }
  }

  function nomeDaPessoa(id: number): string {
    const pessoa = pessoas.find((p) => p.id === id);
    return pessoa ? pessoa.nome : "Pessoa não encontrada";
  }

  return (
    <div>
      <h2>Transações</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(evento) => setValor(evento.target.value)}
          required
        />
        <select
          value={tipo}
          onChange={(evento) => setTipo(Number(evento.target.value) as TipoTransacao)}
        >
          <option value={TipoTransacao.Receita}>Receita</option>
          <option value={TipoTransacao.Despesa}>Despesa</option>
        </select>
        <select
          value={pessoaId}
          onChange={(evento) => setPessoaId(evento.target.value)}
          required
        >
          <option value="">Selecione a pessoa</option>
          {pessoas.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>
              {pessoa.nome}
            </option>
          ))}
        </select>
        <button type="submit">Cadastrar</button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Pessoa</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((transacao) => (
            <tr key={transacao.id}>
              <td>{transacao.descricao}</td>
              <td>{formatarMoeda(transacao.valor)}</td>
              <td>
                {transacao.tipo === TipoTransacao.Receita ? "Receita" : "Despesa"}
              </td>
              <td>{nomeDaPessoa(transacao.pessoaId)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transacoes;

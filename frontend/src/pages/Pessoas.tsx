import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Pessoa } from "../types";
import { getPessoas, createPessoa, deletePessoa } from "../services/api";

function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [erro, setErro] = useState("");

  async function carregarPessoas() {
    const dados = await getPessoas();
    setPessoas(dados);
  }

  useEffect(() => {
    carregarPessoas();
  }, []);

  async function handleSubmit(evento: FormEvent) {
    evento.preventDefault();
    setErro("");

    try {
      await createPessoa(nome, Number(idade));
      setNome("");
      setIdade("");
      await carregarPessoas();
    } catch (erroCriado) {
      if (erroCriado instanceof Error) {
        setErro(erroCriado.message);
      }
    }
  }

  async function handleExcluir(id: number) {
    await deletePessoa(id);
    await carregarPessoas();
  }

  return (
    <div>
      <h2>Pessoas</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={(evento) => setIdade(evento.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <td>{pessoa.nome}</td>
              <td>{pessoa.idade}</td>
              <td>
                <button onClick={() => handleExcluir(pessoa.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Pessoas;

import { useEffect, useState } from "react";
import type { TotaisResponse } from "../types";
import { getTotais } from "../services/api";
import { formatarMoeda } from "../utils/formatarMoeda";

function Totais() {
  const [totais, setTotais] = useState<TotaisResponse | null>(null);

  useEffect(() => {
    getTotais().then(setTotais);
  }, []);

  if (!totais) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2>Totais</h2>

      <table>
        <thead>
          <tr>
            <th>Pessoa</th>
            <th>Total Receitas</th>
            <th>Total Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {totais.porPessoa.map((item) => (
            <tr key={item.pessoaId}>
              <td>{item.nome}</td>
              <td>{formatarMoeda(item.totalReceitas)}</td>
              <td>{formatarMoeda(item.totalDespesas)}</td>
              <td>{formatarMoeda(item.saldo)}</td>
            </tr>
          ))}
          <tr>
            <td>
              <strong>Total Geral</strong>
            </td>
            <td>{formatarMoeda(totais.totalGeral.totalReceitas)}</td>
            <td>{formatarMoeda(totais.totalGeral.totalDespesas)}</td>
            <td>{formatarMoeda(totais.totalGeral.saldo)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Totais;

import { useState } from "react";
import Pessoas from "./pages/Pessoas";
import Transacoes from "./pages/Transacoes";
import Totais from "./pages/Totais";

type Pagina = "pessoas" | "transacoes" | "totais";

function App() {
  const [pagina, setPagina] = useState<Pagina>("pessoas");

  return (
    <div>
      <h1>Controle de Gastos Residenciais</h1>

      <nav>
        <button
          className={pagina === "pessoas" ? "ativo" : ""}
          onClick={() => setPagina("pessoas")}
        >
          Pessoas
        </button>
        <button
          className={pagina === "transacoes" ? "ativo" : ""}
          onClick={() => setPagina("transacoes")}
        >
          Transações
        </button>
        <button
          className={pagina === "totais" ? "ativo" : ""}
          onClick={() => setPagina("totais")}
        >
          Totais
        </button>
      </nav>

      {pagina === "pessoas" && <Pessoas />}
      {pagina === "transacoes" && <Transacoes />}
      {pagina === "totais" && <Totais />}
    </div>
  );
}

export default App;

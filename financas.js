import { useState } from 'react';


export default function Financas() {
  const [transacoes, setTransacoes] = useState([]);
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('receita');

  const adicionarTransacao = (e) => {
    e.preventDefault();

    const novaTransacao = {
      id: Date.now(),
      descricao,
      valor: parseFloat(valor),
      tipo
    };

    setTransacoes([...transacoes, novaTransacao]);
    setValor('');
    setDescricao('');
  };

  const saldo = transacoes.reduce((acc, transacao) => {
    return transacao.tipo === 'receita' ? acc + transacao.valor : acc - transacao.valor;
  }, 0);

  return (
    <div>
      <h1>Controle de Finanças</h1>

      <form  onSubmit={adicionarTransacao}>
        <input 
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <input 
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="receita">Receita</option>9
          <option value="despesa">Despesa</option>
        </select>
        <button type="submit">adicionar</button>
      </form>

      <h2>Saldo: R$ {saldo.toFixed(2)}</h2>

      <ul>
        {transacoes.map((transacao) => (
          <li key={transacao.id}>
            {transacao.descricao} - R$ {transacao.valor.toFixed(2)} ({transacao.tipo})
          </li>
        ))}
      </ul>
    </div>
  );
}

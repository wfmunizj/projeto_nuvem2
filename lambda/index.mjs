/**
 * Lambda /report
 * Consome GET /filmes via API Gateway (BACKEND_URL) e devolve estatísticas.
 */
const BACKEND_URL = process.env.BACKEND_URL; 

export const handler = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/filmes`);
    if (!res.ok) throw new Error(`Backend respondeu ${res.status}`);
    const filmes = await res.json();

    const total = filmes.length;

    const notaMedia = total
      ? +(filmes.reduce((s, f) => s + (f.notaMedia || 0), 0) / total).toFixed(2)
      : 0;

    const duracaoMedia = total
      ? Math.round(filmes.reduce((s, f) => s + (f.duracao || 0), 0) / total)
      : 0;

    const porGenero = filmes.reduce((acc, f) => {
      const g = f.genero || 'Sem gênero';
      acc[g] = (acc[g] || 0) + 1;
      return acc;
    }, {});

    const porAno = filmes.reduce((acc, f) => {
      const a = f.ano || 'Desconhecido';
      acc[a] = (acc[a] || 0) + 1;
      return acc;
    }, {});

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
      },
      body: JSON.stringify({ total, notaMedia, duracaoMedia, porGenero, porAno }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};

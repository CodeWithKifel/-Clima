async function buscarClima(cidade) {
    try {
        // URL da API para obter dados de clima
        const url = `https://wttr.in/${cidade}?format=%t`; // 'format=%t' para obter apenas a temperatura
        
        // Realiza a requisição
        const resposta = await fetch(url);
        const dados = await resposta.text();

        const temperatura = parseFloat(dados.replace('°C', '').trim());

        if (temperatura > 35 || temperatura < 5) {
            // Retorna o clima se for extremado
            return {
                cidade: cidade,
                temperatura: temperatura,
            };
        } else {
            return null;
        }
    } catch (erro) {
        console.error('Erro ao buscar clima:', erro);
    }
}

// Função para exibir o clima na tela
document.getElementById('buscar-clima').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cidade = document.getElementById('cidade').value;
    const clima = await buscarClima(cidade);

    const resultadoClima = document.getElementById('resultado-clima');
    resultadoClima.innerHTML = '';

    if (clima) {
        resultadoClima.innerHTML = `
            <h3>Clima Extremamente Frio ou Quente em ${clima.cidade}</h3>
            <p><strong>Temperatura:</strong> ${clima.temperatura}°C</p>
        `;
    } else {
        resultadoClima.innerHTML = '<p>Não há condições climáticas extremas para esta cidade.</p>';
    }
});

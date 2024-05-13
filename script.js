document.getElementById("calcular").addEventListener("click", function() {
    var local = document.getElementById("select-mar").value;
    var nivelAtual = parseInt(document.getElementById("nivel-atual").value) || 0; 
    var xpRecebido = parseInt(document.getElementById("xp-recebido").value) || 0; 
    var xpGuardado = parseInt(document.getElementById("xp-guardado").value) || 0; 
    var xpTotal = xpRecebido + xpGuardado;

    var resultado = calcularUpEPontos(nivelAtual, xpTotal, local);

    var output = "<h1>Resultado</h1>";
    output += "<div><label>Nível atual: </label><span>" + resultado[0] + "</span></div>";
    output += "<div><label>Quantidade de vezes upadas: </label><span>" + resultado[4] + "</span></div>";
    output += "<div><label>Pontos a serem distribuídos: </label><span>" + resultado[1] + "</span></div>";

    if (resultado[2] > 0) {
        output += "<div><label>Relação de XP Atual: [</label><span>" + resultado[3] + "/" + resultado[2] + "]</span></div>";
    } else {
        output += "<div><label>Relação de XP Atual: [</label><span>" + xpTotal + "/" + niveis_xp[nivelAtual] + "]</span></div>";
    }

    var resultadoContainer = document.getElementById("resultado-container");
    resultadoContainer.innerHTML = output;
    resultadoContainer.style.display = 'block';
});

function calcularUpEPontos(nivelAtual, xpTotal, local) {
    // Lista de níveis e xp correspondentes
    var niveis_xp = {...}; // Todos os níveis e xp correspondentes

    var nivel_alcancado = nivelAtual;
    var xp_atual = niveis_xp[nivelAtual];
    var pontos_recebidos = 0;
    var vezes_upadas = 0;

    // Verifica se o XP total fornecido é suficiente para passar para o próximo nível
    while (xpTotal >= xp_atual) {
        nivel_alcancado += 1;
        xpTotal -= xp_atual;
        xp_atual = niveis_xp[nivel_alcancado];
        vezes_upadas += 1;
        if (local === "EB") {
            pontos_recebidos += 30;
        } else if (local === "GL") {
            pontos_recebidos += 60;
        } else {
            pontos_recebidos += 120;
        }
    }

    // Calcula o XP faltante para o próximo nível sem deduzir o XP atual do próximo nível
    var xp_faltante_para_proximo_nivel = niveis_xp[nivel_alcancado];

    // Se o XP total não for suficiente para o próximo nível, retorna o nível atual
    if (nivel_alcancado === nivelAtual) {
        var xp_sobrando = xp_atual;
        return [nivelAtual, pontos_recebidos, xp_sobrando, xpTotal, vezes_upadas];
    }

    return [nivel_alcancado, pontos_recebidos, xp_faltante_para_proximo_nivel, xpTotal, vezes_upadas];
}

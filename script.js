document.getElementById("calcular").addEventListener("click", function() {
    var local = document.getElementById("select-mar").value;
    var nivelAtual = parseInt(document.getElementById("nivel-atual").value.replace(/\D/g, '')) || 0;
    var xpRecebido = parseInt(document.getElementById("xp-recebido").value.replace(/\D/g, '')) || 0;
    var xpGuardado = parseInt(document.getElementById("xp-guardado").value.replace(/\D/g, '')) || 0;
    var xpTotal = xpRecebido + xpGuardado;

    var resultado = calcularUpEPontos(nivelAtual, xpTotal, local);

    var output = "<h1>Resultado</h1>";
    output += "<div><label>Nível atual: </label><span>" + resultado[0] + "</span></div>";
    output += "<div><label>Quantidade de vezes upadas: </label><span>" + (resultado[4] || 0) + "</span></div>";
    output += "<div><label>Pontos a serem distribuídos: </label><span>" + resultado[1] + "</span></div>";
    if (resultado[2] > 0) {
        var xpTotalUpado = xpTotal - resultado[3];
        var xpRestante = xpTotal - xpTotalUpado;
        output += "<div><label>Relação de XP Atual: [" + xpRestante + "/" + resultado[2] + "]</label></div>";
    } else {
        output += "<div><label>Relação de XP Atual: </label><span>" + xpTotal + "</span></div>";
    }

    var resultadoContainer = document.getElementById("resultado-container");
    resultadoContainer.innerHTML = output;
    resultadoContainer.style.display = 'block';
});

document.getElementById("calcular-espirito").addEventListener("click", function() {
    var forca = parseInt(document.getElementById("forca").value.replace(/\D/g, '')) || 0;
    var resistencia = parseInt(document.getElementById("resistencia").value.replace(/\D/g, '')) || 0;
    var velocidade = parseInt(document.getElementById("velocidade").value.replace(/\D/g, '')) || 0;
    
    var espirito = calcularEspirito(forca, resistencia, velocidade);

    var output = "<h1>Resultado</h1>";
    output += "<div><label>Espírito do jogador: </label><span>" + espirito + "</span></div>";

    var resultadoEspirito = document.getElementById("resultado-espirito");
    resultadoEspirito.innerHTML = output;
    resultadoEspirito.style.display = 'block';
});

document.getElementById("distribuir-pontos").addEventListener("click", function() {
    var quantidadeTotalPontos = parseInt(document.getElementById("quantidade-pontos").value.replace(/\D/g, '')) || 0;
    var porcentagemForca = parseInt(document.getElementById("porcentagem-forca").value.replace(/\D/g, '')) || 0;
    var porcentagemResistencia = parseInt(document.getElementById("porcentagem-resistencia").value.replace(/\D/g, '')) || 0;
    var porcentagemVelocidade = parseInt(document.getElementById("porcentagem-velocidade").value.replace(/\D/g, '')) || 0;

    var distribuicao = distribuirPontos(quantidadeTotalPontos, porcentagemForca, porcentagemResistencia, porcentagemVelocidade);

    var output = "<h1>Resultado</h1>";
    output += "<div><label>Pontos em Força: </label><span>" + distribuicao[0] + "</span></div>";
    output += "<div><label>Pontos em Resistência: </label><span>" + distribuicao[1] + "</span></div>";
    output += "<div><label>Pontos em Velocidade: </label><span>" + distribuicao[2] + "</span></div>";

    var resultadoDistribuicao = document.getElementById("resultado-distribuicao");
    resultadoDistribuicao.innerHTML = output;
    resultadoDistribuicao.style.display = 'block';
});

function calcularUpEPontos(nivelAtual, xpTotal, local) {
    var niveis_xp = {
        1: 150, 2: 160, 3: 170, 4: 180, 5: 200, 6: 210, 7: 220, 8: 240, 9: 250, 10: 260,
        11: 280, 12: 300, 13: 310, 14: 330, 15: 350, 16: 360, 17: 380, 18: 400, 19: 420, 20: 440,
        21: 460, 22: 480, 23: 500, 24: 520, 25: 550, 26: 570, 27: 590, 28: 620, 29: 640, 30: 660,
        31: 690, 32: 720, 33: 740, 34: 770, 35: 800, 36: 820, 37: 850, 38: 880, 39: 910, 40: 940,
        41: 970, 42: 1000, 43: 1030, 44: 1060, 45: 1100, 46: 1130, 47: 1160, 48: 1200, 49: 1230, 50: 1260,
        51: 1300, 52: 1340, 53: 1370, 54: 1410, 55: 1450, 56: 1480, 57: 1520, 58: 1560, 59: 1600, 60: 1640,
        61: 1680, 62: 1720, 63: 1760, 64: 1800, 65: 1850, 66: 1890, 67: 1930, 68: 1980, 69: 2020, 70: 2060,
        71: 2110, 72: 2160, 73: 2200, 74: 2250, 75: 2300, 76: 2340, 77: 2390, 78: 2440, 79: 2490, 80: 2540,
        81: 2590, 82: 2640, 83: 2690, 84: 2740, 85: 2800, 86: 2850, 87: 2900, 88: 2960, 89: 3010, 90: 3060,
        91: 3120, 92: 3180, 93: 3230, 94: 3290, 95: 3350, 96: 3400, 97: 3460, 98: 3520, 99: 3580, 100: 3640,
        101: 3700, 102: 3760, 103: 3822, 104: 3880, 105: 3950, 106: 4010, 107: 4070, 108: 4140, 109: 4200, 110: 4260,
        111: 4330, 112: 4400, 113: 4460, 114: 4530, 115: 4600, 116: 4660, 117: 4730, 118: 4800, 119: 4870, 120: 4940,
        121: 5010, 122: 5080, 123: 5150, 124: 5220, 125: 5300, 126: 5370, 127: 5440, 128: 5520, 129: 5590, 130: 5660,
        131: 5740, 132: 5820, 133: 5890, 134: 5970, 135: 6050, 136: 6120, 137: 6200, 138: 6280, 139: 6360, 140: 6440,
        141: 6520, 142: 6600, 143: 6680, 144: 6760, 145: 6850, 146: 6930, 147: 7010, 148: 7100, 149: 7180, 150: 7260,
        151: 7350, 152: 7440, 153: 7520, 154: 7610, 155: 7700, 156: 7680, 157: 7870, 158: 7960, 159: 8050, 160: 8140,
        161: 8230, 162: 8320, 163: 8410, 164: 8500, 165: 8590, 166: 8680, 167: 8770, 168: 8880, 169: 8970, 170: 9060,
        171: 9160, 172: 9250, 173: 9340, 174: 9460, 175: 9540, 176: 9670, 177: 9790, 178: 9870, 179: 9940, 180: 10050,
        181: 10140, 182: 10260, 183: 10340, 184: 10440, 185: 10550, 186: 10650, 187: 10750, 188: 10860, 189: 10960, 190: 11060,
        191: 11170, 192: 11280, 193: 11380, 194: 11490, 195: 11600, 196: 11700, 197: 11810, 198: 11920, 199: 12030, 200: 12140
    };

    var nivel_alcancado = nivelAtual;
    var xp_atual = niveis_xp[nivelAtual];
    var pontos_recebidos = 0;
    var vezes_upadas = 0;

    while (xpTotal >= xp_atual) {
        nivel_alcancado += 1;
        xpTotal -= xp_atual;
        xp_atual = niveis_xp[nivel_alcancado];
        vezes_upadas += 1;
        if (local === "EB" || (local === "GL" && nivel_alcancado <= 50)) {
            pontos_recebidos += 30; 
        } else if (local === "NM" && nivel_alcancado <= 100) {
            pontos_recebidos += 60
        } else if (local === "GL") {
            pontos_recebidos += 60;
        } else {
            pontos_recebidos += 120;
        }
    }

    var xp_faltante_para_proximo_nivel = niveis_xp[nivel_alcancado];

    if (nivel_alcancado === nivelAtual) {
        return [nivelAtual, pontos_recebidos, xp_atual, xpTotal, vezes_upadas];
    }

    return [nivel_alcancado, pontos_recebidos, xp_faltante_para_proximo_nivel, xpTotal, vezes_upadas];
}

function calcularEspirito(forca, resistencia, velocidade) {
    return (forca * 0.4) + (resistencia * 0.3) + (velocidade * 0.3);
}

function distribuirPontos(quantidadeTotalPontos, porcentagemForca, porcentagemResistencia, porcentagemVelocidade) {
    var pontosForca = Math.round(quantidadeTotalPontos * (porcentagemForca / 100));
    var pontosResistencia = Math.round(quantidadeTotalPontos * (porcentagemResistencia / 100));
    var pontosVelocidade = Math.round(quantidadeTotalPontos * (porcentagemVelocidade / 100));
    return [pontosForca, pontosResistencia, pontosVelocidade];
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementsByClassName("tablinks")[0].click();
adocument.getElementById("calcular").addEventListener("click", function() {
    var local = document.getElementById("select-mar").value;
    var nivelAtual = parseInt(document.getElementById("nivel-atual").value.replace(/\D/g, '')) || 0;
    var xpRecebido = parseInt(document.getElementById("xp-recebido").value.replace(/\D/g, '')) || 0;
    var xpGuardado = parseInt(document.getElementById("xp-guardado").value.replace(/\D/g, '')) || 0;
    var xpTotal = xpRecebido + xpGuardado;

    var resultado = calcularUpEPontos(nivelAtual, xpTotal, local);

    var output = "<h1>Resultado</h1>";
    output += "<div><label>Nível atual: </label><span>" + resultado[0] + "</span></div>";
    output += "<div><label>Quantidade de vezes upadas: </label><span>" + (resultado[4] || 0) + "</span></div>";
    output += "<div><label>Pontos a serem distribuídos: </label><span>" + resultado[1] + "</span></div>";
    if (resultado[2] > 0) {
        var xpTotalUpado = xpTotal - resultado[3];
        var xpRestante = xpTotal - xpTotalUpado;
        output += "<div><label>Relação de XP Atual: [" + xpRestante + "/" + resultado[2] + "]</label></div>";
    } else {
        output += "<div><label>Relação de XP Atual: </label><span>" + xpTotal + "</span></div>";
    }

    var resultadoContainer = document.getElementById("resultado-container");
    resultadoContainer.innerHTML = output;
    resultadoContainer.style.display = 'block';
});

document.getElementById("calcular-espirito").addEventListener("click", function() {
    var forca = parseInt(document.getElementById("forca").value.replace(/\D/g, '')) || 0;
    var resistencia = parseInt(document.getElementById("resistencia").value.replace(/\D/g, '')) || 0;
    var velocidade = parseInt(document.getElementById("velocidade").value.replace(/\D/g, '')) || 0;
    
    var espirito = calcularEspirito(forca, resistencia, velocidade);

    var output = "<h1>Resultado</h1>";
    output += "<div><label>Espírito do jogador: </label><span>" + espirito + "</span></div>";

    var resultadoEspirito = document.getElementById("resultado-espirito");
    resultadoEspirito.innerHTML = output;
    resultadoEspirito.style.display = 'block';
});

document.getElementById("distribuir-pontos").addEventListener("click", function() {
    var quantidadeTotalPontos = parseInt(document.getElementById("quantidade-pontos").value.replace(/\D/g, '')) || 0;
    var porcentagemForca = parseInt(document.getElementById("porcentagem-forca").value.replace(/\D/g, '')) || 0;
    var porcentagemResistencia = parseInt(document.getElementById("porcentagem-resistencia").value.replace(/\D/g, '')) || 0;
    var porcentagemVelocidade = parseInt(document.getElementById("porcentagem-velocidade").value.replace(/\D/g, '')) || 0;

    var distribuicao = distribuirPontos(quantidadeTotalPontos, porcentagemForca, porcentagemResistencia, porcentagemVelocidade);

    var output = "<h1>Resultado</h1>";
    output += "<div><label>Pontos em Força: </label><span>" + distribuicao[0] + "</span></div>";
    output += "<div><label>Pontos em Resistência: </label><span>" + distribuicao[1] + "</span></div>";
    output += "<div><label>Pontos em Velocidade: </label><span>" + distribuicao[2] + "</span></div>";

    var resultadoDistribuicao = document.getElementById("resultado-distribuicao");
    resultadoDistribuicao.innerHTML = output;
    resultadoDistribuicao.style.display = 'block';
});

function calcularUpEPontos(nivelAtual, xpTotal, local) {
    var niveis_xp = {
        1: 150, 2: 160, 3: 170, 4: 180, 5: 200, 6: 210, 7: 220, 8: 240, 9: 250, 10: 260,
        11: 280, 12: 300, 13: 310, 14: 330, 15: 350, 16: 360, 17: 380, 18: 400, 19: 420, 20: 440,
        21: 460, 22: 480, 23: 500, 24: 520, 25: 550, 26: 570, 27: 590, 28: 620, 29: 640, 30: 660,
        31: 690, 32: 720, 33: 740, 34: 770, 35: 800, 36: 820, 37: 850, 38: 880, 39: 910, 40: 940,
        41: 970, 42: 1000, 43: 1030, 44: 1060, 45: 1100, 46: 1130, 47: 1160, 48: 1200, 49: 1230, 50: 1260,
        51: 1300, 52: 1340, 53: 1370, 54: 1410, 55: 1450, 56: 1480, 57: 1520, 58: 1560, 59: 1600, 60: 1640,
        61: 1680, 62: 1720, 63: 1760, 64: 1800, 65: 1850, 66: 1890, 67: 1930, 68: 1980, 69: 2020, 70: 2060,
        71: 2110, 72: 2160, 73: 2200, 74: 2250, 75: 2300, 76: 2340, 77: 2390, 78: 2440, 79: 2490, 80: 2540,
        81: 2590, 82: 2640, 83: 2690, 84: 2740, 85: 2800, 86: 2850, 87: 2900, 88: 2960, 89: 3010, 90: 3060,
        91: 3120, 92: 3180, 93: 3230, 94: 3290, 95: 3350, 96: 3400, 97: 3460, 98: 3520, 99: 3580, 100: 3640,
        101: 3700, 102: 3760, 103: 3822, 104: 3880, 105: 3950, 106: 4010, 107: 4070, 108: 4140, 109: 4200, 110: 4260,
        111: 4330, 112: 4400, 113: 4460, 114: 4530, 115: 4600, 116: 4660, 117: 4730, 118: 4800, 119: 4870, 120: 4940,
        121: 5010, 122: 5080, 123: 5150, 124: 5220, 125: 5300, 126: 5370, 127: 5440, 128: 5520, 129: 5590, 130: 5660,
        131: 5740, 132: 5820, 133: 5890, 134: 5970, 135: 6050, 136: 6120, 137: 6200, 138: 6280, 139: 6360, 140: 6440,
        141: 6520, 142: 6600, 143: 6680, 144: 6760, 145: 6850, 146: 6930, 147: 7010, 148: 7100, 149: 7180, 150: 7260,
        151: 7350, 152: 7440, 153: 7520, 154: 7610, 155: 7700, 156: 7680, 157: 7870, 158: 7960, 159: 8050, 160: 8140,
        161: 8230, 162: 8320, 163: 8410, 164: 8500, 165: 8590, 166: 8680, 167: 8770, 168: 8880, 169: 8970, 170: 9060,
        171: 9160, 172: 9250, 173: 9340, 174: 9460, 175: 9540, 176: 9670, 177: 9790, 178: 9870, 179: 9940, 180: 10050,
        181: 10140, 182: 10260, 183: 10340, 184: 10440, 185: 10550, 186: 10650, 187: 10750, 188: 10860, 189: 10960, 190: 11060,
        191: 11170, 192: 11280, 193: 11380, 194: 11490, 195: 11600, 196: 11700, 197: 11810, 198: 11920, 199: 12030, 200: 12140
    };

    var nivel_alcancado = nivelAtual;
    var xp_atual = niveis_xp[nivelAtual];
    var pontos_recebidos = 0;
    var vezes_upadas = 0;

    while (xpTotal >= xp_atual) {
        nivel_alcancado += 1;
        xpTotal -= xp_atual;
        xp_atual = niveis_xp[nivel_alcancado];
        vezes_upadas += 1;
        if (local === "EB" || (local === "GL" && nivel_alcancado <= 50)) {
            pontos_recebidos += 30; 
        } else if (local === "NM" && nivel_alcancado <= 100) {
            pontos_recebidos += 60
        } else if (local === "GL") {
            pontos_recebidos += 60;
        } else {
            pontos_recebidos += 120;
        }
    }

    var xp_faltante_para_proximo_nivel = niveis_xp[nivel_alcancado];

    if (nivel_alcancado === nivelAtual) {
        return [nivelAtual, pontos_recebidos, xp_atual, xpTotal, vezes_upadas];
    }

    return [nivel_alcancado, pontos_recebidos, xp_faltante_para_proximo_nivel, xpTotal, vezes_upadas];
}

function calcularEspirito(forca, resistencia, velocidade) {
    return (forca * 0.4) + (resistencia * 0.3) + (velocidade * 0.3);
}

function distribuirPontos(quantidadeTotalPontos, porcentagemForca, porcentagemResistencia, porcentagemVelocidade) {
    var pontosForca = Math.round(quantidadeTotalPontos * (porcentagemForca / 100));
    var pontosResistencia = Math.round(quantidadeTotalPontos * (porcentagemResistencia / 100));
    var pontosVelocidade = Math.round(quantidadeTotalPontos * (porcentagemVelocidade / 100));
    return [pontosForca, pontosResistencia, pontosVelocidade];
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementsByClassName("tablinks")[0].click();

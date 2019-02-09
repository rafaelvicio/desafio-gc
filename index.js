const _ = require("lodash")

const times = [
    {id: '1', name: 'team1', pontos: 0, rounds: 0, derrotas: 0},
    {id: '2', name: 'team2', pontos: 0, rounds: 0, derrotas: 0},
    {id: '3', name: 'team3', pontos: 0, rounds: 0, derrotas: 0},
    {id: '4', name: 'team4', pontos: 0, rounds: 0, derrotas: 0},
    {id: '5', name: 'team5', pontos: 0, rounds: 0, derrotas: 0},
    {id: '6', name: 'team6', pontos: 0, rounds: 0, derrotas: 0},
    {id: '7', name: 'team7', pontos: 0, rounds: 0, derrotas: 0},
    {id: '8', name: 'team8', pontos: 0, rounds: 0, derrotas: 0}
]

console.log("################################################################################################")
console.log("Iniciando campeonato da Gamers Club - O clube para quem joga sério")
console.log("################################################################################################")

let grupos = _.shuffle(times)

grupos = _.chunk(grupos, 4)

console.log("################################################################################################")
console.log("Realizando sorteio dos grupos:", grupos)
console.log("################################################################################################")

console.log("################################################################################################")
console.log("Iniciando as partidas da fase de grupos")
console.log("################################################################################################")

const partidas = [];

grupos.map(grupo => {
    grupo.map(time => {
        grupo.map(adversario => {
            if(!_.isEqual(time, adversario) && jogouContra(time, adversario)) {
                resultadoPartida = jogarPartida(time, adversario)
                partidas.push(resultadoPartida)
                console.log("Resultado partida -----> ", resultadoPartida)
                if(resultadoPartida.team01_rounds > resultadoPartida.team02_rounds) {
                    time.pontos++
                    time.rounds += resultadoPartida.team01_rounds
                    adversario.derrotas++
                }else {
                    adversario.pontos++
                    adversario.rounds += resultadoPartida.team02_rounds
                    time.derrotas++
                }  
            }
        })
        
    })
})

const gruposOrdenados = grupos.map(grupo => {
    return _.orderBy(grupo, ['pontos', 'rounds'], ['desc', 'desc'])
})

console.log("################################################################################################")
console.log("Tabela final de grupos", gruposOrdenados)
console.log("################################################################################################")

const gruposComVencedores = gruposOrdenados.map(grupo => {
    return _.slice(grupo, 0, 2)
})

const timesPlayOffs = [];

gruposComVencedores.map(grupo => {
    grupo.map(time => {
        time.pontos = 0;
        time.rounds = 0;
        time.derrotas = 0;
        timesPlayOffs.push(time)
    })
}) 

console.log("################################################################################################")
console.log("Vamos dar inicio as playofs com os seguintes times: ", timesPlayOffs)
console.log("################################################################################################")

const timesEmbaralhados = _.shuffle(timesPlayOffs)

let playoffs = _.chunk(timesEmbaralhados, 2)

playoffs.map(partida => {
    resultadoPartida = jogarPartida(partida[0], partida[1])
    console.log("Resultado partida ----->", resultadoPartida);
    if(resultadoPartida.team01_rounds > resultadoPartida.team02_rounds) {
        partida[0].pontos++
        partida[0].rounds += resultadoPartida.team01_rounds
        partida[1].derrotas++
    }else {
        partida[1].pontos++
        partida[1].rounds += resultadoPartida.team02_rounds
        partida[0].derrotas++
    }  
})

playoffs = orderPorVencedores(playoffs)

finais = [];

playoffs.map(time => {
    finais.push(time[0])
} );

console.log("################################################################################################")
console.log("Vamos dar inicio as finais com os seguintes times: ", finais)
console.log("################################################################################################")

    resultadoPartida = jogarPartida(finais[0], finais[1])
    console.log("Resultado partida ----->", resultadoPartida);
    if(resultadoPartida.team01_rounds > resultadoPartida.team02_rounds) {
        finais[0].pontos++
        finais[0].rounds += resultadoPartida.team01_rounds
        finais[1].derrotas++
    }else {
        finais[1].pontos++
        finais[1].rounds += resultadoPartida.team02_rounds
        finais[0].derrotas++
    }  

finais = orderPorVencedores(playoffs)

console.log("################################################################################################")
console.log("Time Vencedor: ", finais[0])
console.log("################################################################################################")

//TODO: Melhorar geracao de partidas com logicas para cada round, com possibilidade de prorrogacoes
function jogarPartida(team01, team02) {
    let team01_rounds = _.random(0, 16);
    let team02_rounds = _.random(0, 16);
    team01_rounds > team02_rounds ? team01_rounds = 16 : team02_rounds = 16
    return {team01: team01.id, team02: team02.id, team01_rounds, team02_rounds }
}

function jogouContra(time, adversario) {
    const podeJogar = _.find(partidas, {'team01': time.id, 'team02': adversario.id})
    const podeJogar2 = _.find(partidas, {'team01': adversario.id, 'team02': time.id})
    return podeJogar == undefined && podeJogar2 == undefined;
}

function orderPorVencedores(partidas) {
    return partidas.map(partida => {
        return _.orderBy(partida, ['pontos', 'rounds'], ['desc', 'desc']);
    }).map(partida => {
        return _.slice(partida, 0, 1)
    })
}
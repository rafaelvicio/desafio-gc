const _ = require("lodash")

//TODO Forma mais real de reazar o resultado da partida
//TODO Implementar TBD para grupos impares

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

console.log("########################")
console.log("Iniciando campeonato!")
console.log("########################")

const novoArray = _.shuffle(times)

let grupos = _.chunk(novoArray, 4)

console.log("########################")
console.log("Grupos sorteados!")
console.log("########################")

console.log("Os grupos: ", grupos)

const partidas = [];

console.log("########################")
console.log("Iniciando as partidas!")
console.log("########################")

grupos.map(grupo => {
    grupo.map(time => {
        grupo.map(adversario => {
            if(!_.isEqual(time, adversario) && jogouContra(time, adversario)) {
                resultadoPartida = jogarPartida(time, adversario)
                partidas.push(resultadoPartida)
                console.log("A partida: ", resultadoPartida)
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

console.log("As partidas: ", partidas)

console.log("########################")
console.log("Tabela final de grupos")
console.log("########################")

const gruposOrdenados = grupos.map(grupo => {
    return _.orderBy(grupo, ['pontos', 'rounds'], ['desc', 'desc'])
})

console.log("Grupor ordenado: ", gruposOrdenados)

console.log("########################")
console.log("Vamos dar inicio as playofs")
console.log("########################")

const gruposComVencedores = gruposOrdenados.map(grupo => {
    return _.slice(grupo, 0, 2)
})

console.log("Grupo so com vencedores: ", gruposComVencedores)

const timesPlayOffs = [];

gruposComVencedores.map(grupo => {
    grupo.map(time => {
        time.pontos = 0;
        time.rounds = 0;
        time.derrotas = 0;
        timesPlayOffs.push(time)
    })
}) 

console.log("########################")
console.log("Times dos Playoofs")
console.log("########################")

console.log(timesPlayOffs)

const timesEmbaralhados = _.shuffle(timesPlayOffs)

console.log("Times embaralhados: ", timesEmbaralhados)

let playoffs = _.chunk(timesEmbaralhados, 2)

console.log("Faze playoofs: ", playoffs)

playoffs.map(partida => {
    resultadoPartida = jogarPartida(partida[0], partida[1])
    console.log("Resultado partida: ", resultadoPartida);
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

console.log("Proxima fase", playoffs)

playoffs = playoffs.map(partida => {
    return _.orderBy(partida, ['pontos', 'rounds'], ['desc', 'desc'])
}).map(partida => {
    return _.slice(partida, 0, 1)
})

finais = [];

console.log("Isso aqui: ", playoffs)

playoffs.map(time => {
    console.log("O time: ", time)
    finais.push(time[0])
} );

console.log("O que vai ser isso", playoffs)
console.log("Final: ", finais)

//Quando for 2 times, e diferente

    console.log("Partida: ", finais)
    resultadoPartida = jogarPartida(finais[0], finais[1])
    console.log("Resultado partida: ", resultadoPartida);
    if(resultadoPartida.team01_rounds > resultadoPartida.team02_rounds) {
        finais[0].pontos++
        finais[0].rounds += resultadoPartida.team01_rounds
        finais[1].derrotas++
    }else {
        finais[1].pontos++
        finais[1].rounds += resultadoPartida.team02_rounds
        finais[0].derrotas++
    }  

console.log("Proxima fase", finais)

finais = playoffs.map(partida => {
    return _.orderBy(partida, ['pontos', 'rounds'], ['desc', 'desc'])
}).map(partida => {
    return _.slice(partida, 0, 1)
})

console.log("FInal: ", finais)

console.log("Isso aqui: ", playoffs)

vencedor = {}

finais.map(time => {
    vencedor = time[0];
} );

console.log("O grande vencedor e: ", vencedor)

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

// Array com 80 times
// Dividir em grupos de 5 times
// Cada time joga 1x contra cada time do seu grupo
// Cada vitoria soma 1 ponto na tabela
// os 2 times de cada grupo avançam para as playoofs
// desampata com numeor de vitoria e saldo de rounds
// apresentar os grupos da splayoofs

// Playoffs:
// Duplas formadas aleatoriamente
// Perdedores serão eliminados
// Ate a final

const _ = require("lodash")

const times = [
    {id: '1', name: 'team1', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
    {id: '2', name: 'team2', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
    {id: '3', name: 'team3', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
    {id: '4', name: 'team4', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
    {id: '5', name: 'team5', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
    {id: '6', name: 'team6', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
    {id: '7', name: 'team7', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
    {id: '8', name: 'team8', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
    {id: '9', name: 'team9', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
    {id: '10', name: 'team10', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
    {id: '11', name: 'team11', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
    {id: '12', name: 'team12', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
]

console.log("########################")
console.log("Iniciando campeonato!")
console.log("########################")

const novoArray = _.shuffle(times)

const grupos = _.chunk(novoArray, 4)

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
                partidas.push(jogarPartida(time, adversario))
            }
        })
        
    })
})

console.log("As partidas: ", partidas)

console.log("########################")
console.log("Tabela final de grupos")
console.log("########################")

console.log("Grupos: ", )

console.log("########################")
console.log("Vamos dar inicio as playofs")
console.log("########################")




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

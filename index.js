const _ = require("lodash")

const times = [
    {id: '1', name: 'team1'},
    {id: '2', name: 'team2'},
    {id: '3', name: 'team3'},
    {id: '4', name: 'team4'},
    {id: '5', name: 'team5'},
    {id: '6', name: 'team6'},
]

const novoArray = _.shuffle(times)

const grupos = _.chunk(novoArray, 2)

console.log("Os grupos:  ", grupos)

grupos.map(item => {
    console.log("O que tem aqui? ", item)
    
})


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

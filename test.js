
var defense = [], offense = [], params = {
    name: 'test',
    age: 18,
    min: 1,
    max: 15
} ;
for(var i = 0; i < 5; i++){
    defense.push(new Player(params));
    offense.push(new Player(params));
}


function testGame(offense, defense){
    var poss = Math.round(offense.reduce(function(agg, curr){ return agg + curr.attr.posCreate; }, 0)/10);

    var aggDef = defenseStats(defense, { fouls: 0 });

    var turn = gameTurn(offense, aggDef, poss);
    for(var i = 0; i < 19; i++){
        turn = gameTurn(offense, aggDef, poss, turn);
        if(i == 9){
            aggDef.fouls = 0;
        }
    }
    Object.keys(turn).forEach(function(key){
        if(!turn[key]){
            turn[key] = offense.reduce(function(agg, curr){ return agg + curr.turnStats[key]; }, 0);
        }
    })

    return turn;
}
turn1 = testGame(offense, defense), turn2 = testGame(defense, offense);
console.log(turn1, turn2);
console.log((turn1.TPM*3 + turn1.FGM*2 + turn1.FTM), (turn2.TPM*3 + turn2.FGM*2 + turn2.FTM));

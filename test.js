
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

var poss = Math.round(offense.reduce(function(agg, curr){ return agg + curr.attr.posCreate; }, 0)/10);

var aggDef = defenseStats(defense);

var turn = gameTurn(offense, aggDef, poss);
Object.keys(turn).forEach(function(key){
    if(!turn[key]){
        turn[key] = offense.reduce(function(agg, curr){ return agg + curr.turnStats[key]; }, 0);
    }
})
console.log(turn);

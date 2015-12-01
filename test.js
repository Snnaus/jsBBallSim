var test = new Player({
    name: 'test',
    age: 18,
    min: 1,
    max: 10
});

var defense = [], offense = [], params = {
    name: 'test',
    age: 18,
    min: 1,
    max: 10
} ;
for(var i = 0; i < 5; i++){
    defense.push(new Player(params));
    offense.push(new Player(params));
}


var aggDef = defenseStats(defense);


console.log(gameTurn(offense, aggDef, 10));

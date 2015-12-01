function getRandomInt(min, max) {
    if(max < min){
        max = min;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function Player(info){
    this.name = info.name;
    this.age = info.age;
    this.recruited = false;
    this.drafted = false;

    this.attr = {
        posCreate: getRandomInt(info.min, info.max),
        insideRate: getRandomInt(info.min, info.max),
        outsideRate: getRandomInt(info.min, info.max),
        threeRate: getRandomInt(info.min, info.max),
        insideConversion: getRandomInt(info.min, info.max),
        outsideConversion: getRandomInt(info.min, info.max),
        threeConversion: getRandomInt(info.min, info.max),
        assistRate: getRandomInt(info.min, info.max),
        possTaken: getRandomInt(info.min, info.max),
        insideConvMod: getRandomInt(info.min, info.max),
        outsideConvMod: getRandomInt(info.min, info.max),
        blockRate: getRandomInt(info.min, info.max),
        stealRate: getRandomInt(info.min, info.max),
        rebound: getRandomInt(info.min, info.max),
        fouling: getRandomInt(info.min, info.max),
        freeThrow: getRandomInt(info.min, info.max),
        drawFoul: getRandomInt(info.min, info.max),
        ballSecurity: getRandomInt(info.min, info.max),
        stamina: getRandomInt(info.min, info.max),
        workRate: getRandomInt(info.min, info.max),
        regenRate: getRandomInt(info.min, info.max),
        toughness: getRandomInt(info.min, info.max),
    }

    var skills = this.attr;
    this.posScores = {
        PG: Object.keys(skills).filter(function(skill){ return ['posCreate', 'assistRate', 'stealRate', 'outsideConvMod', 'ballSecurity'].indexOf(skill) !== -1; }).reduce(function(agg, curr){ return agg + skills[curr] }, 0),
        SG: Object.keys(skills).filter(function(skill){ return ['posCreate', 'outsideConversion', 'stealRate', 'outsideConvMod', 'threeConversion'].indexOf(skill) !== -1; }).reduce(function(agg, curr){ return agg + skills[curr] }, 0),
        SF: Object.keys(skills).filter(function(skill){ return ['insideConversion', 'drawFoul', 'rebound', 'outsideConvMod', 'insideConvMod'].indexOf(skill) !== -1; }).reduce(function(agg, curr){ return agg + skills[curr] }, 0),
        PF: Object.keys(skills).filter(function(skill){ return ['rebound', 'insideConversion', 'blockRate', 'insideConvMod', 'outsideConversion'].indexOf(skill) !== -1; }).reduce(function(agg, curr){ return agg + skills[curr] }, 0),
        C: Object.keys(skills).filter(function(skill){ return ['insideConversion', 'blockRate', 'possTaken', 'rebound', 'insideConvMod'].indexOf(skill) !== -1; }).reduce(function(agg, curr){ return agg + skills[curr] }, 0),
        DE: Object.keys(skills).filter(function(skill){ return ['possTaken', 'blockRate', 'stealRate', 'outsideConvMod', 'rebound', 'insideConvMod', 'toughness'].indexOf(skill) !== -1; }).reduce(function(agg, curr){ return agg + skills[curr] }, 0),
        OF: Object.keys(skills).filter(function(skill){ return ['posCreate', 'assistRate', 'drawFoul', 'outsideConversion', 'outsideRate', 'threeConversion', 'insideConversion'].indexOf(skill) !== -1; }).reduce(function(agg, curr){ return agg + skills[curr] }, 0)
    };

    var totalSkill = Object.keys(skills).reduce(function(agg, curr){ return agg + skills[curr]; }, 0);
    this.totalSkill = totalSkill;
    this.potential = getRandomInt(1, ((20*Object.keys(skills).length)-totalSkill));
    this.skillChange = getRandomInt(10, 60);

    this.turnStats = {
      FGA: 0,
      FGM: 0,
      TPA: 0,
      TPM: 0,
      FTA: 0,
      FTM: 0,
      AST: 0
    }
}


var test = new Player({
    name: 'test',
    age: 18,
    min: 1,
    max: 10
});

console.log(test);

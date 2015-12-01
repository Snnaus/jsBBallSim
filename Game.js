/**
 * This is the function that simulates 2 mins of gametime.
 * @param  {array} team   This is the array holding the Offensive players on the floor
 * @param  {Object} dStats Holds the collective defensive stats of the defensive teams
 * @param  {number} poss   The number of possessions that is to be simulated
 * @param  {Object} stats  This is the object that holds the stats of the turn; the first run doesn't have this so can be passed on rebounds
 * @return {Object}        The stats object
 */
function gameTurn(team, dStats, poss, stats){
  if(!stats){
    stats = {
      FGA: 0,
      FGM: 0,
      TPA: 0,
      TPM: 0,
      floorFouls: 0,
      FTA: 0,
      FTM: 0,
      missed: 0,
      AST: 0,
      DRB: 0,
      ORB: 0,
      second: 0
    };
  }else{
    stats.second = 0;
  }

  var shots = {
    three: 0,
    mid: 0,
    inside: 0,
    bonus: 0,
    dblBonus: 0
  };

  var total_shot_chance = {
    three: team.reduce(function(agg, curr){ return agg + curr.attr.threeRate; }, 0),
    mid: team.reduce(function(agg, curr){ return agg + curr.attr.outsideRate; }, 0),
    inside: team.reduce(function(agg, curr){ return agg + curr.attr.insideRate; }, 0),
    drawFouls: team.reduce(function(agg, curr){ return agg + curr.attr.drawFoul; }, 0),
    rebRate: team.reduce(function(agg, curr){ return agg + curr.attr.rebound; }, 0),
    astRate: team.reduce(function(agg, curr){ return agg + curr.attr.assistRate; }, 0)
  }

  console.log(total_shot_chance);

  for(var i = 0; i < poss; i++){
    var foulCheck = getRandomInt(0, 100), cont=true;
    if(foulCheck<= 10 + total_shot_chance['drawFouls'] - dStats['fouling']){
      dStats.floorFouls = dStats.floorFouls + 1;
      if(dStats.floorFouls > 10){
        shots.dblBonus = shots.dblBonus + 1;
        cont = false;
      }else if(dStats.floorFouls > 5){
        shots.bonus = shots.bonus + 1;
        cont = false;
      }
    }

    if(cont){
      var check = getRandomInt(0, Object.keys(total_shot_chance).reduce(function(agg, curr){ if(curr !== 'drawFouls' && curr != 'rebRate' && curr != 'astRate'){return agg + total_shot_chance[curr];} }, 0));
      if(check < total_shot_chance.three){
        shots.three = shots.three + 1;
      }else if(check < total_shot_chance.mid){
        shots.mid = shots.mid + 1;
      }else{
        shots.inside = shots.inside + 1;
      }
    }
  }

  for(var i = 0; i < shots.three; i++){
    var shooter = chooseShooter(team, 'threeRate'),
    check = getRandomInt(0, 100),
    foulCheck = getRandomInt(0,100), foul = false;
    if(foulCheck < shooter.attr.drawFoul*5 - dStats.fouling){
      foul = true;
    }
    shooter.turnStats.TPA = shooter.turnStats.TPA + 1;

    var defense = getRandomInt(dStats.outsideConvMod/2, dStats.outsideConvMod);
    if( getRandomInt(0, 100) <  total_shot_chance.astRate/2 ){
      defense = 0;
    }

    if(shooter.attr.threeConversion*3 - defense >= check){
      shooter.turnStats.TPM = shooter.turnStats.TPM + 1;
      if(!defense){
          stats.AST = stats.AST + 1;
      }
      if(foul){
        if(!freeThrows, 1){
          stats.missed = stats.missed + 1;
        }
      }
    }else if(foul){
      if(!freeThrows(shooter, 3)){
        stats.missed = stats.missed + 1;
      }
    }else{
      stats.missed = stats.missed + 1;
    }
  }

  for(var i = 0; i < shots.mid; i++){
    var shooter = chooseShooter(team, 'outsideRate'),
    check = getRandomInt(0, 100),
    foulCheck = getRandomInt(0,100), foul = false;
    if(foulCheck < shooter.attr.drawFoul*5 - dStats.fouling){
      foul = true;
    }
    shooter.turnStats.FGA = shooter.turnStats.FGA + 1;
    var defense = getRandomInt(dStats.outsideConvMod/2, dStats.outsideConvMod);
    if( getRandomInt(0, 100) <  total_shot_chance.astRate/2 ){
      defense = 0;
    }

    if(shooter.attr.outsideConversion*4 - defense >= check){
      shooter.turnStats.FGM = shooter.turnStats.FGM + 1;
      if(!defense){
          stats.AST = stats.AST + 1;
      }
      if(foul){
        if(!freeThrows, 1){
          stats.missed = stats.missed + 1;
        }
      }
    }else if(foul){
      if(!freeThrows(shooter, 2)){
        stats.missed = stats.missed + 1;
      }
    }else{
      stats.missed = stats.missed + 1;
    }
  }

  for(var i = 0; i < shots.inside; i++){
    var shooter = chooseShooter(team, 'insideRate'),
    check = getRandomInt(0, 100),
    foulCheck = getRandomInt(0,100), foul = false;
    if(foulCheck < shooter.attr.drawFoul*5 - dStats.fouling){
      foul = true;
    }
    shooter.turnStats.FGA = shooter.turnStats.FGA + 1;

    var defense = getRandomInt(dStats.insideConvMod/2, dStats.insideConvMod);
    if( getRandomInt(0, 100) <  total_shot_chance.astRate/2 ){
      defense = 0;
    }

    if(shooter.attr.insideConversion*4 - defense >= check){
      shooter.turnStats.FGM = shooter.turnStats.FGM + 1;
      if(!defense){
          stats.AST = stats.AST + 1;
      }
      if(foul){
        if(!freeThrows, 1){
          stats.missed = stats.missed + 1;
        }
      }
    }else if(foul){
      if(!freeThrows(shooter, 2)){
        stats.missed = stats.missed + 1;
      }
    }else{
      stats.missed = stats.missed + 1;
    }
  }

  for(var i = 0; i < shots.bonus; i++){
    var shooter = chooseShooter(team, 'drawFoul');
    if(!freeThrows(shooter, 2, true)){
      stats.missed = stats.missed + 1;
    }
  }

  for(var i = 0; i < shots.dblBonus; i++){
    var shooter = chooseShooter(team, 'drawFoul');
    if(!freeThrows(shooter, 2)){
      stats.missed = stats.missed + 1;
    }
  }

  for(var i = 0; i < shots.missed; i++){
    if(getRandomInt(0, dStats.rebound)+10 > getRandomInt(0, total_shot_chance.rebRate)){
      stats.DRB = stats.DRB + 1;
      console.log(true);
    }else{
      stats.ORB = stats.ORB + 1;
      stats.second = stats.second + 1;
    }
  }

  if(stats.second > 0){
    return gameTurn(team, dStats, stats.second, stats);
  }else{
    return stats;
  }
}

/**
 * This function chooses the shooter based on his attributes
 * @param  {array} team The array of offensive players.
 * @param  {String} attr The attribute that is being checked
 * @return {Object}      The player that was selected
 */
function chooseShooter(team, attr){
  var fate = getRandomInt(0, team.reduce(function(agg, curr){ return agg + curr.attr[attr]; }, 0));
  return team.reduce(function(agg, curr){
    if(typeof agg === 'number'){
      if(fate <= agg + curr.attr[attr]){
        return curr;
      }else{
        return agg + curr.attr[attr];
      }
    }else{
      return agg;
    }
  }, 0)
}

/**
 * This is the function that 'shoots' free throws.
 * @param  {object} player The player object.
 * @param  {Number} shots  The amount of free throw shots.
 * @param  {boolean} bonus  Whether or not this is a one and one.
 * @return {boolean}        Whether the last shot was made or not.
 */
function freeThrows(player, shots, bonus){
  var lastMade = false;
  for(var i = 0; i < shots; i++){
    var check = getRandomInt(0, 100);
    shooter.turnStats.FTA = shooter.turnStats.FTA + 1;
    if(player.attr.freeThrow*5-2 >= check){
      player.turnStats.FTM = shooter.turnStats.FTM + 1;
      lastMade = true;
    }else{
      lastMade = false;
    }

    if(bonus && i == 1 && !lastMade){
      break;
    }
  }

  return lastMade;
}

/**
 * This is the function that aggregates the defense attributes.
 * @param  {array} team The array of defensive players.
 * @return {object}      The object of the defense aggregated attributes.
 */
function defenseStats(team){
    var dStats = {};
    Object.keys(team[0].attr).forEach(function(attri){
        dStats[attri] = team.reduce(function(agg, curr){ return agg + curr.attr[attri]; }, 0);
    });

    return dStats;
}

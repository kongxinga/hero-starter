/* 

  The only function that is required in this file is the "move" function

  You MUST export the move function, in order for your code to run
  So, at the bottom of this code, keep the line that says:

  module.exports = move;

  The "move" function must return "North", "South", "East", "West", or "Stay"
  (Anything else will be interpreted by the game as "Stay")
  
  The "move" function should accept two arguments that the website will be passing in: 
    - a "gameData" object which holds all information about the current state
      of the battle

    - a "helpers" object, which contains useful helper functions
      - check out the helpers.js file to see what is available to you

    (the details of these objects can be found on javascriptbattle.com/#rules)

  This file contains four example heroes that you can use as is, adapt, or
  take ideas from and implement your own version. Simply uncomment your desired
  hero and see what happens in tomorrow's battle!

  Such is the power of Javascript!!!

*/

//TL;DR: If you are new, just uncomment the 'move' function that you think sounds like fun!
//       (and comment out all the other move functions)


// // The "Northerner"
// // This hero will walk North.  Always.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   return 'North';
// };

// // The "Blind Man"
// // This hero will walk in a random direction each turn.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   var choices = ['North', 'South', 'East', 'West'];
//   return choices[Math.floor(Math.random()*4)];
// };

// // The "Priest"
// // This hero will heal nearby friendly champions.
 /*var move = function(gameData, helpers) {
   var myHero = gameData.activeHero;
   if (myHero.health < 60) {
     return helpers.findNearestHealthWell(gameData);
   } else {
     return helpers.findNearestTeamMember(gameData);
   }
 };*/
 
 /*
//The Paladdin Groupie
//This hero prioritizes survival. It will stay in groups and heal others, even if health is low sprinting away is more dangerous
//If there is no group and health is low, sprint to a health fountain staying away from the higher health enemy*/
/*If within group, gang up on low health enemies*/

/*if not in group find group*/
/*if in group and see injured, heal them*/
/*if enemy higher health run*/
/*if injured run to group or fountain*/
 /*
  var move = function(gameData, helpers) {
   var myHero = gameData.activeHero;
   if (myHero.health < 60) {
     return helpers.findNearestHealthWell(gameData);
   } else if (myHero.health>=90) {
     return helpers.findNearestWeakerEnemy(gamedata); 
   } else {
	return helpers.findNearestTeamMember(gamedata);
   }
   
 };
 */

 
   
//why do people uglify their code. You should be confident in the superiority of your design 
//without relying on obfuscation
 
 /*the careful drunkard*/
  var move = function(gameData, helpers) {
   var myHero = gameData.activeHero;
   
   var medicCall=60;
   var painThreshold=70;
   var bloodLust=30;
   var blooderLust=20;
   
   
   //Get nearest health well stats
  var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
    if (boardTile.type === 'HealthWell') {
       return true;
    }
  });
  
  //Get nearest grave stats
var graveStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
    if (boardTile.subType === 'Bones') {
       return true;
    }
  });

  
  
  // Get friendly dying hero stats
  var teamHeroStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(heroTile) {
    return heroTile.type === 'Hero' && heroTile.team === myHero.team && heroTile.health <= medicCall;
  });
  
  
  //return tree stats to make less drunk
 var treeStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
    if (boardTile.subType === 'Tree') {
       return true;
    }
  });
 
  
 
  
  
  
  //get nearest critical enemy stats
  
    var enemyHeroStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(heroTile) {
    return heroTile.type === 'Hero' && heroTile.team !== myHero.team && heroTile.health <= bloodLust;
  });
  
  
  //This is my plan to swipe kill enemy heroes that can be killed by AOE attacks
    var enemyKaputHeroStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(heroTile) {
    return heroTile.type === 'Hero' && heroTile.team !== myHero.team && heroTile.health <= blooderLust;
  });
  
  
  var distanceToDyingHero = teamHeroStats.distance;
  var directionToDyingHero = teamHeroStats.direction;
  
  var distanceToHealthWell = healthWellStats.distance;
  var directionToHealthWell = healthWellStats.direction;
  
  var distanceToGrave = graveStats.distance;
  var directionToGrave = graveStats.direction;
  
  var distanceToTree = treeStats.distance;
  var directionToTree = treeStats.direction;
  
  var distanceToBadHero = enemyHeroStats.distance;
  var directionToBadHero = enemyHeroStats.direction;
  
  var distanceToBadKaputHero = enemyKaputHeroStats.distance;
  var directionToBadKaputHero = enemyKaputHeroStats.direction;
   
   
   if (myHero.health <= painThreshold) {
     return helpers.findNearestHealthWell(gameData);
     
   } else if (myHero.health < 100 && distanceToHealthWell === 1) {
    //Heal if you aren't full health and are close to a health well already.
    //TOPOFF
    return directionToHealthWell;
  } else if (distanceToDyingHero === 1){
    //heal dying friends
    return directionToDyingHero;
    
  } else if (distanceToBadHero === 1){
    //direct attacks to heroes we can kill in one blow
    return directionToBadHero;    
 
  } else if (distanceToBadKaputHero === 2){
    //Move and swipe wimpier heroes
    return directionToBadHero;     
    
  } else if (distanceToGrave === 1){
    //Rob a grave why not
    return directionToGrave;  	
	
    
    
   } else {
        var choices = ['North', 'South', 'East', 'West'];
		   var firstChoice= choices[Math.floor(Math.random()*4)];
		   
		   if (firstChoice===directionToTree && distanceToTree===1){
		   //if the tree is near and we chose tree, truncate the array and choose again
				var newArray = [];
				for(var i=0;i<choices.length;i++)
				if(choices[i]!==firstChoice) newArray.push(a[i]);
		   
				return newArray[Math.floor(Math.random()*3)];
		   
		   
		   }
		else {
		
		
   return choices[Math.floor(Math.random()*4)];
   }
   }
 };
   
//why do people uglify their code. You should be confident in the superiority of your design 
//without relying on obfuscation
 
// // The "Unwise Assassin"
// // This hero will attempt to kill the closest enemy hero. No matter what.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 30) {
//     return helpers.findNearestHealthWell(gameData);
//   } else {
//     return helpers.findNearestEnemy(gameData);
//   }
// };

// // The "Careful Assassin"
// // This hero will attempt to kill the closest weaker enemy hero.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 50) {
//     return helpers.findNearestHealthWell(gameData);
//   } else {
//     return helpers.findNearestWeakerEnemy(gameData);
//   }
// };

// // The "Safe Diamond Miner"
/*var move = function(gameData, helpers) {
  var myHero = gameData.activeHero;

  //Get stats on the nearest health well
  var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
    if (boardTile.type === 'HealthWell') {
      return true;
    }
  });
  var distanceToHealthWell = healthWellStats.distance;
  var directionToHealthWell = healthWellStats.direction;
  

  if (myHero.health < 40) {
    //Heal no matter what if low health
    return directionToHealthWell;
  } else if (myHero.health < 100 && distanceToHealthWell === 1) {
    //Heal if you aren't full health and are close to a health well already
    return directionToHealthWell;
  } else {
    //If healthy, go capture a diamond mine!
    return helpers.findNearestNonTeamDiamondMine(gameData);
  }
};
*/

// // The "Selfish Diamond Miner"
// // This hero will attempt to capture diamond mines (even those owned by teammates).
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;

//   //Get stats on the nearest health well
//   var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
//     if (boardTile.type === 'HealthWell') {
//       return true;
//     }
//   });

//   var distanceToHealthWell = healthWellStats.distance;
//   var directionToHealthWell = healthWellStats.direction;

//   if (myHero.health < 40) {
//     //Heal no matter what if low health
//     return directionToHealthWell;
//   } else if (myHero.health < 100 && distanceToHealthWell === 1) {
//     //Heal if you aren't full health and are close to a health well already
//     return directionToHealthWell;
//   } else {
//     //If healthy, go capture a diamond mine!
//     return helpers.findNearestUnownedDiamondMine(gameData);
//   }
// };

// // The "Coward"
// // This hero will try really hard not to die.
// var move = function(gameData, helpers) {
//   return helpers.findNearestHealthWell(gameData);
// }


// Export the move function here
module.exports = move;

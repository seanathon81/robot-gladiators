
/* GAME FUNCTIONS */

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};


// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
  
  while (playerInfo.Health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.Name + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerInfo.Money for skipping
        playerInfo.Money = Math.max(0, playerInfo.Money - 10);
        console.log("playerInfo.Money", playerInfo.Money);
        break;
      }
    }

    // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.Attack - 3, playerInfo.Attack);
    enemy.health = Math.max(0, enemyHealth - damage);

    console.log(
      playerInfo.Name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.Money = playerInfo.Money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.Health = Math.max(0, playerInfo.Health - damage);
    console.log(
      enemy.name + ' attacked ' + playerInfo.Name + '. ' + playerInfo.Name + ' now has ' + playerInfo.Health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.Health <= 0) {
      window.alert(playerInfo.Name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.Name + ' still has ' + playerInfo.Health + ' health left.');
    }
  }
};

//function to start a new game
var startGame = function () {
// reset player stats
playerInfo.reset();

// fight each enemy-robot by looping over them and fighting them one at a time
for (var i = 0; i < enemyInfo.length; i++) {
  // if player is still alive, keep fighting
  if (playerInfo.Health > 0) {
    // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
    window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

    // pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyObj = enemyInfo.length[i];

    // reset enemyHealth before starting new fight
    pickedEnemyObj.health = randomNumber(40, 60);

    // use debugger to pause script from running and check what's going on at that moment in the code
    // debugger;

    // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
    fight(pickedEnemyObj);
  

    if (playerInfo.Health > 0 && i < enemyInfo.length -1) {
    var storeConfirm = window. confirm("The fight is over, visit the store before the next round?");
   // if yes, take them to the store() function
   if (storeConfirm) {
     shop()
  }
}
}
  
  // if player isn't alive, stop the game
  else {
    window.alert('You have lost your robot in battle! Game Over!');
    break;
  }
}
    // after the loop ends, player is either out of health or enemies to fight
  endGame();
};


// function to end the entire game
var endGame = function() {
  window.alert("The Game has now ended. Let's see how you did!")
  // if player is still alive, player wins!
  if (playerInfo.Health > 0) {
    window.alert("Great job, you've survived the game!")
  }
else {
  window.alert("You've lost your robot in battle")
}
// ask player if they'd like to play again
var playAgainConfirm = window.confirm("Would you like to play again");

if (playAgainConfirm) {
  // restart the game
  startGame();
}
else{
window.alert("Thank you for playing Robort Gladiators! Come back soon!")
}
};





var shop = function() {
  var shopOptionPrompt = window.prompt (
  );
// use switch to carry out action
switch (shopOptionPrompt) {
  case 'REFILL':
  case 'refill':
    playerInfo.refillHealth();
    break;
  case 'UPGRADE':
  case 'upgrade':
    playerInfo.upgradeAttack();
    break;
  case 'LEAVE':
  case 'leave':
    window.alert('Leaving the store.');

    // do nothing, so function will end
    break;
  default:
    window.alert('You did not pick a valid option. Try again.');

    // call shop() again to force player to pick a valid option
    shop();
    break;
}

};

// end game functions

// plauer information
var playerInfo = {
  name: window.prompt("What is your robot's name"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },

  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  }
};


// enemy information
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber (10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber (10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber (10, 14)
  }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);



// start the game when the page loads
startGame();
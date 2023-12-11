import Attacker from "../GameObjects/Attacker";
import Target from "../GameObjects/Target";
import {
  Levels,
  PauseGame,
  gamePaused,
  updateForbidenLetter,
} from "./GameData";
import Projectile from "../GameObjects/Projectile";
import { randomIntFromInterval } from "./mathUtils";
import {
  canonUrl,
  projectileUrl,
  targetsUrls,
  vehiculeUrl,
} from "./GameAssets";
import { currentLevel } from "./Gamestates";

//game objects
var tank;
var ghosts = [];
var projectiles = [];
//graphic objects
var canon, vehicule, projectile;
var targetImgs = [];
//attacking vars buffers and counters and indexing variables
var currentAttackedGhost;
var buffer;
var counter = 0;
var attackedWord; //currentAttackedGhost.word
var clickedLetter; //buffer to store the current

export function preLoadFun(p) {
  targetImgs = targetsUrls.map((url) => p.loadImage(url));
  canon = p.loadImage(canonUrl);
  vehicule = p.loadImage(vehiculeUrl);
  projectile = p.loadImage(projectileUrl);
}

export function setUpFun(p) {
  //this function is called before the game loop
  //all the static objects and functionalities are emplented here
  tank = new Attacker(p, canon, vehicule);
}
export function drawFun(p, setPage, GameOverPage) {
  p.clear();
  p.noStroke();
  //Create bombs objects by adding them to the array
  if (p.frameCount % 50 === 0 && ghosts.length < Levels[currentLevel].count) {
    let newBomb = new Target(
      p,
      targetImgs[randomIntFromInterval(0, targetImgs.length - 1)],
      tank
    );
    ghosts.push(newBomb);
    updateForbidenLetter(ghosts.map((bomb) => bomb.firstLetter));
    //add the first letter of the new bomb to the forbiden array
  }

  // Loop through the bombs and display and move each one
  for (let i = ghosts.length - 1; i >= 0; i--) {
    let bomb = ghosts[i];
    bomb.show(p);
    if (!gamePaused) {
      //the game is not paused
      bomb.attack(p);
      // Remove bombs that are off-screen and that are destroyed
      if (bomb.pos.y > p.height || bomb.hide()) {
        ghosts.splice(i, 1);

        updateForbidenLetter(ghosts.map((bomb) => bomb.firstLetter));
      }
      //Check if the bomb hits the ship
      if (bomb.hitsAttacker()) {
        PauseGame(true);
        setPage(GameOverPage);
        console.log("game over");
      }
      //rendring the projectiles if exists
      for (let i = projectiles.length - 1; i >= 0; i--) {
        let projectile = projectiles[i];
        projectile.show(p);
        projectile.attack();
        //remove projetiles that hit the target;
        if (projectile.collidesWithTarget()) {
          let target = projectile.target;
          projectiles.splice(i, 1);
          target.written += clickedLetter;
          target.shootCount += 1;
          target.pos.sub(target.dir.copy().mult(6));
        }
      }
    }
  }
  //the tank
  tank.show(p);
  //to update the position of the tank
  tank.update(p);
}

export function keyPressedFun(p, key) {
  if(!gamePaused){
    //key pressed
  if (!buffer) {
    //find currently attacked bomb based on key
    currentAttackedGhost = ghosts.find((bomb) => bomb.word.startsWith(key));
    currentAttackedGhost
      ? (attackedWord = currentAttackedGhost.word)
      : console.log("wrong key");
    if (currentAttackedGhost) {
      clickedLetter = key;
      //update buffer to the second letter of the attacked word
      counter++;
      buffer = attackedWord[counter];
      //send projectile to the bomb
      projectiles.push(
        new Projectile(p, tank.Vpos, currentAttackedGhost, projectile)
      );
      tank.attack(currentAttackedGhost);
    }
  } else {
    if (counter < attackedWord.length - 1) {
      if (key == buffer) {
        //set buffer to the next letter
        clickedLetter = key;
        counter++;
        buffer = attackedWord[counter];
        projectiles.push(
          new Projectile(p, tank.Vpos, currentAttackedGhost, projectile)
        );
        tank.attack(currentAttackedGhost);
      } else {
        console.log("wrong key");
      }
    } else {
      if (key == buffer) {
        clickedLetter = key;
        buffer = null;
        counter = 0;
        let proj = new Projectile(
          p,
          tank.Vpos,
          currentAttackedGhost,
          projectile
        );
        projectiles.push(proj);
        tank.attack(currentAttackedGhost);
        //set varibales to default
        currentAttackedGhost = null;
        attackedWord = null;
      } else {
        console.log("wrong key");
      }
    }
  }
  }
}

import { forbiden } from "../utils/GameData";

import { generateWord } from "../utils/utilFunctions";

class Target {
  //Propertions_________________________________________
  #scale = 0.8; //change this to change the size of the ghost and text
  #speed = 1;
  #imgW = 60 * this.#scale;
  #imgH = 66 * this.#scale;
  #textSize = 16 * this.#scale;
  #textXPadding = 5 * this.#scale;
  #textYPadding = 4 * this.#scale;
  constructor(p, img, attacker) {
    //position of the ghost_______________________________
    this.pos = p.createVector(p.random(p.width), 0);
    //____________________________________________________
    //direction vector____________________________________
    this.dir = p.createVector(p.width / 2, p.height);
    this.dir.sub(this.pos);
    this.dir.normalize();
    //____________________________________________________
    //image and word______________________________________
    this.img = img;
    //generate a word that doesn't stat with a letter of the forbiden array
    this.word = generateWord(forbiden);
    this.written = ""; //written part of the word
    this.firstLetter = this.word.slice(0, 1);
    //____________________________________________________
    this.radius = this.#imgH / 2; //radius of the ghost
    this.shootCount = 0; //how many shoots conceded
    this.attacker = attacker;
  }

  show(p) {
    p.fill(255);
    p.noStroke();
    //img_______________________
    p.image(this.img, this.pos.x, this.pos.y, this.#imgW, this.#imgH);
    //text_______________________________________________________
    p.textSize(this.#textSize);
    let before = this.word.substring(0, this.written.length);
    let after = this.word.substring(this.written.length);
    //text proportions
    const textH = p.textAscent(after) - this.#textSize * 0.1;
    const textW = p.textWidth(after) + p.textWidth(before);
    p.fill(0, 0, 0, 200); //200 is the transparacy
    p.rect(
      this.pos.x + this.#imgW / 2,
      this.pos.y - this.#imgH / 2,
      textW + this.#textXPadding * 2,
      textH + this.#textYPadding * 2
    );
    p.fill(255, 165, 0); // Set the fill color for the specific letter
    // p.text(before, this.pos.x + 15, this.pos.y - 23);
    p.text(
      before,
      this.pos.x + this.#imgW / 2 + this.#textXPadding,
      this.pos.y - this.#imgH / 2 + textH + this.#textYPadding
    );
    p.fill(255); // Set the default fill color
    p.text(
      after,
      this.pos.x + this.#imgW / 2 + this.#textXPadding + p.textWidth(before),
      this.pos.y + -this.#imgH / 2 + textH + this.#textYPadding
    );
  }

  attack() {
    // Update the position based on the direction and speed
    this.pos.add(this.dir.copy().mult(this.#speed));
  }
  //function to check if the bomb is destroyed
  hide() {
    return this.shootCount >= this.word.length;
  }
  hitsAttacker() {
    const d = this.pos.dist(this.attacker.Cpos);
    return d < this.radius + this.attacker.radius;
  }
}
export default Target;

class Attacker {
  #scale = 0.8;
  #vehiculeH = 66 * this.#scale;
  #vehiculeW = 68 * this.#scale;
  #canonH = 77 * this.#scale;
  #canonW = 38 * this.#scale;
  #canonRotationCenter = 25 * this.#scale;
  #canonPosOffset = 17 * this.#scale; //canon pos on the vehicul
  constructor(p, canon, vehicule) {
    this.canon = canon; //canon image
    this.vehicule = vehicule; //vehicule image
    this.target = null; //targeted bomb to rotate the canon
    this.Vpos = p.createVector(p.width / 2, p.height - this.#vehiculeH / 2);
    this.Cpos = p.createVector(
      p.width / 2,
      p.height - this.#canonH / 2 - this.#canonPosOffset
    );
    this.radius = this.#canonH / 2;
  }

  show(p) {
    //render the vehicule image(static part of the attacker)
    p.fill(255);
    p.imageMode(p.CENTER);
    p.image(
      this.vehicule,
      this.Vpos.x,
      this.Vpos.y,
      this.#vehiculeW,
      this.#vehiculeH
    );
  }
  attack(target) {
    this.target = target; // Set the current target
  }

  update(p) {
    if (this.target) {
      p.translate(this.Cpos.x, this.Cpos.y + this.#canonRotationCenter);
      let x = this.target.pos.x - this.Cpos.x;
      let y = this.target.pos.y - this.Cpos.y + this.#canonRotationCenter;
      let a = p.atan2(y, x);
      p.rotate(a + Math.PI / 2); //correct the angle of the rotation
      // Draw the canon with rotation
      p.image(
        this.canon,
        0,
        -this.#canonRotationCenter,
        this.#canonW,
        this.#canonH
      );
    } else {
      p.image(this.canon, this.Cpos.x, this.Cpos.y, this.#canonW, this.#canonH);
    }
  }
}
export default Attacker;

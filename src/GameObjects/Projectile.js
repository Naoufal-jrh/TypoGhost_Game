class Projectile {
  #scale = 0.6;
  #speed = 6;
  #projectileW = 14 * this.#scale;
  #projectileH = 25 * this.#scale;
  constructor(p, canonPos, target, img) {
    // Initialize position with the ship's position
    this.pos = p.createVector(canonPos.x, canonPos.y);
    // Initialize direction towards the specified target
    this.dir = target.pos.copy().sub(this.pos).normalize();
    this.target = target;
    this.radius = (this.#projectileH / 2) * this.#scale;
    this.img = img;
  }

  show(p) {
    p.noStroke();
    p.image(
      this.img,
      this.pos.x,
      this.pos.y,
      this.#projectileW,
      this.#projectileH
    );
  }

  // Move the projectile towards the specified target
  attack() {
    // Update the position based on the direction and speed
    this.pos.add(this.dir.copy().mult(this.#speed));
  }
  // Check if the projectile collides with the specified target
  collidesWithTarget() {
    const d = this.pos.dist(this.target.pos);
    return d < this.radius + this.target.radius;
  }
}
export default Projectile;

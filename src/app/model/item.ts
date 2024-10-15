export class Item {
  position = 0;
  y = 0;
  id = 0;
  emitterID = 0;
  colors = ['#00ff00'];

  update() {
    this.position += 4;
  }
}

export class Cell {
  public x: number;
  public y: number;
  public populated: boolean;

  constructor(x: number, y: number, populated: boolean) {
    this.x = x;
    this.y = y;
    this.populated = populated;
  }
}

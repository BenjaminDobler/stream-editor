export interface Point {
  x: number;
  y: number;
}

export const angleRadians = (p1: Point, p2: Point) => Math.atan2(p2.y - p1.y, p2.x - p1.x);
export const pointOnCircle = (center: Point, angle: number, radius: number) => {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return { x: center.x + x, y: center.y + y };
};
export const distanceBetweenPoints = (p1: Point, p2: Point) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

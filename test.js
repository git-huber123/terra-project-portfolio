function findIntersection(rect, uX, uY, uZ) {
  const xFace = player.x < rect[4] ? rect[4] : rect[3]; // since rect[3] is min x and rect[4] is max x
  const yFace = player.y < rect[6] ? rect[6] : rect[5]; // repeat
  const zFace = player.z < rect[8] ? rect[8] : rect[7];

  const xT = (xFace - player.x) / uX;
  const yT = (yFace - player.y) / uY;
  const zT = (zFace - player.z) / uZ;

  const maxX = rect[3];
  const minX = rect[4];
  const maxY = rect[5];
  const minY = rect[6];
  const maxZ = rect[7];
  const minZ = rect[8];

  const xPred = { y: player.y + uY * xT, z: player.z + uZ * xT };
  const yPred = { x: player.x + uX * yT, z: player.z + uZ * yT };
  const zPred = { y: player.y + uY * zT, x: player.x + uX * zT };

  let t = Infinity;

  if (xT > 0 && xPred.y >= minY && xPred.y <= maxY && xPred.z >= minZ && xPred.z <= maxZ && xT < t) {
    t = xT;
  }
  if (yT > 0 && yPred.x >= minX && yPred.x <= maxX && yPred.z >= minZ && yPred.z <= maxZ && yT < t) {
    t = yT;
  }
  if (zT > 0 && zPred.x >= minX && zPred.x <= maxX && zPred.y >= minY && zPred.y <= maxY && zT < t) {
    t = zT;
  }

  return t;
}

let t = Infinity;
let chosenRect = null;

for (const rect of rects) {
  let rT = findIntersection(rect, uX, uY, uZ);
  if (rT < t) {
    t = rT;
    chosenRect = rect;
  }
}

if (t !== Infinity && t < viewDistance) {
  const intersection = { x: player.x + uX * t, y: player.y + uY * t, z: player.z + uZ * t };

  const dist = Math.hypot(intersection.x - player.x, intersection.y - player.y, intersection.z - player.z);
  const fade = (viewDistance - dist) / viewDistance;
  setPixel(i, j, chosenRect[2].h, chosenRect[2].s, chosenRect[2].l * (0.25 + 0.75 * fade));
}

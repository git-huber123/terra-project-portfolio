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

let ts = new Float32Array();

for (const rect of rects) {
  // find the vectors here
  const minJ = 1;
  const maxJ = 2;
  const minI = 1;
  const maxI = 2;
  for (let i = minI; i <= maxI; i++) {
    for (let j = minJ; j <= maxJ; j++) {
      let t = findIntersection(rect, uX, uY, uZ);
      if (ts[i * cols + j] > t) {
        // draw the pixel
        ts[i * cols + j] = t;
      }
    }
  }
}

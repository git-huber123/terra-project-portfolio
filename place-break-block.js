function placeBlock() {
  const th = (player.xCenterAngle * Math.PI) / 180;
  const ph = (player.yCenterAngle * Math.PI) / 180;

  const fwd = { x: Math.cos(th) * Math.cos(ph), y: Math.sin(th) * Math.cos(ph), z: -Math.sin(ph) };

  const uX = fwd.x;
  const uY = fwd.y;
  const uZ = fwd.z;
  let t = Infinity;

  let xFace, yFace, zFace, xT, yT, zT, minX, minY, minZ;

  for (const rect of rects) {
    xFace = player.x < rect[4] ? rect[4] : rect[3]; // since rect[3] is min x and rect[4] is max x
    yFace = player.y < rect[6] ? rect[6] : rect[5]; // repeat
    zFace = player.z < rect[8] ? rect[8] : rect[7];

    xT = (xFace - player.x) / uX;
    yT = (yFace - player.y) / uY;
    zT = (zFace - player.z) / uZ;

    const maxX = rect[3];
    const minX = rect[4];
    const maxY = rect[5];
    const minY = rect[6];
    const maxZ = rect[7];
    const minZ = rect[8];

    if (xT > 0 && xT < t) {
      const xPredy = player.y + uY * xT;
      const xPredz = player.z + uZ * xT;
      if (xPredy >= minY && xPredy <= maxY && xPredz >= minZ && xPredz <= maxZ) {
        t = xT;
      }
    }
    if (yT > 0 && yT < t) {
      const yPredx = player.x + uX * yT;
      const yPredz = player.z + uZ * yT;
      if (yPredx >= minX && yPredx <= maxX && yPredz >= minZ && yPredz <= maxZ) {
        t = yT;
      }
    }
    if (zT > 0 && zT < t) {
      const zPredy = player.y + uY * zT;
      const zPredx = player.x + uX * zT;
      if (zPredx >= minX && zPredx <= maxX && zPredy >= minY && zPredy <= maxY) {
        t = zT;
      }
    }
  }

  if (t === Infinity || t > reach) return;

  let corner1, corner2;

  const originalPoint = { x: player.x + uX * t, y: player.y + uY * t, z: player.z + uZ * t };
  let point = { x: player.x + uX * t, y: player.y + uY * t, z: player.z + uZ * t };

  if (xT === t) {
    point.x -= xFace === minX ? 1 : -1;
    point.y = Math.floor(point.y);
    point.z = Math.floor(point.z);
    corner1 = structuredClone(point);
    point.y += 1;
    point.z += 1;
    point.x = xFace;
    corner2 = structuredClone(point);
  } else if (yT === t) {
    point.y -= yFace === minY ? 1 : -1;
    point.x = Math.floor(point.x);
    point.z = Math.floor(point.z);
    corner1 = structuredClone(point);
    point.x += 1;
    point.z += 1;
    point.y = yFace;
    corner2 = structuredClone(point);
  } else if (zT === t) {
    point.z -= zFace === minZ ? 1 : -1;
    point.y = Math.floor(point.y);
    point.x = Math.floor(point.x);
    corner1 = structuredClone(point);
    point.y += 1;
    point.x += 1;
    point.z = zFace;
    corner2 = structuredClone(point);
  } else if (t === Infinity && uZ < 0) {
    t = -player.z / uZ;
    point.z += 1;
    point.y = Math.floor(point.y);
    point.x = Math.floor(point.x);
    corner1 = structuredClone(point);
    point.y += 1;
    point.x += 1;
    point.z = zFace;
    corner2 = structuredClone(point);
  }

  const r = [corner1, corner2, { h: Math.random() * 360, s: 100, l: 50 }];
  r[3] = Math.max(r[0].x, r[1].x);
  r[4] = Math.min(r[0].x, r[1].x);
  r[5] = Math.max(r[0].y, r[1].y);
  r[6] = Math.min(r[0].y, r[1].y);
  r[7] = Math.max(r[0].z, r[1].z);
  r[8] = Math.min(r[0].z, r[1].z);
  if (areTouching(playerBox(), r)) return;
  return r;
}

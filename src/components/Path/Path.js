export default function path(lat, lng, pathTime, dt = 600) {
  const scale = 1e-3;
  const coords = [[lat, lng]];
  const nSteps = pathTime / dt;

  for (let i = 0; i < nSteps; i++) {
    // let wSpeed = call API
    let vLat = 1.0 * scale;
    let vLng = Math.cos((lng / 90) * (100 * Math.PI)) * scale * 10;

    lng += vLng * dt;
    lat += vLat * dt;

    coords.push([lat, lng]);
  }
  return coords;
}

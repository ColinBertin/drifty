function fetchData(coords, dt, counter, maxSteps) {
  if (counter === maxSteps) {
    return null
  }

  let lat = coords[counter][0];
  let lng = coords[counter][1];
  counter += 1
  fetch(`http://127.0.0.1:5000?lon=${lng}&lat=${lat}`)
    .then(res => res.json())
    .then(data => {
      lng += data.wind_u * dt;
      lat += data.wind_v * dt;
      coords.push([lat, lng]);
      console.log(counter, coords)
      fetchData(coords, dt, counter, maxSteps);
    })
    return coords;
}


export default function path(lat, lng, pathTime, dt = 600) {
  // const scale = 1e
  let coords = [[lat, lng]];
  const nSteps = pathTime / dt;
  // /!\ test scaling, the units must be scaled properly later
  dt *= 1e-3;

  coords = fetchData(coords, dt, 0, nSteps);
  console.log(coords)
  return coords;
}

// for (let i = 0; i < nSteps; i++) {
//   let latitude = coords[i][0];
//   let longitude = coords[i][1];

  // console.log(latitude, longitude)
  // fetch(`http://127.0.0.1:5000?lon=${longitude}&lat=${latitude}`)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //     longitude += data.wind_u * dt;
  //     latitude += data.wind_v * dt;

  //     [latitude, longitude]
  //   });
  // let vLat = 1.0 * scale;
  // let vLng = Math.cos((lng / 90) * (100 * Math.PI)) * scale * 10;
// }

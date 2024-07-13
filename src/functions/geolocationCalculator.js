function getCurrentGeo(currentGeo) {
  const result = []; // [위도_d, 위도_f, 경도_d, 경도_f]
  currentGeo.forEach(element => {
    let d = Math.floor(element);
    let f = (element - d) * 60;
    let box = [d, Math.floor(f)];
    result.push(...box);
  });
  return result;
}

function geolocationCalculator(res) { 
  let arr = getCurrentGeo(res);
  return arr;
}

export default geolocationCalculator
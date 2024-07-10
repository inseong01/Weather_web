// const success = (props) => {
//   let latitude = props.coords.latitude; // 위도
//   let longitude = props.coords.longitude; // 경도
//   return [latitude.toFixed(6), longitude.toFixed(6)];
// }
const error = () => {
  console.log('getGeolocationo Error');
  return [37.694324, 126.768418] // 기본값
}

function GetGeolocation() {
  // let geolocation = navigator.geolocation.getCurrentPosition(success, error);
  return error();
}

const geolocationCalculator = () => { 
  const currentGeo = GetGeolocation();
  const arr = []; // [위도_d, 위도_f, 경도_d, 경도_f]
  currentGeo.forEach(element => {
    let d = Math.floor(element);
    let f = (element - d) * 60;
    let box = [d, Math.floor(f)];
    arr.push(...box);
  });
  return arr;
}

export default geolocationCalculator
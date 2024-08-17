import inputSkyCode from "./inputSkyCode.js";

const getWeatherIconName = (skyCode, ptyCode) => {
  let name = '';
  switch (true) {
    case ptyCode === 0:
      name = inputSkyCode(skyCode);
      break;
    case ptyCode === 1 || ptyCode === 4:
      name = "rain";
      break;
    case ptyCode === 2:
      name = "rain_snow";
      break;
    case ptyCode === 3:
      name = "snow";
      break;
    default:
      console.log('ptyCode error')
      return;
  }
  return `url(/img/${name}.png)`;
}

export default getWeatherIconName;
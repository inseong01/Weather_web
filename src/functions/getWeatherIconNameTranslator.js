const words = [
  "맑음", "비", "눈", "흐림", "소나기", "구름많음"
];

const getWeatherIconNameTranslator = (str) => {
  if (!str) return;

  let name = '';
  let code;
  words.forEach((word, idx) => {
    if (!str?.includes(word)) return;
    code = idx;
  })

  switch (true) {
    case code === 0:
      name = "sunny"
      break;
    case code === 1 || code === 4:
      name = "rain";
      break;
    case code === 2:
      name = "snow";
      break;
    case code === 3:
      name = "cloud";
      break;
    case code === 5:
      name = "cloudy";
      break;
    default:
      console.log(`ptyCode error - str: ${str}`)
      return;
  }
  return `url(/img/${name}.png)`;
}

export default getWeatherIconNameTranslator
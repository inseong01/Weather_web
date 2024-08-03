import getWeatherIconNameTranslator from "./getWeatherIconNameTranslator";
import mergeWeatherTwoDays from "./mergeWeatherTwoDays";

function getWeatherArr(weatherState) {
  if (!weatherState.twoDays) return;
  // 주간 날씨 아이콘
  let twoDaysWeather = mergeWeatherTwoDays(weatherState.twoDays);
  let twoDaysLaterWeather = [];
  let box = [];
  for (let i in weatherState.twoDaysLater[0]) {
    // [{...}]
    if (i.includes("wf")) {
      if (box.length > 1) {
        twoDaysLaterWeather.push(box); // [{value}, {value}]
        box = [];
      }
      let value = {
        key: i,
        value: getWeatherIconNameTranslator(weatherState.twoDaysLater[0][i]), // 함수적용
        origin: weatherState.twoDaysLater[0][i],
      };
      box.push(value);
    }
  }

  return twoDaysWeather.concat(twoDaysLaterWeather);
}

export default getWeatherArr;
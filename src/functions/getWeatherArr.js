import getWeatherIconNameTranslator from "./getWeatherIconNameTranslator";
import mergeWeatherTwoDays from "./mergeWeatherTwoDays";

function getWeatherArr(weatherState) {
  if (!weatherState.twoDays) return;
  // 주간 날씨 아이콘
  const twoDaysWeather = mergeWeatherTwoDays(weatherState.twoDays);

  const twoDaysLaterWeather = [];
  let mergeObj = {};

  Object.keys(weatherState.twoDaysLater[0]).forEach((key) => {
    if (!key.includes('wf')) return;

    const dayNum = key.match(/\d+/)[0];
    if (Object.keys(mergeObj).length > 1) {
      mergeObj = {};
      return;
    }

    mergeObj = {
      [`wf${dayNum}Am`]: {
        url: getWeatherIconNameTranslator(weatherState.twoDaysLater[0][`wf${dayNum}Am`])
      },
      [`wf${dayNum}Pm`]: {
        url: getWeatherIconNameTranslator(weatherState.twoDaysLater[0][`wf${dayNum}Pm`])
      },
      [`regId`]: weatherState.twoDaysLater[0][`regId`],
    };

    twoDaysLaterWeather.push(mergeObj);
  });

  // 1~7일차까지 추출 
  return twoDaysWeather.concat(twoDaysLaterWeather).splice(0, 7);
}

export default getWeatherArr;
import getWeatherIconName from "./getWeatherIcon.js";

const mergeWeatherTwoDays = (data) => {
  const mergeBox = [];

  for (let i = 0; i < data.SKY.length; i++) {
    const SKY = data.SKY[i];
    const PTY = data.PTY[i];
    mergeBox.push({ SKY, PTY });
  }

  const twoDaysArr = [];
  let num = 1;
  for (let i = 0; i < mergeBox.length; i += 2) {
    const wf = {
      [`wf${num}Am`]: {
        url: getWeatherIconName(
          +mergeBox[i].SKY.fcstValue,
          +mergeBox[i].PTY.fcstValue,
        ),
        baseDate: mergeBox[i].SKY.baseDate,
        baseTime: mergeBox[i].SKY.baseTime,
        fcstDate: mergeBox[i].SKY.fcstDate,
        fcstTime: mergeBox[i].SKY.fcstTime,
      },
      [`wf${num}Pm`]: {
        url: getWeatherIconName(
          +mergeBox[i + 1].SKY.fcstValue,
          +mergeBox[i + 1].PTY.fcstValue,
        ),
        baseDate: mergeBox[i + 1].SKY.baseDate,
        baseTime: mergeBox[i + 1].SKY.baseTime,
        fcstDate: mergeBox[i + 1].SKY.fcstDate,
        fcstTime: mergeBox[i + 1].SKY.fcstTime,
      }
    }
    twoDaysArr.push(wf);
    num++;
  }
  return twoDaysArr;
};

export default mergeWeatherTwoDays;
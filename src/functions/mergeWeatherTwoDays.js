import getWeatherIconName from "./getWeatherIcon.js";

const mergeWeatherTwoDays = (data) => {
  // let mergeBox = [];
  const mergeBox = [];
  for (let i = 0; i < data.length; i += 2) {
    // let box = [data[i], data[i + 1]];
    // mergeBox.push(box);

    const SKY = data[i]; // 검
    const PTY = data[i + 1]; // 증
    mergeBox.push({ SKY, PTY }); // 필 요
  }

  const twoDaysArr = [];
  let num = 1;
  for (let i = 0; i < mergeBox.length; i += 2) {
    const wf = {
      [`wf${num}Am`]: {
        // skycode는 왜 필요한 거지
        url: getWeatherIconName(
          +mergeBox[i].SKY.fcstValue,
          +mergeBox[i].PTY.fcstValue
        ),
        baseDate: mergeBox[i].SKY.baseDate,
        baseTime: mergeBox[i].SKY.baseTime,
        fcstDate: mergeBox[i].SKY.fcstDate,
        fcstTime: mergeBox[i].SKY.fcstTime,
      },
      [`wf${num}Pm`]: {
        url: getWeatherIconName(
          +mergeBox[i + 1].SKY.fcstValue,
          +mergeBox[i + 1].PTY.fcstValue
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
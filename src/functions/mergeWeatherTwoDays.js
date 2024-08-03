import getWeatherIconName from "./getWeatherIcon";

const mergeWeatherTwoDays = (data) => {
  let mergeBox = [];
  for (let i = 0; i < data.length; i += 2) {
    let box = [data[i], data[i + 1]];
    mergeBox.push(box);
  }
  let value = [];
  let num = 1;
  // console.log('mergeBox', mergeBox)
  for (let i = 0; i < mergeBox.length; i += 2) {
    // length === 4
    let name = [
      {
        key: `wf${num}AM`,
        value: getWeatherIconName(
          +mergeBox[i][0].fcstValue,
          +mergeBox[i][1].fcstValue
        ),
        origin: [+mergeBox[i][0].fcstValue, +mergeBox[i][1].fcstValue],
      },
      {
        key: `wf${num}PM`,
        value: getWeatherIconName(
          +mergeBox[i + 1][0].fcstValue,
          +mergeBox[i + 1][1].fcstValue
        ),
        origin: [+mergeBox[i + 1][0].fcstValue, +mergeBox[i + 1][1].fcstValue],
      },
    ];
    value.push(name);
    num++;
  }
  return value;
};

export default mergeWeatherTwoDays;
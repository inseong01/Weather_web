function filteringVilageFcstDaily(vilageFcstDaily, currentDate, currentTime) {
  const beforeArr = [];
  const weatherState = [];
  const otherDataArr = [];
  for (let i = 0; i < vilageFcstDaily.length; i++) { // 단기예보 데이터 분류
    const fcstDate = vilageFcstDaily[i].fcstDate;
    const fcstTime = vilageFcstDaily[i].fcstDate;

    if (currentDate === fcstDate && fcstTime < currentTime) continue;
    if (vilageFcstDaily[i].category.match(/TMP|TMX|TMN/)) {
      beforeArr.push(vilageFcstDaily[i]);
    } else if (vilageFcstDaily[i].category.match(/SKY|PTY/)) {
      weatherState.push(vilageFcstDaily[i]);
    } else if (vilageFcstDaily[i].category === 'REH') {
      otherDataArr.push(vilageFcstDaily[i]);
    }
  }
  return [beforeArr, weatherState, otherDataArr];
}

export default filteringVilageFcstDaily
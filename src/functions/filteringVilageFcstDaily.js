function filteringVilageFcstDaily(vilageFcstDaily, currentDate, currentTime) {
  let beforeArr = [];
  let weatherState = [];
  let otherDataArr = [];
  for (let i = 0; i < vilageFcstDaily.length; i++) { // 단기예보 데이터 분류
    // console.log('vilageFcstDaily', vilageFcstDaily)
    if (
      currentDate == vilageFcstDaily[i].fcstDate 
      && vilageFcstDaily[i].fcstTime < currentTime
    ) continue;
    if (
      vilageFcstDaily[i].category === 'TMP' || 
      vilageFcstDaily[i].category === 'TMX' || 
      vilageFcstDaily[i].category === 'TMN' 
    ) {
      beforeArr.push(vilageFcstDaily[i]);
    } else if (
      vilageFcstDaily[i].category === "SKY" ||
      vilageFcstDaily[i].category === "PTY"
    ) {
      weatherState.push(vilageFcstDaily[i]);
    } else if (vilageFcstDaily[i].category === 'REH') {
      otherDataArr.push(vilageFcstDaily[i]);
    }
  }
  return [beforeArr, weatherState, otherDataArr];
}

export default filteringVilageFcstDaily
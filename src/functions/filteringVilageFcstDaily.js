function filteringVilageFcstDaily(vilageFcstDaily, currentDate, currentTime) {
  const filteredVilage = {
    beforeArr: [],
    weatherState: {
      number: 0,
      SKY: [],
      PTY: []
    },
    otherDataArr: [],
  }
  for (let i = 0; i < vilageFcstDaily.length; i++) { // 단기예보 데이터 분류
    const fcstDate = vilageFcstDaily[i].fcstDate;
    const fcstTime = vilageFcstDaily[i].fcstDate;

    if (currentDate === fcstDate && fcstTime < currentTime) continue;
    if (vilageFcstDaily[i].category.match(/TMP|TMX|TMN/)) {
      filteredVilage.beforeArr.push(vilageFcstDaily[i]);
    } else if (vilageFcstDaily[i].category.match(/SKY/)) {
      filteredVilage.weatherState.SKY.push(vilageFcstDaily[i]);
    } else if (vilageFcstDaily[i].category.match(/PTY/)) {
      filteredVilage.weatherState.PTY.push(vilageFcstDaily[i]);
    } else if (vilageFcstDaily[i].category === 'REH') {
      filteredVilage.otherDataArr.push(vilageFcstDaily[i]);
    }
  }
  filteredVilage.weatherState.number = filteredVilage.weatherState.SKY.length;

  return filteredVilage;
}

export default filteringVilageFcstDaily
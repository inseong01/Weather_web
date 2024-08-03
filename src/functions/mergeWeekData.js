const mergeWeekData = (data, currentDate) => {
  let num = 0;
  let weekArr = [];
  const threeDaysBefore = [...data.before].filter(item => item.fcstDate !== currentDate).filter((item) =>
    item.category === 'TMN' || item.category === 'TMX'
  )

  // 객체 변환
  const resultArray = data.threeDaysLater.map(item =>
    Object.entries(item).map(([key, value]) => ({ key, value }))
  ).flat()
  // console.log('data', data)
  threeDaysBefore.map(item => {
    if (item.category === 'TMN') {
      item['key'] = `taMin${num}`;
      item[`value`] = item.fcstValue;
    } else if (item.category === 'TMX') {
      item[`key`] = `taMax${num}`;
      item[`value`] = item.fcstValue;
      num++
    }
    weekArr.push(item)
  })
  // 정렬
  let arr = weekArr.concat(resultArray).filter(value =>
    /ta(Max|Min)\d*$/.test(value.key)
  );
  // console.log('arr', arr)

  // 합병
  let collectTemp = [];
  // console.log('arr', arr)
  for (let i = 0; i < arr.length; i += 2) { // 오류나면 arr의 fcstDate 확인(16시 전 i=1, 이후 i=0, ???)
    let mergeArr = [
      Number(arr[i].value).toFixed(0),
      Number(arr[i + 1].value).toFixed(0),
    ];
    // console.log('min', Number(arr[i].value).toFixed(0))
    // console.log('max', Number(arr[i+1].value).toFixed(0))
    collectTemp.push(mergeArr) // [min, max]
  }
  // console.log('collectTemp', collectTemp)
  return collectTemp.slice(0, 6);
}

export default mergeWeekData;
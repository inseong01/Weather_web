function pm10StandardCalculator(value) {
  // 수치값 기준 pm10 >> 0-30, 31-80, 81-150, 151- 
  switch (true) {
    case 0 <= value || value >= 30:
      return '좋음';
    case 31 <= value || value >= 80:
      return '보통';
    case 81 <= value || value >= 150:
      return '나쁨';
    case 151 <= value:
      return '매우나쁨';
  }
}

export default pm10StandardCalculator
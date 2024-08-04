function pm25StandardCalculator(value) {
  // 수치값 기준 pm25 >> 0-15, 16-35, 36-75, 76-
  switch (true) {
    case 0 <= value || value >= 15:
      return '좋음';
    case 16 <= value || value >= 35:
      return '보통';
    case 36 <= value || value >= 75:
      return '나쁨';
    case 76 <= value:
      return '매우나쁨';
  }
}

export default pm25StandardCalculator
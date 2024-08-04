function o3StandardCalculator(value) {
  // 수치값 기준 pm25 >> 0-15, 16-35, 36-75, 76-
  switch (true) {
    case 0.12 > value:
      return '좋음';
    case 0.12 <= value || value > 0.3:
      return '보통';
    case 0.3 <= value || value > 0.5:
      return '나쁨';
    case 0.5 <= value:
      return '매우나쁨';
  }
}

export default o3StandardCalculator
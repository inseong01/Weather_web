import o3StandardCalculator from "./o3StandardCalculator";
import pm10StandardCalculator from "./pm10StandardCalculator";
import pm25StandardCalculator from "./pm25StandardCalculator";

function AirconditionCalculator(key, data) {
  switch (key) {
    case "pm10Grade":
      return pm10StandardCalculator(data[`pm10Value`]);
    case "pm25Grade":
      return pm25StandardCalculator(data[`pm25Value`]);
    case "o3Grade":
      return o3StandardCalculator(data[`o3Value`]);
    default:
      console.error(`${key} error`)
      return;
  }
}

export default AirconditionCalculator
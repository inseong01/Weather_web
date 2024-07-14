import o3StandardCalculator from "./o3StandardCalculator";
import pm10StandardCalculator from "./pm10StandardCalculator";
import pm25StandardCalculator from "./pm25StandardCalculator";

function AirconditionCalculator(key, data) {
  switch (key) {
    case "pm10" :
      pm10StandardCalculator(data[`${key}Value`]);
      break;
    case "pm25" :
      pm25StandardCalculator(data[`${key}Value`]);
      break;
    default :
      o3StandardCalculator(data[`${key}Value`]);
  }
}

export default AirconditionCalculator
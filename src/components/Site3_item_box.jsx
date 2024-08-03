/* eslint-disable */
import PropTypes from "prop-types";

const dayArr = ["일", "월", "화", "수", "목", "금", "토"];

let num = 1;
let dayNumber = new Date().getDay();

function calculate7Days() {
  let dayIdx = dayNumber + num;
  if (dayIdx > 6) {
    dayIdx = dayNumber + num - 7;
  }
  if (num >= 7) {
    num = 0;
  }
  num++;
  return dayArr[dayIdx];
}

export default function Site3_item_box({ data, idx, icons }) {
  const day = calculate7Days();
  const amIcon = icons[idx][0].value;
  const pmIcon = icons[idx][1].value;

  return (
    <>
      <div className="item_box">
        <p className="day">{day}</p>
        <div className="dayInfo_wrap">
          <div
            className="icon"
            style={{ backgroundImage: amIcon }}
          ></div>
          <div
            className="icon"
            style={{ backgroundImage: pmIcon }}
          ></div>
          <div className="lowTemp">{data[0]}°</div>
          <div className="highTemp">{data[1]}°</div>
        </div>
      </div>
    </>
  );
}

Site3_item_box.propTypes = {
  data: PropTypes.array,
  idx: PropTypes.number,
  icons: PropTypes.array,
};

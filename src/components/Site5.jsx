import Site5_item_box_wrap from "./Site5_item_box_wrap";
import PropTypes from "prop-types";

const getFilterData = (data, currentTime) => {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].fcstTime !== currentTime) continue;
    if (
      data[i].category === "강수형태" ||
      data[i].category === "하늘상태" ||
      data[i].category === "기온"
    )
      continue;
    arr.push(data[i]);
  }
  return arr;
};

export default function Site5({ data, currentTime }) {
  // 단기예보 = [{...}, {...} ...]
  const filteredDataArr = getFilterData(data, currentTime);

  return (
    <>
      <div className="site5">
        <div className="box_wrap">
          {filteredDataArr.map((item) => (
            <Site5_item_box_wrap
              key={item.category}
              data={item}
            />
          ))}
        </div>
      </div>
    </>
  );
}

Site5.propTypes = {
  data: PropTypes.array,
  currentTime: PropTypes.string,
};

import { useState } from "react";
import Site4_item_box from "./Site4_item_box";

/* eslint-disable */
export default function Site4({ data, stationNotFound }) {
  const [stationError, setStationError] = useState(false);
  return (
    <>
      <div className="site4" >
        <div className="item_box_wrap">
          {
            stationNotFound ? <p>주변 측정소 없음</p> :
            stationError ? <p>측정소 통신장애</p> :
            <Site4_item_box data={data} setStationError={setStationError} />
          }
        </div>
      </div>
    </>
  )
}
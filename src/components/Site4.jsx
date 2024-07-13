import Site4_item_box from "./Site4_item_box";

/* eslint-disable */
export default function Site4({ data, airConditionError }) {
  
  return (
    <>
      <div className="site4" >
        <div className="item_box_wrap">
          {
            airConditionError ? <p>주변 측정소 없음</p> :
            <Site4_item_box data={data} />
          }
        </div>
      </div>
    </>
  )
}
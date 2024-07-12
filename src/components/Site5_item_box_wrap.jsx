/* eslint-disable */
import { useEffect, useRef, useState } from "react"

const addUnitToValue = (category, value) => { // 단위 삽입
  let addedValue = value;
  switch (true) {
    case category === "풍속" || category === "동서바람성분" || category === "남북바람성분" :
      addedValue += 'm/s';
      break;
    case category === "1시간 강수량" :
      addedValue;
      break;
    case category === "습도" :
      addedValue += '%'
      break;
    case category === "낙뢰" :
      addedValue += 'kA'
      break;
    case category === "풍향" :
      addedValue += 'deg'
      break;
    default :
      console.error('addUnitToValue error')
  }
  return addedValue;
}
const infoAboutCategoty = (category) => {
  let info = "";
  switch (true) {
    case category === "낙뢰" :
      info = "kA는 단위 면적당 전류의 양을 나타내는 물리량. 이 값이 클수록 해당 면적에서 더 많은 전류가 흐르고 있다는 것을 의미";
      break;
    case category === "1시간 강수량" :
      info = "1mm 미만 : 빗소리가 거의 들리지 않음, 2~5mm: 보통의 비, 30mm 이상: 호우특보";
      break;
    case category === "습도" :
      info = "쾌적한 습도는 40~60%. 40% 이하가 되면 피부 건조를 느낌. 반대로 60% 이상이 되면 진드기나 곰팡이 발생";
      break;
    case category === "동서바람성분" :
      info = "바람이 동쪽에서 서쪽으로, 또는 그 반대 방향으로 얼마나 강하게 불고 있는지 나타냄. 값이 음수이면 서쪽에서 동쪽으로 불고 있음";
      break;
    case category === "남북바람성분" :
      info = "바람이 남쪽에서 북쪽으로, 또는 그 반대 방향으로 얼마나 강하게 불고 있는지 나타냄. 값이 음수이면 북쪽에서 남쪽으로 불고 있음";
      break;
    case category === "풍향" :
      info = "0도(또는 360도)는 북풍, 90도는 동풍, 180도는 남풍, 그리고 270도는 서풍을 나타냄.";
      break;
    case category === "풍속" :
      info = "10m/s 이상 타워크레인 작업중지, 14m/s 이상 강풍주의, 21m/s 이상 강풍경보, 33m/s 이상 태풍";
      break;

  }
  return info;
}


export default function Site5_item_box_wrap({ data }) { // [[...], [...], ...]
  const [value, setValue] = useState('');
  const [hover, setHover] = useState(false);
  const category = useRef(infoAboutCategoty(data.category));
  // category 별 설명 삽입
  useEffect(() => {
    if (!data) return;
    let value = addUnitToValue(data.category, data.fcstValue);
    setValue(value)
  }, [data])

  const onClickInput = () => {
    if (hover) return setHover(false);
    setHover(true);
  }
  const onMouseLeaveInput = () => {
    setHover(false);
  }

  return (
    <>
      <div className="item_box_wrap" onMouseLeave={onMouseLeaveInput} >
          <div className="item_box">
            <div className="title_wrap">
              <p className="title">{data.category}</p>
              <div className="info_box" 
                onClick={onClickInput}
              >i</div>
              <div className={`info ${hover ? 'hover' : ''}`}>{category.current}</div>
            </div>
            <div className="value">{value}</div>
          </div>
        </div>
    </>
  )
}
function AppMsg() {
  const u002F = `\u{002F}`;
  const u002A = `\u{002A}`;
  return (
    <>
      <div className='msg'>
        위치 허용을 누르면 현재 위치 날씨를 알려드려요
        <div className='sub_msg'>{u002F} {u002A} 기본값 : 개발자 위치 {u002A} {u002F}</div>
      </div>
    </>
  )
}

export default AppMsg

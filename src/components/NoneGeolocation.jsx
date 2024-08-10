import PropTypes from 'prop-types';

function NoneGeolocation({ pageError }) {
  const { apiError, noneGeolocationError } = pageError;

  return (
    <>
      {noneGeolocationError ? (
        <div className="appMsg">
          <div className="msg">등록되지 않은 지역입니다.</div>
          <div className="sub_msg">기본위치로 설정됩니다. 조금만 기다려주세요.</div>
        </div>
      ) : (
        <p className="msg">{apiError ? `API 문제` : `응답시간 초과`}, 새로고침을 눌러주세요</p>
      )}
    </>
  );
}

NoneGeolocation.propTypes = {
  pageError: PropTypes.object,
};

export default NoneGeolocation;

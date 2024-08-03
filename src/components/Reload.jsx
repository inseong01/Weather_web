import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function reloadPopup(setReload, loading) {
  if (loading === false) return;
  setReload(true);
}

function Reload({ loading, pageError }) {
  const [reload, setReload] = useState(false);

  // 응답시간
  useEffect(() => {
    const timeOut = setTimeout(reloadPopup, 6500, setReload, loading);
    if (loading === false) {
      clearTimeout(timeOut);
    }
  }, [loading]);

  return (
    <>
      {reload ? (
        <p className="msg">
          {pageError ? `API 문제` : `응답시간 초과`}, 새로고침을 눌러주세요
        </p>
      ) : (
        <p className="msg">날씨 정보 가져오는 중..</p>
      )}
    </>
  );
}

Reload.propTypes = {
  loading: PropTypes.bool,
  pageError: PropTypes.bool,
};

export default Reload;

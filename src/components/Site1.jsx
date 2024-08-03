import PropTypes from "prop-types";
import "./site.css";

export default function Site1({ data, geolocationRes }) {
  const { local, temp, sky, highTemp, lowTemp } = data;

  let title = geolocationRes.includes("error") ? "기본 위치" : "나의 위치";
  let localName = local.replace(/포함/, "");

  return (
    <>
      <div
        className="first_site"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="title">{title}</div>
        <div className="local">{localName}</div>
        <div className="temp">{temp}°</div>
        <div className="tempSummary">{sky}</div>
        <div className="highLowtemp">
          최고: {highTemp}° 최저: {lowTemp}°
        </div>
      </div>
    </>
  );
}

Site1.propTypes = {
  data: PropTypes.object,
  geolocationRes: PropTypes.string,
};

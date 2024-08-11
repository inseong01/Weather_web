const getStaionName_API = async (API_KEY, data) => {
  // URL
  const url = 'https://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList';

  // 쿼리스트링
  const setParam = {};
  setParam['serviceKey'] = API_KEY;
  setParam['returnType'] = 'json'
  setParam['tmX'] = data.tmX;
  setParam['tmY'] = data.tmY;
  setParam['ver'] = ``;

  let queryString = Object.keys(setParam).reduce((prev, curr) => prev + curr + '=' + setParam[curr] + '&', '?');
  queryString = queryString.substring(0, queryString.length - 1);

  // fetch
  let response;
  try {
    response = await fetch(url + queryString);
    const data = await response.json();
    console.log(data.response.header);

    if (data.response.header.resultCode !== '00') {
      // 에러 문구 'Error Code (숫자코드), (오류내용)'
      throw new Error(`Code ${data.response.header.resultCode}, ${data.response.header.resultMsg}`);
    }
    return data;
  } catch (err) {
    console.error('getStaionName_API.js', err);
  }


  // ------------ 전 -------------


  // return new Promise((resolev, reject) => {
  //   var xhr = new XMLHttpRequest();
  //   var url = 'https://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList'; /*URL*/
  //   var queryParams = '?' + encodeURIComponent('serviceKey') + '='+`${key}`; /*Service Key*/
  //   queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /**/
  //   queryParams += '&' + encodeURIComponent('tmX') + '=' + encodeURIComponent(data.tmX); /**/
  //   queryParams += '&' + encodeURIComponent('tmY') + '=' + encodeURIComponent(data.tmY); /**/
  //   queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent(''); /**/

  //   xhr.open('GET', url + queryParams, true);  // 비동기 요청을 위해 true로 설정

  //   xhr.onreadystatechange = function () { //send() 이후 작동
  //     if (this.readyState == 4) {
  //       if (this.status === 200) {
  //         console.log('Status: stationName', this.status);
  //         sessionStorage.setItem('stationName', this.responseText);
  //         resolev(this.responseText);
  //       } else {
  //         // 요청이 실패했을 때 오류 처리
  //         console.error('Request failed. Status:', this.status);
  //         console.error('Response:', this.responseText);
  //         reject(0);
  //       }
  //     }
  //   }
  //   xhr.send(); // Http 전송 역할
  // })
}
export default getStaionName_API

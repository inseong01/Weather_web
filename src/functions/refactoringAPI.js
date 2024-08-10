import getFirstAPI from "./first_api";

// // 쿼리스트링
// const setParam = {};
// setParam['serviceKey'] = 'dviGmZuftX3h7VNSS2UVxZ1M7AfjXEQRTTQVoMhes28TPZETMMXENDJ%2FT60N5MkIHuZGTVGLZqYBfbZTwGUPUw%3D%3D';
// setParam['pageNo'] = 1
// setParam['numOfRows'] = 1000
// setParam['dataType'] = 'JSON'
// setParam['base_date'] = '20240810';
// setParam['base_time'] = `0600`;
// setParam['nx'] = `60`;
// setParam['ny'] = `127`; // 종로구

// let queryString = Object.keys(setParam).reduce((prev, curr) => prev + curr + '=' + setParam[curr] + '&', '?');
// queryString = queryString.substring(0, queryString.length - 1);

// // fetch
// fetch(url + queryString)
//   .then(res => {
//     if (res.status === 200) {
//       // 응답본문 읽음
//       return res.json(); 
//     } else {
//       // 요청이 실패했을 때 오류 처리
//       console.error('Request failed. Status:', res.status);
//       console.error('Response:', res.responseText);
//     }
//   })
//   .then(res => {
//     sessionStorage.setItem('res1', res);
//     return res;
//   })
//   .catch((error) => {
//     throw error;
//   })

getFirstAPI()
  .then(res => {
    const { response } = res;
    if (response.header.resultCode !== '00') {
      // 에러 문구 'Error Code (숫자코드), (오류내용)'
      throw new Error(`Code ${response.header.resultCode}, ${response.header.resultMsg}`);
    }
    // res 결과 반환
  })
  .catch(err => {
    console.error('getFirstAPI', err);
  })
# 날씨예보 (+React)

공공데이터포털 기상청\_단기예보/중기예보, 에어코리아 API 활용

## 링크

https://weather-web-drab.vercel.app/

<br />

# 1. 작업일자

<details>
<summary>펼치기</summary>

08.10. - 코드 리팩토링, 오류 수정 : 등록되지 않은 지역은 기본 위치로 재검색

08.04. - 코드 리팩토링, 오류 개선: Site4~5 (+item_box, item_box_wrap).jsx

08.03. - 코드 리팩토링: App, Home, Reload, Site1~3 (+item_box).jsx

07.17. - API 미작동 오류 수정, 공유 링크 섬네일 추가

07.16. - 모바일/태블릿 반응형 사이즈 추가

07.15. - .xlsx, .json으로 변경

07.14. - API 입력값 예외처리

07.13. - geolocation API 에러 수정, API 미응답 출력화면 예외처리

07.12. - 새벽 시간 예외처리/AOS 적용, 대기화면 추가

07.11. - 날씨 업데이트 시간 주기 세분화

07.10. - 현재위치 및 지역코드 추출 기능 추가

07.09. - 주요 기상 외 항목 구현, 리디자인

07.08. - 날씨 아이콘 구현

07.07. - 미세먼지 수치, 그래프 애니메이션 구현

07.06. - 미세먼지 상태 구현

07.05. - 주간 예보 구현

07.04. - 시간 별 예보 구현

07.03. - 현재 날씨 구현

07.02. - API 인증키 발급, 디자인 시안 제작

</details>

<br />

## 개선사항

- 서버로 API_KEY 올리기
- 에러 로그 전달하기(개발자용, 서버용)
- 새벽시간 주간날씨, 최고/저온도 나오지 않음
- 가끔 주간날씨 나오지 않은 채로 렌더링
- vilageFcst_lamc_parameter_map.json 일부 지역 없음 : 야당동

<br />

# 2. 느낀점

## 08.03.

### 코드 왜이리 지저분한가

- #### 코드 리팩토링

  : 지금까지 제작한 프로젝트 중에서 함수가 제일 많았음. 연산이 많아서 그만큼 설계도 복잡. 프로젝트를 다시 건드리기 꺼렸지만 클린 코드 강좌를 듣고 리팩토링 시도.

  코드를 다시 보는데 너무 못 짠 코드였음. 그나마 처음에 함수를 하나하나씩 분리 작성해서 수정하는데 수월했음. 필요없는 `useEffect`, `useState`를 줄이고 코드를 간략하게 만듦. 컴포넌트가 깨끗해지는 걸 보고 무거웠던 마음이 가벼워졌음. 다음에는 연산을 잘 분리해서 설계해보자.

## 07.15.

### 왜 생각하지 못 했나

- #### 엑셀파일, json 파일로 변환
  : 엑셀파일을 직접 업로드 하고 불러올 때 파일은 `JSON.parse()` 되는데 애초에 엑셀 파일을 `.json`으로 변환하면 되었음. `chatGPT`가 몇 천 개의 정보를 감당하지 못해도 변환 사이트는 가능했음. 10분도 안 걸리고 코드 수정. 이제 위치값만 받으면 작동됨.

### 서버 필요한 또 다른 이유

- #### API_KEY 감추기

  : `.env`, `.gitignore` 파일에 `API` 키를 숨겨도 배포했을 때는 확인할 수 있음. 파일 상에서 확인할 수 없는 것. 빌드할 때 사용된 파일이 코드화 되어서 웹에서 확인 가능.

  감추기 위해서 서버에 `API` 키를 올려야 됨. 서버는 올바른 `API` 링크 접근 요청을 받았을 때만 키를 적용. 그래야 `개발자도구`를 통해 키를 확인할 수 없게 됨. 서버 생성은 나중에 할 예정

## 07.14.

### ChatGPT의 대답은 검증 필요

- #### 강원도 영서/영동 지역 분류

  : `chatGPT`에게 영서/영동 지역을 물어봄. 처음에 분류한 지역과 맞지 않았음. 정확한 정보를 얻기 위해 인터넷에서 찾아봄. 나무위키, 블로그 여러 페이지를 훑어봄. 해당 지역이 영동이거나 영서이거나 다 달랐음. 기상청, 강원도 같은 정부사이트를 찾아봤지만 지역 분류 정보는 찾을 수 없었음.

  직접 태백산맥 기준으로 나눠 지역 분류함. 매번 느끼지만 `chatGPT`의 정보는 한 번 더 검수해야 됨.

### Error: Objects are not valid as a React child

- #### 미세먼지 관측소 에러

  : 관측소 API에서 응답반응이 정상. 하지만 값이 null인 것을 발견. 그래서 `.map()`으로 컴포넌트를 생성하지 못했음.

  두 상황으로 나누어 따로 예외처리.

  1. `통신장애`, 관측소 통신장애 메시지 화면출력.
  2. `해당먼지등급: null`, 해당먼지측정값으로 등급 계산함수 실행.

### public, src 폴더 차이

- #### img를 public 폴더에 넣으면

  : `../../` 상대경로를 찾는 수고를 안 해도 됨. public은 절대경로를 사용해서 `/폴더명`으로 접근가능. 다만 에러를 컴파일에서 찾지 못함. `vercel`로 프로젝트를 배포했을 때 기상상태 아이콘 404 오류 발생. 간단한 경로 오류여서 빠르게 수정.

  아직까지 `public`, `src`의 차이를 느끼지 못했지만 동적경로나 임의 서버 데이터(엑셀) 같은 경우는 public에 담는 게 나은 거 같음.

## 07.13.

### try-catch 언제 사용하나

- #### 예외처리

  : 예외처리라는 것은 함수나 반복문의 조건을 처리할 때 뿐만 아니라 컴포넌트 출력에서도 사용될 수 있음. 처음 `try-catch`문을 접했을 때 코드 오류를 찾을 때만 사용할 거 같아서 많이 쓰일 거 같지 않았음.

  하지만 API 응답이나 사용자 입력값에서 오류나서 다른 화면을 출력하고 싶을 때 `try-catch`문이 유용했음. 코드를 덧붙이지 않고 오류가 발생했을 때만 작동하는 구역을 만들 수 있었음. 비동기에서는 `.catch(() => {})` 간단한 형식으로 표현 가능. 문법은 사용할 수 있는 방식이 다양했음. 많이 알수록 다양한 방법을 구사할 수 있도록 공부해야겠음.

### geolocation API 오류

- #### 위치값 미반영

  : 처음에 엑셀 파일이 없어서 작동되지 않는 줄 알았음. 하지만 localhost 서버에서는 파일이 올라가 있어도 작동되지 않았음.

  ```
  let location =
    navigator.geolocation.getCurrentPosition(success, error);
  ```

  알고보니 `location` 변수는 `success`, `error` 함수 값을 반환하지 않았음. 이 함수 파일을 App.jsx로 가져와서 `success`, `error` 함수 안에 `setstate`를 설정하여 값을 받음.

## 07.12.

### 종이와 펜은 항상 옆에

- #### 생각 정리

  : `Site2`, `Site3` 예외처리를 구현하기 위해 바로 코드를 실행하지 않고 종이에 접근 방식을 적음. 어떤 요소가 필요하고 함수가 어떻게 처리되어야 하는지 정리. 00~06시까지 예외처리를 해야됐고 각각의 컴포넌트에서 필요한 조건을 도출.

  정리된 종이를 보니 생각보다 해결 방법은 간단했음. 그후 코딩으로 넘어가서 코드 작성. 전날 트래픽 횟수 초과를 경험해봐서 최소한의 시도로 접근. 값이 잘 출력되었음. 맞는 값인지 `console.log()`로 해당 데이터 `baseDate`를 확인. 모든 값 정상. 감정소모 없이 잘 마무리 됨.

## 07.11.

### 정규식 알아둬야 하는 이유

- #### 문자열 처리 수월
  : 주소를 변경하기 위해서 지금까지 정규식을 사용해왔음. 이번 프로젝트 때 처음 사용해보는데 추가적인 코드를 작성하지 않고 바로 원하는 값만 도출할 수 있어서 편함.

### 원인을 알면 방법은 간단

- #### 리렌더링 방지 문제

  : 미세먼지 관측소 렌더링이 2번 발생. 해결하기 위해 다른 변수를 추가해서 해결할지 생각해봄. 일단 문제 원인이 무엇인지 알아내기 위해 해당 부분을 확인.

  문제가 일어나는 `useEffect`의 `deps`를 `mainSec(useState)`로 적용되어 있었음. 알고보니 각각 다른 `useEffect`에서 `setMainSec`가 작동 중이어서 여러 번 반복되는 것이었음. 조건문에 `mainSec`의 프로퍼티의 유무 조건을 걸어서 해결

  `예) if ( ... || mainSec.highTemp) return;`

## 07.10.

### 서버 필요 이유

- #### 대용량 데이터 추출

  : 현재위치를 알기 위해서는 위경도 데이터가 필요했음. 엑셀파일로 되어 있어서 GPT에게 배열로 변환을 요청했지만 데이터가 많은 이유 때문인지 원활하게 작동되지 않았음. 엑셀 파일 자체를 데이터로 사용할 수 있는지 알아봤음.

  객체로 변환해서 사용할 수 있지만 브라우저 보안 때문에 페이지가 처음 실행될 때 엑셀 파일을 불러오지 못함을 알게 됨. 바로 불러오기 위해서는 서버로 파일을 올려야 됐음. 그래서 번거롭지만 페이지가 열리면 사용자가 파일을 직접 첨부해서 localStorage에 보관.

  ~~node.js를 배우면 localStorage에서 서버로 파일 이전 예정~~

### Https 전용 API

- #### Geolocation API

  : 현재 위치를 불러오기 위해 `IP Geolocation API`를 알아봄. 도시 정확도가 브라우저 `Geolocation API`보다 좋지 않았음. 그나마 나은 `Geolocation API`를 사용해서 위경도 추출.

  Https에서만 사용 가능해서 localhost에서 값을 받을 수 없었음. 아무 웹 개발자 창에서 `getcurrentposition()` 출력값 확인. 생성한 함수 `console.log()`로 출력 형태 확인하고 주석처리.

  임의로 지정한 경도, 위도값으로 위치값 사용중.

## 07.09.

### API 응답값 보존 이유

- #### state 재사용

  : 처음 API 응답메시지를 받을 때 조건으로 걸러진 값들을 초기 값으로 저장하지 않았음. 원본 메시지를 저장하고 그 다음에 조건으로 값을 걸렀음. 덕분에 조건이 생기면 조건만 추가해서 새로운 값을 전달받을 수 있었음. 그렇게 처리하지 않았다면 함수를 분리하고 원본 데이터를 따로 새로운 변수에 할당해야 되었음. 재사용은 아주 좋은 시간절약 수단.

### 개발 중 생긴 습관

- #### 입력값 옆에 출력값 주석 처리

  : 날이 지나서 코드를 작성할 때 입력값이 무엇인지 기억나지 않을 때가 있음. `console.log()`로 확인할 수 있지만 그 전에 미리 어떤 형태로 출력되는지 작성해 놓으면 참고하기 좋았음.

  이 변수가 어떤 값을 가지고 있는지 부모의 부모의 부모를 찾는 경우도 있는데 그 또한 주석으로 간단하게 적어놓으면 편리했음.

  `예) // 단기예보 = [{...}, {...} ...]`

## 07.08.

### 날씨 상태 아이콘 출력한 방법

- #### 코드 함수 재사용

  : 강수형태, 하늘상태를 기준으로 아이콘을 불러오기 위해 숫자 코드 입력값을 아이콘 이미지 파일명과 일치하는 문자열로 출력.

  시간 단위와 일별 단위에서도 아이콘을 출력해야 돼서 함수를 따로 분리하여 재사용. 아이콘을 어떻게 분류할지 초기 함수 설계에서 시간 들였지만 이후로 함수 적용할 때는 수월했음.

### 주간 날씨 상태 처리에서 직면한 문제

- #### 함수, 입출력 추가/제거의 중요성

  : 단기예보 API에서 1\~2일차, 중기예보 API에서 3\~7일차 오전/오후 날씨 상태를 불러와야 했음. 주간 예보 구현할 때와 같은 문제. 여기서 고민되었던 건 주간 최고/저온도 배열에 같이 묶어서 값을 전달할 지, 따로 나눠서 전달할지 고민됐음. 어차피 데이터를 다시 분리해야 돼서 따로 보내기로 결정. 새로운 함수를 만들면서 문득 원래 함수를 유동적으로 잘 만들었다면 새로운 데이터를 출력하는데 쉽지 않았을까 의문이 들었음.  
  <br/>

- #### 중기예보 API 출력값 문제

  : 단기예보 API 오전/오후 날씨 상태 값이 숫자였지만 중기예보 날씨 상태값은 문장이었음. 설명 문서를 봐도 코드 기준 값처럼 참고자료는 없고 예시 문장만 있었음.

  `예) { wf3Pm: "구름많고 소나기" }`

  예시 문장 외의 상황을 어떻게 구현할지 당황스러웠음. 문장 끝이 단어로 끝나는 걸 보고 마지막 단어 기준으로 날씨 상태 판별. 에러 나면 출력값 확인하면서 값 수정해야 됨.

## 07.07.

### undefined 에러 처리 문제

- #### 컴포넌트 return()

  : 리액트에서 초기값이 undefined일 때, 조건을 붙여서 값이 없을 때는 null로 출력을 감추어야 한다. 그렇지 않으면 첫 렌더링 될 때 오류가 발생돼서 화면이 보이지 않게 된다.  
  <br/>

### API 응답 메시지 처리 문제

- #### 응답 데이터 중복

  : 미세먼지 상태 현황 글자 값을("좋음", "나쁨" ...) 가져오려고 API를 불러왔지만 미세먼지 수치값을 불러오는 API에서도 비슷한 값(숫자)을 불러오고 있었음.

  데이터 중복을 줄이기 위해 전날에 만들었던 함수는 새로운 API가 같은 값을 출력하기 전까지 주석처리. 새로운 함수가 수치값과 상태 값을 출력하도록 만듦. 코딩하기 전, API의 응답메시지와 초기 기획 준비가 중요함.  
  <br/>

## 07.05.

### 데이터 가공 능력 중요한 이유

- #### 일간, 주간 예보 데이터 병합

  : API의 출력값이 서로 달랐음. 하나는 배열에 여러 개의 값이 `[{...}, {...}, {...} ...]`, 다른 하나는 `[{...}]` 한 배열에 모든 값이 들어가 있었음. 한 API에서 필요한 주간(1,2일차) 데이터만 얻어야 하는 상황에서 두 API 값을 합쳐야 했음.

  값이 모여 있던 배열은 Object.entries로 여러 값으로 배열화. 두 개의 API 배열을 concat으로 합치고 거기서 필요한 값만 .filter로 거르고 주간 최고/최저온도를 출력.

  API 출력값이 이상해서 데이터 처리하는데 많은 시간 소요. 가공 능력도 중요하면서도 API 출력값에 따라 작업능률이 달랐음. <br/>

### 알고리즘 능력 필요 이유

- #### 데이터 가공

  : 요일을 연속으로 출력하는 것에서 알고리즘 문제를 푸는 듯 함. 알고리즘과 개발 능력은 어느정도 관계 있었음. 알고리즘을 금방 파악하면 문제 접근과 해결 시간 단축됨. 삽질하는 시간 감소.  
  <br/>

## 07.04.

### 데이터 검색 잘 하는 방법

- #### 최고온도 불러오기
  : 기상청이 특정시간에만 제공하는 것을 몰랐음. 설명서 잘 읽기.

### 데이터 분산 어려웠던 점

- #### 초단기, 단기예보 데이터
  : 예보마다 불러오는 데이터 종류가 달라서 한 번에 가져오는 것이 까다로웠음

<br />

# 3. 저작권

<p style=font-size:11px>"본 저작물은 '공공데이터포털'에서 공공누리 제1유형으로 개방한 '기상청_단기예보 ((구)_동네예보) 조회서비스', '기상청_중기예보 조회서비스', '한국환경공단_에어코리아_대기오염정보'을 이용하였으며, 해당 저작물은 '공공데이터포털'에서 무료로 다운받으실 수 있습니다."</p>

#

<a href="https://www.flaticon.com/kr/free-icons/" title=" 아이콘"> 아이콘 제작자: 90Box - Flaticon</a>  
<a href="https://www.flaticon.com/kr/free-icons/" title=" 아이콘"> 아이콘 제작자: 90Box - Flaticon</a>  
<a href="https://www.flaticon.com/kr/free-icons/" title=" 아이콘"> 아이콘 제작자: 90Box - Flaticon</a>  
<a href="https://www.flaticon.com/kr/free-icons/" title=" 아이콘"> 아이콘 제작자: 90Box - Flaticon</a>  
<a href="https://www.flaticon.com/kr/free-icons/" title=" 아이콘"> 아이콘 제작자: 90Box - Flaticon</a>  
<a href="https://www.flaticon.com/kr/free-icons/" title=" 아이콘"> 아이콘 제작자: 90Box - Flaticon</a>

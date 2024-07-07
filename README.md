# 날씨예보 (+React)

공공데이터포털 기상청_단기예보/중기예보, 에어코리아 API 활용    
<br />

# 작업일자   
07.07.  - 미세먼지 수치, 그래프 애니메이션 구현 

07.06. - 미세먼지 상태 구현  

07.05. - 주간 예보 구현
  
07.04. - 시간 별 예보 구현   

07.03. - 현재 날씨 구현

07.02.  - API 인증키 발급, 디자인 시안 제작   
<br />  

# 느낀점   
## 07.07.   
  1. undefined 에러 처리    
      - 컴포넌트 return()  
      : 리액트에서 초기값이 undefined일 때, 조건을 붙여서 값이 없을 때는 null로 출력을 감추어야 한다. 그렇지 않으면 첫 렌더링 될 때 오류가 발생돼서 화면이 보이지 않게 된다.    


  2. API 응답
      - 응답 데이터 중복      
	    : 미세먼지 상태 현황 글자 값을("좋음", "나쁨" ...) 가져오려고 API를 불러왔지만 미세먼지 수치값을 불러오는 API에서도 비슷한 값(숫자)을 불러오고 있었음.   
      데이터 중복을 줄이기 위해 전날에 만들었던 함수는 새로운 API가 같은 값을 출력하기 전까지 주석처리. 새로운 함수가 수치값과 상태 값을 출력하도록 만듦. 코딩하기 전, API의 응답메시지와 초기 기획 준비가 중요함.      

## 07.05.  
  1. 데이터 가공    
      - 일간, 주간 예보 데이터 병합    
      : API의 출력값이 서로 달랐음. 하나는 배열에 여러 개의 값이 [{...}, {...}, {...} ...], 다른 하나는 [{...}] 한 배열에 모든 값이 들어가 있었음. 한 API에서 필요한 주간(1,2일차) 데이터만 얻어야 하는 상황에서 두 API 값을 합쳐야 했음.   
      값이 모여 있던 배열은 Object.entries로 여러 값으로 배열화. 두 개의 API 배열을 concat으로 합치고 거기서 필요한 값만 .filter로 거르고 주간 최고/최저온도를 출력.       
      API 출력값이 이상해서 데이터 처리하는데 많은 시간 소요. 가공 능력도 중요하면서도 API 출력값에 따라 작업능률이 달랐음.		

  2. 알고리즘   
      - 데이터 가공      
      : 요일을 연속으로 출력하는 것에서 알고리즘 문제를 푸는 듯 함. 알고리즘과 개발 능력은 어느정도 관계 있었음. 알고리즘을 금방 파악하면 문제 접근과 해결 시간 단축됨. 삽질하는 시간 감소.    

## 07.04.  
  1. 데이터 검색
	  - 최고온도 불러오기   
    : 기상청이 특정시간에만 제공하는 것을 몰랐음. 설명서 잘 읽기.

  2. 데이터 분산
	  - 초단기, 단기예보 데이터   
    : 예보마다 불러오는 데이터 종류가 달라서 한  번에 가져오는 것이 까다로웠음


  
<br />  

##  
<p style=font-size:11px>"본 저작물은 '공공데이터포털'에서 공공누리 제1유형으로 개방한 '기상청_단기예보 ((구)_동네예보) 조회서비스', '기상청_중기예보 조회서비스', '한국환경공단_에어코리아_대기오염정보'을 이용하였으며, 해당 저작물은 '공공데이터포털'에서 무료로 다운받으실 수 있습니다."</p>
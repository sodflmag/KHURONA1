# About the Project

> ## ***"코로나로 지친 당신, 어디로 떠나볼래요?"✈️***

 KHURONA가<br>
 오랜 코로나 상황에 지친 당신에게 <br>
 안전정보와 함께 멋진 여행지를 추천해 드릴게요 ☑️✅✔️🗺️🧳✈️<br>

 - [ ] -> ***로고?***
 - [ ] -> ***목차***
 - [ ] -> ***내용 수정필요***

## 핵심기능

 - [ ] ***-> 페이지 캡쳐해서 페이지 설명이 있으면 좋을듯***

#### 코로나 정보 제공

- 대한민국 지도를 기반으로 직관적 위험도(확진자 수 기반) 제시

- 백신 접종 현황, 선별진료소 위치 검색

- 코로나 관련 수치 통계


#### 여행지 추천

- 원하는 지역을 선택하면 테마별  여행지 랜덤추천

#### 해외 정보 제공
- 해외 최신 안전 소식을 헤드라인으로 제공
- 출국 전 참고해야 할 외교부 최신 공지사항 제공

# Getting Started(Installation)

#### Development Environment

- OS: Windows 10 64 bit

- Compiler: VS Code

- Browser Support: chrome O(Latest), internet Explorer: X
***

 - [ ] -> ***컴파일러, 	브라우저 서포트 이미지?***
 - [ ] -> ***Architecture 이미지?***

***
#### Installation

 1. Git clone
 2. Dependent modules 설치
 3. API Key 발급 & 입력

<hr>

#### 1. Git clone
 
원하는 디렉토리에서 Git repo clone을 해 줍니다.

```
git clone http://khuhub.khu.ac.kr/corona_info_map/corona_info_map.git
```
<br>

#### 2. Dependent modules 설치
 
VS Code 터미널에서 dependency modules를 설치해줍니다.

    npm install
<br>

#### 3. API Key 발급 & 입력

![enter image description here](https://www.ekr.or.kr/images/sub/data_003.jpg)
 - [ ] **최신 사진 커밋에 추가해서 링크 연결**
 - [ ] **API 인증 키 사진 추가**
 
 
API Key를 발급 받아`/corona_info_map/public` 디렉토리에 위치한 
  `headline.js` `travelinfo.js` `vaccine.js` 와 `app.js` 의
```javascript
const service_key = 'ENTER YOUR API KEY';
```
에 5개의 API를 입력하면 됩니다.
상세 입력 위치는 [License(API)](#licenseapi)를 참고해 주세요.

<br>

app.js를 실행합니다.

    node app.js
이제 Chrome browser에서 http://localhost:23023/ 으로 접속해 테스트할 수 있습니다.

# Usage
데모, 웹페이지 스크린샷, 코드 예시
Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

# Roadmap
- 웹페이지 틀 작성 -> ***이건 빼는게 나으려나?***
- 대한민국 지도 이미지로 반응형(팝업) 구조 구현
- 코로나 관련 통계 API로 수치 정보 제공
- 선별진료소 검색기능 구현
- 전국 관광정보 API로 여행지 추천 기능 구현
- 크롤링으로 세부 지역별 코로나 확진자 수 제공
- 외교부 공지사항 API로 출국 전 최신 안전 공지사항 배너 구현
- 외교부 국가별 공지사항 API로 국가별 최신 안전소식 헤드라인 롤링 배너 구현
-  Bootstrap으로 카드형 구성 웹페이지 구현
- 코로나19 백신 접종 통계 API로 접종 현황 Bar 그래프 구현
- AWS를 통해 배포

# Contributing

> <center>KHURONA  프로젝트는</center><br>
> <center>코로나19의 상황이 나날이 달라짐에 따라 변화하는 국면에 대한 정보 최신화가 필요합니다.</center>

<br>

Contribution은 언제나 환영입니다! 🙌 <br>

KHURONA 프로젝트에 대한 개선 제안이 있다면 아래를 통해 Contribution에 참여해 주세요.<br>

1. Project를 Fork합니다.
2. 개선 기능에 대한 새 branch를 생성합니다.`git branch featrue/<개선 기능 이름>`
3. 수정 사항을 커밋합니다.`git commit -m "Add <개선 기능 이름>`
4. Branch를 push합니다.`git push origin feature/<개선 기능 이름>`
5. Pull request를 합니다.

<br>
Pull request는 가능한 빠른 시일 내에 확인하도록 하겠습니다.<br>
기타 문의사항은 📧[Contact](#contact) 으로 메일 부탁드립니다.<br>


# License(API)

> **파일명 -> 변수명**

1. **[외교부_국가별 공지사항 목록조회](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15058024)** - `headline_api.js -> service_key`
2. **[한국관광공사_국문 관광정보 서비스](https://www.data.go.kr/iim/api/selectAPIAcountView.do)** - `travleinfo.js -> service_key`
3. **[보건복지부 코로나19 시·도발생 현황](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15043378)** - `app.js -> service_key1`  
4. **[코로나19 예방접종 통계 데이터 조회 서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15077756)** - `vaccine_cmd.js -> service_key`
5. **[외교부_공지사항](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15075341)** - `app.js -> service_key2`
 - [ ] ***-> 세부 지역 크롤링, 선별진료소 자료 ?***
 - [ ] ***-> API말고 우리의 이용 라이센스? (ex MIT 라이센스)***

# Contact
- **김진환** - sodlfmag@gmail.com
- **박선홍** - 2018102189@gmail.com
- **최우성** - dntjd991223@naver.com
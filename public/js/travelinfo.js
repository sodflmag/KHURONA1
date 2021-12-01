function getAPIInfo(AREACODE, CONTENT_TYPE_ID) {
    const num_of_rows = 1000;
    const page_no = 1;
    const mobile_os = "ETC"; // 컴퓨터 웹페이지이므로
    const mobile_app = "TravelInfo"; // 서비스명
    // const service_key = "680%2FgyPOpacfjvTYIO1H2rHe4F%2FfdZV1jVBWfNkVZt8XL9zsYRp%2BbIO2%2FGwKolSMM6RcViMLiPgq4S%2BQJhROFQ%3D%3D";
    const service_key = "AphC66GHAr%2Fsigd0y6R2i5kd0bw6DjE1I86L67QSSX16i4uzVjGh%2FRUINHg54kJIL9ADbF4lS3tCI4MxiRvxVA%3D%3D";
    const url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?numOfRows=${num_of_rows}&pageNo=${page_no}&ServiceKey=${service_key}&contentTypeId=${CONTENT_TYPE_ID}&areaCode=${AREACODE}&MobileOS=${mobile_os}&MobileApp=${mobile_app}&listYN=Y&_type=json`;
    let jsonFile;
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                jsonFile = JSON.parse(this.responseText);
                resolve(jsonFile);
            }
        };
        xhr.send('');
    })
}

function JsonToVisibleInfo(jsonfile) {
    const itemlist = jsonfile["response"]["body"]['items']['item'];
    const length = itemlist.length;
    const main_div = document.createElement("div");
    main_div.className = "main-div";
    // 모든 요소를 포함하는 div
    // random으로 8개 뽑아옴

    for (let i = 0; i < 8; i++) {
        const randomnum = Math.floor(Math.random() * length);
        // 0 ~ length - 1 사이의 난수 생성
        // 랜덤하게 8개 요소를 뽑아온다.
        let it = jsonfile["response"]["body"]['items']['item'][randomnum];
        const div = document.createElement("div");
        div.className = "travel-blocks";
        // div 안에 span, img가 포함됨
        const span = document.createElement("span");
        const title = document.createElement("span");
        const img = document.createElement("img");
        if(it['addr1'] !== undefined) {
        span.innerHTML = it['addr1'];
        }
        if(it['addr2'] !== undefined) { // 상세주소 있는 경우
            span.innerHTML += it['addr2'];
        }

        title.innerHTML = it['title'];
        div.appendChild(title);
        div.appendChild(span);
        if(it['firstimage'] !== undefined) { // 이미지 없는 경우도 고려
           const details = document.createElement("details");
           img.src = it['firstimage'];
           const summary = document.createElement("summary");
           summary.innerHTML = "이미지 보기";

           details.appendChild(summary);
           details.appendChild(img);
           div.appendChild(details);
        }
        main_div.appendChild(div);
    }
    return main_div;
}

const code_array = [1, 6, 4, 2, 5, 3, 7, 8, 31, 32, 33, 34, 37, 38, 35, 36, 39];
// 서울 부산 대구 인천 광주 대전 울산 세종 경기 강원 충북 충남 전북 전남 경북 경남 제주 순.
// 순서를 위와 같이 한 이유는 map에서의 도시 순서와 맞추면 관리하기 편해서.
// 각각의 areacode 내에서도 또 지역별로 sigungucode가 존재함. 
// 시군구 코드는 option 이므로 적어주지 않아도 될 듯함.

const area_rights = document.querySelectorAll(".area-right");

for (let i = 0; i < area_rights.length; i++) {
    getAPIInfo(code_array[i], 12).then((response) => {
        // console.log(response);
        const divs = JsonToVisibleInfo(response);
        area_rights[i].appendChild(divs);
    }).catch((errorMsg)=> {
        console.log(errorMsg);
    });
}

const buttons = document.querySelectorAll(".reget-button");
const selects = document.querySelectorAll("select");

for (let i = 0; i < buttons.length; i++) {
    // 함수에 인자 (i)를 전달해야 하기 때문에 익명함수 사용
    buttons[i].addEventListener("click", function() {

        const contentIds = [12, 14, 15, 25, 28, 32, 38, 39];
        const index = selects[i].selectedIndex;

        getAPIInfo(code_array[i], contentIds[index]).then((response) => {
            // console.log(response);
            const divs = JsonToVisibleInfo(response);
            const temp = document.querySelectorAll(".main-div");
            area_rights[i].removeChild(temp[i]);
            area_rights[i].appendChild(divs);
        }).catch((errorMsg)=> {
            console.log(errorMsg);
        });
    });
}
let express = require('express');
let app = express();
app.use(express.static('public'));
// static 선언
app.set('view engine', 'ejs');
// 크롤링 부분. 지역별 세부적인 확진자 정보를 가져옴.
const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request");
const convert = require("xml-js");
const vaccine = require("./public/js/vaccine_cmd.js"); // 백신정보 모듈화 
const rolling = require("./public/js/headline_api.js"); // 헤드라인 모듈화
const fs = require('fs');   
const date = new Date();

let year = date.getFullYear();
let month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + date.getMonth();
let day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate(); 
let startCreateDt = `${year}${month}${day}`;
let endCreateDt = `${year}${month}${day}`;

// month, date의 경우 10보다 작아지는 경우 앞에 0을 붙여줘야 정상적인 URL 생성이 가능함.
const url = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?";
const key = "680%2FgyPOpacfjvTYIO1H2rHe4F%2FfdZV1jVBWfNkVZt8XL9zsYRp%2BbIO2%2FGwKolSMM6RcViMLiPgq4S%2BQJhROFQ%3D%3D";
const pageNo = "2";
const numofRows = "10";

if(0<= date.getHours() && date.getHours() <= 9) { 
    // 00시 ~ 09시까지는 API가 갱신되지 않으므로 예외처리
    year = date.getFullYear();
    date.setDate(date.getDate() - 1); // 하루 전날
    month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + date.getMonth();
    day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate(); 
    startCreateDt = `${year}${month}${day}`;
    endCreateDt = `${year}${month}${day}`;
}


let requestURL = `${url}serviceKey=${key}&pageNo=${pageNo}&numoFRows=${numofRows}&startCreateDt=${startCreateDt}&endCreateDt=${endCreateDt}`;

// 선언부분 종료 -------------------------------------------------------------------




// 코로나 확진자 수 API 받아오는 구간
function getData() {
    return new Promise(function(resolve, reject) {
        request(requestURL, (err, response, body) => {
            if(response) {
                const xmlToJson = convert.xml2json(body, {compact: true, spaces: 4});
                resolve(xmlToJson);
            }
            reject(new Error("Request is failed"));
        });
    });
}

let result_arr = [];
let titleList = [];


// json 형식의 파일 받아옴.
vaccine().then(rolling().then(getData().then(function(data) {
    // vaccine으로 만든 json 파일에 변수명을 붙여줌

    fs.readFile("public/test_vaccine.json", 'utf-8', function(err, data2) {
        fs.writeFile("public/test_vaccine.json", "Params2 =" + data2, (err) => console.log(err));
    })

    return new Promise(function(resolve, reject) {
        const obj = JSON.parse(data);
    for (x of obj["response"]["body"]["items"]["item"]) {
        const areaName = x['gubun']['_text'];
        const areaCovidCount = x['localOccCnt']['_text'];
        const areaAccumu = x['defCnt']['_text'];
        result_arr.push({'areaName' : areaName, 
            'areaCovidcount' : areaCovidCount,
            'areaAccumu' : areaAccumu,
    })
}
    result_arr.unshift(obj["response"]["body"]["items"]["item"][18]['isolClearCnt']);
    result_arr.unshift(obj["response"]["body"]["items"]["item"][18]['overFlowCnt']);
    result_arr.unshift(obj["response"]["body"]["items"]["item"][18]['deathCnt']);
    resolve(result_arr); // result_arr 객체 형태로 지역 별 정보 저장.
    reject(new Error("failed"));
    }

    )}).then((result) => {
        result = result.reverse();
        // console.log(result);
        result_arr = result;
        // console.log(result_arr);

        return new Promise(function(resolve, reject) {
            {
                resolve(axios.get("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun="));
    
                reject("Crawling failed");
        }
    })
    }).then(html => {
    const $ = cheerio.load(html.data);
    const bodyList = $(".rpsa_detail div").children("div");
    bodyList.each(function(i, elem) {
        titleList[i] = {
          title: $(this)
            .find("div table tbody")
            .text()
        };
      });
      // bodyList를 순환하면서 titleList에 값을 넣음
      // titleList에는 19~ 35번째 인덱스에만 필요로 하는 정보가 있음.
      const getJson = ParseAndMakeJson(titleList); // JSON 형식으로 크롤링 정보를 저장했음.
      const StringJson = JSON.stringify(getJson);
      fs.writeFileSync('public/crawling-info.json', "Params = " + StringJson);
       // 1번부터 서울, 17번 제주까지.
 app.get('/', (req, res) => {
    res.render('CSS_body_carousel_rev2.ejs', {distancingval1: result_arr[1].areaCovidcount,
                            distancingval2: result_arr[2].areaCovidcount,
                            distancingval3: result_arr[3].areaCovidcount,
                            distancingval4: result_arr[4].areaCovidcount,
                            distancingval5: result_arr[5].areaCovidcount,
                            distancingval6: result_arr[6].areaCovidcount,
                            distancingval7: result_arr[7].areaCovidcount,
                            distancingval8: result_arr[8].areaCovidcount,
                            distancingval9: result_arr[9].areaCovidcount,
                            distancingval10: result_arr[10].areaCovidcount,
                            distancingval11: result_arr[11].areaCovidcount,
                            distancingval12: result_arr[12].areaCovidcount,
                            distancingval13: result_arr[13].areaCovidcount,
                            distancingval14: result_arr[14].areaCovidcount,
                            distancingval15: result_arr[15].areaCovidcount,
                            distancingval16: result_arr[16].areaCovidcount,
                            distancingval17: result_arr[17].areaCovidcount,
                            date : `${year}.${month}.${day}`,
                            accumu_1: result_arr[1].areaAccumu,
                            accumu_2: result_arr[2].areaAccumu,
                            accumu_3: result_arr[3].areaAccumu,
                            accumu_4: result_arr[4].areaAccumu,
                            accumu_5: result_arr[5].areaAccumu,
                            accumu_6: result_arr[6].areaAccumu,
                            accumu_7: result_arr[7].areaAccumu,
                            accumu_8: result_arr[8].areaAccumu,
                            accumu_9: result_arr[9].areaAccumu,
                            accumu_10: result_arr[10].areaAccumu,
                            accumu_11: result_arr[11].areaAccumu,
                            accumu_12: result_arr[12].areaAccumu,
                            accumu_13: result_arr[13].areaAccumu,
                            accumu_14: result_arr[14].areaAccumu,
                            accumu_15: result_arr[15].areaAccumu,
                            accumu_16: result_arr[16].areaAccumu,
                            accumu_17: result_arr[17].areaAccumu,
                            accumu_total: result_arr[0].areaAccumu,
                            new_total : result_arr[0].areaCovidcount,
                            die_accumu: result_arr[19]['_text'],
                            isol :result_arr[21]['_text'],
                            foreign : result_arr[20]['_text'],
});
});
})))




app.listen(8080, () => {
    console.log("listening port 8080");
});
    // 정각이 넘어가면 API 데이터가 일정 시간 동안은 넘어오지 않는 문제 발생, 어떻게 처리할 것인지?
    // 또한 날짜가 넘어갈 때마다 서버를 재시작할 것인지? 새로 바뀐 데이터를 어떻게 반영할까?




function ParseAndMakeJson(list) {

    // 19번부터 35번까지
    let resultJson = [];
    for (let idx = 19; idx <= 35; idx++) {
        let tempArray = [];
        let i = 0;
        let bool = false;
        let tempString = "";
        let tempInt = "";

        // string 형태에서 데이터를 추출해내야 함. 
        while(true) {
            if(i >= list[idx]['title'].length) break;

            c = list[idx]['title'][i].charCodeAt(0); // 한글인지 확인
            if(0x1100<=c && c<=0x11FF || 0x3130<=c && c<=0x318F || 0xAC00<=c && c<=0xD7A3){
                if(bool) // 값을 넣어야 할 때라면 
                {
                    let obj = {city : tempString, value : parseInt(tempInt)};
                    tempArray.push(obj);
                    bool = false;
                    tempString = "";
                    tempInt = "";
                }
                // 한글이라면
                tempString += list[idx]['title'][i];
            }
            else if(!isNaN(list[idx]['title'][i])){
                // 숫자라면
                tempInt += list[idx]['title'][i];
                bool = true;
            }
            i++;
        }
        let obj = {city : tempString, value: parseInt(tempInt)}; // 마지막 하나까지
        tempArray.push(obj); // push

        resultJson.push({tempArray});
    }
    return {"body" : resultJson};
}

let express = require('express');
let app = express();
app.use(express.static('public'));
// static 선언
app.set('view engine', 'ejs');

const request = require("request");
const convert = require("xml-js");
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
let requestURL = `${url}serviceKey=${key}&pageNo=${pageNo}&numoFRows=${numofRows}&startCreateDt=${startCreateDt}&endCreateDt=${endCreateDt}`;

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

// json 형식의 파일 받아옴.
getData().then(function(data) {
    return new Promise(function(resolve, reject) {
        let values = [];
        const obj = JSON.parse(data);
    for (x of obj["response"]["body"]["items"]["item"]) {
        const areaName = x['gubun']['_text'];
        const areaCovidCount = x['localOccCnt']['_text'];
        values.push({'areaName' : areaName, 
            'areaCovidcount' : areaCovidCount,
    })
}

    resolve(values); // values에는 객체 형태로 지역 별 정보 저장.
    }
    )}).then((result) => {
        result = result.reverse();
        // console.log(result);
        // 1번부터 서울, 17번 제주까지.
        app.get('/', (req, res) => {
            res.render('view.ejs', {distancingval1: result[1].areaCovidcount,
                                    distancingval2: result[2].areaCovidcount,
                                    distancingval3: result[3].areaCovidcount,
                                    distancingval4: result[4].areaCovidcount,
                                    distancingval5: result[5].areaCovidcount,
                                    distancingval6: result[6].areaCovidcount,
                                    distancingval7: result[7].areaCovidcount,
                                    distancingval8: result[8].areaCovidcount,
                                    distancingval9: result[9].areaCovidcount,
                                    distancingval10: result[10].areaCovidcount,
                                    distancingval11: result[11].areaCovidcount,
                                    distancingval12: result[12].areaCovidcount,
                                    distancingval13: result[13].areaCovidcount,
                                    distancingval14: result[14].areaCovidcount,
                                    distancingval15: result[15].areaCovidcount,
                                    distancingval16: result[16].areaCovidcount,
                                    distancingval17: result[17].areaCovidcount,
                                    date : `${year}.${month}.${day}`
                                    
        });
        });
        
    })


// 크롤링 부분. 지역별 세부적인 확진자 정보를 가져옴.
const axios = require("axios");
const cheerio = require("cheerio");

function getHTML() {
    return new Promise(function(resolve, reject) {
        {
            resolve(axios.get("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun="));

            reject("Crawling failed");
    }
})
}

getHTML().then(html => {
    let titleList = [];
    const $ = cheerio.load(html.data);
    const bodyList = $(".rpsa_detail").children("div");
    bodyList.each(function(i, elem) {
        titleList[i] = {
          title: $(this)
            .find("div table")
            .text()
        };
      });
      return titleList;
      // bodyList를 순환하면서 titleList에 값을 넣고 return 함.
}).then((titleList)=> console.log(titleList));




app.listen(8080, () => {
    console.log("listening port 8080");
});
    // 정각이 넘어가면 API 데이터가 일정 시간 동안은 넘어오지 않는 문제 발생, 어떻게 처리할 것인지?
    // 또한 날짜가 넘어갈 때마다 서버를 재시작할 것인지? 새로 바뀐 데이터를 어떻게 반영할까?

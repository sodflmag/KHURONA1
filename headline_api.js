let express = require('express');
let app = express();
app.use(express.static('public'));
// static 선언
app.set('view engine', 'ejs');

var fs = require('fs');
const request = require("request");
const convert = require("xml-js");
// const date = new Date();
// const year = date.getFullYear();
// const month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + date.getMonth();
// const day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate(); 
// month, date의 경우 10보다 작아지는 경우 앞에 0을 붙여줘야 정상적인 URL 생성이 가능함.
const url = "http://apis.data.go.kr/1262000/NoticeService2/getNoticeList2?";
const key = "AphC66GHAr%2Fsigd0y6R2i5kd0bw6DjE1I86L67QSSX16i4uzVjGh%2FRUINHg54kJIL9ADbF4lS3tCI4MxiRvxVA%3D%3D";
const pageNo = "1";
const numofRows = "1";
// const startCreateDt = `${year}${month}${day}`;
// const endCreateDt = `${year}${month}${day}`;
const requestURL = 'http://apis.data.go.kr/1262000/CountryNoticeService/getCountryNoticeList?serviceKey=AphC66GHAr%2Fsigd0y6R2i5kd0bw6DjE1I86L67QSSX16i4uzVjGh%2FRUINHg54kJIL9ADbF4lS3tCI4MxiRvxVA%3D%3D&numOfRows=10&pageNo=1';


// 외교부 최신 공지사항API 받아오는 구간
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
getData().then(function(data1) {
    return new Promise(function(resolve, reject) {
        let values = [];
        const obj = JSON.parse(data1);
    for (x of obj["response"]["body"]["items"]["item"]) {
        const headline = x["title"]["_text"];
        const headline_dt = x['wrtDt']['_text'];
        values.push({
            'headline' : headline,
            'headline_dt' : headline_dt
    })
    }
    resolve(values); // values에는 객체 형태로 날짜별 정보 저장.
    }
    )}).then((result) => {
        // result = result.reverse();
        // console.log(result);
        console.log(result[0])

        var rollingData = {                              
            headline1: result[0].headline,
            headline2: result[1].headline,
            headline3: result[2].headline,
            headline4: result[3].headline,
            headline5: result[4].headline,
            headline6: result[5].headline,
            headline7: result[6].headline,
            headline8: result[7].headline,
            headline9: result[8].headline,
            headline10: result[9].headline}
        
        // headline_info.json 
        var jsonData = JSON.stringify(rollingData);

        fs.writeFile("./public/headline_info.json", jsonData, function(err) {
            if (err) {
                console.log(err);
            }
        });
        // 1번 ~ 10번까지 외교부 최신 공지사항 헤드라인 저장
        app.get('/', (req, res) => {
            res.render('view.ejs', {//작성 날짜 이용하려면 headline_dt
                                    headline1: result[0].headline,
                                    headline2: result[1].headline,
                                    headline3: result[2].headline,
                                    headline4: result[3].headline,
                                    headline5: result[4].headline,
                                    headline6: result[5].headline,
                                    headline7: result[6].headline,
                                    headline8: result[7].headline,
                                    headline9: result[8].headline,
                                    headline10: result[9].headline
                                    
        });         

        });
        
    })

console.log(requestURL)

    app.listen(8080, () => {
        console.log("listening port 8080");
    });
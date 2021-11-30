let express = require('express');
let app = express();
app.use(express.static('public'));
// static 선언
app.set('view engine', 'ejs');

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
const requestURL = `${url}serviceKey=${key}&pageNo=${pageNo}&numoFRows=${numofRows}&returnType=XML`;


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
getData().then(function(data1) {
    return new Promise(function(resolve, reject) {
        let values = [];
        const obj = JSON.parse(data1);
    for (x of obj["results"]["data"]["item"]) {
        const title = x["title"];
        const contents = x['txt_origin_cn']['_text'];
        const written_dt = x['written_dt']['_text'];
        values.push({'title' : title, 
            'contents' : contents,
            'written_dt' : written_dt
    })
    }
    resolve(values); // values에는 객체 형태로 지역 별 정보 저장.
    }
    )}).then((result) => {
        // result = result.reverse();
        // console.log(result);
        console.log(result[0])
        // 1번부터 서울, 17번 제주까지.
        app.get('/', (req, res) => {
            res.render('view.ejs', {latest_info: result[0].contents,
                                    latest_date : result[0].written_dt
                                    
        });
        });
        
    })

console.log(requestURL)

    app.listen(8080, () => {
        console.log("listening port 8080");
    });
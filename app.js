let express = require('express');
let app = express();
app.use(express.static('public'));
// static 선언
app.set('view engine', 'ejs');

// app.listen(8080, () => {
//     console.log("listening port 8080");
// });

app.get('/', (req, res) => {
    res.render('test.ejs', {'email': 'hello'});
});

const request = require("request");
const convert = require("xml-js");
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate() - 1; // 전일을 기준으로 함

const url = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?";
const key = "680%2FgyPOpacfjvTYIO1H2rHe4F%2FfdZV1jVBWfNkVZt8XL9zsYRp%2BbIO2%2FGwKolSMM6RcViMLiPgq4S%2BQJhROFQ%3D%3D";
const pageNo = "2";
const numofRows = "10";
const startCreateDt = `${year}${month}${day}`;
const endCreateDt = `${year}${month}${day}`;
const requestURL = `${url}serviceKey=${key}&pageNo=${pageNo}&numoFRows=${numofRows}&startCreateDt=${startCreateDt}&endCreateDt=${endCreateDt}`;


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
    const obj = JSON.parse(data);
    // console.log(obj["response"]["body"]["items"]["item"]);
    // console.log(data);
    for (x of obj["response"]["body"]["items"]["item"]) {
        console.log(x['gubun']['_text']);
    }
}).catch(function(err) {
    console.log(err);
});

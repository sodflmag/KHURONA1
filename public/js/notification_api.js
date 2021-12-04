const request = require("request");
const convert = require("xml-js");
const url = "http://apis.data.go.kr/1262000/NoticeService2/getNoticeList2?";
const key = "AphC66GHAr%2Fsigd0y6R2i5kd0bw6DjE1I86L67QSSX16i4uzVjGh%2FRUINHg54kJIL9ADbF4lS3tCI4MxiRvxVA%3D%3D";
const pageNo = "1";
const numofRows = "1";
const requestURL = `${url}serviceKey=${key}&pageNo=${pageNo}&numoFRows=${numofRows}returnType=XML`;


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
        let values = [];
        const obj = JSON.parse(data1);
    for (x of obj["results"]["data"]["item"]) {
        const title = x["title"];
        const contents = x['txt_origin_cn']['_text'];
        const written_dt = x['written_dt']['_text'];
    }
    console.log(values); // values에는 객체 형태로 지역 별 정보 저장.
})
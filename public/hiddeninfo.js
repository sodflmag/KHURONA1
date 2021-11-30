window.onload = function() {
    main();
}

function main() {
    let jsonData = JSON.parse(JSON.stringify(Params));
    const popups = document.querySelectorAll(".popup .area-left"); // 각 팝업의 area-left에 대해서 
    const areas = document.getElementsByTagName("path");
    const texts = document.querySelectorAll(".TEXT");

    const length = popups.length; 
    for (let i = 0; i < length; i++) {
        // table 형식으로 삽입
        let table = document.createElement("table");
        let thead = document.createElement("thead");
        let thead_tr = document.createElement("tr");
        let thead_tr2 = document.createElement("tr");
        // let thead_td_1 = document.createElement("td");
        let thead_td_2 = document.createElement("td");
        // thead_td_1.innerHTML = "일일 확진자 수 : " + areas[i].id;
        // thead_td_1.colSpan = "4";
        thead_td_2.innerHTML = "누적 확진자 수";
        thead_td_2.colSpan = "4";
        // thead_tr.appendChild(thead_td_1);
        thead_tr2.appendChild(thead_td_2);
        thead.appendChild(thead_tr);
        thead.appendChild(thead_tr2);
        let tbody = document.createElement("tbody");
        let CityData = jsonData['body'][i]['tempArray']; // 각 도시들에 대해서 
        let tr = document.createElement("tr");
        let td_1;
        let td_2;
        let count = 1;
         for (let j = 0; j < CityData.length; j++) {

                td_1 = document.createElement("td"); // city
                td_2 = document.createElement("td"); // value
                td_1.innerHTML = CityData[j]['city'];
                td_2.innerHTML = CityData[j]['value'];

                tr.appendChild(td_1);
                tr.appendChild(td_2);
                if(count % 2 == 0 || j == CityData.length - 1) {
                tbody.appendChild(tr);
                tr = document.createElement("tr");
                }
                count++;
        }
       
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        span1.innerHTML = texts[i].innerHTML + " 일일 확진자수";
        span2.innerHTML = areas[i].id + " 명";

        table.appendChild(thead);
        table.appendChild(tbody);
        popups[i].appendChild(span1);
        popups[i].appendChild(span2);
        popups[i].appendChild(table);
    }
}


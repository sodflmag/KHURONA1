// 각각의 path와 text에 대해서  커서를 올렸을 시 이펙트 구현
const paths = document.getElementsByTagName("path");
const texts = document.getElementsByTagName("text");
const length = paths.length;
for (let i = 0; i < length; i++) {
    const temp_for_path = paths[i];
    const temp_for_text = texts[i];

    temp_for_path.onmouseenter = function() {
        temp_for_path.classList.add("mouseEnter");
    }
    temp_for_text.onmouseenter = function() {
        temp_for_path.classList.add("mouseEnter");
    }
    temp_for_path.onmouseleave = function() {
        temp_for_path.classList.remove("mouseEnter");
    }
    temp_for_text.onmouseleave = function() {
        temp_for_path.classList.remove("mouseEnter");
    }
}

const distance_val = [];
// distance_val은 API로부터 받아오게 됨, length = 16
// 백앤드에서 받은 API 데이터를 어떻게 Frontend 부분 JS에서 처리할지 -> EJS로 ID 값에 확진자 수 설정. ID는 어차피 쓰이지 않음.
 // 서울 부산 대구 인천 광주 대전 울산 세종 경기도 강원도 충청북도 충청남도 전라북도 전라남도 경상북도 경상남도 제주도 순 인덱스 부여

 for (let i = 0; i < length; i++) {
    const temp_for_path = paths[i];
    let weight = 0;
    const IDInteger = parseInt(temp_for_path.id);
    if(IDInteger< 30) {
        weight = 1;
    } else if(IDInteger < 60) {
        weight = 2;
    } else if(IDInteger < 90) {
        weight = 3;
    } else {
        weight = 4;
    }
    if(paths[i].classList.contains("CD")) {
        let temp_string = "distancelvl" + weight;
        paths[i].classList.add(temp_string);
    }
}
  

// 각 지역별로 eventhandler를 추가, 지역 클릭 시 추가적인 팝업이 나타나도록 구현.

  for (let i = 0; i < length; i++) {
      paths[i].addEventListener("click", () => {
          document.querySelector(".area" + i).classList.add("show");
      })
      texts[i].addEventListener("click", () => {
        document.querySelector(".area" + i).classList.add("show");
    })
      document.querySelector("#close" + i).addEventListener("click", () => {
          document.querySelector(".area" + i).classList.remove("show");
      })
  }

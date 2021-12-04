
let jsonData2 = JSON.parse(JSON.stringify(Params2));
const population_kor = 51652704;

const _1cha_total = Params2["data"][0]["totalFirstCnt"];
const _2cha_total = Params2["data"][0]["totalSecondCnt"];
const _3cha_total = Params2["data"][0]["totalThirdCnt"];


const text_infos = document.querySelectorAll(".text-info");
const text_dangers = document.querySelectorAll("span.text-danger");

text_infos[0].innerHTML = _1cha_total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "명";
text_dangers[0].innerHTML = (population_kor - _1cha_total).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "명";

text_infos[1].innerHTML = _2cha_total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "명";
text_dangers[1].innerHTML = (population_kor - _2cha_total).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "명";

text_infos[2].innerHTML = _3cha_total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "명";
text_dangers[2].innerHTML = (population_kor - _3cha_total).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "명";


const percentage_1cha = (_1cha_total / population_kor * 100).toFixed(1);
const percentage_2cha = (_2cha_total / population_kor * 100).toFixed(1);
const percentage_3cha = (_3cha_total / population_kor * 100).toFixed(1);

const percentage_1 = document.querySelectorAll(".percentage_1");
const percentage_2 = document.querySelectorAll(".percentage_2");

percentage_1[0].style.width = percentage_1cha.toString()+"%";
percentage_1[1].style.width = percentage_2cha.toString()+"%";
percentage_1[2].style.width = percentage_3cha.toString()+"%";


percentage_1[0].innerHTML = percentage_1cha.toString()+"%";
percentage_1[1].innerHTML = percentage_2cha.toString()+"%";
percentage_1[2].innerHTML = percentage_3cha.toString()+"%";


percentage_2[0].innerHTML = (100 - percentage_1cha).toFixed(1).toString()+"%";
percentage_2[1].innerHTML = (100 - percentage_2cha).toFixed(1).toString()+"%";
percentage_2[2].innerHTML = (100 - percentage_3cha).toFixed(1).toString()+"%";


percentage_2[0].style.width = (100 - percentage_1cha).toFixed(1).toString()+"%";
percentage_2[1].style.width = (100 - percentage_2cha).toFixed(1).toString()+"%";
percentage_2[2].style.width =  (100 - percentage_3cha).toFixed(1).toString()+"%";
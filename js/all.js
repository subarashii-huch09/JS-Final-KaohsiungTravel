/* eslint-disable no-use-before-define */
// DOM選取元素、宣告
const districtSelect = document.querySelector('.district-select');// 行政區下拉選單

const popularDistrictList = document.querySelector('.popularDistrict_list');// 熱門行政區

const districtTitle = document.querySelector('.district_title');// 行政區標題

const touristSpotList = document.querySelector('.touristSpot_list');// 景點列表

// 撈取資料
let touristSpotData = [];
async function getData() {
  const url = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';

  const rawData = await fetch(url);
  const jsonData = await rawData.json();

  touristSpotData = await jsonData.result.records;
  // console.log(touristSpotData)
  // 請求成功就會執行以下function
  init();
  selectOptionList();
  return touristSpotData;
}
getData();

// 選染資料到網頁上

function init() {
  districtTitle.textContent = '全部';
  let str = '';
  touristSpotData.forEach((item) => {
    const content = `<li class="mb-5 col-md-6">
            <div class="spot_item h-100">
            <div class="item-header">
            <div class="img_container">
                <img src="${item.Picture1}" alt="${item.Name}">
            </div>
            <div class="text-white item-header-info d-flex justify-content-center">
                <h4 class="spot_item-name me-auto">${item.Name}</h4>
                <p class="mx-auto">${item.Zone}</p>
            </div>
         </div>
         <ul class="item-body px-3 list-unstyled">
            <li><i class="fas fa-clock"></i>${item.Opentime}</li>
            <li><i class="fas fa-map-marked-alt"></i>${item.Add}</li>
            <li class ="d-flex justify-content-between">
                <div>
                    <i class="fas fa-phone-alt text-blue"></i>
                    <a href="tel:+${item.Tel}">${item.Tel}</a>
                </div>
                <div class="tag text-warning">
                    <i class="fas fa-tag"></i>
                    <span>${item.Ticketinfo}</span>
                </div>
            </li>
        </ul>
            </div>
        </li>`;
    str += content;
  });
  touristSpotList.innerHTML = str;
}

// select 下拉選單列表
function selectOptionList() {
  let str = '';
  touristSpotData.forEach((item) => {
    const content = `<option value=${item.Zone}>${item.Zone}</option>`;
    str += content;
  });
  districtSelect.innerHTML = str;

  /* 過濾 */
  // 將過濾資料放入 filterOption
}

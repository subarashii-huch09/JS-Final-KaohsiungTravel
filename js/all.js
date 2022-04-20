/* eslint-disable no-use-before-define */
// DOM選取元素、宣告
const districtSelect = document.querySelector('.district-select');// 行政區下拉選單

const popularDistrictList = document.querySelector('.popularDistrict_list');// 熱門行政區

const districtTitle = document.querySelector('.district_title');// 行政區標題

const touristSpotList = document.querySelector('.touristSpot_list');// 景點列表

const toTop = document.querySelector('.toTop');// 點擊回到最上方
// 撈取資料
let touristSpotData = [];
async function getData() {
  const url = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';

  const rawData = await fetch(url);
  const jsonData = await rawData.json();

  touristSpotData = await jsonData.result.records;
  // console.log(touristSpotData);
  // 請求成功就會執行以下function
  init();
  selectOptionList();
  return touristSpotData;
}
getData();

// 選染資料到網頁上
function init() {
  districtTitle.innerHTML = '<p class="d-none d-md-block mb-md-5">全部</p>';
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
                <p class="text-end me-4">${item.Zone}</p>
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
  // 取出各景點裡所在區的值，例如：三民區，前鎮區
  const rawOption = [];
  touristSpotData.forEach((item) => {
    const zone = item.Zone;
    rawOption.push(zone);
  });
  // 取出值後，值就會顯示 三民區，三民區，三民區，前鎮區，美濃區，美濃區。
  // 但是這裡面的值有重複，需要再經過處理

  // 下面這段程式碼，使用filter & indexOf 去過濾篩選，淘汰重複的區
  /* 過濾 */
  // 將過濾資料放入 filterOption
  const filterOption = rawOption.filter(
    (item, index) => rawOption.indexOf(item) === index,
  );

  // 這段程式碼把過濾後的資料渲染在select下拉列表
  // 記得要保留 --請選擇行政區-- (refer to code below)，不然會被洗掉
  let str = '<option value="請選擇行政區" disabled selected>--請選擇行政區--</option><option value="全部">全部</option>';

  filterOption.forEach((item) => {
    const content = `<option value=${item}>${item}</option>`;
    str += content;
    districtSelect.innerHTML = str;
  });
}

// 綁監聽器在select下拉選單上，當“換了”動作執行，selectOptionRender涵式則會開始運行
districtSelect.addEventListener('change', selectOptionRender);

// 下面這個函式，用來渲染，點選行政區後，頁面需要呈現景點位在該行政區的頁面
// 當使用者在select下拉選單中，點擊其中一個區 (e.target.value) , 如果跟資料陣列裡的行政區一樣，則會執行頁面渲染
function selectOptionRender(e) {
  let strSelected = '';
  touristSpotData.forEach((item) => {
    if (e.target.value === item.Zone) {
      const content = `<li class="mb-5 col-md-6">
            <div class="spot_item h-100">
            <div class="item-header">
            <div class="img_container">
                <img src="${item.Picture1}" alt="${item.Name}">
            </div>
            <div class="text-white item-header-info d-flex justify-content-center">
                <h4 class="spot_item-name me-auto">${item.Name}</h4>
                <p class="text-end me-4">${item.Zone}</p>
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
      strSelected += content;
      touristSpotList.innerHTML = strSelected;
      // 這裡記得要更新為已選擇的行政區名字
      districtTitle.textContent = item.Zone;
    } else if (e.target.value === '全部') {
      init();
    }
  });
}

// 綁監聽器在熱門景點List，當“click”動作執行，涵式則會開始運行
// 如果點到的是按鈕的話，則會執行selectOptionRender函式，來渲染選擇地區內的景點
// 記得在selectOptionRender裡附上event !!
popularDistrictList.addEventListener('click', (e) => {
  // e.preventDefault();

  if (e.target.nodeName === 'BUTTON') {
    console.log("why");
    selectOptionRender(e);
  }
});

// 點擊回到最上方
toTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

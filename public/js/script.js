const DrawDataElement = (statsName, data) => {
    const $stats = document.querySelector(".stats");

    //creating confirmed element
    const $statsEl = document.createElement("div");
    const $statsIcon = document.createElement("img");
    const $statsTitle = document.createElement("h3");
    const $statsData = document.createElement("span");

    $statsData.classList.add(`${statsName}__data`);
    $statsTitle.classList.add(`${statsName}__title`);
    $statsIcon.classList.add(`${statsName}__icon`);
    $statsEl.classList.add(`${statsName}`);

    $statsEl.appendChild($statsIcon);
    $statsEl.appendChild($statsTitle);
    $statsEl.appendChild($statsData);

    $statsTitle.innerText = `${statsName}`;
    $statsIcon.src = `../img/${statsName}.png`;

    $stats.appendChild($statsEl);
}

const sendGeoLocation = () => {
    const url = "/post-stats";
    navigator.geolocation.getCurrentPosition((data) => {    
        const cords = {
            longitude: data.coords.longitude,
            latitude: data.coords.latitude 
        }
        const jsonCords = JSON.stringify(cords)
    
        const options = {
            method: 'POST',
            headers: {
                 'Content-type' : "application/json",
            }, 
            body: jsonCords,
        }
        fetch(url, options)
    })
}

const getCoronavirusData = (callback) => {
    const url = "http://localhost:3000/stats";
    fetch(url).then(function(response) {
        response.json().then(function(data) {
          //Тут будет добавление данных в html
          callback(data)
        });
      });
}
sendGeoLocation();
getCoronavirusData((data) => {
    DrawDataElement("confirmed", data);
    DrawDataElement("deaths", data);

    //Тут небольшой костыль потому что я не могу достать данные из объекта, так как не могу передать параметр который бы определял из какого свойства объекта я должен брать данные
    const $confirmedData = document.querySelector(".confirmed__data");
    $confirmedData.innerText = data.confirmed;
    const $deathData = document.querySelector(".deaths__data");
    $deathData.innerText = data.deaths;


});


//Для страницы поиска сделать другой скрипт который будет отправлять запрос на другой путь

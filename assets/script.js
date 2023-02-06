
function FormatDay(date) {
    var date = new Date();
    console.log(date);
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var dayOutput = date.getFullYear() + '/' +
        (month < 10 ? '0' : '') + month + '/' +
        (day < 10 ? '0' : '') + day;
    return dayOutput;
}

var cityList = $("#city-list");
var cities = [];
var key = "dfd0a4d90e0b02b5591aeb3c59a3f119";


init();

function init() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        cities = storedCities;
    }
    renderCities();
}

function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(localStorage);
}

function renderCities() {
    cityList.empty();

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];

        var li = $("<li>").text(city);
        li.attr("id", "listC");
        li.attr("data-city", city);
        li.attr("class", "list-group-item");
        console.log(li);
        cityList.prepend(li);
    }
    if (!city) {
        return
    }
    else {
        getResponseWeather(city)
    };
}

$("#add-city").on("click", function (event) {
    event.preventDefault();

    var city = $("#city-input").val().trim();

    if (city === "") {
        return;
    }
    cities.push(city);
    storeCities();
    renderCities();
});



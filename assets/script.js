
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



function getResponseWeather(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key;

    $("#today-weather").empty();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Create a new table row element
        cityTitle = $("<h3>").text(response.name + " " + FormatDay());
        $("#today-weather").append(cityTitle);
        console.log(response.weather[0].main);
        var imgtag = $("<img>");
        var skyconditions = response.weather[0].main;
        if (skyconditions === "Clouds") {
            imgtag.attr("src", "https://img.icons8.com/color/48/000000/cloud.png")
        } else if (skyconditions === "Clear") {
            imgtag.attr("src", "https://img.icons8.com/color/48/000000/summer.png")
        } else if (skyconditions === "Rain") {
            imgtag.attr("src", "https://img.icons8.com/color/48/000000/rain.png")
        }
        $("#today-weather").append(imgtag);


        var TempetureToNum = parseInt((response.main.temp) * 9 / 5 - 459);
        var cityTemperature = $("<p>").text("Tempeture: " + TempetureToNum + " °F");
        $("#today-weather").append(cityTemperature);
        var cityHumidity = $("<p>").text("Humidity: " + response.main.humidity + " %");
        $("#today-weather").append(cityHumidity);
        var cityWindSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#today-weather").append(cityWindSpeed);


        var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key;
        $.ajax({
            url: queryURL3,
            method: "GET"
        }).then(function (response5day) {
            $("#forcasts_boxes").empty();
            console.log(response5day);
            for (var i = 0, j = 0; j <= 5; i = i + 6) {
                var read_date = response5day.list[i].dt;
                if (response5day.list[i].dt != response5day.list[i + 1].dt) {
                    var FivedayDiv = $("<div>");
                    FivedayDiv.attr("class", "col-md-1.5 forcast")
                    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                    d.setUTCSeconds(read_date);
                    var date = d;
                    console.log(date);
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    var dayOutput = date.getFullYear() + '/' +
                        (month < 10 ? '0' : '') + month + '/' +
                        (day < 10 ? '0' : '') + day;
                    var Fivedayh4 = $("<h6>").text(dayOutput);
                    //Set src to the imags
                    var imgtag = $("<img>");
                    var skyconditions = response5day.list[i].weather[0].main;
                    if (skyconditions === "Clouds") {
                        imgtag.attr("src", "https://img.icons8.com/color/48/000000/cloud.png")
                    } else if (skyconditions === "Clear") {
                        imgtag.attr("src", "https://img.icons8.com/color/48/000000/summer.png")
                    } else if (skyconditions === "Rain") {
                        imgtag.attr("src", "https://img.icons8.com/color/48/000000/rain.png")
                    }

                    var pTemperatureK = response5day.list[i].main.temp;
                    console.log(skyconditions);
                    var TempetureToNum = parseInt((pTemperatureK) * 9 / 5 - 459);
                    var pTemperature = $("<p>").text("Tempeture: " + TempetureToNum + " °F");
                    var pHumidity = $("<p>").text("Humidity: " + response5day.list[i].main.humidity + " %");
                    FivedayDiv.append(Fivedayh4);
                    FivedayDiv.append(imgtag);
                    FivedayDiv.append(pTemperature);
                    FivedayDiv.append(pHumidity);
                    $("#forcasts_boxes").append(FivedayDiv);
                    console.log(response5day);
                    j++;
                }

            }

        });


    });

}

$(document).on("click", "#listC", function () {
    var thisCity = $(this).attr("data-city");
    getResponseWeather(thisCity);
});

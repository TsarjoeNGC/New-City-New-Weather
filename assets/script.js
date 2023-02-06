
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


$(document).on("click", "#listC", function () {
    var thisCity = $(this).attr("data-city");
    getResponseWeather(thisCity);
});

"use strict";
// 2222419747422e945d7faae247b7b091 2ab5a5b18737e945b5af9cae2e8e1ffe
const api_key = "2ab5a5b18737e945b5af9cae2e8e1ffe" ;
const base_url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=";
const n_days = 5;

function unix_to_day(timestamp) {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(timestamp * 1000);
    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var weekday = weekdays[date.getDay()];
    return weekday;
}

function location_button_click (){
    // console.log ($("#input_city_name").val());
    get_weather_data($("#input_city_name").val());
    $(".display_condition").css("display", "inline-block");
}
  
$("#input_button").on("click", location_button_click);

function get_weather_data (city_name){
    var api_call = base_url + city_name + "&units=metric" + "&cnt=" + n_days + "&APPID=" + api_key;

    $.ajax ({
        url: api_call,
        success: function(result){
            console.log(result);

            // Display the city
            var display_city = ` ${result.city.name} weather`;
            $("#city_name").html(display_city);

            for (var i = 0; i < n_days; i++) {

                var int = i.toString();
            
                var day_week = unix_to_day(result.list[i].dt);
                console.log ("unix timestamp ", result.list[i].dt);
                $("#day"+int).text(day_week);

                // Highest temperature
                var max_temp = `High: ${Math.round(result.list[i].temp.max)} &#8451;`;
                $("#high"+int).html(max_temp);

                // Lowest temperature
                var min_temp = `Low: ${Math.round(result.list[i].temp.min)} &#8451;`;
                $("#low"+int).html(min_temp);

                // var feels_day = `It feels like ${Math.round(result.list[i].feels_like.day)} &#8451;`;
                // $("feels_day"+int).html(feels_day);

                // var feels_night = `It feels like ${Math.round(result.list[i].feels_like.night)} &#8451;`;
                // $("feels_night"+int).html(feels_night);

                // Weather icon
                var url_icon = 'http://openweathermap.org/img/w/'+result.list[i].weather[0].icon+'.png';
                $("#weather_img_icon"+int).attr("src", url_icon);

                // Sky condition
                var cloudiness = `${result.list[i].weather[0].description}`;
                $("#weather_desc"+int).html(cloudiness);
                
                // Wind speed
                var speed = `Wind speed: ${Math.round(Math.round(result.list[i].speed)*3.6)} km/h`;
                $("#speed"+int).html(speed); 

                // Humidity
                var humidity = `Humidity: ${Math.round(result.list[i].humidity)} %`;
                $("#humidity"+int).html(humidity);
         
                // Pressure
                var pressure = `Pressure: ${Math.round(result.list[i].pressure)} hPa`;
                $("#pressure"+int).html(pressure);
            }
        }
    });
}

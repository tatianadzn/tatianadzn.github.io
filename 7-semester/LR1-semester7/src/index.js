const API_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=41210752a269dfb2e2a8167a0910c3a1&q=';
import {load} from './fetchData';

const template = '<table><thead><tr><th>City</th><th>Temp</th><th>Humidity</th>' +
    '<th>Wind Speed</th><th>Pressure</th></tr></thead><tbody><tr><td>{{name}}</td>' +
    '<td>{{main.temp}}</td><td>{{main.humidity}}</td><td>{{wind.speed}}</td>' +
    '<td>{{main.pressure}}</td></tr></tbody></table>';


document.getElementById('form').onsubmit = (event) => {
    handleSubmit(event);
};

function handleSubmit (e) {
    e.preventDefault();
    let city = e.target.cityName.value;
    load(API_URL+city,
        function(err, data) {
            if (err !== null) {
                if (err === 'Not found'){
                    document.getElementById('root').innerText = 'City not found';
                }
                else {
                    document.getElementById('root').innerText = 'Server error';
                }
            } else {
                $(document.getElementById('root')).html(Mustache.render(template, data));
            }
        });
    e.target.cityName.value = '';
}
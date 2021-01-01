
cityName = document.querySelector('#cityName')
submitBtn = document.querySelector('#submitBtn')
city_name = document.querySelector('#city_name')
temp_status = document.querySelector('#temp_status')
temp = document.querySelector('#temp')
datahide = document.querySelector('.data_hide')
temp_val = document.querySelector('#temp span')
day = document.querySelector('#day')
date_ = document.querySelector('#date')

getCurrentDay = () => {
    weekday = new Array(7)
    weekday[0] = 'Sunday'
    weekday[1] = 'Monday'
    weekday[2] = 'Tuesday'
    weekday[3] = 'Wednesday'
    weekday[4] = 'Thursday'
    weekday[5] = 'Friday'
    weekday[6] = 'Saturday'
    date = new Date()
    day = weekday[date.getDay()]
    return day
}
day.innerText = getCurrentDay()
getCurrentDate = () => {
    var months = ['Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
    ]
    date = new Date()
    month = months[date.getMonth() ]
    year = date.getYear().toString().substr(-2)
    date = date.getDate()
    return `${date} ${month} ${year}`
}
date_.innerText = getCurrentDate()
city_name.innerText = 'Enter City Name...'
temp_status.innerText = ''
getInfo = async (e) => {
    e.preventDefault()
    if (cityName.value === '') {
        city_name.innerText = 'Please Enter City Name...'
        temp_status.innerText = ''
        datahide.classList.add('data_hide')
    } else {
        try {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&appid=8a382ab59c064e92045d210ffc33646d`
            response = await fetch(url)
            data = await response.json()
            arrData = [data]
            city_name.innerText = `${arrData[0].name} ,${arrData[0].sys.country}`
            temp_val.innerText = arrData[0].main.temp
            tempMood = arrData[0].weather[0].main
            if (tempMood == 'Clear') {
                temp_status.innerHTML = " &nbsp;<img src='https://img.icons8.com/color/75/000000/smiling-sun.png'/>"
            } else if (tempMood == 'Clouds') {
                temp_status.innerHTML = " &nbsp;<img src='https://img.icons8.com/color/75/000000/clouds.png'/>"
            } else if (tempMood == 'Rain') {
                temp_status.innerHTML = " &nbsp;<img src='https://img.icons8.com/color/75/000000/downpour--v1.png'/>"
            } else if (tempMood == 'Snow') {
                temp_status.innerHTML = " &nbsp;<img src='https://img.icons8.com/color/75/000000/snow--v1.png'/>"
            } else {
                temp_status.innerHTML = " &nbsp;<img src='https://img.icons8.com/color/75/000000/smiling-sun.png'/>"
            }

            datahide.classList.remove('data_hide')
        } catch {
            city_name.innerText = `Typo error please check spelling again`
            datahide.classList.add('data_hide')

        }
    }
}

submitBtn.addEventListener('click', getInfo)

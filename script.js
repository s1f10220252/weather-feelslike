navigator.geolocation.getCurrentPosition(
    (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const API_KEY = 'ecd796a0eb988a173b4bf32772043737';
        const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&lang=ja&units=metric`;
        const reverseGeocodeURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;

        fetch(reverseGeocodeURL)
            .then((response) => response.json())
            .then((reverseGeocodeData) => {
                const cityName = reverseGeocodeData[0].local_names.ja;
                const weatherTitle = document.getElementById('weather-title');

                if (cityName) {
                    weatherTitle.textContent = `${cityName}の天気予報と体感温度指数`;
                } else {
                    weatherTitle.textContent = '天気予報';
                }

                fetch(API_URL)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        const weatherDiv = document.getElementById('weather');
                        let html = '';

                        for (let i = 0; i < data.daily.length; i++) {
                            const date = new Date(data.daily[i].dt * 1000);
                            const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
                            const weather = data.daily[i].weather[0].description;
                            const icon = data.daily[i].weather[0].icon;
                            const maxTemp = data.daily[i].temp.max;
                            const minTemp = data.daily[i].temp.min;
                            const feelsLike = data.daily[i].feels_like.day;
                            const windSpeed = data.daily[i].wind_speed;
                            const windDeg = data.daily[i].wind_deg;
                            const windDirection = getWindDirection(windDeg);
                            const pop = data.daily[i].pop;
                            const dateStr = `${date.getMonth() + 1}/${date.getDate()}(${dayOfWeek})`;
                            const feelsLikeDay = data.daily[i].feels_like.day;
                            const comfortIndex = getComfortIndex(feelsLike);
                            const iconPath = getIconPath(comfortIndex);

                            html += `
                                <div class="weather-card" data-date="${i}" data-feels-like="${feelsLike}">
                                    <p class="date">${dateStr}</p>
                                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${weather}">
                                    <p class="weather">${weather}</p>
                                    <p class="temp">最高: ${maxTemp}℃ / 最低: ${minTemp}℃</p>
                                    <p class="wind">風向き: ${windDirection} (${windDeg}°) / 風速: ${windSpeed}m/s</p>
                                    <p class="pop">降水確率: ${pop}%</p>
                                </div>
                            `;
                        }

                        weatherDiv.innerHTML = html;

                        const dateButtons = document.getElementById('date-picker');

                        for (let i = 0; i < 7; i++) {
                            const date = new Date(data.daily[i].dt * 1000);
                            const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
                            const dateStr = `${date.getMonth() + 1}/${date.getDate()}(${dayOfWeek})`;
                            const button = document.createElement('button');

                            button.classList.add('date-button');
                            button.dataset.date = i;
                            button.textContent = dateStr;
                            dateButtons.appendChild(button);
                        }

                        const dateButtonsArray = Array.from(dateButtons.children);

                        dateButtonsArray.forEach((button) => {
                            button.addEventListener('click', () => {
                                const date = button.dataset.date;
                                const weatherCards = document.querySelectorAll('.weather-card');

                                weatherCards.forEach((card) => {
                                    card.style.display = card.dataset.date == date ? 'block' : 'none';
                                });

                                dateButtonsArray.forEach((btn) => {
                                    btn.classList.remove('selected');
                                });

                                button.classList.add('selected');

                                const selectedCard = document.querySelector(`.weather-card[data-date="${date}"]`);

                                if (selectedCard) {
                                    const indexDisplay = document.getElementById('index-display');
                                    const feelsLike = selectedCard.dataset.feelsLike;
                                    const comfortIndex = getComfortIndex(feelsLike);
                                    const comfortIndexDescription = getComfortIndexDescription(comfortIndex);
                                    const iconPath = getIconPath(comfortIndex);

                                    indexDisplay.innerHTML = `
                                        <p class="feels-like">体感温度: ${feelsLike}℃</p>
                                        <img src="${iconPath}" alt="Comfort Icon">
                                        <p class="comfort-index">体感温度指数: ${comfortIndex}</p>
                                        <p class="comfort-description">${comfortIndexDescription}</p>
                                    `;

                                    indexDisplay.style.display = 'block';
                                    const additionalInfoContainer = document.getElementById('additional-info-container');
                                    const additionalInfo = getAdditionalInfo(comfortIndex);
                                    additionalInfoContainer.innerHTML = additionalInfo;
                                }
                            });
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    },
    (error) => {
        console.error(error);
    }
);  

function getWindDirection(degrees) {
    const directions = ['北', '北東', '東', '南東', '南', '南西', '西', '北西'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

function getComfortIndex(feelsLike) {
    if (feelsLike < 5) return 10;
    else if (feelsLike < 10) return 20;
    else if (feelsLike < 15) return 30;
    else if (feelsLike < 20) return 40;
    else if (feelsLike < 23) return 50;
    else if (feelsLike < 25) return 60;
    else if (feelsLike < 28) return 70;
    else if (feelsLike < 31) return 80;
    else if (feelsLike < 34) return 90;
    else return 100;
}

function getComfortIndexDescription(comfortIndex) {
    switch (comfortIndex) {
        case 10:
            return "ぶるぶる、何を着ても寒い！！";
        case 20:
            return "ダウンジャケットでしっかり防寒";
        case 30:
            return "コートを着ないと結構寒いなあ";
        case 40:
            return "裏地付トレンチコートがおすすめ";
        case 50:
            return "薄手のジャケットを羽織ろう";
        case 60:
            return "長袖シャツ・カットソーで快適に";
        case 70:
            return "半袖＋カーディガンで温度調節を";
        case 80:
            return "半袖Tシャツ一枚で過ごせる暑さ";
        case 90:
            return "ノースリーブでもかなり暑い！！";
        case 100:
            return "暑さ対策必須！何を着ても暑い！";
        default:
            return "";
    }
}

function getIconPath(comfortIndex) {
    switch (comfortIndex) {
        case 10:
        case 20:
            return './icon/icon-large-1.png';
        case 30:
        case 40:
            return './icon/icon-large-2.png';
        case 50:
        case 60:
            return './icon/icon-large-3.png';
        case 70:
        case 80:
            return './icon/icon-large-4.png';
        case 90:
        case 100:
            return './icon/icon-large-5.png';
        default:
            return '';
    }
}

function getAdditionalInfo(comfortIndex) {
    switch (comfortIndex) {
        case 10:
            return "<p>体感温度指数10は、ダウンやコート、ジャケットなどでしっかり防寒しても寒さが厳しい、冬本番の日です。アウターにプラスして、温かいインナーやセーター、マフラーを活用して寒さ対策をしましょう。お出掛けの予定がある場合など、外に長時間出ている可能性がある場合は、カイロを持っておくといいかもしれません。</p><p>体感温度指数は、気温だけでなく湿度や風の予想などを加味して計算した体感の指数です。指数10は防寒着必須の寒さ、指数100では猛烈な暑さが予想されます。個人差があるため、あくまで目安とお考えください。</p>";
        case 20:
            return "<p>体感温度指数20は、しっかり防寒が必要な寒さの日です。厚手のアウターを着込み、風が強い日などはさらに手袋やマフラーがあると安心です。</p><p>体感温度指数は、気温だけでなく湿度や風の予想などを加味して計算した体感の指数です。指数10は防寒着必須の寒さ、指数100では猛烈な暑さが予想されます。個人差があるため、あくまで目安とお考えください。</p>";
        case 30:
            return "<p>体感温度指数30は真冬ほどではないものの、コートを着ないと寒さを感じる日です。外出の際はコートを着て、しっかり防寒をして出掛けるといいでしょう。</p><p>体感温度指数は、気温だけでなく湿度や風の予想などを加味して計算した体感の指数です。指数10は防寒着必須の寒さ、指数100では猛烈な暑さが予想されます。個人差があるため、あくまで目安とお考えください。</p>";
        case 40:
            return "<p>体感温度指数40は、季節が秋から冬へ変わる頃のように、じんわり冷えるような寒さの日です。日が落ちてからや風が強い日は寒さを強く感じることもあるため、しっかりめのアウターがおすすめです。</p><p>体感温度指数は、気温だけでなく湿度や風の予想などを加味して計算した体感の指数です。指数10は防寒着必須の寒さ、指数100では猛烈な暑さが予想されます。個人差があるため、あくまで目安とお考えください。</p>";
        case 50:
            return "<p>体感温度指数50は重ね着がおすすめの、やや肌寒さを感じる日です。長袖シャツやカットソーに薄手のジャケットやカーディガンを羽織って寒さに備えておくと、おしゃれを楽しみながら温度調節ができます。</p><p>体感温度指数は、気温だけでなく湿度や風の予想などを加味して計算した体感の指数です。指数10は防寒着必須の寒さ、指数100では猛烈な暑さが予想されます。個人差があるため、あくまで目安とお考えください。</p>";
        case 60:
            return "<p>体感温度指数60は、暖かく過ごしやすい気温で、長袖のカットソーやシャツ1枚でもOKな日です。暑がりの人は半袖にして羽織るものを用意しておくと、温度調節がしやすいでしょう。</p><p>体感温度指数は、気温だけでなく湿度や風の予想などを加味して計算した体感の指数です。指数10は防寒着必須の寒さ、指数100では猛烈な暑さが予想されます。個人差があるため、あくまで目安とお考えください。</p>";
        case 70:
            return "<p>体感温度指数70は、朝晩は冷えることもありますが、気温の上がる昼間は半袖で快適に過ごせる日です。早朝に出掛ける場合や、予定で夜遅くまで外出する場合は、薄手のカーディガンなど羽織るものがあると安心です。</p><p>体感温度指数は、気温だけでなく湿度や風の予想などを加味して計算した体感の指数です。指数10は防寒着必須の寒さ、指数100では猛烈な暑さが予想されます。個人差があるため、あくまで目安とお考えください。</p>";
        case 80:
            return "<p>体感温度指数80は、半袖1枚でも快適に過ごせる暑さの日です。このくらいの気温の時期になると、電車やバス、オフィス、商業施設など場所によってはエアコンを効かせているところも出てくるので、カーディガンやストールを持っておくと肌寒さを感じたときに羽織ることができて便利です。</p><p>体感温度指数は、気温だけでなく湿度や風の予想などを加味して計算した体感の指数です。指数10は防寒着必須の寒さ、指数100では猛烈な暑さが予想されます。個人差があるため、あくまで目安とお考えください。</p>";
        case 90:
            return "<p>体感温度指数90はかなり暑く、外を歩いているだけでも汗をかくほどの暑さです。コットンやリネン、麻素材など通気性のいい素材の服を選ぶと快適に過ごしやすいでしょう。体感温度指数90以上は紫外線も強くなるため、日焼け対策もしっかりしておくことが大切です。</p><p>体感温度指数は、気温だけでなく湿度や風の予想などを加味して計算した体感の指数です。指数10は防寒着必須の寒さ、指数100では猛烈な暑さが予想されます。個人差があるため、あくまで目安とお考えください。</p>";
        case 100:
            return "<p>体感温度指数100は、何を着てもとにかく暑い真夏日です。ノースリーブやショートパンツなどどんな体感温度をしていても暑く、熱中症対策も十分に行う必要があります。汗をたくさんかくため、速乾性・吸湿性に優れた素材の服を選ぶと快適に過ごせるでしょう。屋外が暑い分、屋内はしっかり冷房を効かせているところも多いので、羽織るものを持っておくと体を冷やし過ぎずに済みます。</p><p>体感温度指数は、気温だけでなく湿度や風の予想などを加味して計算した体感の指数です。指数10は防寒着必須の寒さ、指数100では猛烈な暑さが予想されます。個人差があるため、あくまで目安とお考えください。</p>";
        default:
            return "";
    }
}

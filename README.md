<div align="center">
  <h2>天気予報と体感温度指数</h2>
  <p>https://s1f10220252.github.io/weather-feelslike/</p>

  <img src="https://github.com/user-attachments/assets/bbf3095f-01cf-4a93-8428-4d654023174d" alt="Weather Feelslike">
</div>

## 概要

天気予報アプリは、その日の天気や気温、風速などをアイコンや数値で表示しますが、これらの数値だけでは具体的に寒さや暑さを感じ取るのは難しいです。特に風速は1mにつき体感温度が1度下がるとも言われ、さらに湿度も体感温度に大きく影響するため、単純な気温の数値だけでは実際の体感とかけ離れてしまうことがあります。

そこで、このアプリでは「今日は適温です」や「明日は真冬並の寒さです」といった具体的な表現で気温を伝え、気温だけでなく湿度や風の予想も加味した正確な体感温度を提供します。また、算出された体感温度に基づいて、その日に適した服装のアドバイスを行います。例えば、「ダウンジャケットでしっかり防寒」「半袖＋カーディガンで温度調節を」といった実用的な情報を提供し、ユーザーの快適な生活をサポートします。

## 主な機能
- 現在地の5日間の天気予報と体感温度指数を日別に表示
- 各日の詳細な天気情報（天気、最高/最低気温、風向き、風速、降水確率、体感温度）を表示
- 体感温度指数に基づくアイコンとアドバイスを表示
- レスポンシブデザインに対応

## 使用技術
- HTML, CSS, JavaScript
- OpenWeather API
- Geolocation API

## 工夫した点
- Geolocation APIを使用して、ユーザーの現在地の緯度と経度を取得
- OpenWeatherMapのAPIを使用して、天気予報データと逆ジオコーディング（緯度・経度から都市名を取得）のデータを取得
- 風向きを度数から方角に変換する関数を定義し、分かりやすく表示
- 体感温度に基づいて快適さを表す指数を計算する関数と、その指数に対応する説明文を表示する関数をを定義し、分かりやすく表示

## 改善点
このWebアプリケーションは、大学の授業の一環で作成しました。他の人の作品を見ると、全体的にサイトで表示される文字量は少なく、アイコンなどで情報を伝えようとしている印象を受けました。私の作品は文字による説明が多いため、その部分をできるだけ写真やアイコンで置き換えるべきでした。今後は、文字情報だけに頼らず、視覚的な要素を効果的に活用することで、より分かりやすく使いやすいWebアプリケーションの開発を目指していきたいです。

## 参考文献

1. OpenWeather.「5 day weather forecast」. [[https://openweathermap.org/api/one-call-3](https://openweathermap.org/api/one-call-3)](https://openweathermap.org/forecast5). (2025年2月13日閲覧).
2. tenki.jp.「体感温度指数」. [https://tenki.jp/indexes/self_temp/](https://tenki.jp/indexes/self_temp/). (2023年12月26日閲覧).
3. tenki.jp.「服装指数」. [https://tenki.jp/indexes/dress/](https://tenki.jp/indexes/dress/). (2023年12月26日閲覧).
4. ハルメク365.「服装指数とは？見方やコーデの目安、上手な活用法！」. [https://halmek.co.jp/life/c/snazzy/7498](https://halmek.co.jp/life/c/snazzy/7498). (2023年12月27日閲覧).
5. muralog.「【JavaScript】天気予報アプリの制作【WebAPIを利用】」. [https://muraumusic.com/javascript-my-weather-api/](https://muraumusic.com/javascript-my-weather-api/). (2023年12月27日閲覧).
6. freeCodeCamp.「JavaScript Geolocation API Tutorial – How to Get a User's Location in JS」. [https://www.freecodecamp.org/news/how-to-get-user-location-with-javascript-geolocation-api/](https://www.freecodecamp.org/news/how-to-get-user-location-with-javascript-geolocation-api/). (2023年12月27日閲覧).
7. Qiita.「Pythonで逆ジオコーディング【国土地理院API】」. [https://qiita.com/kosei_KB/items/5668bc6522ebe866f291](https://qiita.com/kosei_KB/items/5668bc6522ebe866f291). (2023年12月28日閲覧).
8. EASEOUT.CO.「How to Center Elements with CSS」. [https://www.easeout.co/blog/2020-06-01-how-to-center-elements-with-css/](https://www.easeout.co/blog/2020-06-01-how-to-center-elements-with-css/). (2023年12月28日閲覧).

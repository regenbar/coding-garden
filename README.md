# coding-garden
Just a follow along repo for CodingGarden challanges
 
# TODO
* [x] Find a Stock API - In network tab search of duckduckgo search gme and will give network call. There is an endpoint GME : https://duckduckgo.com/js/spice/stocks/GME
* [ ] MAYBE
    * [ ] Build a Node.js backend with socket.io
* [ ] Basic Webpage
    * [ ] Realtime price
    * [ ] Chart with realtime updates and historical data
          
 

Suggestions for charts
- chart.js
- npm lightweight-charts from tradingviews
- canvasjs
- npm i react-apexcharts << this one
- react vx

- Step 1: Skrepovao je, jer je nasao API koji ima istoriju stocka na yahoo `https://query1.finance.yahoo.com/v8/finance/chart/GME?region=US&lang=en-US&includePrePost=false&interval=1mo&range=max&corsDomain=search.yahoo.com`
mkdir api
cd api
npm init -y 
npm i axios     // postoji razlika ako je `-i` ili `i`. -i ce ga ucitati u repo, a i je lokalno u projektu
mkdir src
npm i -D eslint nodemon     // nodemon je auto restart, eslint za json lint

- Step 2: Kreiranje frontenda. Obrisao je backend. Kada je pokrenuo oplikaciju imao je problema zabog jslinta i mora da doda SKIP_PREFLIGHT check u package.json za start comandu. ispred
npm install -g create-react-app
create-react-app client
cd client
npm start
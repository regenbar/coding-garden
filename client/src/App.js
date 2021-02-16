import logo from './logo.svg';
import './App.css';

import { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts'

function App() {

  // COORS ne dozvoljava da sa jednom domaina da saljes request na drugi domain. Pa se koristi cors proxy koji dodaje proxy headers. U headerima pise nema acces origin.
  // Dodaje headere. Od februara 1 mora da odes na proxyUrl i da kazes test demo da bi ti dozvolilo da koristis to
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const stocksUrl = `${proxyUrl}https://query1.finance.yahoo.com/v8/finance/chart/GME`;
  async function getStocks() {
    // await waits for response do resolve
    // await ide ispred funkcije gde cekamo responce, a async kaze 
    const response = await fetch(stocksUrl);
    return response.json();
  }

  const priceEmoji = {
    up : "🚀",
    down : "💩",
    "" : ""
  }




  // series: [
  //   {
  //     name: "series-1",
  //     data: [
  // {
        //   x: new Date(1538778600000),
        //   y: [6629.81, 6650.5, 6623.04, 6633.33]
        // },
  //     ]
  //   }
  // ]
  const [series, setSeries] = useState([
    {
      data : []
    }
  ]);
  const [price, setPrice] = useState(0);
  const [previousPrice, setPreviousPrice] = useState(0);
  const [priceTime, setPriceTime] = useState(null);
  const [data, setData] = useState({options: {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
  },
  series: series
  });

  const round = (number) => {
    return number ? +(number.toFixed(2)) : null;
  }

  // run code when dependency changes
  useEffect(()=>{

    let timeoutId;
    async function getLatestPrice () {
        try {
          const data = await getStocks();
          const gme = data.chart.result[0];
          setPreviousPrice(price);
          setPrice(gme.meta.regularMarketPrice);
          setPriceTime(new Date(gme.meta.regularMarketTime * 1000));

          const quote = gme.indicators.quote[0];
          const prices = gme.timestamp.map((timestamp, index) => {
            return {
              x: new Date(timestamp * 1000),
              // O H L C
              y: [quote.open[index], quote.high[index], quote.low[index], quote.close[index]].map(round)
            }
          })

          setSeries([{
            data: prices
          }])
        } catch (error) {
          console.log(error);
        }
        timeoutId = setTimeout(getLatestPrice, 60000);
    }

    //timeoutId = setTimeout(getLatestPrice, 10000);
    getLatestPrice();

    // disposal function
    return () => {
      clearTimeout(timeoutId);
    }
  }, [])

  const direction = useMemo(()=>{
    if (price > previousPrice) {
      return 'up';
    } else {
      if (previousPrice > price) {
        return 'down';
      } else {
        return '';
      }
    }
  }, [previousPrice, price])
 
  return (
    <div className="app">
      <div className="title">
        GME
      </div>
      <div className={["price", direction].join(" ")}>
          ${price} {priceEmoji[direction]}
      </div>
      <div className="priceTime">
        {priceTime && priceTime.toLocaleTimeString()}
      </div>
      <div>
      <Chart
              options={data.options}
              series={data.series}
              type="candlestick"
              width="100%"
            />
      </div>
    </div>
  );
}

export default App;

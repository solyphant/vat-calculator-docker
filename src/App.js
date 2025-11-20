import { useState } from 'react';
import './App.css';
import DisplayBlock from './DisplayBlock';
import PriceEntryField from './PriceEntryField';
import VatRateField from './VatRateField';


function App() {
 const [netPrice, setNetPrice] = useState(0.0);
  const [grossPrice, setGrossPrice] = useState(0.0);
  const [vatToPay, setVatToPay] = useState(0.0);
  const [vatRate, setVatRate] = useState(20.0);

  const handleNetPriceChange = (price) => {
    const gross_price = (price * ((vatRate / 100) + 1)).toFixed(2);
    setNetPrice(parseFloat(price.toFixed(2)));
    setGrossPrice(parseFloat(gross_price));
    setVatToPay(parseFloat((gross_price - price).toFixed(2)));
};

  const handleGrossPriceChange = (price) => {
    const net_price = (price / ((vatRate / 100) + 1)).toFixed(2);
    setNetPrice(parseFloat(net_price));
    setGrossPrice(parseFloat(price.toFixed(2)));
    setVatToPay(parseFloat((price - net_price).toFixed(2)));
};

  const handleVatRateChanged = (rate) => {
    setVatRate(rate);
    updatePrices();
  };

  const updatePrices = () => {
    handleNetPriceChange(netPrice);
  };

  return (
    <div className='header field'>
      VAT CALCULATOR
      <div className='colour-border'>
        <VatRateField customstyle="field" vatRateChanged={handleVatRateChanged} value={vatRate} updatePrices={updatePrices} />
        <PriceEntryField customstyle="field" label="Price excl VAT: " priceChanged={handleNetPriceChange} price={netPrice === 0.0 ? "" : netPrice} />
        <DisplayBlock customstyle="field" label="VAT to pay: " value={vatToPay} />
        <PriceEntryField customstyle="field" label="Price incl VAT: " priceChanged={handleGrossPriceChange} price={grossPrice === 0.0 ? "" : grossPrice} />
      </div>
    </div>
  );
}

export default App;

// Source - https://stackoverflow.com/a
// Posted by Loktar, modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-20, License - CC BY-SA 3.0

var flakes = [],
    bodyHeight = getDocHeight(),
    bodyWidth = document.body.offsetWidth;


function snow() {
    for (var i = 0; i < 50; i++) {
        var flake = flakes[i];

        flake.y += flake.velY;

        if (flake.y > bodyHeight - (flake.size + 6)) {
            flake.y = 0;
        }

        flake.el.style.top = flake.y + 'px';
        flake.el.style.left = ~~flake.x + 'px';

        flake.step += flake.stepSize;
        flake.velX = Math.cos(flake.step);

        flake.x += flake.velX;

        if (flake.x > bodyWidth - 40 || flake.x < 30) {
            flake.y = 0;
        }
    }
    setTimeout(snow, 10);
};


function init() {
    var docFrag = document.createDocumentFragment();
    for (var i = 0; i < 50; i++) {
        var flake = document.createElement("div"),
            x = Math.floor(Math.random() * bodyWidth),
            y = Math.floor(Math.random() * bodyHeight),
            size = (Math.random() * 5) + 2,
            speed = (Math.random() * 1) + 0.5;

        flake.style.width = size + 'px';
        flake.style.height = size + 'px';
        flake.style.background = "#fff";

        flake.style.left = x + 'px';
        flake.style.top = y;
        flake.classList.add("flake");

        flakes.push({
            el: flake,
            speed: speed,
            velY: speed,
            velX: 0,
            x: x,
            y: y,
            size: 2,
            stepSize: (Math.random() * 5) / 100,
            step: 0
        });
        docFrag.appendChild(flake);
    }

    document.body.appendChild(docFrag);
    snow();
};

document.addEventListener("mousemove", function(e) {
    var x = e.clientX,
        y = e.clientY,
        minDist = 150;

    for (var i = 0; i < flakes.length; i++) {
        var x2 = flakes[i].x,
            y2 = flakes[i].y;

        var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));

        if (dist < minDist) {
            rad = Math.atan2(y2, x2), angle = rad / Math.PI * 180;

            flakes[i].velX = (x2 / dist) * 0.2;
            flakes[i].velY = (y2 / dist) * 0.2;

            flakes[i].x += flakes[i].velX;
            flakes[i].y += flakes[i].velY;
        } else {
            flakes[i].velY *= 0.9;
            flakes[i].velX
            if (flakes[i].velY <= flakes[i].speed) {
                flakes[i].velY = flakes[i].speed;
            }
        }
    }
});

init();

function getDocHeight() {
    return Math.max(
    Math.max(document.body.scrollHeight, document.documentElement.scrollHeight), Math.max(document.body.offsetHeight, document.documentElement.offsetHeight), Math.max(document.body.clientHeight, document.documentElement.clientHeight));
}​

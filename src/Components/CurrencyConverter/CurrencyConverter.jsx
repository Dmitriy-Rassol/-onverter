import { useState, useEffect, useRef } from "react";
import LessInput from "../StateLessInputs/LessInput";
import "./CurrencyConverter.css";

const CurrencyConverter = ({
  baseCurrencyProps,
  amountBaseProps,
  targetCurrencyProps,
  refAmountTargetProps,
  onChangeProps,
}) => {
  const [baseCurrency, setBaseCurrency] = useState("RUB");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [amount, setAmount] = useState(5000);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [reverseCurrency, setReverseCurrency] = useState(false);
  const [standartCurency] = useState(["RUB", "USD", "EUR"]);
  const amountTargetRef = useRef(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const apiKey = "3a691d69f1c14ab6a7adfcafb637a2a0";
      const url = `https://openexchangerates.org/api/currencies.json?app_id=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const currenciesWithFullNames = Object.entries(data).map(
          ([currencyCode, currencyName]) => ({
            code: currencyCode,
            name: currencyName,
          })
        );
        setCurrencies(currenciesWithFullNames);
      } catch (error) {
        console.error("Ошибка при получении валют:", error);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const apiKey = "3a691d69f1c14ab6a7adfcafb637a2a0";
      const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setExchangeRate(data.rates);
      } catch (error) {
        console.error("Ошибка при получении обменного курса:", error);
      }
    };

    fetchExchangeRate();
  }, []);

  const handleBaseCurrencyChange = (event) => {
    onChangeProps(event);
    setBaseCurrency(event.target.value);
    
  };

  const handleTargetCurrencyChange = (event) => {
    onChangeProps(event);
    setTargetCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    onChangeProps(event);
    setAmount(event.target.value);
  };

  const convertCurrency = () => {
    if (!exchangeRate) {
      return;
    }

    const baseRate = exchangeRate[baseCurrency];
    const targetRate = exchangeRate[targetCurrency];

    if (baseRate && targetRate) {
      let convertedAmount = (amount / baseRate) * targetRate;
      const formattedAmount = convertedAmount.toFixed(2);
      return formattedAmount;
    }

    return "N/A";
  };

  const ratioBaseCurrency = () => {
    if (!exchangeRate) {
      return;
    }

    const ratioBaseRate = exchangeRate[baseCurrency];
    const ratioTargetRate = exchangeRate[targetCurrency];

    if (ratioBaseRate && ratioTargetRate) {
      let convertedAmount = (1 / ratioBaseRate) * ratioTargetRate;
      return convertedAmount.toFixed(2);
    }

    return "N/A";
  };

  const ratioTargetCurrency = () => {
    if (!exchangeRate) {
      return;
    }

    const ratioBaseRate = exchangeRate[baseCurrency];
    const ratioTargetRate = exchangeRate[targetCurrency];

    if (ratioBaseRate && ratioTargetRate) {
      let convertedAmount = (1 / ratioTargetRate) * ratioBaseRate;
      return convertedAmount.toFixed(2);
    }

    return "N/A";
  };

  const reverseConverter = () => {
    setReverseCurrency(!reverseCurrency);
  };
  useEffect(() => {
    refAmountTargetProps(amountTargetRef);
  },[])
 
  useEffect(() => {
    refAmountTargetProps(amountTargetRef);
  },[amount,baseCurrency,targetCurrency])


  useEffect(() => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  }, [reverseCurrency]);

  return (
    <>
      <div className="converter-container">
        <div className="converter-content">
          <span>У меня есть {baseCurrency}</span>
          <div className="converter-content__currency">
            {standartCurency.map((currency) => (
              <LessInput
                type={"button"}
                value={currency}
                propsName={"baseCurrency"}
                key={currency}
                onClickProps={handleBaseCurrencyChange}
              />
            ))}
            <select
              value={baseCurrencyProps}
              name="baseCurrency"
              onChange={(e) => handleBaseCurrencyChange(e)}
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
          </div>
          <div className="converter-count">
            <label>
              1{baseCurrency} = {ratioBaseCurrency()}
              {targetCurrency}
            </label>
            <LessInput
              type={"number"}
              propsName={"amountBase"}
              value={amountBaseProps}
              onChangeProps={handleAmountChange}
            />
          </div>
        </div>
        <button
          className="btn-reverse"
          type="button"
          onClick={() => reverseConverter()}
        >
          <img src="src/assets/reverse.png" alt="поменять" />
        </button>
        <div className="converter-content">
          <span>Хочу приобрести {targetCurrency}</span>
          <div className="converter-content__currency">
            {standartCurency.map((currency) => (
              <LessInput
                type={"button"}
                value={currency}
                propsName={"targetCurrency"}
                key={currency}
                onClickProps={handleTargetCurrencyChange}
              />
            ))}
            <select
              value={targetCurrencyProps}
              name={"targetCurrency"}
              onChange={handleTargetCurrencyChange}
            >
              {currencies.map((currency) => (
                <option
                  key={currency.code}
                  name="targetCurrency"
                  value={currency.code}
                >
                  {currency.code}
                </option>
              ))}
            </select>
          </div>
          <div className="converter-count">
            <label>
              1{targetCurrency} = {ratioTargetCurrency()}
              {baseCurrency}
            </label>
            <LessInput
              type={"number"}
              propsName={"amountTarget"}
              value={convertCurrency()}
              refProps={amountTargetRef}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;

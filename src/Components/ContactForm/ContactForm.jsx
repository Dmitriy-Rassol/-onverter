import { useState } from "react";
import LessInput from "../StateLessInputs/LessInput";
import CurrencyConverter from "../CurrencyConverter/CurrencyConverter";
import "./ContactForm.css";
import FullInput from "../StatefullInputs/FullInput";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    baseCurrency: "USD",
    amountBase: "5000",
    targetCurrency: "RUB",
    amountTarget: "",
  });
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formData.name.length);
    if (formData.name.length == 0 && formData.email.length == 0) {
      setSubmitMessage("Введите Имя и Email");
      return false;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);
    data.append("baseCurrency", formData.baseCurrency);
    data.append("amountBase", formData.amountBase);
    data.append("targetCurrency", formData.targetCurrency);
    data.append("amountTarget", formData.amountTarget);

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setSubmitMessage("Сообщение успешно отправлено");
        setFormData({
          name: "",
          email: "",
          message: "",
          baseCurrency: "USD",
          targetCurrency: "RUB",
          amountBase: "5000",
          amountTarget: "",
        });
      } else {
        setSubmitMessage("Ошибка при отправке сообщения");
      }
    } catch (error) {
      setSubmitMessage("Произошла ошибка:" + error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputRefChange = (data) => {
    const { name, value } = data.current;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <CurrencyConverter
          baseCurrencyProps={formData.baseCurrency}
          amountBaseProps={formData.amountBase}
          targetCurrencyProps={formData.targetCurrency}
          refAmountTargetProps={handleInputRefChange}
          onChangeProps={handleInputChange}
        />
        <div className="form-content">
          <label>Имя: </label>
          <LessInput
            type={"text"}
            propsName={"name"}
            placeholder={"Введите имя"}
            value={formData.name}
            onChangeProps={handleInputChange}
          />
        </div>
        <div className="form-content">
          <label>Email:</label>
          <LessInput
            type={"email"}
            propsName={"email"}
            placeholder={"Введите email"}
            value={formData.email}
            onChangeProps={handleInputChange}
          />
        </div>
        <div className="form-content">
          <label>Сообщение: </label>
          <FullInput
            localType={"textarea"}
            propsName={"message"}
            value={formData.message}
            onChangeProps={handleInputChange}
          />
        </div>

        <button type="submit">Отправить</button>
      </form>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
};

export default ContactForm;

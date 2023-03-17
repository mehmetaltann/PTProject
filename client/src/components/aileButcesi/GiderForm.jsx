import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { plus } from "../../utils/abicons";
import { giderCategories } from "../../utils/formCategoryData";
import Button from "../UI/Button";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

const GiderForm = () => {
  const {
    giderEkle,
    error,
    setError,
    message,
    setMessage,
    startDate,
    setStartDate,
  } = useGlobalContext();
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredCategoryA, setEnteredCategoryA] = useState("Fatura");
  const [enteredCategoryB, setEnteredCategoryB] = useState("Telefon");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [catBFormData, setCatBFormData] = useState(
    giderCategories.flatMap((cat) => cat.alt)
  );

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 1500);
    }
    if (message) {
      const timer = setTimeout(() => setMessage(null), 1500);
    }
  }, [error, message]);

  const handleSelectA = (e) => {
    const catAValue = e.target.value;
    setEnteredCategoryA(catAValue);
    giderCategories.map((cat) => {
      if (cat.title === catAValue) {
        setCatBFormData(cat.alt);
      }
    });
  };

  const handleSelectB = (e) => {
    const catBValue = e.target.value;
    setEnteredCategoryB(catBValue);
    setEnteredTitle(catBValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const gider = {
      title: enteredTitle,
      amount: enteredAmount,
      date: startDate,
      categoryA: enteredCategoryA,
      categoryB: enteredCategoryB,
      description: enteredDescription,
    };
    giderEkle(gider);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredCategoryA("Fatura");
    setEnteredCategoryB("Telefon");
    setStartDate(new Date());
    setEnteredDescription("");
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}

      <div className="input-control">
        <select
          required
          value={enteredCategoryA}
          name="categoryA"
          id="categoryA"
          onChange={handleSelectA}
        >
          {giderCategories.map((category, index) => (
            <option key={index} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className="input-control">
        <select
          required
          value={enteredCategoryB}
          name="categoryB"
          id="categoryB"
          onChange={handleSelectB}
        >
          {catBFormData.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="input-control">
        <input
          type="text"
          value={enteredTitle}
          name={"title"}
          placeholder="Gider Adı"
          onChange={(e) => setEnteredTitle(e.target.value)}
        />
      </div>
      <div className="input-control">
        <input
          type="number"
          value={enteredAmount}
          name={"amount"}
          placeholder="Gider Tutarı"
          onChange={(e) => setEnteredAmount(e.target.value)}
        />
      </div>
      <div className="input-control">
        <DatePicker
          placeholderText="Tarih Giriniz"
          id="date"
          dateFormat="dd/MM/yyyy"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div className="input-control">
        <textarea
          type="text"
          value={enteredDescription}
          name={"description"}
          placeholder="Açıklama"
          cols="30"
          row="4"
          onChange={(e) => setEnteredDescription(e.target.value)}
        ></textarea>
      </div>

      <Button
        background={"var(--theme-fourth)"}
        color={"var(--theme-primary)"}
        name={"Gider Ekle"}
        icon={plus}
        bpadding={".6rem 1.2rem"}
        bradious={"35px"}
      />
    </FormStyled>
  );
};

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  overflow: hidden;

  input,
  textarea,
  select {
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    border: none;
    padding: 0.3rem 0.8rem;
    border-radius: 10px;
    resize: none;
    border: var(--theme-border);
    box-shadow: var(--theme-box-shadow);
    color: var(--theme-fourth);
    opacity: 0.8;

    &::placeholder {
      color: var(--theme-fourth);
      opacity: 0.6;
    }
  }

  .input-control {
    input,
    textarea {
      width: 100%;
    }
  }
  
  select {
    width: 100%;
    opacity: 0.6;

    &:focus,
    &:active {
      opacity: 0.8;
    }
  }
`;

export default GiderForm;

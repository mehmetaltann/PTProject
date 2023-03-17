import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { plus } from "../../utils/icons";
import { butceCategoryData } from "../../utils/localData";
import Button from "../UI/Button";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

const GelirForm = () => {
  const {
    gelirEkle,
    error,
    setError,
    message,
    setMessage,
    startDate,
    setStartDate,
  } = useGlobalContext();

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("Maaş");
  const [enteredDescription, setEnteredDescription] = useState("");

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 1500);
    }
    if (message) {
      setTimeout(() => setMessage(null), 1500);
    }
  }, [error, message]);

  const handleSelect = (e) => {
    const catValue = e.target.value;
    setEnteredCategory(catValue);
    setEnteredTitle(catValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const gelir = {
      title: enteredTitle,
      amount: enteredAmount,
      date: startDate,
      category: enteredCategory,
      description: enteredDescription,
    };
    gelirEkle(gelir);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredCategory("Maaş");
    setStartDate(new Date());
    setEnteredDescription("");
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
      <div className="selects input-control">
        <select
          required
          value={enteredCategory}
          name="category"
          id="category"
          onChange={handleSelect}
        >
          {butceCategoryData
            .filter((cat) => cat.type === "Gelir")
            .map(({ id, categoryA }) => (
              <option key={id} value={categoryA}>
                {categoryA}
              </option>
            ))}
        </select>
      </div>
      <div className="input-control">
        <input
          type="text"
          value={enteredTitle}
          name={"title"}
          placeholder="Gelir Adı"
          onChange={(e) => setEnteredTitle(e.target.value)}
        />
      </div>
      <div className="input-control">
        <input
          type="number"
          value={enteredAmount}
          name={"amount"}
          placeholder="Gelir Tutarı"
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
        name={"Gelir Ekle"}
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

  .selects {
    select {
      width: 100%;
      opacity: 0.6;

      &:focus,
      &:active {
        opacity: 0.8;
      }
    }
  }
`;

export default GelirForm;

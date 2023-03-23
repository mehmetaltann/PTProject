import { useState, useEffect } from "react";
import { butceCategoryData } from "../../utils/localData";
import { uniqListFunc } from "../../utils/help-functions";
import { plus } from "../../utils/icons";
import { useGlobalContext } from "../../context/globalContext";
import styled from "styled-components";
import Button from "../UI/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const KayitForm = () => {
  const {
    butceKalemiEkle,
    error,
    setError,
    message,
    setMessage,
    startDate,
    setStartDate,
    activeType,
    capitalizedTitle,
  } = useGlobalContext();

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredCategoryA, setEnteredCategoryA] = useState("Fatura");
  const [enteredCategoryB, setEnteredCategoryB] = useState("Telefon");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [catBFormData, setCatBFormData] = useState(
    butceCategoryData
      .filter((cat) => cat.type === "Gider")
      .filter((gidCat) => gidCat.categoryA === "Fatura")
  );

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 1500);
    }
    if (message) {
      setTimeout(() => setMessage(null), 1500);
    }
  }, [error, message]);

  const handleGiderSelectA = (e) => {
    const catAValue = e.target.value;
    setEnteredCategoryA(catAValue);
    setCatBFormData(
      butceCategoryData
        .filter((cat) => cat.type === "Gider")
        .filter((gidCat) => gidCat.categoryA === catAValue)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const yeni_kayit = {
      title: enteredTitle,
      amount: enteredAmount,
      date: startDate,
      categoryA: enteredCategoryA,
      categoryB: enteredCategoryB,
      description: enteredDescription,
    };
    butceKalemiEkle(yeni_kayit, activeType);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredCategoryA("");
    setEnteredCategoryB("");
    setStartDate(new Date());
    setEnteredDescription("");
  };

  return (
    <KayitFormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
      <h4>
        <span>{`Yeni ${capitalizedTitle}`}</span>
      </h4>
      {activeType === "gelir" ? (
        <div className="selects input-control">
          <select
            required
            value={enteredCategoryA}
            name="categoryA"
            id="categoryA"
            onChange={(e) => {
              setEnteredCategoryA(e.target.value);
              setEnteredTitle(e.target.value);
            }}
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
      ) : (
        <div className="selects">
          <div className="input-control">
            <select
              required
              value={enteredCategoryA}
              name="categoryA"
              id="categoryA"
              onChange={handleGiderSelectA}
            >
              {uniqListFunc(
                butceCategoryData.filter((cat) => cat.type === "Gider"),
                "categoryA"
              ).map(({ id, categoryA }) => (
                <option key={id} value={categoryA}>
                  {categoryA}
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
              onChange={(e) => {
                setEnteredCategoryB(e.target.value);
                setEnteredTitle(e.target.value);
              }}
            >
              {catBFormData.map(({ id, categoryB }) => (
                <option key={id} value={categoryB}>
                  {categoryB}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="input-control">
        <input
          type="text"
          value={enteredTitle}
          name={"title"}
          placeholder={`${capitalizedTitle} Adı`}
          onChange={(e) => setEnteredTitle(e.target.value)}
        />
      </div>
      <div className="input-control">
        <input
          type="number"
          value={enteredAmount}
          name={"amount"}
          placeholder={`${capitalizedTitle} Tutarı`}
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
        name={`Yeni ${capitalizedTitle} Ekle`}
        icon={plus}
        bpadding={".6rem 1.2rem"}
        bradious={"35px"}
      />
    </KayitFormStyled>
  );
};

const KayitFormStyled = styled.form`
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

  h4 {
    opacity: 0.8;
  }

  .input-control {
    input,
    textarea {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

export default KayitForm;

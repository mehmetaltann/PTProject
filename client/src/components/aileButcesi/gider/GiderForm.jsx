import { useState } from "react";
import { useGlobalContext } from "../../../context/globalContext";
import { plus } from "../../../utils/abicons";
import { giderCategories } from "../../../utils/formCategoryData";
import Button from "../../UI/Button";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

const GiderForm = () => {
  const { giderEkle, giderGetir } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    categoryA: "Fatura",
    categoryB: "Telefon",
    description: "",
  });
  const [categoryBi, setCategoryBi] = useState([
    "Telefon",
    "İnternet/TV",
    "Su",
    "Doğalgaz",
    "Elektrik",
    "Site Aidat",
    "Yakıt Parası",
  ]);

  const { title, amount, date, categoryA, categoryB, description } = inputState;

  const handleInput = (name) => (event) => {
    setInputState({ ...inputState, [name]: event.target.value });
  };

  const handleSelect = (name) => (event) => {
    const catValue = event.target.value;
    setInputState({
      ...inputState,
      [name]: event.target.value,
      ["title"]: catValue,
    });
    const categoryBPopulate = () => {
      giderCategories.map((cat) => {
        if (cat.title === catValue) {
          setCategoryBi(cat.alt);
        }
      });
    };
    categoryBPopulate();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    giderEkle(inputState);
    setInputState({
      title: "",
      amount: "",
      date: "",
      categoryA: "",
      categoryB: "",
      description: "",
    });
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <div className="selects">
        <div className="input-control">
          <select
            required
            value={categoryA}
            name="categoryA"
            id="categoryA"
            onChange={handleSelect("categoryA")}
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
            value={categoryB}
            name="categoryB"
            id="categoryB"
            onChange={handleSelect("categoryB")}
          >
            {categoryBi.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="input-control">
        <input
          type="text"
          value={title}
          name={"title"}
          placeholder="Gider Adı"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          type="number"
          value={amount}
          name={"amount"}
          placeholder="Gider Tutarı"
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control">
        <DatePicker
          placeholderText="Tarih Giriniz"
          id="date"
          dateFormat="dd/MM/yyyy"
          selected={date}
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>

      <div className="input-control">
        <textarea
          type="text"
          value={description}
          name={"description"}
          placeholder="Açıklama"
          cols="30"
          row="4"
          onChange={handleInput("description")}
        ></textarea>
      </div>
      <div>
        <Button
          background={"var(--theme-fourth)"}
          color={"var(--theme-primary)"}
          name={"Gider Ekle"}
          icon={plus}
          bpadding={".6rem 1.2rem"}
          bradious={"35px"}
        />
      </div>
    </FormStyle>
  );
};

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  input,
  textarea,
  select {
    font-size: 1.1rem;
    font-family: inherit;
    outline: none;
    border: none;
    padding: 0.3rem 0;
    border-radius: 5px;
    background: transparent;
    resize: none;
    border: var(--theme-border);
    box-shadow: var(--theme-box-shadow);
    color: var(--theme-fourth);

    &::placeholder {
      color: var(--theme-fourth);
      opacity: 0.6;
    }
  }

  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    align-items: center;
    justify-content: space-between;

    select {
      padding: 0.3rem 1.4rem;
      color: var(--theme-fourth);
      opacity: 0.6;

      &:focus,
      &:active {
        color: var(--theme-fourth);
      }
    }
  }
`;

export default GiderForm;

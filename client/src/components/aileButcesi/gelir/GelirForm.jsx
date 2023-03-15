import { useState } from "react";
import { useGlobalContext } from "../../../context/globalContext";
import { plus } from "../../../utils/abicons";
import { gelirCategories } from "../../../utils/formCategoryData";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../UI/Button";
import DatePicker from "react-datepicker";
import styled from "styled-components";

const GelirForm = () => {
  const { gelirEkle } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "Maaş",
    description: "",
  });
  const { title, amount, date, category, description } = inputState;

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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    gelirEkle(inputState);
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleSelect("category")}
        >
          {gelirCategories.map((categoryName, index) => (
            <option key={index} value={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
      </div>
      <div className="input-control">
        <input
          type="text"
          value={title}
          name={"title"}
          placeholder="Gelir Adı"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          type="number"
          value={amount}
          name={"amount"}
          placeholder="Gelir Tutarı"
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
          name={"Gelir Ekle"}
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
    font-size: 1.2rem;
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
    select {
      width: 100%;
      color: var(--theme-fourth);
      opacity: 0.6;

      &:focus,
      &:active {
        color: var(--theme-fourth);
      }
    }
  }
`;

export default GelirForm;

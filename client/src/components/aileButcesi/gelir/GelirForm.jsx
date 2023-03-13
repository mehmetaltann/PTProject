import { useState } from "react";
import { useGlobalContext } from "../../../context/globalContext";
import { plus } from "../../../utils/abicons";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../UI/Button";
import DatePicker from "react-datepicker";

const GelirForm = () => {
  const { gelirEkle } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (event) => {
    setInputState({ ...inputState, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    gelirEkle(inputState);
  };

  return (
    <form className="gelir-form" onSubmit={handleSubmit}>
      <div className="gelir-form__input-control">
        <input
          type="text"
          value={title}
          name={"title"}
          placeholder="Gelir Adı"
          onChange={handleInput("title")}
        />
      </div>
      <div className="gelir-form__input-control">
        <input
          type="text"
          value={amount}
          name={"amount"}
          placeholder="Gelir Tutarı"
          onChange={handleInput("amount")}
        />
      </div>
      <div className="gelir-form__input-control">
        <DatePicker
          placeholder="Tarih Giriniz"
          id="date"
          dateFormat="dd/MM/yyyy"
          selected={date}
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>
      <div className="gelir-form__selects">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            Seçiniz
          </option>
          <option value="Maaş">Maaş</option>
          <option value="Fon Satış">Fon Satışı</option>
          <option value="Kıst Maaş">Kıst Maaş</option>
          <option value="Sena">Sena</option>
          <option value="Promosyon">Promosyon</option>
          <option value="Kredi">Kredi</option>
          <option value="Harcırah">Harcırah</option>
          <option value="Aile">Aile</option>
          <option value="Diğer">Diğer</option>
        </select>
      </div>
      <div className="gelir-form__input-control">
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
      <div className="gelir-form__submit-btn">
        <Button
          name={"Gelir Ekle"}
          icon={plus}
          bPad={".6rem 1.2rem"}
          bRad={"35px"}
        />
      </div>
    </form>
  );
};

export default GelirForm;

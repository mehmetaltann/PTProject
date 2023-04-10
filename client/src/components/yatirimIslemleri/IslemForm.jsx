import styled from "styled-components";
import Button from "../UI/Button";
import FormInput from "../UI/FormInput";
import FormDatePicker from "../UI/FormDatePicker";
import { useEffect } from "react";
import { useYatirimContext } from "../../context/yatirimContext";
import { Form, Formik, Field, FieldArray } from "formik";
import { useState } from "react";
import { carpi, plus } from "../../utils/icons";

const IslemForm = () => {
  const {
    yatirimKalemiEkle,
    error,
    setError,
    message,
    setMessage,
    responseStatus,
    startDate,
  } = useYatirimContext();
  const [islemTuru, setIslemTuru] = useState("Alış");

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 1500);
    }
    if (message) {
      setTimeout(() => setMessage(null), 1500);
    }
  }, [error, message]);

  const initialFonInfo = {
    date: startDate,
    kod: "",
    adet: 0,
    fiyat: 0,
    komisyon: 0,
  };

  const submitHandler = async (values, { resetForm }) => {
    let portfoy_ismi = values.portfoy;
    const yeniKayitListesi = values.fons.map((fon) => {
      return {
        action: islemTuru,
        kod: fon.kod,
        date: fon.date,
        adet: fon.adet,
        fiyat: fon.fiyat,
        komisyon: fon.komisyon,
        portfoy_ismi: portfoy_ismi,
      };
    });
    yatirimKalemiEkle(yeniKayitListesi);
    if (responseStatus === 200) {
      resetForm();
    }
  };

  return (
    <IslemFormStyled>
      <div className="form-title">
        <h3>Alış - Satış İşlemleri</h3>
      </div>
      <Formik
        initialValues={{
          portfoy: "",
          fons: [initialFonInfo],
        }}
        onSubmit={submitHandler}
      >
        {({ values, isSubmitting }) => (
          <>
            <Form className="form">
              <div className="uyari-container">
                {error && <p className="error">{error}</p>}
                {message && <p className="message">{message}</p>}
              </div>
              <div className="top-container">
                <Field as="select" name="portfoy" className="portfoy">
                  <option value="" disabled defaultValue="Portföy Seçim">
                    Portföy Seçim
                  </option>
                  <option value="Bireysel Emeklilik">Bireysel Emeklilik</option>
                  <option value="Yatırım">Yatırım</option>
                </Field>
                <div className="button-group">
                  <Button
                    type={"submit"}
                    onClick={() => setIslemTuru("Alış")}
                    disabled={isSubmitting}
                    background={"var(--theme-green)"}
                    color={"var(--theme-primary)"}
                    name={isSubmitting ? `Alınıyor` : "Alış"}
                    bpadding={".6rem 3rem"}
                    bradious={"35px"}
                  />
                  <Button
                    type={"submit"}
                    onClick={() => setIslemTuru("Satış")}
                    disabled={isSubmitting}
                    background={"var(--theme-red)"}
                    color={"var(--theme-primary)"}
                    name={isSubmitting ? `Satılıyor` : "Satış"}
                    bpadding={".6rem 3rem"}
                    bradious={"35px"}
                  />
                </div>
              </div>
              <FieldArray name="fons">
                {({ push, remove }) => (
                  <div className="bottom-container">
                    <div className="labels-container">
                      <label>Tarih</label>
                      <label>Kod</label>
                      <label>Adet</label>
                      <label>Fiyat</label>
                      <label>Komisyon</label>
                    </div>
                    {values.fons.map((_, index) => (
                      <div className="inputs" key={index}>
                        <FormDatePicker
                          name={`fons.${index}.date`}
                          placeholderText="Tarih Giriniz"
                          id="date"
                          dateFormat="dd.MM.yyyy"
                          selected={startDate}
                          label="Tarih"
                        />

                        <FormInput
                          name={`fons.${index}.kod`}
                          className="kod"
                          placeholder="Kod"
                          type="text"
                          label="Kod"
                        />
                        <FormInput
                          name={`fons.${index}.adet`}
                          className="adet"
                          placeholder="Adet"
                          type="number"
                          label="Adet"
                        />
                        <FormInput
                          name={`fons.${index}.fiyat`}
                          className="fiyat"
                          placeholder="Birim fiyat"
                          type="number"
                          label="Fiyat"
                        />
                        <FormInput
                          name={`fons.${index}.komisyon`}
                          className="komisyon"
                          placeholder="Komisyon"
                          type="number"
                          label="Komisyon"
                        />

                        <Button
                          type={"button"}
                          className={"delete-btn"}
                          background={"var(--theme-fourth)"}
                          color={"var(--theme-primary)"}
                          icon={carpi}
                          bpadding={".05rem .7rem"}
                          bradious={"10px"}
                          onClick={() => remove(index)}
                        />
                      </div>
                    ))}

                    <Button
                      type={"button"}
                      className={"plus-btn"}
                      background={"var(--theme-fourth)"}
                      color={"var(--theme-primary)"}
                      icon={plus}
                      bpadding={".5rem .3rem"}
                      bradious={"10px"}
                      onClick={() => push(initialFonInfo)}
                    />
                  </div>
                )}
              </FieldArray>
            </Form>
          </>
        )}
      </Formik>
    </IslemFormStyled>
  );
};

const IslemFormStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  .form-title {
    width: 50%;
    background: var(--theme-secondary);
    border: var(--theme-border);
    box-shadow: var(--theme-box-shadow);
    padding: 0.7rem;
    border-radius: 20px;
    color: var(--theme-fourth);
    text-align: center;

    h3 {
      opacity: 0.7;
    }
  }

  .form {
    width: 50%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1rem;

    .uyari-container {
      font-weight: 600;
    }

    .top-container {
      width: 100%;
      background: var(--theme-secondary);
      border: var(--theme-border);
      box-shadow: var(--theme-box-shadow);
      padding: 0.7rem;
      border-radius: 20px;
      color: var(--theme-fourth);
      font-size: 1rem;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      gap: 3rem;

      select {
        width: 60%;
        font-size: 1rem;
        outline: none;
        padding: 0.4rem 1.5rem;
        border-radius: 20px;
        font-family: inherit;
        border: var(--theme-inputBorder);
        opacity: 0.8;
        &:focus {
          border-color: var(--theme-fourth);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
            0 0 0 3px rgba(0, 126, 255, 0.1);
          outline: none;
        }
      }

      .button-group {
        width: 100%;
        display: flex;
        gap: 1rem;
      }
    }

    .bottom-container {
      width: 100%;
      background: var(--theme-secondary);
      border: var(--theme-border);
      box-shadow: var(--theme-box-shadow);
      padding: 0.7rem;
      border-radius: 20px;
      color: var(--theme-fourth);

      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .labels-container {
        display: flex;
        justify-content: space-around;
        padding-right: 1rem;
        label {
          font-size: 1rem;
          font-weight: 500;
          display: block;
        }
      }

      .inputs {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 0.4rem;

        button {
          width: 10%;
        }
      }
    }
    .plus-btn {
      width: 10%;

      &:hover {
        background-color: var(--theme-green);
      }
    }
  }
`;

export default IslemForm;

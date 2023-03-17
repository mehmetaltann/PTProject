import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
      margin: 0;
      padding: 0;
      box-sizing: inherit; /* box-sizing özelliği kalıtsal olmuş oldu. Hepsi body'den alacak. */
      list-style: none;
    }

    html{
      font-size: 100%;

      @media only screen and (max-width: 1250px) {
        font-size: 80%;
        }
    }

    :root{
      --theme-primary: #F9F7F7;
      --theme-secondary: #e6e8ea;
      --theme-third: #3F72AF;
      --theme-fourth: #112D4E;
      --theme-green: #8DB255;
      --theme-red: #DC3023;
      --theme-black: #000000;
      --theme-white: #FFFFFF;
      --theme-box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
      --theme-border: 2px solid #FFFFFF;

    }

    body {
      background-color: var(--theme-primary);
      color: var(--theme-fourth);
      box-sizing: border-box; /* vereceğimiz padding ve margin değerlerini kutunun içinden düşer*/
      font-family: "Open Sans", sans-serif;
      font-size: clamp(1rem, 1.5vw, 1.2rem);
      font-weight: 400;
      line-height: 1.2;
      overflow: hidden;
    }

    .error{
      color:var(--theme-red);
      animation: shake 0.5s ease-in-out;
      font-size: 1rem;

      @keyframes shake {
        0%{
          transform: translate(0);
        }
        25%{
          transform: translate(15px);
        }
        50%{
          transform: translate(15px);
        }
        75%{
          transform: translate(15px);
        }
        100%{
          transform: translate(0);
        }
      }
    }

    .message{
      color:var(--theme-green);
      animation: shake 0.5s ease-in-out;

      @keyframes shake {
        0%{
          transform: translate(0);
        }
        25%{
          transform: translate(15px);
        }
        50%{
          transform: translate(15px);
        }
        75%{
          transform: translate(15px);
        }
        100%{
          transform: translate(0);
        }
      }
    }


`;

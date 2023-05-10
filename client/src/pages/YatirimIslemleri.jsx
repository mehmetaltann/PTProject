import { YatirimProvider } from "../components/yatirimIslemleri/store/yatirimContext";
import YImain from "../components/yatirimIslemleri/YImain";

const YatirimIslemleri = () => {
  return (
    <YatirimProvider>
      <YImain />
    </YatirimProvider>
  );
};

export default YatirimIslemleri;

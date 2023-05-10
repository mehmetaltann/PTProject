import YGmain from "../components/yatirimGecmisi/YGmain";
import { YGProvider } from "../components/yatirimGecmisi/store/ygContext";

const YatirimGecmisi = () => {
  return (
    <YGProvider>
      <YGmain />
    </YGProvider>
  );
};

export default YatirimGecmisi;

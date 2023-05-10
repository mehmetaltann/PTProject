import { ButceProvider } from "../components/butceIslemleri/store/butceContext";
import BImain from "../components/butceIslemleri/BImain";

const ButceIslemleri = () => {
  return (
    <ButceProvider>
      <BImain />
    </ButceProvider>
  );
};

export default ButceIslemleri;

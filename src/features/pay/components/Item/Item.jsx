import { Option } from "./Option";
import { Plan } from "./Plan";

export const Item = ({
  user,
  product,
  price,
  priceId,
  tax,
  load,
  setLoad,
  type,
  setPriceId,
  handlePortal,
  demo,
}) => {
  return product === "plan" ? (
    <Plan
      user={user}
      price={price}
      tax={tax}
      load={load}
      setLoad={setLoad}
      priceId={priceId}
      setPriceId={setPriceId}
      handlePortal={handlePortal}
      demo={demo}
    />
  ) : (
    product === "option" && (
      <Option
        user={user}
        price={price}
        tax={tax}
        load={load}
        setLoad={setLoad}
        type={type}
        priceId={priceId}
        setPriceId={setPriceId}
        handlePortal={handlePortal}
        demo={demo}
      />
    )
  );
};

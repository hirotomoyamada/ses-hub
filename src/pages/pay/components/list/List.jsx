import styles from "./List.module.scss";

import { Item } from "../Item/Item";

export const List = ({
  products,
  product,
  user,
  tax,
  load,
  setLoad,
  priceId,
  setPriceId,
  handlePortal,
  demo,
}) => {
  return (
    <div className={styles.list}>
      {products[product].prices.map(
        (price) =>
          price && (
            <Item
              key={price.id}
              user={user}
              product={product}
              price={price}
              type={products[product].type}
              tax={tax}
              load={load.portal}
              setLoad={setLoad}
              priceId={priceId}
              setPriceId={setPriceId}
              handlePortal={handlePortal}
              demo={demo}
            />
          )
      )}
    </div>
  );
};

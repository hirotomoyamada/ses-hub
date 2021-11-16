import styles from "./Container.module.scss";

import { Header } from "../header/Header";
import { List } from "../list/List";
import { Footer } from "../footer/Footer";

export const Container = ({
  products,
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
    products &&
    Object.keys(products).map(
      (product) =>
        products?.[product]?.prices?.length &&
        // ------ 削除予定 ------
        product !== "option" && // ver 1.8.0
        // ------ 削除予定 ------
         (
          <div key={product} className={styles.container}>
            <Header products={products} product={product} />
            <List
              products={products}
              product={product}
              user={user}
              tax={tax}
              load={load}
              setLoad={setLoad}
              priceId={priceId}
              setPriceId={setPriceId}
              handlePortal={handlePortal}
              demo={demo}
            />
            <Footer product={product} user={user} />
          </div>
        )
    )
  );
};

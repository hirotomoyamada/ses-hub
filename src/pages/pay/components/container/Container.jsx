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
        // ver 2.X.X
        // 削除予定
        product !== "option" &&
        products?.[product]?.prices?.length && (
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
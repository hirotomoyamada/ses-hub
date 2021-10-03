import styles from "./Header.module.scss";

export const Header = ({ products, product }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.header_ttl}>{products[product].name}</h1>
      <p>{products[product].desc}</p>
    </div>
  );
};

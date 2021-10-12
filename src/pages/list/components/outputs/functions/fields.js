export const fields = ({ value, objects, handles }) => {
  if (handles) {
    const field = objects?.map((object) => object && `【${object}】`);
    return field?.[0] && field.join("");
  } else {
    const field = objects?.map((object) => object && `・${object}`);
    return field?.[0] && `${value}\n${field.join("\n")}`;
  }
};

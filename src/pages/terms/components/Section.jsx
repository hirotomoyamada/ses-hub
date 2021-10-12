import styles from "../Terms.module.scss";

export const Section = ({ index, section }) => {
  return (
    <section className={styles.terms_section}>
      <h1 className={styles.terms_section_ttl}>
        第{index}条（{section.ttl}）
      </h1>
      <ol>
        {section.body.map((section, index) =>
          typeof section === "string" ? (
            <li key={index}>
              <p>{section}</p>
            </li>
          ) : (
            <li key={index}>
              <p>{section.ttl}</p>
              <ol>
                {section.body.map((section, index) =>
                  typeof section === "string" ? (
                    <li key={index}>
                      <p>{section}</p>
                    </li>
                  ) : (
                    <li key={index}>
                      <p>{section.ttl}</p>
                      <ol>
                        {section.body.map((section, index) => (
                          <li key={index}>
                            <p>{section}</p>
                          </li>
                        ))}
                      </ol>
                    </li>
                  )
                )}
              </ol>
            </li>
          )
        )}
      </ol>
    </section>
  );
};

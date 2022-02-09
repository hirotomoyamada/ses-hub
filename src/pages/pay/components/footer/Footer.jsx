import styles from "./Footer.module.scss";
import * as functions from "../../../../functions/functions";

export const Footer = ({ product, user }) => {
  return product === "plan" && user?.payment?.price ? (
    <ul className={styles.footer}>
      <li>
        プランは、{functions.root.timestamp(user?.payment?.end, "day")}&nbsp;
        {!user?.payment.cancel
          ? "に自動更新されます。"
          : "にキャンセルされ、利用できなくなります。"}
      </li>
      <li>現在のプランが満了するまで、他のプランへは変更できません。</li>
      <li>
        プランを変更する場合は、現在のプランをキャンセルする必要があります。キャンセルは「更新する」から行ってください。また、プランの変更は、現在のプランの満了後に行えます。
      </li>
    </ul>
  ) : product === "option" && !user?.payment?.option?.[product.type] ? (
    <ul className={styles.footer}>
      <li>オプションの契約には、プランを契約する必要があります。</li>
      <li>オプションだけのSES_HUBのご利用はできません。</li>
      <li>
        オプションの契約もプラン同様、規約に基づき契約月度にて請求が発生します。またプランの更新がなされない場合、オプションをご利用になることはできません。
      </li>
      <li>
        プラン・オプションのキャンセルは異なるため、別々に行う必要があります。
      </li>
    </ul>
  ) : (
    <></>
  );
};

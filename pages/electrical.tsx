import Image from "next/image";
import H1 from "../components/H1";
import List from "../components/List";
import styles from "../styles/Electrical.module.css";

function Electrical() {
  return (
    <main id="main">
      <H1>Electrical</H1>
      <div className={styles.container}>
        <div>
          <p className="margin-0">
            2 Masters have qualified and licensed tradesmen which can look after
            your electrical needs.
          </p>
          <p>Our services include (but are not limited to):</p>
          <List>
            <List.Item>Switchboard upgrades</List.Item>
            <List.Item>Lighting</List.Item>
            <List.Item>Rewiring</List.Item>
            <List.Item>General electric</List.Item>
          </List>
        </div>
        <div>
          <Image
            src="/images/electrical.jpg"
            alt="Switchboard"
            width={300}
            height={208}
          />
        </div>
      </div>
    </main>
  );
}

Electrical.pageTitle = "Electrical";
Electrical.pageDescription =
  "At 2 Masters, we perform various types of electrical jobs at competitive prices.";

export default Electrical;

import Image from "next/image";
import H1 from "../components/H1";
import List from "../components/List";
import styles from "../styles/Heating.module.css";

export default function Heating() {
  return (
    <main id="main">
      <H1>Heating</H1>
      <div className={styles.container}>
        <div>
          <p className="margin-0">
            At 2 Masters, we supply, install, service and repair all types of
            heaters. This includes but not limited to:
          </p>
          <List margin="16px 0 0 0">
            <List.Item>Ducted heating</List.Item>
            <List.Item>Gas wall heaters</List.Item>
            <List.Item>Split system units</List.Item>
            <List.Item>Hydronic systems</List.Item>
            <List.Item>
              Zoning options to reduce greenhouse gas emissions and minimise
              running costs
            </List.Item>
          </List>
        </div>
        <div>
          <Image
            src="/images/heating/fireplace.jpg"
            alt="Couple comfortably sitting next to a fireplace"
            width={400}
            height={265}
          />
        </div>
      </div>
      <div className={styles.heaterBrands}>
        <div className={styles.brand}>
          <Image
            src="/images/heating/panasonic.png"
            alt="Panasonic logo"
            width={140}
            height={21}
          />
        </div>
        <div className={styles.brand}>
          <Image
            src="/images/heating/samsung.png"
            alt="Samsung logo"
            width={140}
            height={46}
          />
        </div>
        <div className={styles.brand}>
          <Image
            src="/images/heating/daikin.png"
            alt="Daikin logo"
            width={140}
            height={29}
          />
        </div>
        <div className={styles.brand}>
          <Image
            src="/images/heating/lg.png"
            alt="LG logo"
            width={60}
            height={26}
          />
        </div>
        <div className={styles.brand}>
          <Image
            src="/images/heating/brivis.png"
            alt="Brivis logo"
            width={60}
            height={70}
          />
        </div>
        <div className={styles.brand}>
          <Image
            src="/images/heating/braemar.png"
            alt="Braemar logo"
            width={100}
            height={41}
          />
        </div>
      </div>
    </main>
  );
}

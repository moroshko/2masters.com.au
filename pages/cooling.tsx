import Image from "next/image";
import H1 from "../components/H1";
import List from "../components/List";
import styles from "../styles/Cooling.module.css";

function Cooling() {
  return (
    <main id="main">
      <H1>Cooling</H1>
      <div className={styles.container}>
        <div>
          <p className="margin-0">
            At 2 Masters, we supply, install, service and repair all types of
            air conditioners. This includes but is not limited to:
          </p>
          <List margin="16px 0 0 0">
            <List.Item>Split system air conditioners</List.Item>
            <List.Item>Window air conditioner</List.Item>
            <List.Item>Ducted air conditioners</List.Item>
            <List.Item>Multi-head split system air conditioners</List.Item>
            <List.Item>Evaporative</List.Item>
            <List.Item>Cassette type air conditioners</List.Item>
            <List.Item>Air conditioner add-on to a ducted heater</List.Item>
            <List.Item>
              Zoning options to reduce greenhouse gas emissions and minimise
              running costs
            </List.Item>
          </List>
        </div>
        <div>
          <Image
            src="/images/cooling.jpg"
            alt="Couple comfortably sitting in an air-conditioned living room"
            width={250}
            height={333}
          />
        </div>
      </div>
      <p>
        2 Masters are able to supply air conditioners at competitive prices.
      </p>
      <p>
        We offer scheduled servicing plans, with a frequency of service selected
        by the client. This is very popular with our body corporate management
        clients.
      </p>
      <p>
        We can also service and repair your air conditioner on ad-hoc basis.
      </p>
      <p>
        2 Masters perform high quality installations, which are backed up by our
        6 year warranty.
      </p>
      <div className={styles.brandsContainer}>
        <div className={styles.brand}>
          <Image
            src="/images/brands/mitsubishi-electric.png"
            alt="Mitsubishi Electric logo"
            width={140}
            height={41}
          />
        </div>
        <div className={styles.brand}>
          <Image
            src="/images/brands/panasonic.png"
            alt="Panasonic logo"
            width={140}
            height={21}
          />
        </div>
        <div className={styles.brand}>
          <Image
            src="/images/brands/samsung.png"
            alt="Samsung logo"
            width={140}
            height={46}
          />
        </div>
        <div className={styles.brand}>
          <Image
            src="/images/brands/daikin.png"
            alt="Daikin logo"
            width={140}
            height={29}
          />
        </div>
        <div className={styles.brand}>
          <Image
            src="/images/brands/fujitsu.png"
            alt="Fujitsu logo"
            width={140}
            height={65}
          />
        </div>
        <div className={styles.brand}>
          <Image
            src="/images/brands/kelvinator.png"
            alt="Kelvinator logo"
            width={140}
            height={22}
          />
        </div>
        <div className={styles.brand}>
          <Image
            src="/images/brands/lg.png"
            alt="LG logo"
            width={60}
            height={26}
          />
        </div>
      </div>
    </main>
  );
}

Cooling.pageTitle = "Cooling";
Cooling.pageDescription =
  "At 2 Masters, we supply, install, service and repair all types of air conditioners at competitive prices.";

export default Cooling;

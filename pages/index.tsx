import Image from "next/image";
import H2 from "../components/H2";
import List from "../components/List";
import styles from "../styles/Home.module.css";

function Home() {
  return (
    <main id="main">
      <p>
        Whether you want to keep cool in summer or warm in winter, 2 Masters can
        cater to all your heating and cooling needs at a competitive price. Our
        fully qualified team can offer you:
      </p>
      <List>
        <List.Item>Obligation free quotes/consultations</List.Item>
        <List.Item>
          Supply of heaters and air conditioners at a discounted price
        </List.Item>
        <List.Item>
          Full installation (including gas plumbing and electrical work)
        </List.Item>
        <List.Item>Plumbing and electrical safety checks</List.Item>
        <List.Item>Scheduled maintenance and service</List.Item>
      </List>
      <p>
        We cater to a variety of residential and commercial clients. No job is
        ever too big or too small!
      </p>
      <H2>Residential</H2>
      <List>
        <List.Item>Single and double storey houses</List.Item>
        <List.Item>Villa units</List.Item>
        <List.Item>Apartments</List.Item>
        <List.Item>Body corporate</List.Item>
      </List>
      <H2>Commercial</H2>
      <List>
        <List.Item>Offices</List.Item>
        <List.Item>Warehouses</List.Item>
        <List.Item>Factories</List.Item>
        <List.Item>Shops</List.Item>
        <List.Item>Shopping Complexes</List.Item>
        <List.Item>Schools</List.Item>
        <List.Item>Community Centres</List.Item>
      </List>
      <div className={styles.image} aria-hidden="true">
        <Image
          src="/images/home.jpg"
          alt="Modern air-conditioned living room"
          width={960}
          height={500}
        />
      </div>
    </main>
  );
}

Home.pageDescription =
  "Whether you want to keep cool in summer or warm in…heating and cooling needs at a competitive price.";

export default Home;

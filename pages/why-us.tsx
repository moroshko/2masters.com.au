import cx from "classnames";
import Image from "next/image";
import H1 from "../components/H1";
import H2 from "../components/H2";
import List from "../components/List";
import styles from "../styles/WhyUs.module.css";

export default function WhyUs() {
  const currentYear = new Date().getFullYear();

  return (
    <main id="main">
      <H1>Why us</H1>
      <H2>About us</H2>
      <p>
        2 Masters is a small business servicing all suburbs of Melbourne.
        Founded in 2008 by Lev and Daniel, the business has steadily grown to a
        solid team of 5 professionals; but the name 2 Masters remains!
      </p>
      <H2>The 2 Masters difference</H2>
      <div className={styles.workOfMouthContainer}>
        <p className={styles.workOfMouthText}>
          {`Most of our advertising is done through referrals and previous satisfied
        customers – a testament to the high quality service we provide and the
        consistent satisfaction of our clients. We have recently won the Service
        Award from the Word of Mouth Online website for ${currentYear}!`}
        </p>
        <div className={styles.wordOfMouthImage}>
          <Image
            src={`https://womo-assets.s3.amazonaws.com/marketing-tools/awards/wordofmouth-${currentYear}-sa-colour.png`}
            alt={`${currentYear} service award from Work of Mouth`}
            width={196}
            height={196}
          />
        </div>
      </div>
      <p>What makes 2 Masters stand out?</p>
      <p>We believe it’s our:</p>
      <List>
        <List.Item>Competitive prices</List.Item>
        <List.Item>Obligation free quotes and on-site assessments</List.Item>
        <List.Item>6 year warranty on all installations</List.Item>
        <List.Item>Monthly and seasonal specials</List.Item>
        <List.Item>
          Commitment to leaving the site clean when the work is complete
        </List.Item>
        <List.Item>
          Approachability and personal touch - we are happy to answer your
          questions and queries before <em>and</em> after a job
        </List.Item>
        <List.Item>Strive to be punctual to all appointments</List.Item>
      </List>
      <H2>Our guarantee</H2>
      <p>
        We pride ourselves on our superior quality of workmanship and service.
        All our installations come with a 6 year warranty and where necessary,
        we will provide you with a certificate of plumbing and electrical
        compliance.
      </p>
      <div className={styles.imagesContainer}>
        <div className={styles.pictureContainer}>
          <Image
            src="/images/lev.jpg"
            alt="Picture of Lev"
            width={224}
            height={296}
          />
          <span aria-hidden="true">Lev</span>
        </div>
        <div className={styles.pictureContainer}>
          <Image
            src="/images/daniel.jpg"
            alt="Picture of Daniel"
            width={224}
            height={296}
          />
          <span aria-hidden="true">Daniel</span>
        </div>
        <div className={styles.australianOwned}>
          <Image
            src="/images/australian-owned-and-operated.png"
            alt="2 Masters is Australian own and operated company"
            width={220}
            height={193}
          />
        </div>
      </div>
    </main>
  );
}

import H1 from "../components/H1";
import H2 from "../components/H2";
import List from "../components/List";

function OurClients() {
  return (
    <main id="main">
      <H1>Our Clients</H1>
      <H2>General Public</H2>
      <p>
        Our continuous commitment to high quality workmanship, excellent
        customer relationships and competitive pricing has ensured our growth
        steadily over the years. We provide free on-site pre-installation
        consultation and post-installation support.
      </p>
      <H2>Commercial</H2>
      <p>
        Many organisations sign maintenance plans with us for a year ahead to
        ensure that programmed servicing is performed at regular intervals.
        Regularly serviced air conditioners work more efficiently and provide
        air that is cleaner.
      </p>
      <H2>Builders</H2>
      <p>
        We work with many reputable builders to provide heating and cooling
        solutions for new houses and multi-unit developments.
      </p>
      <H2>Real Estate</H2>
      <p>
        We do a lot of work for real estate agencies, ensuring that tenants are
        warm in winter and cool in summer. We have a long standing relationship
        with:
      </p>
      <List>
        <List.Item>Buxton Real Estate</List.Item>
        <List.Item>Geoff Nixon Real Estate</List.Item>
        <List.Item>Jarrel Real Estate</List.Item>
        <List.Item>Hodges Real Estate</List.Item>
        <List.Item>Stockdale and Leggo</List.Item>
        <List.Item>RT Edgar</List.Item>
      </List>
    </main>
  );
}

OurClients.pageTitle = "Out Clients";
OurClients.pageDescription =
  "We work with general public, commercial, building industry and real estate clients.";

export default OurClients;

import Image from "next/image";

export default function Home() {
  return (
    <main>
      <p>
        Whether you want to keep cool in summer or warm in winter, 2 Masters can
        cater to all your heating and cooling needs at a competitive price. Our
        fully qualified team can offer you:
      </p>
      <ul>
        <li>Obligation free quotes/consultations</li>
        <li>Supply of heaters and air conditioners at a discounted price</li>
        <li>Full installation (including gas plumbing and electrical work)</li>
        <li>Plumbing and electrical safety checks</li>
        <li>Scheduled maintenance and service</li>
      </ul>
      <p>
        We cater to a variety of residential and commercial clients. No job is
        ever too big or too small!
      </p>
      <h2>Residential</h2>
      <ul>
        <li>Single and double storey houses</li>
        <li>Villa units</li>
        <li>Apartments</li>
        <li>Body corporate</li>
      </ul>
      <h2>Commercial</h2>
      <ul>
        <li>Offices</li>
        <li>Warehouses</li>
        <li>Factories</li>
        <li>Shops</li>
        <li>Shopping Complexes</li>
        <li>Schools</li>
        <li>Community Centres</li>
      </ul>
      <Image
        src="/images/home.jpg"
        alt="Modern air-conditioned living room"
        width={960}
        height={500}
      />
    </main>
  );
}

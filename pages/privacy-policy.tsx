import Link from "next/link";
import H1 from "../components/H1";
import H2 from "../components/H2";
import ExternalLink from "../components/ExternalLink";

function PrivacyPolicy() {
  return (
    <main id="main">
      <H1>Privacy Policy</H1>
      <p>
        This web site is owned and operated by 2 MASTERS and will be referred to
        as “We”, “our” and “us” in this Privacy Policy. By using this web site,
        you agree to the Privacy Policy of this web site (“the web site”), which
        is set out on this web site page. The Privacy Policy relates to the
        collection and use of personal information you may supply to us through
        your conduct on the web site.
      </p>
      <p>
        We reserve the right, at our discretion, to modify or remove portions of
        this Privacy Policy at any time. This Privacy Policy is in addition to
        any other terms and conditions applicable to the web site. We do not
        make any representations about third party web sites that may be linked
        to the web site.
      </p>
      <p>
        We recognise the importance of protecting the privacy of information
        collected about visitors to our web site, in particular information that
        is capable of identifying an individual (“personal information”). This
        Privacy Policy governs the manner in which your personal information,
        obtained through the web site, will be dealt with. This Privacy Policy
        should be reviewed periodically so that you are updated on any changes.
        We welcome your comments and feedback.
      </p>
      <H2>Personal Information</H2>
      <p>
        Personal information about visitors to our site is collected only when
        knowingly and voluntarily submitted. For example, we may need to collect
        such information to provide you with further services or to answer or
        forward any requests or enquiries. It is our intention that this policy
        will protect your personal information from being dealt with in any way
        that is inconsistent with applicable privacy laws in Australia.
      </p>
      <H2>Use of Information</H2>
      <p>
        Personal information that visitors submit to our site is used only for
        the purpose for which it is submitted or for such other secondary
        purposes that are related to the primary purpose, unless we disclose
        other uses in this Privacy Policy or at the time of collection. Copies
        of correspondence sent from the web site, that may contain personal
        information, are stored as archives for record-keeping and back-up
        purposes only.
      </p>
      <H2>Disclosure</H2>
      <p>
        Apart from where you have consented or disclosure is necessary to
        achieve the purpose for which it was submitted, personal information may
        be disclosed in special situations where we have reason to believe that
        doing so is necessary to identify, contact or bring legal action against
        anyone damaging, injuring, or interfering (intentionally or
        unintentionally) with our rights or property, users, or anyone else who
        could be harmed by such activities. Also, we may disclose personal
        information when we believe in good faith that the law requires
        disclosure.
      </p>
      <p>
        We may engage third parties to provide you with goods or services on our
        behalf. In that circumstance, we may disclose your personal information
        to those third parties in order to meet your request for goods or
        services.
      </p>
      <H2>Security</H2>
      <p>
        We strive to ensure the security, integrity and privacy of personal
        information submitted to our sites, and we review and update our
        security measures in light of current technologies. Unfortunately, no
        data transmission over the Internet can be guaranteed to be totally
        secure.
      </p>
      <p>
        However, we will endeavour to take all reasonable steps to protect the
        personal information you may transmit to us or from our online products
        and services. Once we do receive your transmission, we will also make
        our best efforts to ensure its security on our systems.
      </p>
      <p>
        In addition, our employees and the contractors who provide services
        related to our information systems are obliged to respect the
        confidentiality of any personal information held by us. However, we will
        not be held responsible for events arising from unauthorised access to
        your personal information.
      </p>
      <H2>Cookies</H2>
      <p>
        Cookies are data that a Web site transfers to an individual’s hard drive
        for record-keeping purposes. Cookies, which are industry standard and
        are used by most Web sites, including those operated by us, can
        facilitate a user’s ongoing access to and use of a site. They allow us
        to customise the web site to your needs. If you do not want information
        collected through the use of Cookies, there is a simple procedure in
        most browsers that allows you to deny or accept the Cookie feature. But
        you should note that Cookies may be necessary to provide you with some
        features of our on-line services.
      </p>
      <H2>Links to Other Sites</H2>
      <p>
        We provide links to Web sites outside of our web sites, as well as to
        third party Web sites. These linked sites are not under our control, and
        we cannot accept responsibility for the conduct of companies linked to
        our website. Before disclosing your personal information on any other
        website, we advise you to examine the terms and conditions of using that
        web site and its privacy statement.
      </p>
      <H2>Problems or Questions</H2>
      <p>
        {`If we become aware of any ongoing concerns or problems with our web
        sites, we will take these issues seriously and work to address these
        concerns. If you have any further queries relating to our Privacy
        Policy, or you have a problem or complaint, please `}
        <Link href="/contact-us">
          <a>contact us</a>
        </Link>
        .
      </p>
      <H2>Further Privacy Information</H2>
      <p>
        For more information about privacy issues in Australia and protecting
        your privacy, click{" "}
        <ExternalLink href="https://www.oaic.gov.au/">here</ExternalLink>.
      </p>
    </main>
  );
}

PrivacyPolicy.pageTitle = "Privacy Policy";
PrivacyPolicy.pageDescription = "2 Masters Privacy Policy";

export default PrivacyPolicy;

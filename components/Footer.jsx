import React from "react";

const Footer = () => {
  const productList = [
    { text: "White Paper", href: "/" },
    { text: "Contact", href: "https://deeptiranjanswain.netlify.app/" },
    {
      text: "About Us",
      href: "https://www.linkedin.com/in/deeptiranjan-swain-463357221/",
    },
    { text: "Projects", href: "https://deeptiranjanswain.netlify.app/" },
  ];
  const contactList = [
    "deeptiranjanswain777@gmail.com",
    "coderhappy777@gmail.com",
    "Contact Us",
  ];
  return (
    <footer className="text-center text-white backgroundMain lg:text-left">
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              CROwdEther
            </h6>
            <p>
              CrowdEther is a decentralized crowdfunding platform on Ethereum,
              empowering creators to raise funds securely and transparently
              through smart contracts.
            </p>
          </div>

          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Products
            </h6>
            {productList.map((item, index) => (
              <p className="mb-4" key={index}>
                <a href={item.href}>{item.text}</a>
              </p>
            ))}
          </div>

          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Useful Links
            </h6>
            {productList.slice(0, 3).map((item, index) => (
              <p className="mb-4" key={index}>
                <a href={item.href}>{item.text}</a>
              </p>
            ))}
          </div>

          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            {contactList.slice(0, 3).map((item, index) => (
              <p className="mb-4" key={index}>
                <a href={item.includes("@") ? `mailto:${item}` : "#"}>{item}</a>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="backgroundMain p-6 text-center">
        <span>
          &copy; All Rights Reserved{" "}
          <a
            href="https://deeptiranjanswain.netlify.app/"
            target="_blank"
            className="text-blue-500"
          >
            DEEPTIRANJAN SWAIN
          </a>{" "}
        </span>
      </div>
    </footer>
  );
};

export default Footer;

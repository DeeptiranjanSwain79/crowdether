import { CrowdFundingContext } from "@/contexts/CrowdFunding.context";
import React, { useContext, useState } from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import Close from "./Close";

const NavBar = () => {
  const { currentAccount, connectWallet, dappName } =
    useContext(CrowdFundingContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuList = [
    { text: "White Paper", href: "/" },
    { text: "Projects", href: "https://deeptiranjanswain.netlify.app/" },
    { text: "Contact", href: "https://deeptiranjanswain.netlify.app/" },
    {
      text: "About Us",
      href: "https://www.linkedin.com/in/deeptiranjan-swain-463357221/",
    },
  ];

  return (
    <div className="backgroundMain ">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="/"
              aria-label={dappName}
              title={dappName}
              className="inline-flex items-center mr-8"
            >
              <Logo color="text-white" />
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
                {dappName}
              </span>
            </a>

            <ul className="items-center hidden space-x-8 lg:flex">
              {menuList.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    aria-label={item.text}
                    title={item.text}
                    className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-400"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {!currentAccount ? (
            <ul className="items-center hidden space-x-8 lg:flex">
              <li>
                <button
                  onClick={connectWallet}
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-400 hover:bg-deep-purple-700 focus:shadow-outline focus:outline-none background"
                  aria-label="Sign Up"
                >
                  Connect Wallet
                </button>
              </li>
            </ul>
          ) : (
            <p className="text-white">{currentAccount?.substring(0, 15)}...</p>
          )}

          <div className="lg:hidden z-40">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu />
            </button>
          </div>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <a
                      href="/"
                      aria-label={dappName}
                      title={dappName}
                      className="inline-flex items-center"
                    >
                      <Logo color="text-back" />
                      <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                        {dappName}
                      </span>
                    </a>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Close />
                    </button>
                  </div>
                </div>

                <nav>
                  <ul className="space-y-4">
                    {menuList.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.href}
                          aria-label={item.text}
                          title={item.text}
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-400"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}

                    <li>
                      {!currentAccount ? (
                        <a
                          href="/"
                          className="inline-flex items-center background justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-400 hover:bg-deep-purple-700 focus:shadow-outline focus:outline-none"
                          aria-label="Sign Up"
                          title="Sign Up"
                        >
                          Connect Wallet
                        </a>
                      ) : (
                        <p className="text-black">
                          {currentAccount?.substring(0, 15)}...
                        </p>
                      )}
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

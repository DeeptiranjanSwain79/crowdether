import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import CrowdFundingContextProvider from "@/contexts/CrowdFunding.context";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <CrowdFundingContextProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </CrowdFundingContextProvider>
  );
}

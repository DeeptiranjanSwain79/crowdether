import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { CrowdFundingABI, CrowdFundingAddress } from "./constants";
import Web3Modal from "web3modal";

export const CrowdFundingContext = createContext();

const fetchContract = (signedOrProvider) =>
  new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signedOrProvider);

const CrowdFundingContextProvider = ({ children }) => {
  const dappName = "CrowdEther";
  const [currentAccount, setCurrentAccount] = useState("");

  const createCampaign = async (campaign) => {
    const { title, description, amount, deadline } = campaign;

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const transaction = await contract.createCampaign(
        currentAccount, //owner
        title,
        description,
        ethers.utils.parseUnits(amount, 18), //Converting to ether
        new Date(deadline).getTime() //converting to uint256 format
      );

      await transaction.wait();
      console.log("Campaign created", transaction);
      return transaction;
    } catch (error) {
      console.log("Error in creating campaign", error);
    }
  };

  const getCampaigns = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const campaigns = await contract.getCampaigns();
// console.log(campaigns)
    const parsedCampaigns = campaigns.map((campaign, index) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target?.toString()),
      deadline: campaign.deadline?.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected?.toString()
      ),
      pid: index,
    }));
    // console.log(parsedCampaigns);
    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const allCampaigns = await contract.getCampaigns();

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const currentUser = accounts[0];

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner?.toLowerCase() === currentUser
    );

    const parsedCampaigns = filteredCampaigns.map((campaign, index) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target?.toString()),
      deadline: campaign.deadline?.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected?.toString()
      ),
      pid: index,
    }));
    return parsedCampaigns;
  };

  const donateToCampaign = async (id, amount) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const donation = await contract.donateToCampaign(id, {
        value: ethers.utils.parseEther(amount),
      });

      await donation.wait();
      console.log("Donation to campaign created", donation);
      return donation;
    } catch (error) {
      console.log("Error while donating to a campaign", error);
    }
  };

  const getDonations = async (id) => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const donations = await contract.getDonators(id);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  // CHECK if wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        return console.log("Install Metamask");
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log("Something went wrong while connecting to the wallet", error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // Connect wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        return console.log("Install Metamask");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error while connecting to wallet", error);
    }
  };
  return (
    <CrowdFundingContext.Provider
      value={{
        dappName,
        currentAccount,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        donateToCampaign,
        getDonations,
        connectWallet,
      }}
    >
      {children}
    </CrowdFundingContext.Provider>
  );
};

export default CrowdFundingContextProvider;

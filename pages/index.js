import Card from "@/components/Card";
import Hero from "@/components/Hero";
import PopUp from "@/components/PopUp";
import { CrowdFundingContext } from "@/contexts/CrowdFunding.context";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const index = () => {
  const {
    dappName,
    createCampaign,
    getCampaigns,
    getUserCampaigns,
    donateToCampaign,
    getDonations,
  } = useContext(CrowdFundingContext);

  const [allCampaigns, setAllCampaigns] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const getCampaignData = getCampaigns();
    const userCampaignsData = getUserCampaigns();
    return async () => {
      const allData = await getCampaignData;
      const userData = await userCampaignsData;

      setAllCampaigns(allData);
      setUserCampaigns(userData);
    };
  }, [refetch]);

  // Donate PopUp Modal
  const [openModal, setOpenModal] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={"light"}
      />

      <Hero titleData={dappName} createCampaign={createCampaign} />

      <Card
        title="All Listed Campaigns"
        allCampaigns={allCampaigns}
        setOpenModal={setOpenModal}
        setDonate={setDonateCampaign}
      />

      <Card
        title="Your Campaigns"
        allCampaigns={userCampaigns}
        setOpenModal={setOpenModal}
        setDonate={setDonateCampaign}
      />

      {openModal && (
        <PopUp
          setOpenModal={setOpenModal}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donateToCampaign}
          setRefetch={setRefetch}
        />
      )}
    </>
  );
};

export default index;

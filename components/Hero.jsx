import React, { useState } from "react";
import { toast } from "react-toastify";
import ICON from "./ICON";
import Arrow from "./Arrow";
import ButtonLoader from "./ButtonLoader";

const Hero = ({ titleData, createCampaign }) => {
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    amount: "",
    deadline: "",
  });
  const [createCampaignLoading, setCreateCampaignLoading] = useState(false);

  const createNewCampaign = async (e) => {
    e.preventDefault();
    try {
      setCreateCampaignLoading(true);
      const data = await createCampaign(campaign);

      if (data) {
        console.log(data);
        toast.success("Campaign created successfully");
        setCampaign({
          title: "",
          description: "",
          amount: "",
          deadline: "",
        });
        toast.success("Campaign created successfully");
        window.location.reload();
      }
      setCreateCampaignLoading(false);
    } catch (error) {
      setCreateCampaignLoading(false);
      console.log(error.message);
    }
  };
  return (
    <div className="relative">
      <span className="coverline" />
      <img
        src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
        alt=""
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="relative bg-opacity-75 backgroundMain">
        <ICON />
        <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-none">
                Crowd Ether <br className="hidden md:block" />
                Crowd Funding DApp
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                Welcome to Crowd Ether, where your ideas meet global support.
                Launch your campaign on our decentralized platform, built on
                Ethereum, and raise funds securely and transparently.
              </p>
              <a
                href="/"
                className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-400 hover:text-teal-700"
              >
                Learn More
                <Arrow />
              </a>
            </div>

            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  Campaign
                </h3>
                <form>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="title"
                      className="inline-block mb-1 font-medium"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setCampaign({ ...campaign, title: e.target.value })
                      }
                      placeholder="Title *"
                      required
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                      id="title"
                      name="title"
                    />
                  </div>

                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="Description"
                      className="inline-block mb-1 font-medium"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setCampaign({
                          ...campaign,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description *"
                      required
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                      id="description"
                      name="description"
                    />
                  </div>

                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="Amount"
                      className="inline-block mb-1 font-medium"
                    >
                      Target Amount
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setCampaign({
                          ...campaign,
                          amount: e.target.value,
                        })
                      }
                      placeholder="Amount *"
                      required
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                      id="amount"
                      name="amount"
                    />
                  </div>

                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="Deadline"
                      className="inline-block mb-1 font-medium"
                    >
                      Deadline
                    </label>
                    <input
                      type="date"
                      onChange={(e) =>
                        setCampaign({
                          ...campaign,
                          deadline: e.target.value,
                        })
                      }
                      placeholder="Deadline *"
                      required
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                      id="deadline"
                      name="deadline"
                    />
                  </div>

                  <div className="mt-4 mb-2 sm:mb-4">
                    <button
                      onClick={(e) => createNewCampaign(e)}
                      type="submit"
                      className="inline-flex items-center justify-center h-12 w-full font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-400 hover:bg-deep-purple-700 focus:shadow-outline focus:outline-none background"
                      disabled={createCampaignLoading}
                    >
                      {createCampaignLoading ? (
                        <ButtonLoader />
                      ) : (
                        "Create Campaign"
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 sm:text-sm">
                    Create your Campaign to raise funds
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

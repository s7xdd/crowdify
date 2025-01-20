import React, { useContext, createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import CampaignABI from "./CampaignABI.json";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const CONTRACT_ADDRESS = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

  const connect = async () => {
    if (typeof window.ethereum === "undefined") {
      console.error("No Web3 provider found. Install MetaMask!");
      alert("Please install MetaMask to connect.");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("web3Provider", web3Provider);
      const web3Signer = web3Provider.getSigner();

      const userAddress = await web3Signer.getAddress();

      const deployedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CampaignABI.abi,
        web3Signer
      );

      setProvider(web3Provider);
      setSigner(web3Signer);
      setAddress(userAddress);
      setContract(deployedContract);

      console.log("Connected successfully:");
      console.log("Address:", userAddress);
      console.log("Contract:", deployedContract);
    } catch (error) {
      console.error("Failed to connect:", error);
      if (error.code === 4001) {
        alert("Connection request was rejected. Please try again.");
      } else {
        alert("Failed to connect. Please check the console for more details.");
      }
    }
  };

  useEffect(() => {
    console.log("Contract useeffect", contract);
  }, [contract]);

  const publishCampaign = async (form) => {
    if (!contract || !address) {
      console.error("Contract or wallet not connected");
      return;
    }

    try {
      console.log(
        "Deadline passed to contract:",
        new Date(form.deadline).getTime() / 1000
      );

      const tx = await contract.createCampaign(
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image
      );
      await tx.wait();
      console.log("Campaign created successfully:", tx);
      return tx;
    } catch (error) {
      console.error("Error creating campaign:", error);
      if (error.code === 4001) {
        console.error("User rejected the transaction");
      } else if (error.code === -32603) {
        console.error("Reverted: ", error.data);
      } else {
        console.error("Unknown error:", error);
      }
      throw error;
    }
  };

  const getCampaigns = async () => {
    if (!contract) {
      console.error("Contract not connected");
      return [];
    }

    try {
      const campaigns = await contract.getCampaigns();
      const parsedCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        image: campaign.image,
        pId: i,
      }));
      return parsedCampaigns;
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      if (error.code === 4001) {
        console.error("User rejected the transaction");
      } else if (error.code === -32603) {
        console.error("Reverted: ", error.data);
      } else {
        console.error("Unknown error:", error);
      }
      return [];
    }
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    if (!contract || !address) {
      console.error("Contract or wallet not connected");
      return;
    }

    try {
      const tx = await contract.donateToCampaign(pId, {
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      console.log("Donation successful:", tx);
      return tx;
    } catch (error) {
      console.error("Error donating:", error);
      if (error.code === 4001) {
        console.error("User rejected the transaction");
      } else if (error.code === -32603) {
        console.error("Reverted: ", error.data);
      } else {
        console.error("Unknown error:", error);
      }
      throw error;
    }
  };

  const getDonations = async (pId) => {
    if (!contract) {
      console.error("Contract not connected");
      return [];
    }

    try {
      const donations = await contract.getDonators(pId);
      const parsedDonations = donations[0].map((donator, index) => ({
        donator,
        donation: ethers.utils.formatEther(donations[1][index].toString()),
      }));
      return parsedDonations;
    } catch (error) {
      console.error("Error fetching donations:", error);
      if (error.code === 4001) {
        console.error("User rejected the transaction");
      } else if (error.code === -32603) {
        console.error("Reverted: ", error.data);
      } else {
        console.error("Unknown error:", error);
      }
      return [];
    }
  };

  const createWithdrawalRequest = async (pId) => {
    if (!contract || !address) {
      console.error("Contract or wallet not connected");
      return;
    }

    try {
      const tx = await contract.createWithdrawalRequest(pId);
      await tx.wait();
      console.log("Withdrawal request created successfully:", tx);
      return tx;
    } catch (error) {
      console.error("Error creating withdrawal request:", error);
      throw error;
    }
  };

  const vote = async (pId, inFavor) => {
    if (!contract || !address) {
      console.error("Contract or wallet not connected");
      return;
    }

    try {
      const tx = await contract.vote(pId, inFavor);
      await tx.wait();
      console.log("Vote cast successfully:", tx);
      return tx;
    } catch (error) {
      console.error("Error casting vote:", error);
      throw error;
    }
  };

  const executeWithdrawal = async (pId) => {
    if (!contract || !address) {
      console.error("Contract or wallet not connected");
      return;
    }

    try {
      const tx = await contract.executeWithdrawal(pId);
      await tx.wait();
      console.log("Withdrawal executed successfully:", tx);
      return tx;
    } catch (error) {
      console.error("Error executing withdrawal:", error);
      throw error;
    }
  };

  const getWithdrawalRequestInfo = async (pId) => {
    if (!contract) {
      console.error("Contract not connected");
      return null;
    }

    try {
      const info = await contract.getWithdrawalRequestInfo(pId);
      return {
        exists: info[0],
        votesFor: info[1].toNumber(),
        votesAgainst: info[2].toNumber(),
      };
    } catch (error) {
      console.error("Error fetching withdrawal request info:", error);
      return null;
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        publishCampaign,
        getCampaigns,
        donate,
        getDonations,
        contract,
        getUserCampaigns,
        createWithdrawalRequest,
        vote,
        executeWithdrawal,
        getWithdrawalRequestInfo,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);


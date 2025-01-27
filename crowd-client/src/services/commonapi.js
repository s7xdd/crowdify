// get campain

import axios from "axios";

export const getCampaigns = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/campaigns");
        return response.data;
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        throw error;
    }
};

export const getActivities = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/activities");
        return response.data;
    } catch (error) {
        console.error("Error fetching activities:", error);
        throw error;
    }
};  


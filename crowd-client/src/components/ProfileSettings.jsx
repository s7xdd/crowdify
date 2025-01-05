import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "../App.css";
import { WalletContext } from "../ContextAPI/walletContext";

function ProfileSettings() {
  const { account, isConnected } = useContext(WalletContext);
  const [formData, setFormData] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchUserData = async () => {
      if (!account) return;

      setLoading(true);
      setError(null);
      try {
        // Fetch user data by wallet ID
        const response = await axios.get(`${API_URL}/api/users?walletId=${account}`);
        const data = response.data;
        if (!response.data || data.length === 0) {
          throw new Error("User not found.");
        }
        const user = data[0];
        setFormData(user);

        // Fetch campaigns by wallet ID
        const campaignsResponse = await axios.get(`${API_URL}/api/campaigns?walletId=${account}`);
        const campaignsData = campaignsResponse.data;
        if (!campaignsResponse.data) {
          throw new Error("Failed to fetch campaigns.");
        }
        setCampaigns(campaignsData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [account, API_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, bannerImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/api/users/${formData._id}`, formData);
      if (!response.data) {
        throw new Error("Failed to update user profile.");
      }
      alert("Settings saved successfully!");
    } catch (err) {
      console.error("Error saving settings:", err);
      alert(err.message || "Failed to save settings.");
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center">
          <h1 className="display-1">Please connect your wallet</h1>
          <p className="lead">You need to connect your wallet to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-danger">{error}</div>
        ) : (
          formData && (
            <div className="card">
              <div className="card-header">
                <h2>Personal Info</h2>
                <p>Update your personal info and manage your campaigns.</p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName || ""}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="form-control"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName || ""}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Wallet ID</label>
                    <input
                      type="text"
                      name="walletId"
                      value={formData.walletId || ""}
                      disabled
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Your Campaigns</label>
                    <ul>
                      {campaigns.map((campaign) => (
                        <li key={campaign._id}>
                          {campaign.title} - €{campaign.amount}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="form-group">
                    <label>Banner Image</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="form-control" />
                    {formData.bannerImage && (
                      <img
                        src={formData.bannerImage}
                        alt="Banner Preview"
                        style={{ width: "100%", height: "auto", marginTop: "10px" }}
                      />
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Settings
                  </button>
                </form>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ProfileSettings;


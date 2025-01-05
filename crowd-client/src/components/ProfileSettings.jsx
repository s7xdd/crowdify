import { useContext, useEffect, useState } from "react";
import "../App.css"; // Import your CSS file for styling
import { WalletContext } from "../ContextAPI/walletContext";

function ProfileSettings() {
  const { account, isConnected } = useContext(WalletContext);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users?walletId=${account}`);
        const data = await response.json();
        setFormData(data[0]); // Assuming the walletId is unique, hence we take the first user.
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    if (account) {
      getMyProfile();
    }
  }, [account]);

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
    try {
      const response = await fetch(`http://localhost:5000/api/users/${formData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Settings Saved Successfully!");
      } else {
        alert("Failed to save settings.");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings.");
    }
  };

  if (!isConnected) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center">
          <h1 className="display-1">Please connect your wallet</h1>
          <p className="lead">You need to connect your wallet to access this page.</p>
          <button className="btn btn-success" onClick={() => connectWallet()}>
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        {formData && (
          <div className="">
            <div className="card">
              <div className="card-header">
                <h2>Personal Info</h2>
                <p>Update your personal info with your data preferences</p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Name Section */}
                  <div className="form-group">
                    <label>Name</label>
                    <div className="input-row">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className="form-control"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* Campaign Title */}
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Account</label>
                    <input
                      type="text"
                      name="account"
                      value={formData.walletId}
                      disabled
                      placeholder="Account"
                      className="form-control"
                    />
                  </div>

                  {/* Avatar Settings */}
                  <div className="form-group">
                    <label>Profile Picture</label>
                    <div className="avatar-settings">
                      <div className="avatar-preview">{formData.person}</div>
                      <div>
                        <select
                          name="person"
                          value={formData.person}
                          onChange={handleInputChange}
                          className="form-control"
                        >
                          <option value="Matthew">Matthew</option>
                        </select>
                        <select
                          name="skinTone"
                          value={formData.skinTone}
                          onChange={handleInputChange}
                          className="form-control"
                        >
                          <option value="Black">Black</option>
                        </select>
                        <select
                          name="pose"
                          value={formData.pose}
                          onChange={handleInputChange}
                          className="form-control"
                        >
                          <option value="1 Happy">1 Happy</option>
                        </select>
                        <div>
                          <label>
                            <input
                              type="radio"
                              name="gender"
                              value="Male"
                              checked={formData.gender === "Male"}
                              onChange={handleInputChange}
                            />
                            Male
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="gender"
                              value="Female"
                              checked={formData.gender === "Female"}
                              onChange={handleInputChange}
                            />
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="form-group">
                    <p>You will get 99.9% of the raised amount</p>
                  </div>

                  {/* Localization */}
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Location"
                      className="form-control"
                    />
                  </div>

                  {/* Banner Image */}
                  <div className="form-group">
                    <label>Banner Image</label>
                    <div className="image-upload">
                      <div
                        style={{
                          border: "2px dashed #ccc",
                          padding: "20px",
                          borderRadius: "8px",
                          textAlign: "center",
                          backgroundColor: "#f9f9f9",
                          cursor: "pointer",
                        }}
                        onClick={() => document.getElementById("fileInput").click()}
                      >
                        <p
                          style={{
                            margin: 0,
                            color: "black",
                            fontSize: "10px",
                          }}
                        >
                          Click to upload or drag and drop your image here.
                          <br />
                          <small>SVG, PNG, JPG, GIF (max. 1MB)</small>
                        </p>
                      </div>
                      <input
                        id="fileInput"
                        type="file"
                        accept=".svg, .png, .jpg, .jpeg, .gif"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </div>
                    {formData.bannerImage && (
                      <img
                        src={formData.bannerImage}
                        alt="Banner Preview"
                        className="banner-preview"
                      />
                    )}
                  </div>

                  {/* Save Button */}
                  <button type="submit" className="save-button">
                    Save settings
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileSettings;

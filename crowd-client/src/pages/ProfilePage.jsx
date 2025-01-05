import { useContext, useState } from "react";
import "../App.css"; // Import your CSS file for styling
import SettingsPage from "../components/ProfileSettings"; // Import SettingsPage Component (the existing profile form)
import ProfileFav from "../components/ProfileFav";
import { WalletContext } from "../ContextAPI/walletContext";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("settings"); // State to manage active tab
  const {  isConnected,connectWallet } = useContext(WalletContext);
  const renderActiveTab = () => {
    switch (activeTab) {
      case "settings":
        return <SettingsPage />;
      case "favorites":
        return <ProfileFav />;
      case "history":
        return (
          <div className="tab-content">Your History will appear here.</div>
        );
      default:
        return null;
    }
  
  };
  if (!isConnected) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center">
          <h1 className="display-1">Please connect your wallet</h1>
          <p className="lead">You need to connect your wallet to access this page.</p>
          <button className="btn btn-success" onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-3">
            <div className="list-group">
              <a
                href="#"
                className={`list-group-item list-group-item-action text-center ${activeTab === "settings" ? "active" : ""
                  }`}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </a>
              <a
                href="#"
                className={`list-group-item list-group-item-action text-center ${activeTab === "favorites" ? "active" : ""
                  }`}
                onClick={() => setActiveTab("favorites")}
              >
                Favorites
              </a>
              <a
                href="#"
                className={`list-group-item list-group-item-action text-center ${activeTab === "history" ? "active" : ""
                  }`}
                onClick={() => setActiveTab("history")}
              >
                History
              </a>
            </div>
          </div>

          <div className="col-md-9">
            <div className="tab-content-wrapper">{renderActiveTab()}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

import { useState, useEffect, useContext } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { WalletContext } from "../ContextAPI/walletContext";

function CampaignCard() {
  const [campaignData, setCampaignData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [lgShow, setLgShow] = useState(false);
  const [donateModalShow, setDonateModalShow] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [favoriteCampaigns, setFavoriteCampaigns] = useState([]);
  const { account } = useContext(WalletContext);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/campaigns");
        if (!response.ok) {
          throw new Error(`Failed to fetch campaigns: ${response.statusText}`);
        }
        const data = await response.json();
        setCampaignData(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error.message);
        setError("Failed to load campaigns. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    const fetchFavoriteCampaigns = async () => {
      if (!account) return;
      try {
        const response = await fetch(`http://localhost:5000/api/users/${account}/favorite-campaigns`);
        if (!response.ok) {
          throw new Error(`Failed to fetch favorite campaigns: ${response.statusText}`);
        }
        const data = await response.json();
        setFavoriteCampaigns(data);
      } catch (error) {
        console.error("Error fetching favorite campaigns:", error.message);
      }
    };

    fetchFavoriteCampaigns();
  }, [account]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <p>Loading campaigns...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  const handleClose = () => setLgShow(false);
  const handleCloseDonateModal = () => setDonateModalShow(false);

  const handleDonate = (campaign) => {
    if (!account) {
      alert("Please connect your wallet to donate.");
      return;
    }
    setSelectedCampaign(campaign);
    setDonateModalShow(true);
  };

  const handleDonationSubmit = () => {
    if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    console.log(`Donated ${donationAmount} to campaign ${selectedCampaign.title}`);
    setDonateModalShow(false);
  };

  const handleOpenModal = (campaign) => {
    if (campaign) {
      setSelectedCampaign(campaign);
      setLgShow(true);
    }
  };

  const handleFavoriteCampaign = (campaign) => {
    if (!account) {
      alert("Please connect your wallet to favorite a campaign.");
      return;
    }
    if (favoriteCampaigns.includes(campaign._id)) {
      setFavoriteCampaigns(favoriteCampaigns.filter((id) => id !== campaign._id));
    } else {
      setFavoriteCampaigns([...favoriteCampaigns, campaign._id]);
    }

    try {
      fetch(`http://localhost:5000/api/users/${account}/favorite-campaigns`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favoriteCampaigns: favoriteCampaigns }),
      });
    } catch (error) {
      console.error("Error updating favorite campaigns:", error.message);
    }
  };

  return (
    <>
      <Row className="d-flex justify-content-center align-items-center text-center mt-5">
        {campaignData.map((campaign) => (
          <Col xs={12} md={4} lg={4} className="px-3" key={campaign._id}>
            <div className="mb-4">
              <Card className="shadow-lg border-0 rounded" style={{ transition: "transform 0.3s" }}>
                <Card.Img
                  variant="top"
                  src={campaign.image || "https://via.placeholder.com/150"}
                  className="img-fluid rounded-top"
                  alt="Campaign"
                  onClick={() => handleOpenModal(campaign)}
                  style={{ cursor: "pointer" }}
                />
                <Card.Body>
                  <div className="d-flex flex-row align-items-center gap-3">
                    <img
                      width={"40px"}
                      height={"40px"}
                      style={{ borderRadius: "50%" }}
                      src={campaign.ownerImage || "https://via.placeholder.com/40"}
                      alt="Owner"
                    />
                    <p style={{ fontSize: "1.2rem" }}>{campaign.owner || "Unknown Owner"}</p>
                  </div>
                  <Card.Title className="text-primary">{campaign.title || "No Title"}</Card.Title>
                  <Card.Text className="text-secondary">{campaign.description || "No description provided."}</Card.Text>
                  <div className="progress" style={{ height: "10px" }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${campaign.progress || 0}%` }}
                      aria-valuenow={campaign.progress || 0}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <p className="text-primary">${campaign.amount || "0"}</p>
                    <p className="text-secondary">{campaign.progress || 0}%</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    {campaign.walletId !== account && (
                      <button className="btn btn-success" onClick={() => handleDonate(campaign)}>Donate</button>
                    )}
                    <button className="btn border " onClick={() => handleFavoriteCampaign(campaign)}>
                    {favoriteCampaigns.includes(campaign._id) ? <i style={{ color: "red" }} className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>

      {/* Campaign Modal */}
      <Modal size="lg" show={lgShow} onHide={handleClose} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">{selectedCampaign && selectedCampaign.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img
                src={selectedCampaign && selectedCampaign.image}
                alt="Campaign image"
                className="img-fluid mb-3 rounded"
              />
            </Col>
            <Col md={6} className="text-wrap max-w-md">
              <h5>Owner: {selectedCampaign?.owner}</h5>
              <h5 style={{ wordBreak: "break-word", color: "green" }}>
                Wallet: {selectedCampaign?.walletId}
              </h5>
              <h5>Total donations: ${selectedCampaign?.donations.toFixed(2)}</h5>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* Donate Modal */}
      <Modal show={donateModalShow} onHide={handleCloseDonateModal} aria-labelledby="donate-modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="donate-modal-title">Donate to {selectedCampaign?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <h5 className="text-muted">Campaign Information</h5>
              <p><strong>Owner:</strong> {selectedCampaign?.owner}</p>
              <p><strong>Description:</strong> {selectedCampaign?.description}</p>
              <p><strong>Goal:</strong> ${selectedCampaign?.amount}</p>
            </Col>
            <Col md={12} className="mt-3">
              <label htmlFor="donationAmount" className="form-label">
                Donation Amount ($):
              </label>
              <input
                type="number"
                className="form-control rounded-pill p-3"
                id="donationAmount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                placeholder="Enter donation amount"
                min="0.01"
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary rounded-pill" onClick={handleCloseDonateModal}>
            Cancel
          </button>
          <button className="btn btn-primary rounded-pill" onClick={handleDonationSubmit}>
            Confirm Donation
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CampaignCard;


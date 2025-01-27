import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useStateContext } from "../ContextAPI/web3";
import { ethers } from "ethers";

function CampaignCard() {
  const [campaignData, setCampaignData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donateModalShow, setDonateModalShow] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const { address, connect, donate, getDonations } = useStateContext(); // Web3 functions

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

  const handleCloseDonateModal = () => {
    setDonateModalShow(false);
    setDonationAmount("");
  };

  const handleDonate = (campaign) => {
    if (!address) {
      alert("Please connect your wallet to donate.");
      return;
    }
    setSelectedCampaign(campaign);
    setDonateModalShow(true);
  };

  const handleDonationSubmit = async () => {
    if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      const campaignId = selectedCampaign._id;

      // Ensure the donation amount is a properly formatted string

            console.log(campaignId, donationAmount);
      
      await donate("error",campaignId, donationAmount);
      
      alert(`Successfully donated ${donationAmount} ETH to ${selectedCampaign.title}`);

      setDonateModalShow(false);
      setDonationAmount("");
    } catch (error) {
      console.error("Donation failed:", error.message);
      alert("Donation failed. Please try again.");
    }
  };

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

  return (
    <>
      <Row className="d-flex justify-content-center align-items-center text-center mt-5">
        {campaignData.map((campaign) => (
          <Col xs={12} md={4} lg={4} className="px-3" key={campaign._id}>
            <div className="mb-4">
              <Card className="shadow-lg border-0 rounded">
                <Card.Img
                  variant="top"
                  width={"100px"}
                  height={"60px"}
                  src={campaign.image || "https://via.placeholder.com/150"}
                  className="img-fluid rounded-top"
                  alt="Campaign"
                  onClick={() => handleDonate(campaign)}
                  style={{ cursor: "pointer" }}
                />
                <Card.Body>
                  <Card.Title className="text-primary">{campaign.title}</Card.Title>
                  <Card.Text className="text-secondary">{campaign.description}</Card.Text>
                  <div className="progress" style={{ height: "10px" }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${campaign.progress}%` }}
                      aria-valuenow={campaign.progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <p className="text-primary">Target: {campaign.amount} ETH</p>
                    <p className="text-secondary">Progress: {campaign.progress}%</p>
                  </div>
                  <button className="btn btn-success" onClick={() => handleDonate(campaign)}>Donate</button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>

      {/* Donate Modal */}
      <Modal show={donateModalShow} onHide={handleCloseDonateModal} aria-labelledby="donate-modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="donate-modal-title">Donate to {selectedCampaign?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-3">
            <label htmlFor="donationAmount" className="form-label">Donation Amount (ETH):</label>
            <input
              type="text"
              className="form-control rounded-pill p-3"
              id="donationAmount"
              value={donationAmount}
              onChange={(e) => {
                const value = e.target.value;
                setDonationAmount(value);
              }}
              placeholder="Enter donation amount"
              min="0.01"
            />
          </div>
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


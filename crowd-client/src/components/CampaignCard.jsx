import { useState, useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";

function CampaignCard() {
  const [campaignData, setCampaignData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/campaigns"); // Adjust URL if needed
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
              <Card style={{ width: "100%" }}>
                <Card.Img
                  variant="top"
                  src={campaign.image || "https://via.placeholder.com/150"}
                  className="img-fluid"
                  alt="Campaign"
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
                  <Card.Text className="text-secondary">
                    {campaign.description || "No description provided."}
                  </Card.Text>
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
                    <p className="text-primary">€{campaign.amount || "0"}</p>
                    <p className="text-secondary">{campaign.progress || 0}%</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default CampaignCard;

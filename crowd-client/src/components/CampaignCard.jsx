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
          throw new Error("Failed to fetch campaigns");
        }
        const data = await response.json();
        setCampaignData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {/* Row for Content */}
      <Row
        className="d-flex justify-content-center align-items-center text-center mt-5"
      >
        {campaignData.map((campaign) => (
          <Col xs={12} md={4} lg={4} className="px-3" key={campaign._id}>
            <div className="mb-4">
              <Card style={{ width: "100%" }}>
                <Card.Img
                  variant="top"
                  src={campaign.image}
                  className="img-fluid"
                />
                <Card.Body>
                  <div className="d-flex flex-row gap-3">
                    <img
                      width={"40px"}
                      height={"40px"}
                      style={{ borderRadius: "50%" }}
                      src={campaign.image}
                      alt="Owner"
                    />
                    <p style={{ fontSize: "1.2rem" }}>{campaign.owner}</p>
                  </div>
                  <Card.Title className="text-primary">
                    {campaign.title}
                  </Card.Title>
                  <Card.Text className="text-secondary">
                    {campaign.description}
                  </Card.Text>
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
                  <div className="d-flex justify-content-between">
                    <p className="text-primary">{campaign.amount}</p>
                    <p className="text-secondary">{campaign.progress}%</p>
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

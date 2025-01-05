import { useState, useEffect, useContext } from "react";
import "../CampaignSummary.css"; // Import CSS for styling

import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { WalletContext } from "../ContextAPI/walletContext";
import axios from "axios";

const CampaignSummary = () => {
  const { account } = useContext(WalletContext); // Get the account from context

  const [sum, setSum] = useState();
  const [lgShow, setLgShow] = useState(false);
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [activity, setActivity] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const getFacts = async () => {
    const response = await fetch("https://catfact.ninja/fact");
    const data = await response.json();
    setSum(data);
  };

  useEffect(() => {
    getFacts();
  }, []);

  useEffect(() => {
    // Fetch campaigns based on the account (walletId)
    const getMyCampaigns = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/campaigns?walletId=${account}`);
        setMyCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    // Fetch activities (assuming activities are static for now)
    const getActivities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/activities");
        setActivity(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    if (account) {
      getMyCampaigns();
      getActivities();
    }
  }, [account]);

  const handleShow = (campaign) => {
    setSelectedCampaign(campaign);
    setLgShow(true);
  };

  const handleClose = () => {
    setLgShow(false);
  };

  const handleDelete = async (campaignId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/campaigns/${campaignId}`);
      setMyCampaigns(myCampaigns.filter(campaign => campaign.id !== campaignId));
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  return (
    <>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={20}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>
                  <strong>My campaigns</strong>
                </Card.Title>
                <small>{sum && `"${sum.fact}"`} - Cat Fact</small>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>
                  <strong>Campaigns</strong>
                </Card.Title>
                <Row className="justify-content-center">
                  {myCampaigns && myCampaigns.map((campaign) => (
                    <Col key={campaign.id} md={3} className="mb-3">
                      <Card onClick={() => handleShow(campaign)} style={{ cursor: "pointer" }}>
                        <Card.Img variant="top" src={campaign.image} />
                        <Card.Body>
                          <Card.Title>{campaign.title}</Card.Title>
                          <Card.Text>
                            <strong>Owner: </strong>{campaign.owner}
                          </Card.Text>
                          <Card.Text>
                            <strong>Wallet: </strong>{campaign.walletId}
                          </Card.Text>
                          <div className="progress mb-2">
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              style={{
                                width: `${(campaign.donations / 3000) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <Card.Text>
                            Total donations: ${campaign.donations.toFixed(2)}
                          </Card.Text>
                          <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleDelete(campaign._id); }}>Delete</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>
                  <strong>Summary</strong>
                </Card.Title>
                <Row className="justify-content-center">
                  <Col md={6}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Donations</strong>
                        <Badge className="ms-2" bg="success">
                          $1,280
                        </Badge>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Signatures</strong>
                        <Badge className="ms-2" bg="success">
                          6,785
                        </Badge>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Likes</strong>
                        <Badge className="ms-2" bg="success">
                          77
                        </Badge>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Views</strong>
                        <Badge className="ms-2" bg="success">
                          13,767
                        </Badge>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>
                  <strong>Activity</strong>
                </Card.Title>
                <ListGroup variant="flush">
                  {activity.map((item) => (
                    <ListGroup.Item
                      key={item.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{item.user}</strong>
                        <p className="mb-0">{item.description}</p>
                      </div>
                      <Badge className="ms-2" bg="success">
                        {item.amount}
                      </Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        size="lg"
        show={lgShow}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {selectedCampaign && selectedCampaign.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img
                src={selectedCampaign && selectedCampaign.image}
                alt="Campaign image"
                className="img-fluid mb-3"
              />
            </Col>
            <Col md={6} className="text-wrap max-w-md">
              <h5>Owner: {selectedCampaign?.owner}</h5>
              <h5 style={{ wordBreak: "break-word", color: "green" }}>
                Wallet: {selectedCampaign?.walletId}
              </h5>
              <h5>
                Total donations: ${selectedCampaign?.donations.toFixed(2)}
              </h5>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CampaignSummary;


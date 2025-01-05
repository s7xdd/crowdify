import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import logo from "../assets/fire-simple-bold-svgrepo-com copy.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { WalletContext } from "../ContextAPI/walletContext";

function ResponsiveNav() {
  const { account, isConnected, connectWallet, disconnectWallet } = useContext(WalletContext);

  return (
    <Navbar
      sticky="top"
      expand="lg"
      style={{
        padding: "15px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img height="40rem" width="40rem" src={logo} alt="Logo" />
          <h2 style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>CROWDIFY</h2>
        </Navbar.Brand>

        {/* Navbar Toggle Button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Content */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto flex-column flex-lg-row align-items-lg-center gap-lg-4 mt-3 mt-lg-0">
            <Nav.Link as={Link} to="/home" className="text-decoration-none">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/explore" className="text-decoration-none">
              Explore
            </Nav.Link>
            <Nav.Link as={Link} to="/campaigns" className="text-decoration-none">
              Campaigns
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" className="text-decoration-none">
              Profile
            </Nav.Link>
          </Nav>

          {/* Search and Wallet Actions */}
          <Form className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <Form.Control
              type="text"
              placeholder="Search"
              className="rounded"
              style={{ height: "40px", minWidth: "150px" }}
            />

            <div>
              {isConnected ? (
                <p
                  className="text-success text-truncate mb-0"
                  style={{
                    maxWidth: "150px",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Connected: {account.slice(-20)}
                </p>
              ) : (
                <button className="btn btn-success rounded" onClick={connectWallet}>
                  Connect Wallet
                </button>
              )}
            </div>

            {isConnected && (
              <button
                className="btn btn-danger rounded"
                onClick={disconnectWallet}
              >
                Disconnect
              </button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ResponsiveNav;

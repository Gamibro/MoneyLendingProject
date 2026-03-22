import { Link, Outlet } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "./assets/dockyard-logo.png"; // Make sure dockyard-logo.png is inside src/assets
import './App.css';

const Layers = () => {
  return (
    <>
      <Navbar expand="lg" fixed="top" className="dockyard-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-box">
            <img src={logo} alt="Dockyard Logo" className="dockyard-logo" />
            <div>
              <h6 className="brand-title">COLOMBO DOCKYARD PLC</h6>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto dockyard-links">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/ReadEmployee">Employee List</Nav.Link>
              <Nav.Link as={Link} to="/CreateEmployee">Create Employee</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Add some top padding so content doesn't hide behind fixed navbar */}
      <div style={{ paddingTop: "90px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layers;

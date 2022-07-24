import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";

function CollapsibleExample() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      // bg="dark"
      variant="dark"
      style={{ borderBottom: "2px solid #5a5a5a" }}
    >
      <Container style={{ maxWidth: "1400px" }}>
        <Navbar.Brand
          href="/individual"
          style={{ fontFamily: "'Cormorant SC', serif", color: "#c4a88a" }}
        >
          CF STAT
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link
              href="/individual"
              style={{
                width: "130.03px",
                fontSize: "18px",
                fontFamily: "'Cormorant SC', serif",
                color: "#c4a88a",
              }}
            >
              {" "}
              <BsPersonCircle style={{ marginRight: "4px" }} /> Individual
            </Nav.Link>
            <Nav.Link
              href="/compare"
              style={{
                width: "115.86",
                fontSize: "18px",
                fontFamily: "'Cormorant SC', serif",
                color: "#c4a88a",
              }}
            >
              {" "}
              <BsFillPersonPlusFill style={{ marginRight: "4px" }} />
              Compare
            </Nav.Link>
            <Nav.Link
              href="/contact"
              style={{
                width: "132.65px",
                fontSize: "18px",
                fontFamily: "'Cormorant SC', serif",
                color: "#c4a88a",
              }}
            >
              <IoIosMail style={{ marginRight: "4px" }} />
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;

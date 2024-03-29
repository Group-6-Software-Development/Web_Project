// bNavbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Navbar.css";
import logo from "../images/logo2.svg";
import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";

const BNavbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  console.log("isAuthenticated: ", isAuthenticated);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Redirect to JobsPage with the search query as a parameter
    navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="myBlue"
      variant="dark"
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            className="logo"
            alt="Stack"
            width="50px"
            height="50px"
            src={logo}
          />{" "}
          StackConnect
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form
            inline
            className="mx-auto"
            style={{ display: "flex", alignItems: "baseline" }}
            onSubmit={handleSearchSubmit}
          >
            <Form.Control
              type="text"
              placeholder="Search..."
              className="mr-sm-2"
              style={{ marginRight: "5px" }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button type="submit">Submit</Button>
          </Form>
          <Nav className="ms-auto">
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/jobs">
                  Jobs
                </Nav.Link>
                <Nav.Link as={Link} to="/post-job">
                  Post a Job
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/sign-in"
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                  }}
                >
                  Log out
                </Nav.Link>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/sign-in">
                  Sign In
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BNavbar;

import React from "react";
import "./Navbar.css";
import logo from "../../Images/Logo.svg";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    // Handle logic for logo button click
    navigate("/");
  };

  const handleAddItemClick = () => {
    // Handle logic for "Add Item" button click
    navigate("/additem");
  };

  const handleAccountCircleClick = () => {
    // Handle logic for AccountCircleIcon button click
    // For example, open a user menu, navigate to user profile, etc.
  };

  return (
    <div className="nav-container">
      <Button onClick={handleLogoClick}>
        <img src={logo} alt="Nxtwave Logo" className="logo-nxtwave" />
      </Button>
      <div>
        <Button
          onClick={handleAddItemClick}
          className="button"
        >
          Add Item
        </Button>
        <Button onClick={handleAccountCircleClick}>
          <AccountCircleIcon sx={{ color: "blue", fontSize: "40px" }} />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;

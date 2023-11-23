import React, { useState } from "react";
import "./LandingPage.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Cards from "../Card/Card";

const LandingPage = () => {
  const [value, setValue] = useState(0);
  const [filterTag, setFilterTag] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const tags = ["request", "user"];
    setFilterTag(tags[newValue]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="landing">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
          sx={{margin:"20px"}}
        >
          <Tab label="Resources" />
          <Tab label="Requests" />
          <Tab label="Users" />
        </Tabs>
        <TextField
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{margin:"20px",width:"500px"}}
        />
        <Cards filterTag={filterTag} searchTerm={searchTerm} className="card-cont"/>
      </div>
    </>
  );
};

export default LandingPage;

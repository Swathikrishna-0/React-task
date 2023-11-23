import React, { useEffect, useState } from "react";
import "./Card.css";
import Card from "@mui/material/Card";
import axios from "axios";

const Cards = ({ filterTag, searchTerm }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://media-content.ccbp.in/website/react-assignment/resources.json"
        );

        const parsedData = JSON.parse(JSON.stringify(response.data));
        setData(parsedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card-main">
      {data &&
        data
          .filter(
            (item) =>
              (!filterTag || item.tag === filterTag) &&
              (!searchTerm ||
                item.title.toLowerCase().includes(searchTerm.toLowerCase()))
          ) // Filter based on the selected tag
          .map((item, index) => (
            <Card
              key={index}
              sx={{
                margin: "10px",
                padding: "30px",
                width: "360px",
                height: " 192px",
                padding: "20px",
              }}
              className="Cardss"
            >
              <div className="top-card">
                <div>
                  <img
                    src={item.icon_url}
                    alt={item.title}
                    style={{ width: "44px", height: "44px"}}
                  />
                </div>
                <div className="card-title">
                  <h4 className="title">{item.title}</h4>
                  <h6 className="category">{item.category}</h6>
                </div>
              </div>
              
                <a href={item.link} className="link">
                  {item.link}
                </a>
                <p className="descp">{item.description}</p>
              
            </Card>
          ))}
    </div>
  );
};

export default Cards;

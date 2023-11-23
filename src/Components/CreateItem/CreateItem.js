import React, { useState } from "react";
import axios from "axios";
import {
  InputLabel,
  InputBase,
  Button,
  Input,
  FormControl,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Select,
} from "@mui/material";
import "./CreateItem.css";
import { alpha, styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import image from "../../Images/image.svg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const CreateItem = () => {
  const [formData, setFormData] = useState({
    item_title: "",
    item_Link: "",
    icon_url: "",
    category: "",
    description: "",
    item_tag: "", // New field for Tag dropdown
  });

  const [errors, setErrors] = useState({
    item_title: "",
    item_Link: "",
    icon_url: "",
    category: "",
    description: "",
    item_tag: "", // New field for Tag dropdown
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // Clear the error message when the user types
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        const response = await axios.post(
          "https://media-content.ccbp.in/website/react-assignment/add_resource.json",
          formData
        );

        if (response.status === 200) {
          toast.success("Item added successfully!");
          setMessage("Form submitted successfully!"); // Set the message
        }

        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error:", error.message);
        setMessage("Failed to submit form!"); // Set the error message
      }
    } else {
      setMessage("Form contains errors!"); // Set the message for validation errors
    }
  };

  const isFormValid = () => {
    const validationErrors = {};

    // Validate item_Link and icon_url as URLs
    if (!isValidUrl(formData.item_Link)) {
      validationErrors.item_Link = "Invalid URL for Item Link";
    }

    if (!isValidUrl(formData.icon_url)) {
      validationErrors.icon_url = "Invalid URL for Icon URL";
    }

    // Validate other fields
    Object.keys(formData).forEach((field) => {
      if (
        field !== "item_Link" &&
        field !== "icon_url" &&
        formData[field].trim() === ""
      ) {
        validationErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    // Validate Tag dropdown
    if (formData.item_tag === "") {
      validationErrors.item_tag = "Tag is required";
    }

    // Set errors in state
    setErrors(validationErrors);

    // Form is valid if there are no errors
    return Object.keys(validationErrors).length === 0;
  };

  const isValidUrl = (url) => {
    // Add your URL validation logic here
    // Example: Regular expression for a simple URL pattern
    const urlPattern = /^https?:\/\/\S+$/;
    return urlPattern.test(url);
  };

  const BootstrapInputLabel = styled(InputLabel)(({ theme }) => ({
    fontSize: 16,
    marginBottom: theme.spacing(1),
  }));

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    borderRadius: 4,
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "100%",
    padding: "10px 10px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  }));

  const CardContainer = styled(Box)({
    display: "flex",
    width: "100%",
    height: "100vh",
  });

  const FormContainer = styled(Grid)({
    flex: 0.5,
    padding: "16px",
    width: "75%",
    marginLeft:"5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  });

  const ImageContainer = styled(Grid)({
    flex: 0.5,
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  });

  return (
    <Card className="main-container">
      <CardContent>
        <CardContainer>
          <FormContainer container item>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "32px",
                  lineHeight: "40px",
                  color: "#171f46",
                  textAlign: "center",
                }}
              >
                Item Details
              </Typography>
              <Grid item xs={10} sx={{ marginTop: "10px" }}>
                <BootstrapInputLabel
                  shrink
                  htmlFor="item_title"
                  sx={{ marginBottom: "0px" }}
                >
                  Item Title
                </BootstrapInputLabel>
                <BootstrapInput
                  placeholder="Add Item Title"
                  id="item_title"
                  name="item_title"
                  value={formData.item_title}
                  onChange={handleInputChange}
                  error={Boolean(errors.item_title)}
                />
                {errors.item_title && (
                  <span style={{ color: "red" }}>{errors.item_title}</span>
                )}
              </Grid>

              {/* Item Link */}
              <Grid item xs={10} sx={{ marginTop: "30px" }}>
                <BootstrapInputLabel
                  shrink
                  htmlFor="item_Link"
                  sx={{ marginBottom: "0px" }}
                >
                  Item Link
                </BootstrapInputLabel>
                <BootstrapInput
                  placeholder="Paste Item Link"
                  id="item_Link"
                  name="item_Link"
                  value={formData.item_Link}
                  onChange={handleInputChange}
                  error={Boolean(errors.item_Link)}
                />
                {errors.item_Link && (
                  <span style={{ color: "red" }}>{errors.item_Link}</span>
                )}
              </Grid>

              {/* Icon URL */}
              <Grid item xs={10} sx={{ marginTop: "30px" }}>
                <BootstrapInputLabel
                  shrink
                  htmlFor="icon_url"
                  sx={{ marginBottom: "0px" }}
                >
                  Icon URL
                </BootstrapInputLabel>
                <BootstrapInput
                  placeholder="Icon URL"
                  id="icon_url"
                  name="icon_url"
                  value={formData.icon_url}
                  onChange={handleInputChange}
                  error={Boolean(errors.icon_url)}
                />
                {errors.icon_url && (
                  <span style={{ color: "red" }}>{errors.icon_url}</span>
                )}
              </Grid>
              <Grid item xs={10} sx={{ marginTop: "30px" }}>
                <BootstrapInputLabel
                  shrink
                  htmlFor="item_tag"
                  sx={{ marginBottom: "0px" }}
                >
                  Tag
                </BootstrapInputLabel>
                <Select
                  native
                  id="item_tag"
                  name="item_tag"
                  value={formData.item_tag}
                  onChange={handleInputChange}
                  error={Boolean(errors.item_tag)}
                  input={<BootstrapInput />}
                  style={{ width: "100%" }} // Adjust the width as needed
                >
                  <option value="" disabled>
                    Select Tag
                  </option>
                  <option value="request">Request</option>
                  <option value="user">User</option>
                </Select>
                {errors.item_tag && (
                  <span style={{ color: "red" }}>{errors.item_tag}</span>
                )}
              </Grid>

              <Grid item xs={10} sx={{ marginTop: "30px" }}>
                <BootstrapInputLabel
                  shrink
                  htmlFor="category"
                  sx={{ marginBottom: "0px" }}
                >
                  Category
                </BootstrapInputLabel>
                <BootstrapInput
                  placeholder="Add Category"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={10} sx={{ marginTop: "30px" }}>
                <BootstrapInputLabel
                  shrink
                  htmlFor="description"
                  sx={{ marginBottom: "0px" }}
                >
                  Description
                </BootstrapInputLabel>
                <BootstrapInput
                  placeholder="Add Description"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid
                item
                xs={10}
                sx={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center", // Align center horizontally
                }}
              >
                <Button type="submit" className="button-create">
                  Create
                </Button>
              </Grid>
              <p className="error-message">{message}</p>
            </form>
          </FormContainer>

          <ImageContainer />
        </CardContainer>
      </CardContent>
      <ToastContainer />
    </Card>
  );
};

export default CreateItem;

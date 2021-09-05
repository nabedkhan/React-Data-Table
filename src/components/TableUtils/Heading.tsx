import { Button, Card, Divider, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Heading = ({ title = "Simple React Table" }) => {
  return (
    <Card
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        color="primary"
        fontWeight="600"
        paddingBottom="1rem"
      >
        {title}
      </Typography>
      <Divider />
      <Link to="/">
        <Button variant="contained" sx={{ mt: "1rem" }}>
          Back Home
        </Button>
      </Link>
    </Card>
  );
};

export default Heading;

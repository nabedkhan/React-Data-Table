import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

const Home: FC = () => {
  return (
    <Container style={{ marginTop: "2rem" }}>
      <Card
        sx={{
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" color="primary" fontWeight="600">
          React Table All Example
        </Typography>
        <Typography variant="h6" fontWeight="400">
          Based on React Table Library - Created By Nabed Khan
        </Typography>
      </Card>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          margin: "2rem auto",
          "& a": {
            marginBottom: "1rem",
          },
        }}
      >
        <Link to="basic-table">
          <Button variant="contained" color="primary">
            Basic Table
          </Button>
        </Link>

        <Link to="pagination-table">
          <Button variant="contained" color="primary">
            Pagination Table
          </Button>
        </Link>

        <Link to="data-sorting-table">
          <Button variant="contained" color="primary">
            Data Sorting Table
          </Button>
        </Link>

        <Link to="row-select-table">
          <Button variant="contained" color="primary">
            Row Select Table
          </Button>
        </Link>

        <Link to="column-filtering-table">
          <Button variant="contained" color="primary">
            Column Filter Table
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Home;

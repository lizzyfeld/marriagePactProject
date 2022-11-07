import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [MPData, setMPData] = useState([]);
  const [pageData, setPageData] = useState([]); // contains all info for each page
  const [page, setPage] = useState(0); // currentPage that the user is on
  const [rating, setRating] = useState(0);
  var maxPageNum = 0;

  const fetchDataAPI = () => {
    axios
      .get("https://mock-api.marriagepact.com/api/questions")
      .then((res) => {
        console.log("hello", res.data.data.length);
        setMPData(res.data.data);
        setPage(res.data.page);
        setPageData(res.data);
        maxPageNum = res.data.data.length;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDataAPI();
    // console.log("data here: ", MPData);
  }, []);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  const RatingBox = () => {
    return (
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <StyledRating
          name="customized-color"
          defaultValue={0}
          getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
          onChange={(event, newValue) => {
            setRating(newValue);
            console.log("value here", newValue);
          }}
          precision={1}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          max={7}
        />
      </Box>
    );
  };

  return (
    <div>
      {MPData.map((data) => (
        <div key={data.id}>
          <h4>{data.question}</h4>
          <div className={styles.ratingBox}>
            <span>{data.low_response}</span>
            <RatingBox />
            <span>{data.high_response}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

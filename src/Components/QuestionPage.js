import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./QuestionPage.module.css";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const RatingBox = () => {
  const [rating, setRating] = useState(0);
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

export default function QuestionPage(props) {
  console.log(props);
  return (
    <div style={{ justifyContent: "space-between" }}>
      <h1>{props.question}</h1>
      <div className={styles.questionContainer}>
        <span style={{ marginRight: "10px" }}>{props.low_response}</span>
        <RatingBox />
        <span style={{ marginLeft: "10px" }}>{props.high_response}</span>
      </div>
      <div>
        {props.index > 0 && (
          <button onClick={props.onPrevious} className={styles.indexButtons}>
            Previous
          </button>
        )}
        {props.total !== props.index && (
          <button onClick={props.onNext} className={styles.indexButtons}>
            Next
          </button>
        )}
      </div>
      {props.total == props.index && (
        <button onClick={props.onSubmit} className={styles.indexButtons}>
          Find my marriage pact!
        </button>
      )}
    </div>
  );
}

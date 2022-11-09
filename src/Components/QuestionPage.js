import React from "react";
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

const RatingBox = (props) => {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <StyledRating
        {...props}
        onChange={(e) => props.onChange(e, props.name)}
        defaultValue={0}
        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        precision={1}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        max={7}
      />
    </Box>
  );
};

export default function QuestionPage(props) {
  return (
    <>
      {props.setOfQuestions.map((question, i) => (
        <div key={i} className={styles.questionContainer}>
          <div className={styles.textWrapper}>
            <h1>{question.question}</h1>
            <div style={{ display: "flex" }}>
              <span style={{ marginRight: "10px" }}>
                {question.low_response}
              </span>
              <RatingBox name={question.id} onChange={props.onChange} />
              <span style={{ marginLeft: "10px" }}>
                {question.high_response}
              </span>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.buttonContainer}>
        {props.currentPage > 1 && (
          <button className={styles.indexButtons} onClick={props.onPrevious}>
            Previous
          </button>
        )}
        {props.pages[props.currentPage - 1].next_page ? (
          <button className={styles.indexButtons} onClick={props.onNext}>
            Next
          </button>
        ) : (
          <button onClick={props.onSubmit} className={styles.indexButtons}>
            Find my marriage pact!
          </button>
        )}
      </div>
    </>
  );
}

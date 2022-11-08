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

const RatingBox = (props) => {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <StyledRating
        {...props}
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
  console.log("here", props.setOfQuestions);
  return (
    <>
      {props.setOfQuestions.map((question, i) => (
        <div key={i} className={styles.questionContainer}>
          <h1>{question.question}</h1>
          <div style={{ display: "flex" }}>
            <span style={{ marginRight: "10px" }}>{question.low_response}</span>
            <RatingBox name={props.id} onChange={props.onChange} />
            <span style={{ marginLeft: "10px" }}>{question.high_response}</span>
          </div>
        </div>
      ))}
      <div>
        {props.currentPage > 1 && (
          <button onClick={props.onPrevious}>Previous</button>
        )}
        {props.pages[props.currentPage - 1].next_page && (
          <button onClick={props.onNext}>Next</button>
        )}
      </div>
    </>
  );
  // <div style={{ justifyContent: "space-between" }}>
  //   {/* <h5>
  //     {props.index}/{props.total}
  //   </h5> */}
  //   <h1>{props.question}</h1>
  //   <div className={styles.questionContainer}>
  //     <span style={{ marginRight: "10px" }}>{props.low_response}</span>
  //     <RatingBox name={props.id} onChange={props.onChange} />
  //     <span style={{ marginLeft: "10px" }}>{props.high_response}</span>
  //   </div>
  //   {/* <div>
  //     {props.currentPage > 0 && (
  //       <button onClick={props.onPrevious} className={styles.indexButtons}>
  //         Previous
  //       </button>
  //     )}
  //     {props.total !== props.currentPage && (
  //       <button onClick={props.onNext} className={styles.indexButtons}>
  //         Next
  //       </button>
  //     )}
  //   </div> */}
  //   {/* {props.total == props.currentPage && (
  //     <button onClick={props.onSubmit} className={styles.indexButtons}>
  //       Find my marriage pact!
  //     </button>
  //   )} */}
  // </div>
}

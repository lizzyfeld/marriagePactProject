import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import QuestionPage from "../Components/QuestionPage";
// import { DataArray } from "@mui/icons-material";

export default function HomePage() {
  const [MPData, setMPData] = useState([]);
  const [rating, setRating] = useState(0);
  const [index, setIndex] = useState(0);
  const [ratingArr, setRatingArr] = useState([]);

  const fetchDataAPI = () => {
    axios
      .get("https://mock-api.marriagepact.com/api/questions")
      .then((res) => {
        // console.log(res.data.data);
        setMPData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const postDataHandler = (e) => {
  //   e.preventDefault();
  //   axios.post("https://mock-api.marriagepact.com/api/questions", {
  //     name: name,
  //   });
  // };

  useEffect(() => {
    fetchDataAPI();
    // console.log("MPData: ", MPData);
  }, []);
  return (
    <div className={styles.container}>
      <QuestionPage
        {...MPData[index]}
        onNext={() => setIndex(index + 1)}
        onPrevious={() => setIndex(index - 1)}
        //onSubmit={()=>postDataHandler(e)}
        index={index}
        total={MPData.length - 1}
      />
    </div>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import QuestionPage from "../Components/QuestionPage";
// import { DataArray } from "@mui/icons-material";

export default function HomePage() {
  const [MPData, setMPData] = useState([]);

  //const [rating, setRating] = useState(0);
  const [index, setIndex] = useState(0);
  var maxPageNum = 0;

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

  useEffect(() => {
    fetchDataAPI();
    // console.log("MPData: ", MPData);
  }, []);
  return (
    <div>
      <QuestionPage
        {...MPData[index]}
        onNext={() => setIndex(index + 1)}
        onPrevious={() => setIndex(index - 1)}
        index={index}
        total={MPData.length - 1}
      />
    </div>
  );
}

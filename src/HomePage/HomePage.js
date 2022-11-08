import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import QuestionPage from "../Components/QuestionPage";

export default function HomePage() {
  const [pages, setPages] = useState([]); // set of all of the pages
  const [currentPage, setCurrentPage] = useState(1); // current page number
  const [MPData, setMPData] = useState([]);
  const [anwsers, setAnswers] = useState({});
  const onChange = (e) => {
    setAnswers({ ...anwsers, [e.target.name]: +e.target.value });
  };
  const postDataHandler = () => {
    console.log(anwsers);
    axios
      .post(`https://mock-api.marriagepact.com/api/submit`, anwsers)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const fetchDataAPI = () => {
    //if axios.get for a particular page has already been called for a
    // particular page, dont call again
    if (pages[currentPage - 1]) return;
    axios
      .get(
        `https://mock-api.marriagepact.com/api/questions?page=${currentPage}`
      )
      .then((res) => {
        // console.log(res.data.data);
        setPages([...pages, res.data]);
        setMPData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDataAPI();
  }, [currentPage]);
  console.log("pages", pages[currentPage]);

  return pages[currentPage - 1] ? (
    <div className={styles.container}>
      <QuestionPage
        {...MPData[currentPage - 1]}
        setOfQuestions={pages[0].data}
        currentPage={currentPage}
        pages={pages}
        onNext={() => setCurrentPage(currentPage + 1)}
        onPrevious={() => setCurrentPage(currentPage - 1)}
        onChange={onChange}
        onSubmit={postDataHandler}
      />
    </div>
  ) : (
    "Loading.."
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import QuestionPage from "../Components/QuestionPage";

export default function HomePage() {
  const [pages, setPages] = useState([]); // set of all of the pages
  const [currentPage, setCurrentPage] = useState(1); // current page number
  const [MPData, setMPData] = useState([]);
  const [anwsers, setAnswers] = useState({});
  const onChange = (e, id) => {
    setAnswers({ ...anwsers, [id]: +e.target.value });
  };
  const postDataHandler = () => {
    axios
      .post(`https://mock-api.marriagepact.com/api/submit`, anwsers)
      .then((res) => console.log("sucess", res))
      .catch((err) => console.log(err));
  };

  const fetchDataAPI = () => {
    if (currentPage > 0) {
      axios
        .get(
          `https://mock-api.marriagepact.com/api/questions?page=${currentPage}`
        )
        .then((res) => {
          setPages([...pages, res.data]);
          setMPData(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    fetchDataAPI();
  }, [currentPage]);

  return pages[currentPage - 1] ? (
    <div className={styles.container}>
      <QuestionPage
        setOfQuestions={MPData}
        currentPage={currentPage}
        pages={pages}
        onNext={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setCurrentPage(currentPage + 1);
        }}
        onPrevious={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setCurrentPage(currentPage - 1);
        }}
        onChange={onChange}
        onSubmit={postDataHandler}
      />
    </div>
  ) : (
    "Loading.."
  );
}

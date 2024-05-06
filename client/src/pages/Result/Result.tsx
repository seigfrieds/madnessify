import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Result(): React.JSX.Element {
  const { resultId } = useParams();
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const getResult = async (): Promise<void> => {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/result/${resultId}`)
        .then((res) => {
          setResultData(res.data);
        })
        .catch((err) => console.log(err.toJSON()));
    };
    getResult();
  }, []);

  console.log(resultData);

  return (
    <>
      <p>{"" + resultId}</p>
    </>
  );
}

export default Result;

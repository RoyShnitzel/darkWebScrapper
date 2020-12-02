import React, { useState, useEffect } from "react";
import axios from "axios";
import DataCard from "../Components/DataCard";
import Search from "../Components/Search";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ReplyIcon from "@material-ui/icons/Reply";

function MainPage() {
  const [data, setData] = useState([]);
  const [sentiment, setSentiment] = useState("default");
  const [url, setUrl] = useState("/api/data");

  const fetchData = async (searchValue) => {
    const query = searchValue ? `?searchValue=${searchValue}` : "";
    const { data: dataFromServer } = await axios.get(`${url}${query}`);
    console.log();
    setData(dataFromServer);
  };

  const sentimentHandler = (sentimentValue) => {
    setSentiment(sentimentValue);
    if (sentimentValue !== "default") {
      setUrl(`/api/data/${sentimentValue}`);
    } else {
      setUrl(`/api/data`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "6%",
      }}
    >
      <h1>Welcome to My Dark Web Scrapper</h1>
      <div style={{ display: "flex" }}>
        <>
          {sentiment !== "positive" ? (
            <Button
              color="primary"
              onClick={() => sentimentHandler("positive")}
            >
              Positive Results <ThumbUpIcon style={{ paddingLeft: 5 }} />
            </Button>
          ) : (
            <Button color="primary" onClick={() => sentimentHandler("default")}>
              All Results <ReplyIcon style={{ paddingLeft: 5 }} />
            </Button>
          )}
        </>
        <Search fetchData={fetchData} url={url} />
        <>
          {sentiment !== "negative" ? (
            <Button
              color="secondary"
              onClick={() => sentimentHandler("negative")}
            >
              Negative Results
              <ThumbDownIcon style={{ paddingLeft: 5 }} />
            </Button>
          ) : (
            <Button
              color="secondary"
              onClick={() => sentimentHandler("default")}
            >
              All Results <ReplyIcon style={{ paddingLeft: 5 }} />
            </Button>
          )}
        </>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {data.length > 0 ? (
          data.map((element) => {
            return <DataCard key={element.id} data={element} />;
          })
        ) : (
          <div>
            <h2>Cards Not Found</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;

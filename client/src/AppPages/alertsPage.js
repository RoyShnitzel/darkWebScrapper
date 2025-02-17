import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertDataCard from "../Components/AlertDataCard";
import Search from "../Components/Search";

function AlertsPage({ notifications }) {
  const [data, setData] = useState([]);

  const fetchData = async (searchValue) => {
    const query = searchValue ? `?searchValue=${searchValue}` : "";
    const { data: dataFromServer } = await axios.get(`/api/alerts${query}`);
    setData(dataFromServer);
  };

  useEffect(() => {
    fetchData();
  }, [notifications]);

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
      <h1>Welcome to The Alerts Page</h1>
      <Search fetchData={fetchData} url={"/api/alerts"} />
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
            return (
              <AlertDataCard
                key={element.id}
                data={element}
                fetchData={fetchData}
              />
            );
          })
        ) : (
          <div>
            <h1>Cards Not Found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlertsPage;

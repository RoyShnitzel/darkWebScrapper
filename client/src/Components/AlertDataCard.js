import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    width: "40%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function AlertDataCard({ data, fetchData }) {
  const classes = useStyles();

  const deleteHandler = async (alertsData) => {
    alertsData.forEach(async (alert) => {
      await axios.delete(`/api/alerts/${alert.id}`);
    });
    fetchData();
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Author: {data.author} {data.score ? `Score: ${data.score}` : ""}
          </Typography>
          <Button onClick={() => deleteHandler(data.Alerts)} color="primary">
            Delete Alert
          </Button>
        </div>
        {data.Alerts && data.Alerts.length > 0 ? (
          <Typography style={{ color: "red" }} variant="h5" component="h2">
            Alert KeyWords:{" "}
            {data.Alerts.map((alert) => (
              <Chip
                key={alert.id}
                label={`${alert.keyWord} : ${alert.match}`}
              />
            ))}
          </Typography>
        ) : null}
        <Typography variant="h5" component="h2">
          Title: {data.title}
        </Typography>
        <Typography variant="body2" component="p">
          {data.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography size="small">
          Date: {new Date(data.date).toUTCString()}
        </Typography>
      </CardActions>
    </Card>
  );
}

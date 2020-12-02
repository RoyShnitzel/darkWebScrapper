import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

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

export default function DataCard({ data }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          <div style={{ fontFamily: "DM Sans" }}>
            Author: {data.author} {data.score ? `Score: ${data.score}` : ""}
          </div>
        </Typography>
        <Typography variant="h5" component="h2">
          <div style={{ fontFamily: "DM Sans" }}>Title: {data.title}</div>
        </Typography>
        {data.nerAnalysis && data.nerAnalysis.length > 0 ? (
          <Typography variant="h5" component="h2">
            {data.nerAnalysis.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </Typography>
        ) : null}
        <Typography variant="body2" component="p">
          <div style={{ fontFamily: "DM Sans" }}>{data.content}</div>
        </Typography>
      </CardContent>
      <CardActions>
        <Typography size="small">
          <div style={{ fontFamily: "DM Sans" }}>
            Date: {new Date(data.date).toUTCString()}
          </div>
        </Typography>
      </CardActions>
    </Card>
  );
}

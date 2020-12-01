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
          Author: {data.author} {data.score ? `Score: ${data.score}` : ""}
        </Typography>
        <Typography variant="h5" component="h2">
          Title: {data.title}
        </Typography>
        {data.nerAnalysis && data.nerAnalysis.length > 0 ? (
          <Typography variant="h5" component="h2">
            {data.nerAnalysis.map((tag) => (
              <Chip label={tag} />
            ))}
          </Typography>
        ) : null}
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

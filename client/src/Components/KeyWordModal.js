import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function KeyWordModal() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [keyWord, setKeyWord] = useState();
  const [keyWordsData, setKeyWordsData] = useState([]);

  const fetchKeyWordsData = async () => {
    const { data } = await axios.get("/api/keyword");
    setKeyWordsData(data);
  };

  useEffect(() => {
    fetchKeyWordsData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const AddKeyWord = async () => {
    if (keyWord.length > 0) {
      const response = axios.post("/api/keyword", {
        keyWord,
      });
    }
    setKeyWord("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add KeyWord</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title" style={{ textAlign: "center" }}>
            Add KeyWord For Analysis
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            <TextField
              onChange={(event) => setKeyWord(event.target.value)}
              value={keyWord}
              id="keyword-basic"
              label="KeyWord"
            />
            <Button
              onClick={() => AddKeyWord()}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

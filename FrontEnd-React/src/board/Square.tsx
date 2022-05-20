import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { showErrorMessage } from "../components/SnackBar";

interface Props {
  position: number;
  value?: String;
  makeMove: (position: number) => void;
  player?: String;
  canMove: boolean;
}

export default function Square(props: Props) {
  const [value, setValue] = useState<String>();

  useEffect(() => {
    if (props.value !== "0") {
      setValue(props.value);
    }
  }, [props.value]);

  const handleClick = () => {
    if (!props.canMove) {
      showErrorMessage("Not your turn");
    } else {
      if (value) {
        showErrorMessage("Place taken");
      } else {
        props.makeMove(props.position);
        setValue(props.player);
      }
    }
  };
  return (
    <Button
      style={{
        width: "150px",
        height: "150px",
        margin: "5px",
        backgroundColor: "lightgrey",
        borderColor: "black",
        fontWeight: "bold",
        color: "black",
        fontSize: "100px",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => handleClick()}
    >
      {value || ""}
    </Button>
  );
}

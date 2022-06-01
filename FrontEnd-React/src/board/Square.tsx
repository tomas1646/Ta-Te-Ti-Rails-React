import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { showErrorMessage } from "../components/SnackBar";

interface Props {
  position: number;
  value?: string;
  makeMove: (position: number) => void;
  player?: string;
  canMove: boolean;
}

export default function Square(props: Props) {
  const [value, setValue] = useState<string>();

  useEffect(() => {
    if (props.value !== "0") {
      setValue(props.value);
    }
  }, [props.value]);

  const handleClick = () => {
    if (!props.canMove) {
      showErrorMessage("Not your turn");
      return;
    }

    if (value) {
      showErrorMessage("Place Taken");
      return;
    }

    props.makeMove(props.position);
    setValue(props.player);
  };

  return (
    <Button
      style={{
        width: "150px",
        height: "150px",
        margin: "5px",
        backgroundColor: "lightgrey",
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

import type React from "react";

const resetStateValues = (
  setters: React.Dispatch<React.SetStateAction<any>>[],
  value: any = "",
) => {
  setters.forEach((setter) => {
    setter(value);
  });
};

export default resetStateValues;

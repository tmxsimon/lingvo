import type React from "react";

const resetStateValues = (
  setters: React.Dispatch<React.SetStateAction<any>>[],
  setValue: any = "",
) => {
  setters.forEach((setter) => {
    setter(setValue);
  });
};

export default resetStateValues;

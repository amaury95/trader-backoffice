import { Navigation } from "modules/navigation/Navigation";
import React, { FunctionComponent } from "react";

export const HomeLayout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

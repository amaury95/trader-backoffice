import { HomeLayout } from "modules/home";
import React, { FunctionComponent } from "react";

export const UserLayout: FunctionComponent = ({ children }) => {
  return (
    <HomeLayout>
      <div className="centered">{children}</div>
    </HomeLayout>
  );
};

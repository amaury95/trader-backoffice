import { HomeLayout } from "modules/home";
import React, { FunctionComponent } from "react";

export const UserLayout: FunctionComponent = ({ children }) => {
  return <HomeLayout>{children}</HomeLayout>;
};

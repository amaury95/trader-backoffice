import { Authenticated } from "components/Authenticated";
import { HomeLayout } from "modules/home";
import { FunctionComponent } from "react";

export const DashboardLayout: FunctionComponent = ({ children }) => {
  return (
    <HomeLayout>
      <Authenticated fallback="/session">{children}</Authenticated>
    </HomeLayout>
  );
};

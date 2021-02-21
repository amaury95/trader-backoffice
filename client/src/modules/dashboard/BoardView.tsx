import { useKeycloak } from "@react-keycloak/web";
import Profile from "./components/Profile";

export default function BoardView() {
  const { keycloak } = useKeycloak();
  const id = keycloak.subject || "";

  return <Profile id={id} />;
}

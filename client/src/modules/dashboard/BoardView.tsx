import { useKeycloak } from "@react-keycloak/web";
import Profile from "./components/Profile";

export default function BoardView() {
  const { keycloak } = useKeycloak();

  return <div>{keycloak.subject && <Profile id={keycloak.subject} />}</div>;
}

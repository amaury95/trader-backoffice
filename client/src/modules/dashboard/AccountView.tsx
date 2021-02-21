import { useParams } from "react-router-dom";
import Profile from "./components/Profile";

export default function AccountView() {
  const { id } = useParams<any>();
  return <Profile id={id} />;
}

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./Home.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Home = () => {
  const ctx = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={ctx.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;

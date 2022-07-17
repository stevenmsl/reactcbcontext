import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    /* you can't access the css class using 
       the dot expression like classes.main-header
       if there are special chars in the name
    */
    <header className={classes["main-header"]}>
      <h1> Context and Reducer</h1>
      <Navigation />
    </header>
  );
};

export default MainHeader;

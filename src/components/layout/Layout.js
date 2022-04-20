import classes from "./Layout.module.css";
import { MainNavigation } from "./MainNavigation";

export const Layout = (props) => {
  return (
    <>
      <MainNavigation />
      <main className={classes.name}>{props.children}</main>
    </>
  );
};

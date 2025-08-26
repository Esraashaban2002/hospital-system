import { Outlet } from "react-router-dom";
import Header from "../Sides/Header/Header";
import Footer from "../Sides/Footer/Footer";
import TemporaryDrawer from "../Sides/Header/MobHeader";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const LayOut = () => {
  const them = useTheme();
  const isDesktob = useMediaQuery(them.breakpoints.up("lg"));
  return (
    <>
      {isDesktob ? (
        <>
          <Header />

          <Outlet />
          <Footer />
        </>
      ) : (
        <>
          <TemporaryDrawer />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default LayOut;

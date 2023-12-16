import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";
import { useStore } from "./stores/store";
import { useEffect } from "react";
import { useScrollPosition } from "./common/hooks/useScrollPosition";
import InitialLoader from "./common/InitialLoader";
import { IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/navbar/navbar";
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "./components/footer/footer";

function App() {
  const { commonStore, userStore } = useStore();
  const location = useLocation();
  const scroll = useScrollPosition();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <InitialLoader adding={"App"} />;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div className="App">
      <ScrollRestoration />
      <Toaster />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <Navbar />
      {location.pathname === "/" ? <LandingPage /> : <Outlet />}
      <IconButton
        sx={{
          display: scroll > 50 ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          bottom: "2rem",
          right: {
            xs: "1rem",
            sm: "1rem",
            md: "1.1rem",
            lg: "1.3rem",
            xl: "1.5rem",
          },
          bgcolor: "white",
          color: "black",
          "&:hover": {
            bgcolor: "black",
            color: "white",
          },
          width: {
            xs: "2rem",
            sm: "2.5rem",
            md: "2.5rem",
            lg: "2.5rem",
            xl: "2.5rem",
          },
          height: {
            xs: "2rem",
            sm: "2.5rem",
            md: "2.5rem",
            lg: "2.5rem",
            xl: "2.5rem",
          },
          zIndex: 100,
          border: "1px solid black",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpwardIcon
          sx={{
            width: {
              xs: "1.5rem",
              sm: "2rem",
              md: "2rem",
              lg: "2rem",
              xl: "2rem",
            },
            height: {
              xs: "1.5rem",
              sm: "2rem",
              md: "2rem",
              lg: "2rem",
              xl: "2rem",
            },
          }}
        />
      </IconButton>
      <Footer/>
    </div>
    </ThemeProvider>
  );
}

export default observer(App);

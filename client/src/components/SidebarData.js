import React from "react";
import HomeIcon from "@material-ui/icons/Home";
// import InfoIcon from "@mui/icons-material/Info";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LogoutIcon from "@mui/icons-material/Logout";
import AddLinkIcon from "@mui/icons-material/AddLink";
// import DownloadIcon from "@mui/icons-material/Download";
import ModeIcon from "@mui/icons-material/Mode";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import AddLink from "../pages/Link";

export const SidebarData = [
  {
    title: "Home",
    user: "Candidate",
    icon: <HomeIcon />,
    link: "/candidate",
  },
  {
    title: "Home",
    user: "Account",
    icon: <HomeIcon />,
    link: "/account",
  },
  {
    title: "Logout",
    user: "Account",
    icon: <LogoutIcon />,
    link: "/login/account-section",
  },
  // {
  //   title: "About",
  //   user: "Candidate",
  //   icon: <InfoIcon />,
  //   link: "/candidate",
  // },
  {
    title: "Fill Admission Form",
    user: "Candidate",
    icon: <ModeIcon />,
    link: "/admissionform",
  },
  // {
  //  title: "Download Form",
  //  user: "Candidate",
  //  icon: <DownloadIcon/>,
  //  link: "/"
  // },
  {
    title: "Logout",
    user: "Candidate",
    icon: <LogoutIcon />,
    link: "/",
  },
  {
    title: "Home",
    user: "Admin",
    icon: <HomeIcon />,
    link: "/admin",
  },
  {
    title: "Add Coordinator",
    user: "Admin",
    icon: <PersonAddIcon />,
    link: "/addcord",
  },
  {
    title: "Add/Remove Link",
    user: "Admin",
    icon: <AddLinkIcon />,
    link: "/link",
  },
  {
    title: "Add Account Section",
    user: "Admin",
    icon: <AddIcon />,
    link: "/add-account-section",
  },
  {
    title: "Remove Coordinator",
    user: "Admin",
    icon: <PersonRemoveIcon />,
    link: "/removecord",
  },
  {
    title: "Remove Account Section",
    user: "Admin",
    icon: <RemoveIcon />,
    link: "/remove-account-section",
  },
  {
    title: "Logout",
    user: "Admin",
    icon: <LogoutIcon />,
    link: "/",
  },
  {
    title: "Home",
    user: "Coordinator",
    icon: <HomeIcon />,
    link: "/coordinator",
  },

  // {
  //   title: "About",
  //   user: "Coordinator",
  //   icon: <InfoIcon />,
  //   link: "/coordinator",
  // },
  {
    title: "Logout",
    user: "Coordinator",
    icon: <LogoutIcon />,
    link: "/",
  },
  // {
  //   title: "Back",
  //   user: "Admin",
  //   icon: <ArrowBackIcon />,
  //   link: "/admin",
  // },
  {
    title: "Home",
    user: "Faculty",
    icon: <HomeIcon />,
    link: "/",
  },
];

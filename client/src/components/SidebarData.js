import React from "react";
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@mui/icons-material/Info';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LogoutIcon from '@mui/icons-material/Logout';

export const SidebarData = [
 {
  title: "Home",
  user: "Candidate",
  icon: <HomeIcon/>,
  link: "/candidate",
 },
 {
  title: "About",
  user: "Candidate", 
  icon: <InfoIcon/>,
  link: "/candidate",
 },
 {
  title: "Logout",
  user: "Candidate",
  icon: <LogoutIcon/>,
  link: "/"
 },
 {
  title: "Add Coordinator",
  user: "Admin",
  icon: <PersonAddIcon/>,
  link: "/addcord",
 },
 {
  title: "Add Account Section",
  user: "Admin",
  icon: <AddIcon/>,
  link: "/addcord/add-account-section",
 },
 {
  title: "Remove Coordinator",
  user: "Admin",
  icon: <PersonRemoveIcon/>,
  link: "/addcord",
 },
 {
  title: "Remove Account Section",
  user: "Admin",
  icon: <RemoveIcon/>,
  link: "/addcord/add-account-section",
 },
 {
  title: "Logout",
  user: "Admin",
  icon: <LogoutIcon/>,
  link: "/"
 },
 {
  title: "Home",
  user: "Coordinator",
  icon: <HomeIcon/>,
  link: "/coordinator",
 },
 {
  title: "About",
  user: "Coordinator",
  icon: <InfoIcon/>,
  link: "/coordinator"
 },
 {
  title: "Logout",
  user: "Coordinator",
  icon: <LogoutIcon/>,
  link: "/"
 }
]
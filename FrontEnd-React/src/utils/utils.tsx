import HomeIcon from "@mui/icons-material/Home";
import AppsOutageIcon from "@mui/icons-material/AppsOutage";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";

export interface ApiResponse<T> {
  status: number;
  message: string;
  content: T;
}

export interface SideBarMenu {
  path: string;
  name: string;
  icon: JSX.Element;
  loggedUserOnly?: boolean;
  showAlways?: boolean;
}

export const getOptions = (): SideBarMenu[] => {
  return [
    { path: "", name: "Home", icon: <HomeIcon />, showAlways: true },
    {
      path: "board",
      name: "Ta Te Ti",
      icon: <AppsOutageIcon />,
      loggedUserOnly: true,
    },
    {
      path: "history",
      name: "History",
      icon: <HistoryToggleOffIcon />,
      loggedUserOnly: true,
    },
    {
      path: "register-user",
      icon: <AccountCircleIcon />,
      name: "Create User",
    },
    {
      path: "login",
      icon: <LoginIcon />,
      name: "Login",
    },
  ];
};

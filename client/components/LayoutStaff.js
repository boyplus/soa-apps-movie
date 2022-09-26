import axios from "../axios";
import { useEffect } from "react";
import Navbar from "./Navbar";

const LayoutStaff = ({ children }) => {
  const links = ["shows"];
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
  }, []);
  return (
    <div>
      <Navbar items={links} from="staff"></Navbar>
      <div style={{ padding: "0 20px" }}>{children}</div>
    </div>
  );
};

export default LayoutStaff;

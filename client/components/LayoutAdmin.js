import axios from "../axios";
import { useEffect } from "react";
import Navbar from "./Navbar";

const LayoutAdmin = ({ children }) => {
  const links = ["staffs", "locations", "movies"];
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
  }, []);
  return (
    <div>
      <Navbar items={links} from="admin"></Navbar>
      <div style={{ padding: "0 20px" }}>{children}</div>
    </div>
  );
};

export default LayoutAdmin;

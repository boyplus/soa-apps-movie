import axios from "../axios";
import { useEffect } from "react";
import Navbar from "./Navbar";

const LayoutCustomer = ({ children }) => {
  const links = ["reservation"];
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
  }, []);
  return (
    <div>
      <Navbar items={links} from="customer"></Navbar>
      <div style={{ padding: "0 20px" }}>{children}</div>
    </div>
  );
};

export default LayoutCustomer;

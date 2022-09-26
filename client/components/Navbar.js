import Link from "next/link";
import axios from "../axios";
import { useRouter } from "next/router";

const Navbar = ({ items, from }) => {
  const router = useRouter();
  const logout = async () => {
    localStorage.removeItem("token");
    router.replace(`/${from}`);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ padding: "20px" }}>
        <Link href="/">
          <a>home</a>
        </Link>
      </div>
      <div style={{ padding: "20px" }}>
        <Link href={`/${from}`}>
          <a
            style={{
              fontWeight: router.pathname === "/" + from ? "bold" : "normal",
            }}
          >
            profile
          </a>
        </Link>
      </div>

      {items.map((el) => (
        <div key={el} style={{ padding: "20px" }}>
          <Link href={`/${from}/${el}`}>
            <a
              style={{
                fontWeight: router.pathname.includes("/" + from + "/" + el)
                  ? "bold"
                  : "normal",
              }}
            >
              {el}
            </a>
          </Link>
        </div>
      ))}
      <div style={{ padding: "20px" }}>
        <span onClick={logout}>logout</span>
      </div>

      <style jsx>{`
        span:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Navbar;

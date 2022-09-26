import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <h1>Micket Application</h1>
      <div style={{ display: "flex" }}>
        <div className="link">
          <Link href="/admin">
            <a>Admin</a>
          </Link>
        </div>
        <div className="link">
          <Link href="/staff">
            <a>Staff</a>
          </Link>
        </div>
        <div className="link">
          <Link href="/customer">
            <a>Customer</a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .link {
          padding: 20px;
        }
      `}</style>
    </div>
  );
}

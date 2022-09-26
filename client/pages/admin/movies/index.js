import { useEffect, useState } from "react";
import axios from "../../../axios";

import LayoutAdmin from "../../../components/LayoutAdmin";
import Link from "next/link";

const MoviePage = () => {
  const [movieList, setMovieList] = useState([]);

  const fetchMovieList = async () => {
    try {
      const res = await axios.get("/util/movie");
      setMovieList(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

  return (
    <LayoutAdmin>
      <div>
        <h1>Movie List</h1>

        <Link href={"/admin/movies/create"}>
          <button>+</button>
        </Link>

        <ul>
          {movieList.map((data) => {
            return (
              <li key={data.id} style={{ margin: "20px" }}>
                <Link href={`/admin/movies/${data.id}`}>
                  <a>
                    Name:&nbsp;{data.name}
                    <br></br>
                    Description:&nbsp;{data.description}
                    <br></br>
                    Length:&nbsp;{data.length}&nbsp;slots
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </LayoutAdmin>
  );
};

export default MoviePage;

import { useEffect, useState } from "react";
import axios from "../../../../axios";

import LayoutAdmin from "../../../../components/LayoutAdmin";
import { useRouter } from "next/router";

const MovieIdPage = () => {
  const [movie, setMovie] = useState();
  const [movieName, setMovieName] = useState();
  const [movieDescription, setMovieDescription] = useState();
  const [isFailUpdate, setIsFailUpdate] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const fetchMovie = async () => {
    if (id) {
      try {
        const res = await axios.get(`/util/movie/${id}`);
        setMovie(res.data);

        setMovieName(res.data.name);
        setMovieDescription(res.data.description);
      } catch (err) {}
    }
  };

  const onNameChanged = (event) => {
    setMovieName(event.target.value);
  };

  const onDescriptionChanged = (event) => {
    setMovieDescription(event.target.value);
  };

  const onUpdateMovie = async () => {
    if (id) {
      try {
        const res = await axios.patch(`/admin/movie/${id}`, {
          name: movieName,
          description: movieDescription,
        });
        router.replace("/admin/movies");
      } catch (err) {
        setIsFailUpdate(true);
      }
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  return (
    <LayoutAdmin>
      <div>
        <h1>Movie Details</h1>

        <p>Name</p>
        <input type="text" value={movieName} onChange={onNameChanged} />
        <p>Description</p>
        <input
          type="text"
          value={movieDescription}
          onChange={onDescriptionChanged}
        />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button onClick={onUpdateMovie}>Save Change</button>
        <br></br>
        <br></br>
        {isFailUpdate ? (
          <div
            style={{
              color: "red",
            }}
          >
            Fail to update the movie information.
          </div>
        ) : (
          <></>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default MovieIdPage;

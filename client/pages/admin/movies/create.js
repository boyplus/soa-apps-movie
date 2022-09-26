import { useState } from "react";
import axios from "../../../axios";

import LayoutAdmin from "../../../components/LayoutAdmin";
import { useRouter } from "next/router";

const CreateMoviePage = () => {
  const router = useRouter();
  const [movieName, setMovieName] = useState();
  const [movieDescription, setMovieDescription] = useState();
  const [movieLength, setMovieLength] = useState();
  const [isFailCreate, setIsFailCreate] = useState(false);

  const onNameChanged = (event) => {
    setMovieName(event.target.value);
  };
  const onDescriptionChanged = (event) => {
    setMovieDescription(event.target.value);
  };
  const onLengthChanged = (event) => {
    setMovieLength(event.target.value);
  };

  const onCreateMovie = async () => {
    try {
      const res = await axios.post("/admin/movie", {
        name: movieName,
        description: movieDescription,
        length: movieLength,
      });
      router.replace("/admin/movies");
    } catch (err) {
      setIsFailCreate(true);
    }
  };

  return (
    <LayoutAdmin>
      <div>
        <h1>Create Movie</h1>

        <p>Name</p>
        <input type="text" value={movieName} onChange={onNameChanged} />
        <p>Description</p>
        <input
          type="text"
          value={movieDescription}
          onChange={onDescriptionChanged}
        />
        <p>Length</p>
        <input type="number" value={movieLength} onChange={onLengthChanged} />
        <br></br>
        <br></br>
        <button onClick={onCreateMovie}>Create</button>

        <br></br>
        <br></br>
        <br></br>

        {isFailCreate ? (
          <div
            style={{
              color: "red",
            }}
          >
            Fail to create the movie.
          </div>
        ) : (
          <></>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default CreateMoviePage;

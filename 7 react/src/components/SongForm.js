import { addSong } from "../actions";
import { updateFormData } from "../actions";
import { resetForm } from "../actions";
import { useSelector, useDispatch } from "react-redux";

function SongForm() {
  const songs = useSelector((state) => state.songs);
  const formData = useSelector((state) => state.formData);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newSong = {
      id: songs.length + 1,
      ...formData,
    };

    const formIsEmpty = Object.values(formData).every((item) => item === "");

    if (!formIsEmpty) {
      dispatch(addSong(newSong));
      dispatch(resetForm(event));
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    dispatch(updateFormData(name, value));
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="artist"
        name="artist"
        value={formData.artist}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="genre"
        name="genre"
        value={formData.genre}
        list="genre"
        onChange={handleChange}
      />
      <datalist id="genre">
        <option>Jazz</option>
        <option>Rock</option>
        <option>Pop</option>
      </datalist>

      <input
        type="text"
        placeholder="rating"
        name="rating"
        value={formData.rating}
        list="rating"
        onChange={handleChange}
      />
      <datalist id="rating">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </datalist>
      <button>Add Song</button>
    </form>
  );
}

export default SongForm;

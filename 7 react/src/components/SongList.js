import ListItem from "./ListItem";
import { useSelector } from "react-redux";

function SongList() {
  const songs = useSelector((state) => state.songs);
  const list = songs.map((item) => <ListItem key={item.id} item={item} />);

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Song</th>
          <th>Artist</th>
          <th>Genre</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>{list}</tbody>
    </table>
  );
}

export default SongList;

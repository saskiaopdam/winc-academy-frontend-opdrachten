function ListItem(props) {
  return (
    <tr key={props.item.id}>
      <td>{props.item.title}</td>
      <td>{props.item.artist}</td>
      <td>{props.item.genre}</td>
      <td>{props.item.rating}</td>
    </tr>
  );
}

export default ListItem;

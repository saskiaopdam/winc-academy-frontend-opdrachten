export const addSong = (newSong) => {
  return {
    type: "ADDSONG",
    payload: newSong,
  };
};

export const updateFormData = (name, value) => {
  return {
    type: "UPDATEFORM",
    name: name,
    value: value,
  };
};

export const resetForm = (event) => {
  return {
    type: "RESETFORM",
    title: event.target.title.name,
    artist: event.target.artist.name,
    genre: event.target.genre.name,
    rating: event.target.rating.name,
  };
};

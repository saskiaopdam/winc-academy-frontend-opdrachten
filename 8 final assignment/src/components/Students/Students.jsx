import { Link } from "react-router-dom";

import "./Students.css";

function Students({ data, isLoading, onStudentSelect, onAllSelect }) {
  const getNames = () => {
    if (!isLoading) {
      const names = data.map((item) => item.name);
      let uniqueNames = [...new Set(names)];
      const list = uniqueNames.map((name, index) => (
        <Link
          className="Students-link"
          to={`/${name}`}
          key={index}
          value={name}
          onClick={onStudentSelect}
          role="listitem"
        >
          {name}
        </Link>
      ));
      return list;
    }
  };

  const names = getNames();

  return (
    <div className="Students" role="list">
      {names}|
      <Link
        className="Students-link"
        to={`/`}
        onClick={onAllSelect}
        role="listitem"
      >
        All
      </Link>
    </div>
  );
}

export default Students;

import { useState, useEffect } from "react";

import "./Main.css";

import Papa from "papaparse";
import file from "../../data.csv";
import Chart from "../Chart/Chart";

import Students from "../Students/Students";

function Main() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [diffChecked, setDiffChecked] = useState(true);
  const [enjoyChecked, setEnjoyChecked] = useState(true);

  useEffect(() => {
    Papa.parse(file, {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
        setIsLoading(false);
      },
    });
  }, []);

  const onStudentSelect = (event) => {
    setName(event.target.innerText);
  };
  const onAllSelect = () => {
    setName("");
  };
  const toggleDifficulty = () => {
    setDiffChecked(!diffChecked);
  };
  const toggleEnjoyment = () => {
    setEnjoyChecked(!enjoyChecked);
  };

  return (
    <main className="Main">
      <h1>Student Dashboard</h1>
      <div className="Main-body">
        <nav className="Main-nav">
          <Students
            data={data}
            isLoading={isLoading}
            name={name}
            onStudentSelect={onStudentSelect}
            onAllSelect={onAllSelect}
          />
          <form className="Main-form">
            <label htmlFor="difficulty" className="checkbox">
              <input
                type="checkbox"
                id="difficulty"
                name="rating"
                value="difficulty"
                checked={diffChecked}
                onChange={toggleDifficulty}
              />
              <span>difficulty</span>
            </label>
            <label htmlFor="enjoyment" className="checkbox">
              <input
                type="checkbox"
                id="enjoyment"
                name="rating"
                value="enjoyment"
                checked={enjoyChecked}
                onChange={toggleEnjoyment}
              />
              <span>enjoyment</span>
            </label>
          </form>
        </nav>

        <section className="Main-display">
          <Chart
            data={data}
            isLoading={isLoading}
            name={name}
            diffChecked={diffChecked}
            enjoyChecked={enjoyChecked}
          />
        </section>
      </div>
    </main>
  );
}

export default Main;

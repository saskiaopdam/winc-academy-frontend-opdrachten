import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./Chart.css";

function Chart({ data, isLoading, name, diffChecked, enjoyChecked }) {
  const getIndivRatings = () => {
    if (!isLoading) {
      const indivRatings = data.filter((record) => record.name === `${name}`);
      return indivRatings;
    }
  };

  const getAverageRatings = () => {
    if (!isLoading) {
      const assignments = data.map((record) => record.assignment);
      let uniqueAssignments = [...new Set(assignments)];

      const newArr = uniqueAssignments.map((record) => {
        let difficulty = 0;
        let enjoyment = 0;
        let itemCount = 0;
        data.forEach((item) => {
          if (record === item.assignment) {
            difficulty += parseInt(item.difficultyRating);
            enjoyment += parseInt(item.enjoymentRating);
            itemCount += 1;
          }
        });
        return {
          assignment: record,
          difficultyRating: (difficulty / itemCount).toFixed(1),
          enjoymentRating: (enjoyment / itemCount).toFixed(1),
        };
      });

      return newArr;
    }
  };

  const indivRatings = getIndivRatings();
  const averageRatings = getAverageRatings();

  const renderCustomTick = (t) => {
    if (t.toString().includes(" ")) {
      const searchTerm = " ";
      const indexOfFirst = t.toString().indexOf(searchTerm);
      const customTick = `${t
        .toString()
        .substring(0, indexOfFirst)
        .concat("-P")}`;
      return customTick;
    }
    return t;
  };

  return (
    <div className="Chart">
      <p>Ratings by Assignment:</p>
      {name ? `${name}` : "all students (average)"}
      <ResponsiveContainer width="100%" height={2000}>
        <BarChart
          layout="vertical"
          width={600}
          height={2000}
          data={name ? indivRatings : averageRatings}
          margin={{ top: 30, right: 10, bottom: 10, left: 10 }}
          barCategoryGap={10}
          barGap={0}
        >
          <CartesianGrid
            stroke="#ccc"
            strokeDasharray="3 3"
            horizontal={false}
          />
          <XAxis
            orientation="top"
            type="number"
            allowDecimals={false}
            tickCount={10}
            domain={[0, 5]}
            interval={0}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 15 }}
          />
          <YAxis
            dataKey="assignment"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 15 }}
            tickFormatter={renderCustomTick}
          />
          <Tooltip
            cursor={false}
            offset={0}
            contentStyle={{
              fontSize: 15,
            }}
          />
          <Legend
            verticalAlign="top"
            iconType="square"
            iconSize={12}
            wrapperStyle={{
              top: 20,
              lineHeight: "10px",
              fontSize: 15,
            }}
          />
          {diffChecked ? (
            <Bar
              name="difficulty"
              dataKey="difficultyRating"
              fill="#8884d8"
              barSize={10}
              background={{ fill: "#eee" }}
            ></Bar>
          ) : null}
          {enjoyChecked ? (
            <Bar
              name="enjoyment"
              dataKey="enjoymentRating"
              fill="#82ca9d"
              barSize={10}
              background={{ fill: "#eee" }}
            />
          ) : null}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;

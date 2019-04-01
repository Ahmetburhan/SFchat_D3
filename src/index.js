import ReactDOM from "react-dom";
import csv from "/modalUs.csv";
import React, { PureComponent } from "react";
import "./styles.css";
import logo from "./assets/usbank_logo.png";

//D3 library adding all the
import * as d3 from "d3";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data1 = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

console.log("data1 coming as", data1);

let columns = {
  0: "Inquiry ID",
  1: "Question",
  2: "Viewed Response Matches",
  3: "Unique User ID",
  4: "First Name",
  5: "Last Name",
  6: "Question Source",
  7: "Date/Time",
  8: "Rating"
};

const getIntroOfPage = label => {
  if (label === "Page A") {
    return "Page A is about men's clothing";
  }
  if (label === "Page B") {
    return "Page B is about women's dress";
  }
  if (label === "Page C") {
    return "Page C is about women's bag";
  }
  if (label === "Page D") {
    return "Page D is about household goods";
  }
  if (label === "Page E") {
    return "Page E is about food";
  }
  if (label === "Page F") {
    return "Page F is about baby food";
  }
};
const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    console.log(payload);
    return (
      <div className="custom-tooltip">
        <p className="label">{`Q:${label}`}</p>
        <p className="label">{`A:${payload[0].value}`}</p>

        <p className="intro">{getIntroOfPage(label)}</p>
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
};

class App extends React.Component {
  // static jsfiddleUrl = "https://jsfiddle.net/alidingling/vxq4ep63/";
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let map = {};
    d3.csv(csv, function(d) {
      if (!map[d["Viewed Response Matches"]]) {
        map[d["Viewed Response Matches"]] = [d["Question"]];
      } else {
        map[d["Viewed Response Matches"]] = map[
          d["Viewed Response Matches"]
        ].concat(d["Question"]);
      }
      return {
        Question: d["Question"],
        Response: d["Question"]
          ? [].concat(d["Viewed Response Matches"])
          : d["Viewed Response Matches"],
        Date: d["Date/Time"].split(" ")[0],
        amount: +d["Viewed Response Matches"].length
      };
    })
      .then(function(data) {
        //structured data
        let vizMap = {};
        let index = 0;
        for (let each in map) {
          vizMap[index] = {
            Response: each,
            Questions: map[each]
          };
          index++;
        }
        console.log("data  here", typeof data);
        console.log("map  here", map);
        console.log("vizMap  here", vizMap);

        let json = vizMap;
        return json;
      })
      .then(data => {
        console.log("data here", data);

        this.setState(
          {
            data: data
          },
          () => {
            console.log(this.state.data);
          }
        );
      });
  }
  render() {
    const data = this.state.data;
    console.log("Please check this", data);
    return (
      <div>
        <div className="header">
          <img className="hero" src={logo} alt="U.S. Bank" itemprop="logo" />
          <h1 className="topBanner">UsBank Chat Top Performers</h1>
        </div>
        <BarChart
          width={800}
          height={300}
          data={data}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Response" />
          <YAxis />
          {/* <Tooltip content={<CustomTooltip />} /> */}
          <Legend />
          <Bar dataKey="Questions" barSize={5} fill="#8884d8" />
        </BarChart>

        {/* Test */}
        <BarChart
          width={640}
          height={300}
          data={data1}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="pv" barSize={5} fill="#8884d8" />
        </BarChart>
      </div>
    );
  }
}
export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

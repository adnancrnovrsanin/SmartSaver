import { observer } from "mobx-react-lite";
import React from "react";

const Analytics: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap">
      <div className="flex w-screen">
        <div className="w-1/2 p-4 flex justify-center items-center flex-col">
          <CustomH2 text="Power Consumption Last Week" />
          <SimpleLineChart />
        </div>
        <div className="w-1/2 p-4 flex justify-center items-center flex-col">
          <CustomH2 text="Power Consuption Per Device" />
          <SimpleBarChart />
        </div>
      </div>
      <div className="flex w-screen">
        <div className="w-1/2 p-4 flex justify-center items-center flex-col">
          <CustomH2 text="Consumption on different rates" />
          <SimplePieChart />
        </div>
        <div className="w-1/2 p-4 flex justify-center items-center flex-col">
          <CustomH2 text="Difference in consumption" />
          <SimpleTwoLineChart />
        </div>
      </div>
    </div>
  );
};

export default observer(Analytics);

import "./style.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { CustomH2 } from "@/components/Typography/CustomH2";

const data = [
  {
    day: 1,
    powerConsumption: 300,
  },
  {
    day: 2,
    powerConsumption: 350,
  },
  {
    day: 3,
    powerConsumption: 450,
  },
  {
    day: 4,
    powerConsumption: 200,
  },
  {
    day: 5,
    powerConsumption: 300,
  },
  {
    day: 6,
    powerConsumption: 350,
  },
  {
    day: 7,
    powerConsumption: 300,
  },
];

export function SimpleLineChart() {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis dataKey="powerConsumption" />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="powerConsumption"
        stroke="hsl(217.2 91.2% 59.8%)"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}

import { PureComponent } from "react";
import { BarChart, Bar } from "recharts";

const data2 = [
  {
    name: "Grejanje",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Bojler",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "TV",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Svetlo",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
];

export class SimpleBarChart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/tiny-bar-chart-35meb";

  render() {
    return (
      <>
        <BarChart width={600} height={300} data={data2}>
          <Bar dataKey="uv" fill="hsl(217.2 91.2% 59.8%)" />
        </BarChart>
      </>
    );
  }
}

import { PieChart, Pie } from "recharts";

const data01 = [
  { name: "Red Rate", value: 750 },
  { name: "Blue Rate", value: 400 },
  { name: "Green Rate", value: 1100 },
];

export class SimplePieChart extends PureComponent {

  render() {
    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data01}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#8884d8"
        />
        <Pie
          data={data01}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          fill="#82ca9d"
          label
        />
        <Legend 
          layout="vertical"
          align="right"
          verticalAlign="middle"
        />
      </PieChart>
    );
  }
}

import { Legend, ResponsiveContainer } from "recharts";
const data03 = [
  {
    name: "Day 1",
    day: 7,
    powerConsumption: 300,
    powerConsumption2: 350,
  },
  {
    name: "Day 2",
    day: 7,
    powerConsumption: 350,
    powerConsumption2: 390,
  },
  {
    name: "Day 3",
    day: 7,
    powerConsumption: 450,
    powerConsumption2: 310,
  },
  {
    name: "Day 4",
    day: 7,
    powerConsumption: 200,
    powerConsumption2: 275,
  },
  {
    name: "Day 5",
    day: 7,
    powerConsumption: 300,
    powerConsumption2: 230,
  },
  {
    name: "Day 6",
    day: 7,
    powerConsumption: 350,
    powerConsumption2: 100,
  },
  {
    name: "Day 7",
    day: 7,
    powerConsumption: 300,
    powerConsumption2: 410,
  },
];

export class SimpleTwoLineChart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/customized-legend-event-l19fo";

  state = {
    opacity: {
      uv: 1,
      pv: 1,
    },
  };

  handleMouseEnter = (o: any) => {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 0.5 },
    });
  };

  handleMouseLeave = (o: any) => {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  };

  render() {
    const { opacity } = this.state;

    return (
      <div style={{ width: "100%" }}>
        <ResponsiveContainer width={600} height={300}>
          <LineChart
            width={500}
            height={300}
            data={data03}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            />
            <Line
              type="monotone"
              dataKey="powerConsumption"
              strokeOpacity={opacity.pv}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="powerConsumption2"
              strokeOpacity={opacity.uv}
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

import { FunctionalComponent, h } from "preact";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from "recharts";

interface Props {
	data: any;
}

const ChartPieTasks: FunctionalComponent<Props> = props => {
	return (
		<div className="chart-container" style={{ width: "100%", height: 300 }}>
			<ResponsiveContainer>
				<AreaChart
					// width={500}
					// height={400}
					data={props.data}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" tick={{ fill: "#FFF" }} />
					<YAxis />
					<Tooltip contentStyle={{ color: "#000" }} />
					<Area
						type="monotone"
						dataKey="trash"
						stackId="1"
						stroke="#8884d8"
						fill="#8884d8"
					/>
					<Area
						type="monotone"
						dataKey="dishes"
						stackId="1"
						stroke="#82ca9d"
						fill="#82ca9d"
					/>
				</AreaChart>
			</ResponsiveContainer>
			<Legend />
		</div>
	);
};

export default ChartPieTasks;

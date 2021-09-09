import { FunctionalComponent, h } from "preact";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Legend,
	Tooltip,
	XAxis,
	YAxis
} from "recharts";

interface Props {
	data: any[];
}

const ChartPieTasks: FunctionalComponent<Props> = props => {
	const types = new Set<string>();

	// eslint-disable-next-line react/prop-types
	props.data.forEach((dataPoint: any) => {
		Object.keys(dataPoint).forEach(key => {
			if (key !== "date") {
				types.add(key);
			}
		});
	});

	const colors = [
		"red",
		"blue",
		"green",
		"yellow",
		"purple",
		"pink",
		"orange",
		"brown"
	];

	return (
		<div style={{ marginBottom: 50 }}>
			<h2>Completed Tasks</h2>
			<div>
				<AreaChart
					width={325}
					height={300}
					// eslint-disable-next-line react/prop-types
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
					{Array.from(types).map((value, index) => {
						return (
							// eslint-disable-next-line react/jsx-key
							<Area
								type="monotone"
								dataKey={value}
								stackId="1"
								stroke={colors[index]}
								fill={colors[index]}
							/>
						);
					})}
				</AreaChart>
			</div>
			{/* </ResponsiveContainer> */}
			<Legend />
		</div>
	);
};

export default ChartPieTasks;

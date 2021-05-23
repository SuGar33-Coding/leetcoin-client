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

	return (
		<div className="chart-container" style={{ width: "100%", height: 300 }}>
			<ResponsiveContainer>
				<AreaChart
					// width={500}
					// height={400}
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
					{Array.from(types).map(value => {
						return (
							// eslint-disable-next-line react/jsx-key
							<Area
								type="monotone"
								dataKey={value}
								stackId="1"
								stroke="#82ca9d"
								fill="#82ca9d"
							/>
						);
					})}
				</AreaChart>
			</ResponsiveContainer>
			<Legend />
		</div>
	);
};

export default ChartPieTasks;

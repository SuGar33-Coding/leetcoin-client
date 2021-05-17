import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import ChartPieTasks from "../../components/chart-pie-tasks";
import style from "./style.css";

const Data: FunctionalComponent = () => {
	const data = [
		{
			date: "05-01",
			trash: 100,
			dishes: 50
		},
		{
			date: "05-02",
			trash: 400,
			dishes: 75
		}
	];

	return (
		<div class={style.data}>
			<ChartPieTasks data={data} />
		</div>
	);
};

export default Data;

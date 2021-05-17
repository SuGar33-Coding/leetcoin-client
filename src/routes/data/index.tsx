import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import ChartPieTasks from "../../components/chart-pie-tasks";
import style from "./style.css";

const Data: FunctionalComponent = () => {
	return (
		<div class={style.data}>
			<ChartPieTasks />
		</div>
	);
};

export default Data;

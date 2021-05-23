import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import ChartPieTasks from "../../components/chart-pie-tasks";
import { Api } from "../../utils/api";
import style from "./style.css";

const Data: FunctionalComponent = () => {
	const [data, setData] = useState<any[]>([]);

	useEffect(() => {
		const getAgg = async () => {
			const aggData: any[] = await Api.getEarningsDayAggregate();
			const cleanData: any[] = [];
			aggData.forEach(aggDataItem => {
				const cleanDataItem: any = {};

				aggDataItem.NOTE_GROUP.forEach((noteItem: any) => {
					cleanDataItem[noteItem.NOTE] = noteItem.count;
				});

				cleanData.push({
					date: aggDataItem._id,
					...cleanDataItem
				});
			});
			setData(cleanData);
			console.log(cleanData);
		};

		getAgg();
	}, []);

	return (
		<div class={style.data}>
			<ChartPieTasks data={data} />
		</div>
	);
};

export default Data;

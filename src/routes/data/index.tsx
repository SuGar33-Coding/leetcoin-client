import moment from "moment";
import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import ChartPieTasks from "../../components/chart-pie-tasks";
import { Api } from "../../utils/api";
import { Util } from "../../utils/util";
import style from "./style.css";

const Data: FunctionalComponent = () => {
	const [data, setData] = useState<EaringsDayAggData>([]);

	useEffect(() => {
		const getAgg = async () => {
			const startDate = moment().subtract(14, "days");

			const aggData = await Api.getEarningsDayAggregate(
				startDate.toString()
			);
			const cleanData: EaringsDayAggData = [];
			const earningsTypes = Util.getEarningsTypes();
			aggData.forEach(aggDataItem => {
				const cleanDataItem: { [key: string]: number } = {};

				// Add the retrieved types to that day
				aggDataItem.note_group.forEach(noteItem => {
					cleanDataItem[noteItem.note] = noteItem.count;
				});

				// FIll in the rest of the null types with 0s
				earningsTypes.forEach(earningsType => {
					if (!cleanDataItem[earningsType]) {
						cleanDataItem[earningsType] = 0;
					}
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

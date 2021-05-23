type EaringsDayAggData = EarningsDayData[];

type EarningsDayData = {
	date: string;
	[key: Earnings]: number;
};

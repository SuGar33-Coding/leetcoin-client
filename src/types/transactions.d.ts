type EaringsDayAggregate = EarningsDay[];

type EarningsDay = {
	_id: string;
	note_group: NoteType[];
};

type NoteType = {
	note: Earnings;
	count: number;
};

type Earnings =
	| "small-dish"
	| "large-dish"
	| "unload-dishwasher"
	| "small-clean"
	| "clean-kitchen"
	| "clean-bathroom"
	| "clean-common-room";

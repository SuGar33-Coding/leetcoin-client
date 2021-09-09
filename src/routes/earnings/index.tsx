import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";
import style from "./style.css";
import { route } from "preact-router";
import UserSelect from "../../components/user-select";
import { Util } from "../../utils/util";

interface Props {
	type: string;
}

const Earnings: FunctionalComponent<Props> = (props: Props) => {
	const { type } = props;

	const [isValidInput, setIsValidInput] = useState<boolean>(
		Local.isLoggedIn()
	);
	const [inputName, setInputName] = useState<string>("");
	const [amt, setAmt] = useState<number>(0);
	const [typeDescription, setTypeDescription] = useState<string>("");

	const inputChangeHandler = (inputValue: string, isUser: boolean) => {
		setInputName(inputValue);
		setIsValidInput(isUser);
	};

	const earningsTypes: {
		[key: string]: { description: string; amount: number };
	} = {
		"small-dish": {
			description:
				"small dishes load 💦🍽💦 e.g. unloading drying rack, clearing out half-full sink",
			amount: 0.05
		},
		"large-dish": {
			description: "large dishes load 💦🍽🧽🍽💦🥵 e.g. clearing full sink",
			amount: 0.146
		},
		"unload-washer": {
			description: "unload all the clean dishes from the washer 👋🍽",
			amount: 0.101
		},
		"small-clean": {
			description:
				"small cleaning task 🧹🍃 e.g. pick up trash around the apartment, wipe off tables, organize items",
			amount: 0.057
		},
		"clean-kitchen": {
			description:
				"deep clean of the kitchen 🍴🍽🧽🧽 includes cleaning dishes",
			amount: 0.3
		},
		"clean-bathroom": {
			description: "deep clean of a bathroom 🧽🛁🚿🧼🧽",
			amount: 0.4
		},
		"clean-common-room": {
			description: "deep clean of the common room 🧹🧹🗑",
			amount: 0.2783
		},
		groceries: {
			description: "order/bring up/put away groceries 🍙🥦🧃",
			amount: 0.05
		},
		trash: {
			description: "take a trip outside to deliver some trash 🗑♻️",
			amount: 0.0775
		}
	};

	useEffect(() => {
		const earning = earningsTypes[type];

		if (!earning) {
			route("/notfound");
		}

		setTypeDescription(earning.description);
		setAmt(earning.amount);
	}, [earningsTypes, type]);

	const confirmEarningsHandler = async () => {
		const name = Local.isLoggedIn() ? Local.getName() : inputName;
		try {
			await Api.makeEarnings(name as string, amt, type);
			Util.playDing();
			alert(`Earnings of ${amt} was good! :3`);
		} catch (error) {
			alert(`Oh nOwO the earnings failed! 😰`);
		}
		if (Local.isLoggedIn()) {
			route("/profile");
		} else {
			route("/");
		}
	};

	return (
		<div class={style.earnings}>
			<h1>Earnings</h1>
			<h2>For: {typeDescription}</h2>
			<h2>Amount: {amt}</h2>
			{/* When the user is not logged in */}
			<form hidden={Local.isLoggedIn()}>
				<label>
					Choose the wallet owner:
					<UserSelect onSelectOption={inputChangeHandler} />
				</label>
			</form>
			{/* When the user is logged in */}
			<p hidden={!Local.isLoggedIn()}>
				Confirm earnings for{" "}
				<span style={{ fontWeight: "bold" }}>{Local.getName()}</span>?
			</p>
			<button
				onClick={async () => await confirmEarningsHandler()}
				disabled={!isValidInput}
			>
				Confirm Earnings
			</button>
		</div>
	);
};

export default Earnings;

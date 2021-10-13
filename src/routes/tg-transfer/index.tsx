import { FunctionalComponent, h } from "preact";
import { useEffect } from "preact/hooks";
import { Api } from "../../utils/api";
import { Local } from "../../utils/local";
import { Util } from "../../utils/util";
import style from "./style.css";
import qs from "querystring";

const TgTransfer: FunctionalComponent = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleTransferSubmit = async () => {
		try {
			const { amt, receiver, "?tgId": tgId } = qs.parse(location.search);
			await Api.makeTgTransfer(
				tgId as string,
				receiver as string,
				parseFloat(amt as string)
			);
			Util.playDing();
		} catch (error) {
			alert("Transaction failed for some reason!");
			window.close();
		}
		window.close();
	};

	useEffect(() => {
		handleTransferSubmit();
	}, []);

	return (
		<div class={style.transfer}>
			<h1>Loading Transfer...</h1>
		</div>
	);
};

export default TgTransfer;

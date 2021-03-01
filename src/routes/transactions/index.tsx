import { createRef, FunctionalComponent, h } from "preact";
import style from "./style.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { useEffect, useState } from "preact/hooks";
import { Api } from "../../utils/api";
import moment from "moment";
import { Paper, Typography } from "@material-ui/core";

interface Transaction {
	type: "TRANSACTION" | "TRANSFER" | "PAYMENT";
	amt: {
		$numberDecimal: string;
	};
	note?: string;
	primaryWallet: string;
	secondaryWallet?: string;
	createdAt: string;
}

const Transactions: FunctionalComponent = () => {
	const itemsLengthIncAmt = 20;
	const targetElement = createRef();
	const [itemsLength, setItemsLength] = useState<number>(itemsLengthIncAmt);
	const [items, setItems] = useState<Transaction[]>([]);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const fetchMore = () => {
		Api.queryTransactions(itemsLength).then(transactions => {
			if (transactions.length === items.length) {
				// If the list didn't increase, there ain't anymore
				setHasMore(false);
			} else {
				setItems(transactions);
				setItemsLength(itemsLength + itemsLengthIncAmt);
			}
		});
	};

	const refresh = () => {
		setItemsLength(itemsLengthIncAmt);
		fetchMore();
	};

	useEffect(() => {
		fetchMore();
		disableBodyScroll(targetElement.current);

		return clearAllBodyScrollLocks;
	}, [targetElement]);

	return (
		<div class={style.home}>
			<Typography variant="h4">Transactions</Typography>
			<div
				ref={targetElement}
				id="transactionContainer"
				class={style.transactionContainers}
			>
				<InfiniteScroll
					dataLength={items.length}
					next={fetchMore}
					hasMore={hasMore}
					loader={<h4>Loading...</h4>}
					scrollableTarget="transactionContainer"
					// refreshFunction={refresh}
					// pullDownToRefresh
					// pullDownToRefreshThreshold={125}
					// pullDownToRefreshContent={
					//     <h3 style={{ textAlign: "center" }}>
					//         👇 Pull down to refresh
					//     </h3>
					// }
					// releaseToRefreshContent={
					//     <h3 style={{ textAlign: "center" }}>
					//         👆 Release to refresh
					//     </h3>
					// }
				>
					{items.map((txn, index) => (
						<div style={{ marginBottom: 15 }} key={index}>
							<span>
								[
								{moment(txn.createdAt).format(
									"MM/DD/YY HH:mm:ss"
								)}
								]
							</span>
							<br />
							<span>
								<span class={style.type}>{txn.type}</span>{" "}
								<span class={style.primaryWallet}>
									{txn.primaryWallet.slice(-10)}
								</span>
							</span>
							<br />
							<div style={{ marginLeft: 20 }}>
								<span>
									<span class={style.infoLabel}>Amt</span>:{" "}
									<span class={style.info}>
										{parseFloat(
											txn.amt.$numberDecimal
										).toPrecision(10)}
									</span>
								</span>
								<span hidden={!txn.secondaryWallet}>
									<br />
									<span class={style.infoLabel}>
										From
									</span>:{" "}
									<span class={style.info}>
										{txn.secondaryWallet?.slice(-10)}
									</span>
								</span>
								<span hidden={!txn.note}>
									<br />
									<span class={style.infoLabel}>
										Note:
									</span>:{" "}
									<span class={style.info}>{txn.note}</span>
								</span>
							</div>
						</div>
					))}
				</InfiniteScroll>
			</div>
		</div>
	);
};

export default Transactions;

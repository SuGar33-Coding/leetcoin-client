export const Util = {
	getEarningsTypes: () => {
		return [
			"small-dish",
			"large-dish",
			"unload-washer",
			"small-clean",
			"clean-kitchen",
			"clean-bathroom",
			"clean-common-room",
			"groceries",
			"trash"
		];
	},

	playDing: () => {
		const audioCtx = new window.AudioContext();
		const gain = audioCtx.createGain();
		gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
		const osc = audioCtx.createOscillator();
		osc.type = "sine";
		osc.frequency.setValueAtTime(1567.98, audioCtx.currentTime);
		// osc.frequency.exponentialRampToValueAtTime(
		// 	2000,
		// 	audioCtx.currentTime + 0.2
		// );
		osc.connect(gain);
		gain.connect(audioCtx.destination);
		osc.start();
		gain.gain.exponentialRampToValueAtTime(1, audioCtx.currentTime + 0.001);
		gain.gain.exponentialRampToValueAtTime(
			0.0001,
			audioCtx.currentTime + 0.5
		);
		osc.stop(0.5);
	}
};

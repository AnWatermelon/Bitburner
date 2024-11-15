/** @param {NS} ns */
export async function main(ns) {
	let target = ns.args[0];
	ns.tprint(calcThreads(target, 0));
	ns.tprint(calcThreads(target, 1));
	ns.tprint(calcThreads(target, 2));

		function calcThreads(target, type) {
		let threads;
		switch (type) {
			case 0:
				threads = Math.ceil(0.99/ns.formulas.hacking.hackPercent(ns.getServer(target), ns.getPlayer()));
				break;
			case 1:
				if(ns.getServerMoneyAvailable(target) != 0) {
					threads = Math.ceil(ns.formulas.hacking.growThreads(ns.getServer(target), ns.getPlayer(), ns.getServerMaxMoney(target)));
				} else {
					threads = 1000;
				}
				break;
			case 2:
				threads = Math.ceil((ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target))/ns.weakenAnalyze(1));
				break;
		}
		return threads;
	}
}
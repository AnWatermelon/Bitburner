/** @param {NS} ns */
export async function main(ns) {
	let i = 0;
	let num = ns.hacknet.numNodes();
	while (true) {
		let lowC = getLowest();
		let next = 0;

		switch (lowC) {
			case "LUp":
				next = ns.hacknet.getLevelUpgradeCost(i);
				if (ns.hacknet.getLevelUpgradeCost(i) <= mone()) {
					ns.print("Check passed, upgrading level of node " + i);
					ns.hacknet.upgradeLevel(i);
				} else {
					ns.print("Not enough money to level up node " + i);
				}
				break;
			case "RUp":
				next = ns.hacknet.getRamUpgradeCost(i);
				if (ns.hacknet.getRamUpgradeCost(i) <= mone()) {
					ns.print("Check passed, upgrading ram of node " + i);
					ns.hacknet.upgradeRam(i);
				} else {
					ns.print("Not enough money to upgrade ram on node " + i);
				}
				break;
			case "CUp":
				next = ns.hacknet.getCoreUpgradeCost(i);
				if (ns.hacknet.getCoreUpgradeCost(i) <= mone()) {
					ns.print("Check passed, upgrading core of node " + i);
					ns.hacknet.upgradeCore(i);
				} else {
					ns.print("Not enough money to upgrade Cores on node " + i);
				}
				break;
			case "PUp":
				next = ns.hacknet.getPurchaseNodeCost();
				if (ns.hacknet.getPurchaseNodeCost() <= mone()) {
					ns.print("Purchasing new node");
					ns.hacknet.purchaseNode();
				} else {
					ns.print("Not enough money to buy new node");
				}
				break;
			default:
				ns.print("Next upgrade for node " + i + " is too expensive");
				break;
		}
		num = ns.hacknet.numNodes();
		if (i == num - 1) {
			i = 0;
			ns.print("Progress to next purchase: " + (next/mone()) + "% (" + next + ")");
			await ns.sleep(1);
		} else {
			i++;
		}
	}
	function mone() {
		return ns.getServerMoneyAvailable("home");
	}
	function getLowest() {
		let LUp = ns.hacknet.getLevelUpgradeCost(i);
		let RUp = ns.hacknet.getRamUpgradeCost(i);
		let CUp = ns.hacknet.getCoreUpgradeCost(i);
		let PUp = ns.hacknet.getPurchaseNodeCost();

		switch (Math.min(LUp, RUp, CUp, PUp)) {
			case LUp:
			ns.print("Lowest cost is Level");
			return "LUp";

			case RUp:
			ns.print("Lowest cost is RAM");
			return "RUp";

			case CUp:
			ns.print("Lowest cost is Core");
			return "CUp";

			case PUp:
			ns.print("Lowest cost is New");
			return "PUp";
		}
	}	
}
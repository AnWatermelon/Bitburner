/** @param {NS} ns */
export async function main(ns) {

	let arr = [{
							"type": 'RUp',
							"cost": 20 
							}			
						];

		let i = 0;
		let curr = getLowest(i);
		let cost;
		switch (curr) {
			case "LUp":
				cost = ns.hacknet.getLevelUpgradeCost(i);
				break;
			case "RUp":
				cost = ns.hacknet.getRamUpgradeCost(i);
				break;
			case "CUp":
				cost = ns.hacknet.getCoreUpgradeCost(i);
				break;
		}
		arr.push({"type": curr, "cost": cost});
	//	ns.tprint(arr);

	ns.tprint(1/ns.formulas.hacking.growPercent(ns.getServer('foodnstuff'), 1158, ns.getPlayer()));


	function getLowest(i) {
		let LUp = ns.hacknet.getLevelUpgradeCost(i);
		let RUp = ns.hacknet.getRamUpgradeCost(i);
		let CUp = ns.hacknet.getCoreUpgradeCost(i);

		switch (Math.min(LUp, RUp, CUp)) {
			case LUp:
				ns.print("Lowest cost is Level");
				return "LUp";

			case RUp:
				ns.print("Lowest cost is RAM");
				return "RUp";

			case CUp:
				ns.print("Lowest cost is Core");
				return "CUp";
		}
	}


function mostRam(servers) {
		let most = 0;
		for(let i in servers) {
			if (ns.getServerUsedRam(servers[i]) == 0) {
				return servers[i];
				debugger;
			} else if (availableRam(servers[i]) > most) {
				debugger;
				most = servers[i];
				debugger;
			}
		}
		return most;
	}
	
function availableRam(hostname) {
	debugger;
	return ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname);
	debugger;
}

}
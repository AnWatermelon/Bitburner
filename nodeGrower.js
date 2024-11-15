/** @param {NS} ns */
export async function main(ns) {
	let arr = [];
	let num = ns.hacknet.numNodes();
	const moneyThresh = 1;
	ns.disableLog('sleep');
	ns.tail();
	while(true){
		num = ns.hacknet.numNodes();
		arr = [];
		for(let i = 0; i < num; i++) {
			let lowest = getLowest(i);
			let curr = lowest[0];
			let cost = lowest[1];

			arr.push({"type": curr, "cost": cost}); //populating the array of hacknet nodes
		}

		//ns.tprint(arr[ovrAll()].cost);
		let theMove = [];
		theMove.push(arr[ovrAll()]); //Saving cheapest upgrade
		//ns.tprint(theMove);
		if (ns.hacknet.getPurchaseNodeCost() < theMove[0].cost) { //Checking if the cost of buying a new node is less than the cheapest upgrade
			theMove.splice(0, 1, {"type": 'PUp', "cost": ns.hacknet.getPurchaseNodeCost()});
		} else {
			theMove[0].index = ovrAll();
		}
		//ns.tprint(theMove);
		ns.print("Currently considering " + theMove);

		while (mone()*moneyThresh < theMove[0].cost) { //Making sure we have enough money, waiting if not
			ns.clearLog();
			ns.print("Awaiting cash to attempt " + theMove[0].type + " for " + theMove[0].cost + ". Current progress: " + ((mone()*moneyThresh)/theMove[0].cost)*100 + "%");
			await ns.sleep(100);
		}
		//ns.tprint(theMove[0]);
		let result;
		if(mone()*moneyThresh >= theMove[0].cost) { //One last check
			switch (theMove[0].type) {
				case 'LUp':
					result = ns.hacknet.upgradeLevel(theMove[0].index);
					break;
				case 'RUp':
					result = ns.hacknet.upgradeRam(theMove[0].index);
					break;
				case 'CUp':
					result = ns.hacknet.upgradeCore(theMove[0].index);
					break;
				case 'PUp':
					result = ns.hacknet.purchaseNode();
					break;
				default:
					ns.tprint("Something's fucked up");
			}
		}
		if (result) {
			ns.print("upgrade successful");
		} else {
			ns.print("upgrade unsucccessful");
		}
		await ns.sleep(100);
	}
	
	function ovrAll() {
		let lowest;
		let ret;
		for(let i = 0; i < arr.length; i++) {
			if (i == 0) {lowest = arr[i].cost; ret = i;}
			if (arr[i].cost < lowest) {
				lowest = arr[i].cost;
				ret = i;
			}
		}
		return ret;
	}

	function getLowest(i) {
		let LUp = ns.hacknet.getLevelUpgradeCost(i);
		let RUp = ns.hacknet.getRamUpgradeCost(i);
		let CUp = ns.hacknet.getCoreUpgradeCost(i);

		switch (Math.min(LUp, RUp, CUp)) {
			case LUp:
				ns.print("Lowest cost is Level");
				return ["LUp", ns.hacknet.getLevelUpgradeCost(i)];

			case RUp:
				ns.print("Lowest cost is RAM");
				return ["RUp", ns.hacknet.getRamUpgradeCost(i)];

			case CUp:
				ns.print("Lowest cost is Core");
				return ["CUp", ns.hacknet.getCoreUpgradeCost(i)];
		}
	}
	function mone() {
		return ns.getServerMoneyAvailable('home');
	}
}
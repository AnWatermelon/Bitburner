/** @param {NS} ns */
export async function main(ns) {
	let choice = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384];
	let go = true;
	while (go) {
		let name = await ns.prompt("Server name?", {type: "text"});
		let ram = await ns.prompt("Amount of ram?", {type: "select", choices: choice});
		let ans = await ns.prompt("This server will cost " + ns.getPurchasedServerCost(ram) + ". Proceed?");
		switch (ans) {
			case true:
				if (ns.getPurchasedServerCost(ram) <= ns.getServerMoneyAvailable('home')) {
					ns.purchaseServer(name, ram);
					go = false;
				} else {
					ns.tprint("Not enough money!");
				}
				break;
			default:
				ans = ns.prompt("Try again?");
				switch (ans) {
					case "Yes":
						break;
					case "No":
						go = false;
						break;
				}
		}
	}
}
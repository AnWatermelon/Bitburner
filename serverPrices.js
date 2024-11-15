/** @param {NS} ns */
export async function main(ns) {
	ns.tprint ('size        price');
	let lim = 0;
	for (let i = 0; i < 25; i++) {
		ns.tprint(Math.pow(2, i) + '        ' + ns.getPurchasedServerCost(Math.pow(2, i)));
		if ((Math.pow(2, i) * 25) <= ns.getServerMoneyAvailable('home')) {
			lim = Math.pow(2, i);
		}
	}
	ns.tprint("Limit: " + lim);
}
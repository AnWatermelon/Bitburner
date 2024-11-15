/** @param {NS} ns */
export async function main(ns) {
	let child = ns.sleeve.getSleeve(0);

	while (child.shock > 0) {
		await ns.sleep(1000);
		ns.clearLog();
		ns.print("Sleeve shock at " + child.shock);
	}

	ns.sleeve.setToSynchronize(0);

	while (child.sync < 100) {
		await ns.sleep(1000);
		ns.clearLog();
		ns.print("Sleeve shock at " + child.shock);
	}
}
/** @param {NS} ns */
export async function main(ns) {
	ns.killall(ns.getHostname());
	let nodeP = ns.exec('nodegrower.js', ns.getHostname(), 1);
	let mothP = ns.exec('mothership.js', ns.getHostname(), 1);
	if(nodeP != 0 && mothP != 0) {
		ns.tprint("Rollout successful");
	} else if(nodeP == 0) {
		ns.tprint('Nodegrower failure');
	}
	if(mothP == 0) {
		ns.tprint('Mothership failure');
	}
	ns.exit();
}
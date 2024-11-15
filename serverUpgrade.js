/** @param {NS} ns **/
export async function main(ns) {
	let maxSize = 1048576;
	let servers = ns.getPurchasedServers();

		for (let i in servers) {
		ns.tprint("Upgrading " + servers[i] + " with " + maxSize + "GB of ram")
		ns.killall(servers[i]);
		ns.upgradePurchasedServer(servers[i], maxSize);
	}
}
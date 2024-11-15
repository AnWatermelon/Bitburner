/** @param {NS} ns */
export async function main(ns) {
	let servers = ns.getPurchasedServers();
	servers[servers.length] = 'home';
	for (let i in servers) {
			ns.scriptKill('weakStarDes.js', servers[i]);
	}
}
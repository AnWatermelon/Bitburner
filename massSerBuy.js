/** @param {NS} ns */
export async function main(ns) {
	let ram = 128;
	for(let i = 0; i < 25; i++) {
		if(ns.serverExists('p-serv' + i)) {
			ns.upgradePurchasedServer('p-serv' + i, ram);
		} else {
			ns.purchaseServer("p-serv" + i, ram);
		}
	}
}
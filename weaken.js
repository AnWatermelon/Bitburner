/** @param {NS} ns **/
export async function main(ns) {
	let target = ns.args[0];
	let secThresh = ns.args[1];

	await ns.weaken(target);
}
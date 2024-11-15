/** 
 * @param {NS} ns
 **/
export async function main(ns) {

	let bro = ns.getPortHandle(1);

	await bro.nextWrite();

	let boi = ns.getPortHandle(2);
	let servers = [];
	while (!(boi.empty())) {
		servers += boi.read();
	}

	for (const i of servers) {
		ns.tprint(i);
	}
/*
	let i = 0;


	let ram = ns.getServerMaxRam(ns.getHostname()) - (ns.getScriptRam('nodegrower.js', 'home'));
	let cost = ns.getScriptRam('starDestroyer.js', ns.getHostname());



	i = 0;
	while (i < servers.length) {
		//OPTIONAL
		//Wait for player to reach the correct hacking level
		while (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(servers[i])) {
			await ns.sleep(200);
		}

		//break in
		if (ns.fileExists('BruteSSH.exe', 'home')) {
			ns.brutessh(servers[i]);
		}

		if (ns.fileExists('FTPCrack.exe', 'home')) {
			ns.ftpcrack(servers[i]);
		}

		if (ns.fileExists('relaySMTP.exe', 'home')) {
			ns.relaysmtp(servers[i]);
		}

		if (ns.fileExists('HTTPWorm.exe', 'home')) {
			ns.httpworm(servers[i]);
		}

		//Kill all processes
		ns.killall(servers[i]);

		//NUKE the target server to gain root access
		ns.nuke(servers[i]);
		if ((ns.getServerMaxRam(ns.getHostname()) - ns.getServerUsedRam(ns.getHostname())) < ns.getScriptRam('starDestroyer.js', ns.getHostname())) {
			ns.tprint("Out of ram on host!");
			ns.exit();
		} else {
			ns.tprint("Executing starDestroyer.js on server " + servers[i] + ".");
			ns.exec('starDestroyer.js', ns.getHostname(), 1, servers[i]);
			i++;
		}

	}
*/
}
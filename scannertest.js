/** @param {NS} ns */
// Servers is a global variable, can be accessed by all instances of a script as one variable
//	Running script self replicates and populates set
let servers = new Set();
export async function main(ns) {
	ns.clearPort(1);
	ns.clearPort(2);
	let local = ns.scan();
	let forbidden = new Set();
	forbidden.add('home');
	forbidden.add('darkweb');
	for (let i in local) {
		if (ns.getPurchasedServers().includes(local[i])) {
			forbidden.add(local[i]);
		}
		if (!(forbidden.has(local[i])) && !(servers.has(local[i]))) {
			if (ns.fileExists('BruteSSH.exe', 'home')) {
				ns.brutessh(local[i]);
			}

			if (ns.fileExists('FTPCrack.exe', 'home')) {
				ns.ftpcrack(local[i]);
			}

			if (ns.fileExists('relaySMTP.exe', 'home')) {
				ns.relaysmtp(local[i]);
			}

			if (ns.fileExists('HTTPWorm.exe', 'home')) {
				ns.httpworm(local[i]);
			}

			if (ns.fileExists('SQLInject.exe', 'home')) {
				ns.sqlinject(local[i]);
			}

			ns.killall(local[i]);
			ns.nuke(local[i]);

			if(ns.getServerRequiredHackingLevel(local[i]) > ns.getPlayer().skills.hacking) {
				ns.writePort(1, 1);
				break;
			}

			ns.scp('scannertest.js', local[i], 'home');
			let j = local[i];
			servers.add(j);
			ns.exec('scannertest.js', local[i], 1);
		}
	}


	//If it's the ancestor program, add all of temp to port 2
	let temp = servers.values();
	if (ns.getHostname() == 'home') {
		await ns.sleep(50);
		for (const i of temp) {
			ns.writePort(2, i);
		}
	} else {
		ns.exit();
	}

	//Read out port 2
	let bruh = ns.getPortHandle(2);

	while(!(bruh.empty())) {
		ns.tprint(ns.readPort(2));
	}
}
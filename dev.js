/** @param {NS} ns */
export async function main(ns) {
	let gay = ns.getPurchasedServers();
	gay[gay.length] = 'home';
	ns.tprint(gay);
	ns.tprint(findServer(100, 0));
	ns.tprint(calcThreads("foodnstuff", 1))
	ns.tprint(ns.growthAnalyze("alpha-ent", 4));
	
	async function findServer(threads, h) {
		let ramNeed;
		if (h == 0) {
			ramNeed = threads * ns.getScriptRam('grow.js', 'home');
		} else {
			ramNeed = threads * ns.getScriptRam('hack.js', 'home');
		}
		while (true) {
			if (search(ramNeed) != " ") {
				return search(ramNeed);
			}
			await ns.sleep(10);
		}

	}
	function search (ram) {
		let servers = ns.getPurchasedServers();
		servers[servers.length] = 'home';
		for (let i in servers) {
			if ((ns.getServerMaxRam(servers[i]) - ns.getServerUsedRam(servers[i])) >= ram/* && servers[i] != 'home'*/) {
				return servers[i];
			} else if (i == servers.length - 1) {
				ns.print("No servers found! Ram must be: " + ram);
				return " ";
			}
		}
	}
	
	function calcThreads(target, type) {
		let threads;
		//let host = ns.getServer(host);
		switch (type) {
			case 0:
				threads = Math.ceil(ns.hackAnalyzeThreads(target, (ns.getServerMaxMoney(target)*.99)));
				break;
			case 1:
				threads = Math.ceil(ns.growthAnalyze(target, (ns.getServerMaxMoney(target)/ns.getServerMoneyAvailable(target))));
				break;
			case 2:
				threads = Math.ceil((ns.getServerSecurityLevel() - ns.getServerMinSecurityLevel())/ns.weakenAnalyze(1));
				break;
		}
		return threads;
	}
	
}
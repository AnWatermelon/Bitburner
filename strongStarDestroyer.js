/** @param {NS} ns */
export async function main(ns) {
	let target = ns.args[0];

	let gT = ns.getGrowTime(target);
	let wT = ns.getWeakenTime(target);
	let hT = ns.getHackTime(target);

	
	if (ns.getServerSecurityLevel(target) != ns.getServerMinSecurityLevel(target)) {
		let home = await findServer(calcThreads(target,2), 0);
		let weakenPID = ns.exec('weaken.js', home, calcThreads(target, 2), target);
		ns.print("Attempting preliminary weaken");
		if (weakenPID == 0) {
			ns.tprint("exec failed on pre weaken! Target: " + target);
			ns.exit();
		} else {
			ns.print("Preliminary weaken in progress");
			for (let i = 1; i <= 100; i++) {
				await ns.sleep(ns.getWeakenTime(target) / 100);
				ns.clearLog();
				ns.print("Weakening at " + i + "% and total growth at " + (ns.getServerMoneyAvailable(target) / moneyThresh) * 100 + "%");
			}
		}
	}
	if (ns.getServerMoneyAvailable(target) != ns.getServerMaxMoney(target)) {
		let home = await findServer(calcThreads(target, 2), 0);
		let growPID = ns.exec('grow.js', home, calcThreads(target, 1), target);
		ns.print("Attempting preliminary grow");
		ns.print("Growing at " + (ns.getServerMoneyAvailable(target) / moneyThresh) * 100 + "% of total");
		if (growPID == 0) {
			ns.tprint("exec failed on grow! Target: " + target);
			ns.exit();
		} else {
			ns.print("Preliminary grow in progress");
			for (let i = 1; i <= 100; i++) {
				await ns.sleep(ns.getGrowTime(target) / 100);
				ns.clearLog();
				ns.print("Growing at " + i + "% and total growth at " + (ns.getServerMoneyAvailable(target) / moneyThresh) * 100 + "%");
			}
		}
	}
	if (ns.getServerSecurityLevel(target) != ns.getServerMinSecurityLevel(target)) {
		let home = await findServer(calcThreads(target,2), 0);
		let weakenPID = ns.exec('weaken.js', home, calcThreads(target, 2), target);
		ns.print("Attempting preliminary weaken");
		if (weakenPID == 0) {
			ns.tprint("exec failed on pre weaken! Target: " + target);
			ns.exit();
		} else {
			ns.print("Preliminary weaken in progress");
			for (let i = 1; i <= 100; i++) {
				await ns.sleep(ns.getWeakenTime(target) / 100);
				ns.clearLog();
				ns.print("Weakening at " + i + "% and total growth at " + (ns.getServerMoneyAvailable(target) / moneyThresh) * 100 + "%");
			}
		}
	}
let q = 0;
	while (true) {
		
	}


	async function findServer(threads, h) {
		let ramNeed;
		if (h == 0) {
			ramNeed = threads * ns.getScriptRam('grow.js', 'home');
		} else {
			ramNeed = threads * ns.getScriptRam('hack.js', 'home');
		}
		while (true) {
			let dest = search(ramNeed);
			if (dest != " ") {
				return dest;
			}
			await ns.sleep(10);
		}

	}
	function search (ram) {
		let servers = ns.getPurchasedServers();
		servers[servers.length] = 'home';
		for (let i in servers) {
			if ((ns.getServerMaxRam(servers[i]) - ns.getServerUsedRam(servers[i])) > ram/* && servers[i] != 'home'*/) {
				return servers[i];
			} else if (i == servers.length - 1) {
				ns.print("No servers found! Ram must be: " + ram);
				return " ";
			}
		}
	}
	
	function calcThreads(target, type) {
		let threads;
		switch (type) {
			case 0:
				threads = Math.ceil(ns.hackAnalyzeThreads(target, (ns.getServerMaxMoney(target))));
				break;
			case 1:
				threads = Math.ceil(ns.formulas.hacking.growThreads(ns.getServer(target), ns.getPlayer(), ns.getServerMaxMoney(target)));
				break;
			case 2:
				threads = Math.ceil((ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target))/ns.weakenAnalyze(1));
				break;
		}
		return threads;
	}
}
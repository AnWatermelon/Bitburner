/** 
 * @param {NS} ns
 **/
export async function main(ns) {
	var target = ns.args[0];
	let moneyThresh = ns.getServerMaxMoney(target);
	let secThresh = ns.getServerMinSecurityLevel(target);
	let ramNeed = 0;

	let growPID = 0;
	let weakenPID = 0;
	let hackPID = 0;

  ns.disableLog("sleep");
	ns.disableLog("getServerUsedRam");
	ns.disableLog("getServerMaxRam");
//	await ns.sleep(10000);
/*	
	if (ns.serverExists(home)) {
		ns.print("Server set, good to go");
	} else {
		while (!(ns.serverExists(home))) {
			let ret = ns.purchaseServer(home, 4096);
			if(ret != home) {
				while (ns.getServerMoneyAvailable("home") < ns.getPurchasedServerCost(4096)) {
					await ns.sleep(50);
					ns.clearLog();
					ns.print("Waiting for server money: " + ((ns.getServerMoneyAvailable("home")/ns.GetPurchasedServerCost(4096)) * 100) + "%");
				}
			}
		}
	}
	let maxThread = Math.floor(ns.getServerMaxRam(home) / ns.getScriptRam('grow.js', ns.getHostname()));	
*/



let run = true;
	while (run) {
			if (ns.getServerMoneyAvailable(target) < moneyThresh) {
				/*'home' = await findServer(calcThreads(target, 1), 0);*/
				let growPID = 0;
				while(growPID == 0) {
					growPID = findServer(calcThreads(target, 1), 0)
					await ns.sleep(20);
				}
				ns.print("Passed check on grow");
				ns.print("Growing at " + (ns.getServerMoneyAvailable(target) / moneyThresh) * 100 + "% of total");
				if (growPID == 0) {
					ns.tprint("exec failed on grow! Target: " + target);
					ns.exit();
				} else {
					ns.print("Grow is running! Sleeping now.");
					for (let i = 1; i <= 100; i++) {
						await ns.sleep(ns.getGrowTime(target) / 100);
						ns.clearLog();
						ns.print("Growing at " + i + "% and total growth at " + (ns.getServerMoneyAvailable(target) / moneyThresh) * 100 + "%");
					}
					ns.print("Setting growPID to 0");
					growPID = 0;
				}
			}
			if (ns.getServerSecurityLevel(target) > secThresh) {
				let weakenPID = 0;
				while (weakenPID == 0) {
					weakenPID = findServer(calcThreads(target, 2), 1);
					await ns.sleep(20);
				}
				ns.print("Passed if check on weaken");
				if (weakenPID == 0) {
					ns.tprint("exec failed on weaken! Target: " + target);
					ns.exit();
				} else {
					ns.print("Weaken is running! Sleeping now.");
					for (let i = 1; i <= 100; i++) {
						await ns.sleep(ns.getWeakenTime(target) / 100);
						ns.clearLog();
						ns.print("Weakening at " + i + "% and total growth at " + (ns.getServerMoneyAvailable(target) / moneyThresh) * 100 + "%");
					}
					weakenPID = 0;
				}
			}
			if (ns.getServerSecurityLevel(target) <= secThresh && ns.getServerMoneyAvailable(target) >= moneyThresh) {
				let hackPID = 0;
				while (hackPID == 0) {
					hackPID = findServer(calcThreads(target, 0), 2);
					await ns.sleep(20);
				}
				ns.print("Passed if check on hack, executing with " + calcThreads(target, 0) + " threads.");
				if (hackPID == 0) {
					ns.tprint("exec failed on hack! Target: " + target);
					ns.exit();
				} else {
					ns.print("Hack is running! Sleeping now.");
					for (let i = 1; i <= 100; i++) {
						await ns.sleep(ns.getHackTime(target) / 100);
						ns.clearLog();
						ns.print("Hacking at " + i + "%");
					}
					hackPID = 0;
				}
			}
		}
	function findServer(threads, h) {
		let servers = ns.getPurchasedServers();
		//servers.unshift('home');
		if (h < 2) {
			ramNeed = threads * ns.getScriptRam('grow.js', 'home');
		} else {
			ramNeed = threads * ns.getScriptRam('hack.js', 'home');
		}

		if (servers.find(search) != undefined) {
			switch (h) {
				case 0:
					return ns.exec('grow.js', servers.find(search), threads, target);
					break;
				case 1:
					return ns.exec('weaken.js', servers.find(search), threads, target);
					break;
				case 2:
					return ns.exec('hack.js', servers.find(search), threads, target);
					break;
			}
		} else {
			let newH = mostRam(servers);
			let ramHave = availableRam(newH);
			switch (h) {
				case 0:
					threads = Math.floor(ramHave/ns.getScriptRam('grow.js', 'home'));
					if (threads < 1) {ns.print('no ram on any server'); return 0;}
					return ns.exec('grow.js', newH, threads, target);
					break;
				case 1:
					threads = Math.floor(ramHave/ns.getScriptRam('weaken.js', 'home'));
					if (threads < 1) {ns.print('no ram on any server'); return 0;}
					return ns.exec('weaken.js', newH, threads, target);
					break;
				case 2:
					threads = Math.floor(ramHave/ns.getScriptRam('hack.js', 'home'));
					if (threads < 1) {ns.print('no ram on any server'); return 0;}
					return ns.exec('hack.js', newH, threads, target);
					break;
			}
		} 
	}


	function search(element) {
		return ramNeed < availableRam(element);
	}

	function mostRam(servers) {
		let most = 0;
		let newH = "";
		for(let i in servers) {
			if (availableRam(servers[i]) > most) {
				most = availableRam(servers[i]);
				newH = servers[i];
			}
		}
		return newH;
	}
	
	function availableRam (hostname) {
		return ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname);
	}

	function calcThreads(target, type) {
		let threads;
		switch (type) {
			case 0:
				if (Math.ceil(ns.hackAnalyzeThreads(target, (ns.getServerMaxMoney(target)*.99))) > 0) {
					threads = Math.ceil(ns.hackAnalyzeThreads(target, (ns.getServerMaxMoney(target)*.99)));
				} else {
					threads = 1000000;
				}
				break;
			case 1:
					if (Math.ceil(ns.growthAnalyze(target, (moneyThresh/ns.getServerMoneyAvailable(target)))) > 0) {
						threads = Math.ceil(ns.growthAnalyze(target, (moneyThresh/ns.getServerMoneyAvailable(target))));
					} else {
						threads = 1000000;
					}
				break;
			case 2:
				if(Math.ceil(((ns.getServerSecurityLevel(target) - secThresh)/ns.weakenAnalyze(1))) > 0){
					threads = Math.ceil((ns.getServerSecurityLevel(target) - secThresh)/ns.weakenAnalyze(1));
				} else {
					threads = 1;
				}
				break;
		}
		return threads;
	}
}

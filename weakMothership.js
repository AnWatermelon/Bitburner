/** 
 * @param {NS} ns
 **/
export async function main(ns) {


let i = 0;
let servers = ["foodnstuff", "sigma-cosmetics", "joesguns", "nectar-net",
							"hong-fang-tea", "harakiri-sushi", "neo-net", "zer0", "max-hardware", "iron-gym",
							"phantasy", "silver-helix", "omega-net", "crush-fitness", "johnson-ortho",
							"netlink", "rothman-uni", "catalyst", "summit-uni", "rho-construction",
							"millenium-fitness", "aevum-police", "alpha-ent", "syscore", "lexo-corp", "snap-fitness",
							"global-pharm", "applied-energetics", "unitalife", "univ-energy", "nova-med", "zb-def",
							"zb-institute", "vitalife", "titan-labs", "solaris", "microdyne", "helios",
							"deltaone", "icarus", "zeus-med", "omnia", "defcomm", "galactic-cyber",
							"infocomm", "taiyang-digital", "stormtech", "aerocorp", "clarkinc", "omnitek",
							"nwo", "4sigma", "blade", "b-and-a", "ecorp", "fulcrumtech", "megacorp", "kuai-gong",
							"fulcrumassets", "powerhouse-fitness"];

ns.disableLog("getServerMaxRam");
ns.disableLog("getServerUsedRam");
ns.disableLog("sleep");
ns.disableLog("getHackingLevel");
ns.disableLog("getServerRequiredHackingLevel");

let pServers = ns.getPurchasedServers();
pServers.unshift('home');
for (i in pServers) {
	ns.scp('grow.js', pServers[i], 'home');
	ns.scp('weaken.js', pServers[i], 'home');
	ns.scp('hack.js', pServers[i], 'home');
	ns.scp('weakStarDes.js', pServers[i], 'home');
}

i = 0;
let p = 0;


while (i < 1) {
    //OPTIONAL
    //Wait for player to reach the correct hacking level
    while (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(servers[i])) {
      await ns.sleep(1000);
    }

    //break in
    if(ns.fileExists('BruteSSH.exe', 'home')) {
      ns.brutessh(servers[i]);
    }

    if(ns.fileExists('FTPCrack.exe', 'home')){
      ns.ftpcrack(servers[i]);
    }

    if(ns.fileExists('relaySMTP.exe', 'home')){
      ns.relaysmtp(servers[i]);
    }

    if(ns.fileExists('HTTPWorm.exe', 'home')) {
      ns.httpworm(servers[i]);
    }

	 	if(ns.fileExists('SQLInject.exe', 'home')) {
			ns.sqlinject(servers[i]);
		} 
    
    //NUKE the target server to gain root access
    ns.nuke(servers[i]);

		//Kill all processes
    ns.killall(servers[i]);

    if((ns.getServerMaxRam(pServers[p]) - ns.getServerUsedRam(pServers[p])) > ns.getScriptRam('weakStarDes.js', 'home')){
			ns.tprint("Executing weakStarDes.js on server " + servers[i] + " from " + pServers[p]);
      ns.exec('weakStarDes.js', pServers[p], 1, servers[i]);
    } else {
			p++;
			while ((ns.getServerMaxRam(pServers[p]) - ns.getServerUsedRam(pServers[p])) < ns.getScriptRam('weakStarDes.js', 'home')) {
      p++;
			}
			if (p == pServers.length) {
				ns.tprint('Out of ram! p = ' + p);
				ns.exit();
			} else {
				ns.tprint("Executing weakStarDes.js on server " + servers[i] + " from " + pServers[p]);
				ns.exec('weakStarDes.js', pServers[p], 1, servers[i]);
			}
    }

		p++;
		if (p == pServers.length) {
			p = 0;
		}
    i++;
	}


}
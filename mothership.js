/** 
 * @param {NS} ns
 **/
export async function main(ns) {

let servers = ["n00dles","foodnstuff", "sigma-cosmetics", "joesguns", "nectar-net",
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


let pServers = ns.getPurchasedServers();
for (let i in pServers) {
	ns.scp('grow.js', pServers[i], ns.getHostname());
	ns.scp('weaken.js', pServers[i], ns.getHostname());
	ns.scp('hack.js', pServers[i], ns.getHostname());
}




let i = 0;
while (i < servers.length) {
    //OPTIONAL
    //Wait for player to reach the correct hacking level
    while (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(servers[i])) {
      await ns.sleep(200);
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

    if((ns.getServerMaxRam(ns.getHostname()) - ns.getServerUsedRam(ns.getHostname())) < ns.getScriptRam('starDestroyer.js', ns.getHostname())){
      ns.tprint("Out of ram on host!");
      ns.exit();
    } else {
      ns.tprint("Executing starDestroyer.js on server " + servers[i] + ".");
      ns.exec('starDestroyer.js', ns.getHostname(), 1, servers[i]);
    }
    i++;
	}


}
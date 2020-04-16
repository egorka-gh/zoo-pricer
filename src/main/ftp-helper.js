/*
ftp folder names is date in format yyyy-mm-dd (version)
sync looks for ftp folder that <= current date
compare vs current version and download if need to
returns new version if it changed  

const FtpHelper = require("./ftp-helper")
example()

async function example() {
    try {
        new FtpHelper("192.168.100.2", "admin", "07013411")
            .sync("2020-04-11", "C:/buff", "/StoreJet/z/ads/")
            .then(v => console.log("ver: " + v));
    } catch (error) {
        console.log(error)
    }
}
*/
const log = require('electron-log');

export default class FtpHelper {

    constructor(host, user, pass) {
        this.host = host;
        this.user = user;
        this.pass = pass;
    }

    async sync(currentVersions, localFolder, ftpFolder) {
        const ftp = require("basic-ftp");
        const path = require("path");
        const client = new ftp.Client();
        const d = new Date();
        const maxversion = d.toJSON().substr(0, 10);
        const result = new Object();
        const fs = require('fs');

        try {
            //connect
            await client.access({
                host: this.host,
                user: this.user,
                password: this.pass
            });
            for (var key in currentVersions) {
                if (!fs.existsSync(path.join(localFolder, key))) fs.mkdirSync(path.join(localFolder, key));

                let newVersion = "";
                //get forlders
                let lst = await client.list(ftpFolder + '/' + key);
                //get max valid version
                lst.forEach(fi => {
                    if (fi.isDirectory && fi.name <= maxversion && fi.name > newVersion) {
                        newVersion = fi.name;
                    }
                });
                if (0 !== newVersion.length && newVersion !== currentVersions[key]) {
                    //check create dir
                    const targetDir = path.join(localFolder, key, newVersion);
                    if (!fs.existsSync(targetDir)) {
                        fs.mkdirSync(targetDir, { recursive: true });
                    }
                    //downloaad folder
                    await client.downloadToDir(targetDir, ftpFolder + '/' + key + "/" + newVersion);
                } else {
                    newVersion = "";
                }
                result[key] = newVersion;
            }
        } catch (err) {
            log.error(err);
        }
        client.close();
        return result;
    }

}
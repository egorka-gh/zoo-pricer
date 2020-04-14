/* eslint-disable no-console */

/*
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
module.exports = class FtpHelper {

    constructor(host, user, pass) {
        this.host = host;
        this.user = user;
        this.pass = pass;
    }

    async sync(currentVersion, localFolder, ftpFolder) {
        const ftp = require("basic-ftp");
        const path = require("path");
        const client = new ftp.Client();
        const d = new Date();
        const maxversion = d.toJSON().substr(0, 10);

        let newVersion = "";
        try {
            await client.access({
                host: this.host,
                user: this.user,
                password: this.pass
            });
            let lst = await client.list(ftpFolder);
            lst.forEach(fi => {
                if (fi.isDirectory && fi.name <= maxversion && fi.name > newVersion) {
                    newVersion = fi.name;
                }
            });
            if (0 !== newVersion.length && newVersion !== currentVersion) {
                //downloaad folder
                await client.downloadToDir(path.join(localFolder, newVersion), ftpFolder + "/" + newVersion);
            } else {
                newVersion = "";
            }
        } catch (err) {
            client.close();
            console.log(err);
            return "";
        }
        client.close()
        return newVersion;
    }

}
const dc = require('./discord');
const { sig } = require("./utils/sig");

(async () => {
    sig();

    await dc.initialize();
    // here is where you enter your email and password
    await dc.login('joeldiscord12349@gmail.com', '927456729456')

    await dc.likeChannelProcess('940900761389375488', '945769874821636146', 1) // 1 = 1 minute

    debugger;

})();

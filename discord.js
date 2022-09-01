const puppeteer = require('puppeteer');
const {types} = require("./utils/types");

// list all the words here, will pick them randomly, doesn't matter how many!
const words = [
   
    "moon time",
    "moon timeeeeeee",
    "celestials don't stop here",
    "wen lambo baby?",
    ":rocket: :rocket: :rocket:",
    ":rocket: :rocket: :rocket: :rocket: :rocket: :rocket:",
    ":rocket:",
    ":rocket: :rocket:",
    "Lets go!",
    "Lets go! :regional_indicator_l: :regional_indicator_f: :regional_indicator_g:",
    "wen moon bubby?",
    "celestials programmed to moon baby",
    "celestials programmed to moon baby :regional_indicator_l: :regional_indicator_f: :regional_indicator_g:",
    ":LFG:",
    ":LFG: :LFG:",
    ":LFG: :LFG: :LFG:",
    ":wagmi:",
    ":wagmi: :wagmi:",
    ":wagmi: :wagmi: :wagmi:",
    ":wen:",
    ":wen: :wen:",
    ":wen: :wen: :wen:",
    ":regional_indicator_p: :regional_indicator_p: :regional_indicator_p:",
    ":regional_indicator_p:",
    ":regional_indicator_l: :regional_indicator_f: :regional_indicator_g:",
    "OOGA OGGA OGGA!!!!!!!!!",
    ":regional_indicator_w: :regional_indicator_e: :regional_indicator_n:",
    "pushing :regional_indicator_p:",
    "we pushin :regional_indicator_p:",
    "we pushin celestials :regional_indicator_p:",
    ":regional_indicator_p: :regional_indicator_p: for celestials lmao",
    "XD wen moon at?",
    ":fire:",
    ":fire: :fire: :fire:",
    "LET'S GOOOO CELESTIALS!!!",
    "LET'SSS GOO CELESTIALS!",
    "LEET'S GOOO CELESTIALS",
    ":eggplant: :eggplant: :eggplant:",
    ":chart_with_upwards_trend:",
    ":chart_with_upwards_trend: stonks",
    "celestials :chart_with_upwards_trend: stonks",
    ":100:",
    ":100: :100: :100:",
    
    
]
let logCount = 0;

const BASE_URL = 'https://discord.com';
// change this & enter the channel url
const discord = {
    browser: null,
    page: null,

    initialize: async () => {

        discord.browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: [
                '--start-maximized'
            ]
        });

        discord.page = await discord.browser.newPage();

    },

    /**
     * username and password
     * @param {string} username
     * @param {string} password
     * @return {Promise<void>}
     */

    login: async (username, password) => {

        await discord.page.goto(BASE_URL, {
            waitUntil: 'networkidle2'
        })

        let loginButton = await discord.page.$x('//a[contains(., "Login")]');
        await discord.page.waitFor(5000)
        /* Click on login url button */
        await loginButton[1].click();

        await discord.page.waitForNavigation({
            waitUntil: 'networkidle2'
        })

        await discord.page.waitFor(100);

        /* username and password */

        await discord.page.type('input[name="email"]', username, {
            delay: 100
        });

        await discord.page.type('input[name="password"]', password, {
            delay: 110
        });

        /* clicking on login button */

        loginButton = await discord.page.$x('//div[contains(text(), "Login")]');
        await loginButton[0].click();

        await discord.page.waitFor(10000);
        await discord.page.waitFor('//div[contains(text(), "Friends")]')

    },


    /**
     * Enter server id and channel urk
     * @param { string } serverID
     * @param { string } channelID
     * @param { number } delay
     * @return {Promise<void>}
     */

    likeChannelProcess: async (serverID, channelID, delay= 1) => {
            types('string', serverID);
            types('string', channelID);
            const CHANNELS_URL = `https://discord.com/channels/${serverID}/${channelID}`

            await discord.page.goto(CHANNELS_URL, {

            });
            await discord.page.waitFor(10000);

            async function initalStart () {
                await discord.page.type('span[data-slate-object="text"]', "wgmiii", {
                    delay: 100
                });

                await discord.page.keyboard.press('Enter')

                console.debug('wgmiii' + new Date() )

            }

            await initalStart();


            async function randomWord () {
                const random = words[Math.floor(Math.random() * words.length)]
                await discord.page.type('span[data-slate-object="text"]', random, {
                    delay: 100
                });

                await discord.page.keyboard.press('Enter')

                logCount++

                // this logs the time the message was sent at and the total message count
                console.debug('Message sent: ' + random + ' , at: ' + new Date() + ', Message Count: ' + logCount )
            }

            // change the first number for minutes
            // 3 * 60 * 1000 = 180000ms === 3 minutes
            setInterval(randomWord, 1 * 60 * 1000)

    }
}

module.exports = discord;

import fetch from "node-fetch";
import chalk from "chalk";
import readlineSync from "readline-sync";
import Tesseract from "tesseract.js";
import faker from 'faker';
faker.locale = 'id_ID';

//!FUNCTION GET RANDOM NAME
function generateRandomIndonesianName() {
    const randomFirstName = faker.name.firstName();
    const randomLastName = faker.name.lastName();
    return {
        randomFirstName,
        randomLastName
    };
};

//!FUNCTION GENERATE COOKIE D
function generateRandomD(length) {
    const characters = '0123456789abcdef';
    let randomD = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomD += characters.charAt(randomIndex);
    }
    return randomD;
}

//!FUNCTION GETBEETWEENN
function getBetween(string, start, end) {
    string = " " + string;
    let ini = string.indexOf(start);
    if (ini === -1) return "";
    ini += start.length;
    let len = string.indexOf(end, ini) - ini;
    return string.substr(ini, len);
}

//!GENERATE RANDOM NOMER HP
function generateRandomPhoneNumber() {
    const randomPhoneNumber = `821${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`;
    return randomPhoneNumber;
}

//!FUNCTION DELAY
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//!FUNCTION GET TEXT FROM GAMBAR
async function performOCR(imageUrl) {
    try {
        const response = await fetch(imageUrl);
        const imageBuffer = await response.buffer();

        await new Promise(resolve => setTimeout(resolve, 1000));

        const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng');
        const numericValues = text.replace(/\D/g, ''); // Remove non-numeric characters

        return numericValues; // Mengembalikan nilai numerik
    } catch (error) {
        throw new Error(`An error occurred: ${error.message}`);
    }
}


const getCookieD = () => new Promise((resolve, reject) => {
    fetch(`https://www.idsnapdragon.com/?i=1149232`, {
        headers: {
            'Host': 'www.idsnapdragon.com',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.111 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '""',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9'
        },
    })
        .then(async res => {
            const getValue = {
                cookie: res.headers.raw()['set-cookie'],
                body: await res.text()
            }
            resolve(getValue)
        })
        .catch(error => reject(error))
});

const getPageKey = (cookieDUse) => new Promise((resolve, reject) => {
    fetch(`https://www.idsnapdragon.com/home/reg/`, {
        headers: {
            'Host': 'www.idsnapdragon.com',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.111 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '""',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cookie': `${cookieDUse}; I=1149232`
        },
    })
        .then(async res => {
            const getValue = {
                cookie: res.headers.raw(),
                body: await res.text()
            }

            const resultBody = getValue.body;
            const getLinkCode = getBetween(resultBody, '<img src="', '"');
            const valuePageKey = getBetween(resultBody, 'name="pagekey" value="', '"')

            const linkCode = `https://www.idsnapdragon.com${getLinkCode}`
            const response = await fetch(linkCode);
            const imageBuffer = await response.buffer();

            await new Promise(resolve => setTimeout(resolve, 1000));

            const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng');
            const numericValues = text.replace(/\D/g, ''); // Remove non-numeric characters

            const resultAll = {
                ...getValue,
                linkCode,
                valuePageKey,
                numericValues
            }
            resolve(resultAll)
        })
        .catch(error => reject(error))
});

const getRegistrasi = (randomPhoneNumber, namaDepan, kodeCaptcha, valuePageKey, cookieDUse) => new Promise((resolve, reject) => {
    const dataString = `phone=${randomPhoneNumber}&password=Iqbal12345&nickname=${namaDepan}&scode=${kodeCaptcha}&spread_id=&pagekey=${valuePageKey}&inviter_code=1149232`
    fetch(`https://www.idsnapdragon.com/home/reg/`, {
        method: 'POST',
        headers: {
            'Host': 'www.idsnapdragon.com',
            'Content-Length': '222',
            'Cache-Control': 'max-age=0',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '""',
            'Upgrade-Insecure-Requests': '1',
            'Origin': 'https://www.idsnapdragon.com',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.111 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Referer': 'https://www.idsnapdragon.com/home/reg/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cookie': `${cookieDUse}; I=1149232`
        },
        body: dataString
    })
        .then(async res => {
            const getValue = {
                cookie: res.headers.raw(),
                body: await res.text()
            }
            resolve(getValue)
        })
        .catch(error => reject(error))
});

(async () => {
    //!Input Kode Reff dan Nomer
    // const kodeReff = readlineSync.question(`[?] Masukkan kode reff : `);
    // const inputNomer = readlineSync.question(`[?] Masukkan nomer telpon : `);
    const jumlahReff = readlineSync.question(`[?] Mau jumlah reff berapa : `)
    for (let i = 0; i < jumlahReff; i++) {
        console.log(`[-] ${chalk.green(`Ini adalah reff ke ${chalk.yellow(i + 1)}`)}`)
        //!Generate Random Name
        const randomName = generateRandomIndonesianName();
        const namaDepan = randomName.randomFirstName;
        const namaBelakang = randomName.randomLastName;
        // console.log(namaDepan)
        // console.log(namaBelakang)
        //!Generate Random Phone Number
        const randomPhoneNumber = generateRandomPhoneNumber();
        // console.log(randomPhoneNumber)

        // console.log(resultBody)
        // console.log(valuePageKey)
        // console.log(linkCode)
        //!Get Cookie D
        const resultCookieD = await getCookieD();
        const cookieD = resultCookieD.cookie;
        console.log(cookieD)
        const cookieDUse = cookieD[19].split(';')[0]
        console.log(cookieDUse)
        //!Get Registrasi
        let kodeCaptcha;
        do {
            //!Get Value PageKey
            const pagekey = await getPageKey(cookieDUse)
            console.log(pagekey)
            const valuePageKey = pagekey.valuePageKey;
            console.log(valuePageKey)
            kodeCaptcha = pagekey.numericValues;
            // console.log(`[!] Kode Captcha : ${kodeCaptcha}`)
            // console.log(`[!] ${chalk.red(`Mencari Kode`)}`);
            console.log(`[!] Ini kode captcha : ${chalk.green(kodeCaptcha)}`)
            const cookieKodeReff = await getRegistrasi(randomPhoneNumber, namaDepan, kodeCaptcha, valuePageKey, cookieDUse);
            const test = cookieKodeReff.body;
            console.log(test)
        } while (kodeCaptcha.length !== 4);

        await delay(3000)
    }
})();
import axios from "axios";
import fs from "fs"
import FormData from 'form-data';
const url = "https://mockwenjup.xyz/backend/index.php/submit_address";
const data = fs.readFileSync('Listaddress.json', 'utf8');
const jsonData = JSON.parse(data);

function generateRandomNumber(length) {
    const digits = '0123456789';
    let randomNumber = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        randomNumber += digits.charAt(randomIndex);
    }

    return randomNumber;
}


async function BotPost() {

    for (const [index, dataWallet] of jsonData.entries()) {
        const formData = new FormData();
        formData.append('username', '@alamandato97507');
        formData.append('retweet', 'https://twitter.com/alamandato97507/status/' + generateRandomNumber(19));
        formData.append('address', dataWallet);
        formData.append('referral', 'C47rmAUqRFbQZ5o1dJtenPnSgFhFWX7x6UJPJ7cA22MG');
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    ...formData.getHeaders(), 
                },
            });
            console.log(response.data)
            console.log("Addres berhasil ditambahkan mockwenjup by Ridwan");
        } catch (error) {
            console.error('Terjadi kesalahan:', error.response ? error.response.data : error.message);
        }

        console.log("Sukses daftar mockwenjup " + index + " " + dataWallet + " " + "By Ridwan")

    }

}


BotPost();

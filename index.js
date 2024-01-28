import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

const url = 'https://mockwenjup.xyz/backend/index.php/submit_address';
const username = '@alamandato97507';
const jsonFilePath = 'Listaddress.json';

function isValidData(walletData) {
  if (typeof walletData !== 'string' || walletData.trim() === '') {
    return false;
  }

  if (walletData.indexOf(' ') >= 0) {
    return false;
  }

  if (walletData.startsWith('0x')) {
    return false;
  }

  if (walletData.length !== 44) {
    return false;
  }

  return true;
}

function generateRandomNumber(length) {
  const digits = '0123456789';
  return Array.from(
    { length },
    () => digits[Math.floor(Math.random() * digits.length)]
  ).join('');
}

async function BotPost() {
  let jsonData;

  try {
    const data = fs.readFileSync(jsonFilePath, 'utf8');
    jsonData = JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error.message);
    return;
  }

  for (const [index, dataWallet] of jsonData.entries()) {
    if (!isValidData(dataWallet)) {
      console.error(`Invalid data at index ${index}:`, dataWallet);
      continue;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append(
      'retweet',
      `https://twitter.com/${username}/status/${generateRandomNumber(19)}`
    );
    formData.append('address', dataWallet);
    formData.append('referral', '');

    try {
      const response = await axios.post(url, formData, {
        headers: { ...formData.getHeaders() },
      });

      if (response.status === 200) {
        console.log('Address successfully added:', response.data);
      } else {
        console.error(
          `Unexpected response status ${response.status}:`,
          response.data
        );
      }

      console.log(
        `Success register mockwenjup ${index} ${dataWallet} By Ridwan - HCA`
      );
    } catch (error) {
      console.error(
        'Error during API call:',
        error.response ? error.response.data : error.message
      );
    }
  }
}

BotPost();

import axios from 'axios';

export async function sendSMS(toPhone, message) {
  try {
    const token = process.env.GREENWEB_SMS_API_KEY;

    if (!token) {
      console.error("[SMS ERROR]: GREENWEB_SMS_API_KEY missing in .env.local file!");
      return false;
    }

    // Phone number format fixing (+88 add kora)
    let formattedPhone = String(toPhone).trim();
    if (formattedPhone.startsWith('01')) {
      formattedPhone = `88${formattedPhone}`;
    } else if (formattedPhone.startsWith('+8801')) {
      formattedPhone = formattedPhone.replace('+', '');
    }

    const params = new URLSearchParams();
    params.append('token', token);
    params.append('to', formattedPhone);
    params.append('message', message);

    console.log(`[SMS SENDING]: Sending temporary password to ${formattedPhone}...`);

    const response = await axios.post('https://api.bdbulksms.net/api.php', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('[GREENWEB RESPONSE]:', response.data);

    const resStr = JSON.stringify(response.data).toLowerCase();

    // Greenweb API Response check
    if (resStr.includes('ok') || resStr.includes('100') || resStr.includes('submitted')) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('[SMS API ERROR]:', error.response ? error.response.data : error.message);
    return false;
  }
}
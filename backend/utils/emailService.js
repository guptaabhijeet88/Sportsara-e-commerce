// Email service using Brevo REST API
export const sendEmail = async (to, subject, htmlContent) => {
  const apiKey = process.env.EMAIL_PASS;
  const fromEmail = process.env.EMAIL_FROM || 'abhijeetgupta9702@gmail.com';
  const fromName = 'SportSara';

  if (!apiKey || apiKey === '') {
    throw new Error('Email service not configured (Missing Brevo API Key)');
  }

  const payload = JSON.stringify({
    sender: { name: fromName, email: fromEmail },
    to: [{ email: to }],
    subject,
    htmlContent,
  });

  const https = await import('https');

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.brevo.com',
      path: '/v3/smtp/email',
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
        'content-length': Buffer.byteLength(payload),
      },
      timeout: 10000,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          console.error(`Brevo API Error: ${res.statusCode} - ${data}`);
          reject(new Error(`Brevo API error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Email request timed out')); });
    req.write(payload);
    req.end();
  });
};

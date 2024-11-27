export const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Forgot Password OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
            }
            .content {
                margin: 20px 0;
                font-size: 16px;
                line-height: 1.5;
            }
            .otp-code {
                font-size: 24px;
                font-weight: bold;
                color: #007bff;
                margin: 10px 0;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #888;
                margin-top: 20px;
            }
            .logo {
                color: #80145a;
                font-size: 20px;
            }
            span {
                color: #80145a;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>OTP Verification</h2>
            </div>
            <div class="content">
                <p>Dear ${name},</p>
                <p>Your OTP code is:</p>
                <div class="otp-code">${otp}</div>
                <p>Use the following OTP to complete the procedure to change your password. OTP is valid for 10 minutes. Do not share this code with others, including <span>Blinkit</span> employees.</p>
            </div>
            <div class="footer">
                <p>Thank you for using our service!</p>
                <p class = "logo">Blinkit</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

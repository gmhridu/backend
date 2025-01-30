import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string,
): string => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: parseInt(expiresIn),
  });
};

export const emailTemplate = (resetLink: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .email-header {
        background-color: #4caf50;
        color: white;
        text-align: center;
        padding: 20px;
      }
      .email-body {
        padding: 20px;
      }
      .email-footer {
        text-align: center;
        font-size: 12px;
        color: #888;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .reset-button {
        display: inline-block;
        margin: 20px 0;
        padding: 12px 20px;
        background-color: #4caf50;
        color: white;
        text-decoration: none;
        font-size: 16px;
        border-radius: 5px;
      }
      .reset-button:hover {
        background-color: #45a049;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>Password Reset Request</h1>
      </div>
      <div class="email-body">
        <p>Dear User,</p>
        <p>We received a request to reset your password. Click the button below to proceed. If you did not request this, you can safely ignore this email.</p>
        <a href="${resetLink}" class="reset-button">Reset Password</a>
        <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
        <p>${resetLink}</p>
      </div>
      <div class="email-footer">
        <p>Thank you for using phUniversity!</p>
        <p>&copy; 2024 phUniversity. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
`;

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

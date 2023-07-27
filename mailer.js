const nodemailer = require('nodemailer');
const config = require('./config');

exports.sendMail = (toEmail, title, url) => {
    const logoPath = 'logojpg.jpg'
    const transporter = nodemailer.createTransport({
        host: config.mailer.host,
        port: config.mailer.port,
        auth: {
            user: config.mailer.username,
            pass: config.mailer.password
        }
    });

    const mailOptions = {
        from: "cotienrangfpt@gmail.com",
        to: toEmail,
        subject: title,
        html: `<!DOCTYPE html>
        <html>
        
        <head>
          <meta charset="UTF-8">
          <title>Xác nhận đổi mật khẩu</title>
          <style>
            body {
              font-family: 'Montserrat', sans-serif;
              background-color: #f2f2f2;
            }
        
            .container {
              max-width: 450px;
              margin: 0 auto;
              padding: 30px;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
        
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
        
            h1 {
              color: #007bff;
              text-align: center;
              font-weight: 600;
              margin-bottom: 20px;
            }
        
            p {
              line-height: 1.6;
              color: #444;
            }
        
            .button {
              display: block;
              width: 100%;
              margin-top: 30px;
              padding: 15px;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              text-align: center;
              border-radius: 5px;
              font-size: 16px;
              font-weight: 500;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
        
            .button:hover {
              background-color: #0056b3;
            }
        
            .footer {
              text-align: center;
              margin-top: 30px;
            }
          </style>
        </head>
        
        <body>
          <div class="container">
            <div class="header">
                <img src="${logoPath}" alt="Your Logo">
            </div>
            <h1>Xác nhận đổi mật khẩu</h1>
            <p>Xin chào,</p>
            <p>Hãy nhấn vào liên kết bên dưới để xác nhận yêu cầu đổi mật khẩu và thiết lập mật khẩu mới:</p>
            <a class="button" href="${url}">Xác nhận đổi mật khẩu</a>
            <p>Nếu bạn không yêu cầu đổi mật khẩu, vui lòng bỏ qua email này.</p>
            <p>Trân trọng,</p>
            <p>Đội ngũ hỗ trợ của chúng tôi</p>
            <div class="footer">
              <p>Địa chỉ của bạn | Số điện thoại | Email</p>
            </div>
          </div>
        </body>
        
        </html>`
    };

    return transporter.sendMail(mailOptions);

}


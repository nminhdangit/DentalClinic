const { google } = require('googleapis');
const config = require('./config');

class OAuth2 {
  // Các phạm vi (scopes) yêu cầu truy cập từ người dùng
  scopes = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'];

  // Khởi tạo OAuth2 client với thông tin xác thực từ Google API Console
  oauth2Client = new google.auth.OAuth2(
    config.google.clientId,
    config.google.clientSecret,
    config.google.redirectUri
  );

  // Phương thức để lấy URL xác thực từ Google
  getAuthUrl() {
    const url = this.oauth2Client.generateAuthUrl({
      access_type: 'offline', // Cấp quyền offline để lấy refresh token
      scope: this.scopes // Các phạm vi (scopes) yêu cầu truy cập từ người dùng
    });
    return url;
  }

  // Phương thức để xử lý callback khi người dùng đã xác thực thành công
  async getCallBack(req, res) {
    const { code } = req.query;
    const { tokens } = await this.oauth2Client.getToken(code);
    // Lưu trữ token
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;
    this.oauth2Client.setCredentials(tokens);
  }

  // Phương thức để lấy thông tin người dùng
  async getUserProfile() {
    const oauth2 = google.oauth2({
      auth: this.oauth2Client,
      version: 'v2'
    });
    const userInfo = await oauth2.userinfo.get();
    return userInfo.data;
  }
}

module.exports = new OAuth2();

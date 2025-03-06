import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Logo from "../../assets/images/Logo/LogoIcon";
class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <div className="footer-container">
          <div className="footer-left">
            <h3>Công ty Cổ phần Công nghệ BookingCare</h3>
            <p>
              📍 Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận
              Cầu Giấy, Thành phố Hà Nội, Việt Nam
            </p>
            <p>📜 ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</p>
            <p>
              📞 <a href="tel:02473012468">024-7301-2468</a> (7h - 18h)
            </p>
            <p>
              📧{" "}
              <a href="mailto:support@bookingcare.vn">support@bookingcare.vn</a>{" "}
              (7h - 18h)
            </p>
            <h4>Văn phòng tại TP Hồ Chí Minh</h4>
            <p>🏢 Tòa nhà H3, 384 Hoàng Diệu, Phường 6, Quận 4, TP.HCM</p>
          </div>

          <div className="footer-middle">
            <div className="footer-logo">
              <div className="logo-center">
                <Logo />
              </div>
            </div>

            <ul>
              <li>
                <a href="#">Liên hệ hợp tác</a>
              </li>
              <li>
                <a href="#">Chuyển đổi số</a>
              </li>
              <li>
                <a href="#">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="#">Quy chế hoạt động</a>
              </li>
              <li>
                <a href="#">Tuyển dụng</a>
              </li>
              <li>
                <a href="#">Điều khoản sử dụng</a>
              </li>
              <li>
                <a href="#">Câu hỏi thường gặp</a>
              </li>
              <li>
                <a href="#">Sức khỏe doanh nghiệp</a>
              </li>
            </ul>
          </div>

          <div className="footer-right">
            <h3>Đối tác bảo trợ nội dung</h3>
            <div className="partner">
              <img src="/images/hellodoctor.png" alt="Hello Doctor" />
              <div>
                <strong>Hello Doctor</strong>
                <p>Bảo trợ chuyên mục nội dung "Sức khỏe tinh thần"</p>
              </div>
            </div>
            <div className="partner">
              <img src="/images/bernard.png" alt="Bernard Healthcare" />
              <div>
                <strong>Hệ thống y khoa chuyên sâu quốc tế Bernard</strong>
                <p>Bảo trợ chuyên mục nội dung "Y khoa chuyên sâu"</p>
              </div>
            </div>
            <div className="partner">
              <img src="/images/doctorcheck.png" alt="Doctor Check" />
              <div>
                <strong>Doctor Check - Tầm soát bệnh để sống thọ hơn</strong>
                <p>Bảo trợ chuyên mục nội dung "Sức khỏe tổng quát"</p>
              </div>
            </div>
          </div>
        </div>

        <p>
          &copy; 2025 DevTuyen
          <a target="_blank" href="https://github.com/HoaiTuyen">
            More information
          </a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(HomeFooter));

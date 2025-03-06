import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về Booking Care
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="695"
              height="480"
              src="https://www.youtube.com/embed/FyDQljKtWnI"
              title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content-right">
            <div className="media-logos">
              <div className="logo">
                <img src="/images/vnexpress.png" alt="VNExpress" />
              </div>
              <div className="logo">
                <img
                  src="/images/suckhoedoisong.png"
                  alt="Sức khỏe & Đời sống"
                />
              </div>
              <div className="logo">
                <img src="/images/vietnamnet.png" alt="VietnamNet" />
              </div>
              <div className="logo">
                <img src="/images/vtv1.png" alt="VTV1" />
              </div>
              <div className="logo">
                <img src="/images/vtcnews.png" alt="VTC News" />
              </div>
              <div className="logo">
                <img src="/images/dantri.png" alt="Dân trí" />
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(About));

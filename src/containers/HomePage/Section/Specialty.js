import React, { Component } from "react";

import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  render() {
    return (
      <div className="section-share section-specialty ">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên Khoa Phổ Biến</span>
            <button className="btn-section">Xem Thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize ">
                <div className="bg-image section-specialty" />
                <div>Cở Xương Khớp</div>
              </div>
              <div className="section-customize ">
                <div className="bg-image section-specialty" />
                <div>Cở Xương Khớp</div>
              </div>
              <div className="section-customize ">
                <div className="bg-image section-specialty" />
                <div>Cở Xương Khớp</div>
              </div>
              <div className="section-customize ">
                <div className="bg-image section-specialty" />
                <div>Cở Xương Khớp</div>
              </div>
              <div className="section-customize ">
                <div className="bg-image section-specialty" />
                <div>Cở Xương Khớp</div>
              </div>
              <div className="section-customize ">
                <div className="bg-image section-specialty" />
                <div>Cở Xương Khớp</div>
              </div>
            </Slider>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Specialty));

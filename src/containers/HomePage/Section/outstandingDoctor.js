import React, { Component } from "react";

import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";

class OutstandingDoctor extends Component {
  render() {
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác Sỹ Nổi Bật Trong Tuần</span>
            <button className="btn-section">Xem Thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize" style={{ width: "100%" }}>
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outstanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Bác Sỹ Chuyên Khoa I</div>
                    <div>Tim mạch</div>
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);

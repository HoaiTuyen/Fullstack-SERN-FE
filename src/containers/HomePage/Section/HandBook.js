import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Slider from "react-slick";

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm Nang</span>
            <button className="btn-section">Xem Thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize ">
                <div className="bg-image section-handbook" />
                <div>Cở Xương Khớp</div>
              </div>
              <div className="section-customize ">
                <div className="bg-image section-handbook" />
                <div>Cở Xương Khớp</div>
              </div>
              <div className="section-customize ">
                <div className="bg-image section-handbook" />
                <div>Cở Xương Khớp</div>
              </div>
              <div className="section-customize ">
                <div className="bg-image section-handbook" />
                <div>Cở Xương Khớp</div>
              </div>
              <div className="section-customize ">
                <div className="bg-image section-handbook" />
                <div>Cở Xương Khớp</div>
              </div>
              <div className="section-customize ">
                <div className="bg-image section-handbook" />
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
)(injectIntl(HandBook));

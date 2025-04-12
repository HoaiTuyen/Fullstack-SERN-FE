import React, { Component } from "react";

import { connect } from "react-redux";
// import "./MedicalFacility.scss";
import Slider from "react-slick";
import { FormattedMessage, injectIntl } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";

import { withRouter } from "react-router";
import { Redirect } from "react-router";
class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
      this.setState({
        arrDoctor: this.props.topDoctorRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadingTopDoctor();
  }
  handleViewDetailDoctor = (doctor) => {
    alert("Dsdsdsdsd");
    console.log(doctor.id);

    const doctorId = doctor.id;
    this.props.history.push(`/detail-doctor/${doctorId}`);
  };
  render() {
    const { arrDoctor } = this.state;
    const { language } = this.props;
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container fix-width">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="doctor-home.outstanding-doctor" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="doctor-home.more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctor &&
                arrDoctor.length > 0 &&
                arrDoctor.map((item, key) => {
                  let image64 = "";
                  if (item.image) {
                    image64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }

                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div
                      className="section-customize"
                      key={key}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-outstanding-doctor"
                            style={{ backgroundImage: `url(${image64})` }}
                          />
                        </div>
                        <div className="position text-center">
                          <div>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div>Tim mạch</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctorRedux: state.admin.topDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(OutstandingDoctor))
);

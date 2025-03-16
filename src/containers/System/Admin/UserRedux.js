import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { notification, Spin } from "antd";
import { LANGUAGES, CRUD_ACTION } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import ModalImage from "react-modal-image";
import "./UserRedux.scss";
import TableUser from "./TableUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgUrl: "",

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: this.props.genderRedux,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].key : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPos = this.props.positionRedux;
      this.setState({
        positionArr: this.props.positionRedux,
        position: arrPos && arrPos.length > 0 ? arrPos[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: this.props.roleRedux,
        role: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
      });
    }
    if (prevProps.listUser !== this.props.listUser) {
      let arrGender = this.props.genderRedux;
      let arrPos = this.props.positionRedux;
      let arrRole = this.props.roleRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGender && arrGender.length > 0 ? arrGender[0].key : "",
        position: arrPos && arrPos.length > 0 ? arrPos[0].key : "",
        role: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
        avatar: "",
        action: CRUD_ACTION.CREATE,
      });
    }
  }
  handleOnChangeImage = (e) => {
    let dataFile = e.target.files[0];
    if (dataFile) {
      let objUrl = URL.createObjectURL(dataFile);
      this.setState({
        previewImgUrl: objUrl,
        avatar: dataFile,
      });
    }
  };
  openNotification = (type, message, description) => {
    if (type === "error") {
      notification.error({
        message: message,
        description: description,
        placement: "topRight",
        duration: 3,
      });
    } else if (type === "success") {
      notification.success({
        message: message,
        description: description,
        placement: "topRight",
        duration: 3,
      });
    } else {
      notification.info({
        message: message,
        description: description,
        placement: "topRight",
        duration: 3,
      });
    }
  };
  checkValidate = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        this.openNotification(
          "error",
          "Missing parameter",
          `Please Enter ${arrInput[i]}`
        );
        return isValid;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.state.email)) {
      isValid = false;
      this.openNotification(
        "error",
        "Invalid Email",
        "Please enter a valid email address"
      );
      return isValid;
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidate();
    if (!isValid) {
      return;
    }
    let { action } = this.state;
    if (action === CRUD_ACTION.CREATE) {
      this.props.CreateUserStart({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
      });
      this.props.getAllUserRedux();

      this.openNotification("success", "Create User Success");
    }
    if (action === CRUD_ACTION.EDIT) {
      this.props.editUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        //avatar: this.state.avatar,
      });
      this.props.getAllUserRedux();
      this.openNotification("success", "Update User Successfully");
    }
  };
  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleEditParent = (user) => {
    console.log(user);

    this.setState({
      email: user.email,
      password: "encrypted password",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: user.avatar,
      action: CRUD_ACTION.EDIT,
      userEditId: user.id,
    });
  };
  render() {
    const {
      genderArr,
      positionArr,
      roleArr,
      email,
      password,
      lastName,
      firstName,
      phoneNumber,
      address,
      role,
      position,
      gender,
    } = this.state;
    const { language, isLoadingGender } = this.props;

    return (
      <div className="user-redux-container">
        <div className="title">Manage User With Redux</div>
        {isLoadingGender === true ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : (
          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <div className="col-12 my-3">
                  <FormattedMessage id="manage-user.add" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => this.onChangeInput(e, "email")}
                    disabled={
                      this.state.action === CRUD_ACTION.EDIT ? true : false
                    }
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => this.onChangeInput(e, "password")}
                    disabled={
                      this.state.action === CRUD_ACTION.EDIT ? true : false
                    }
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={firstName}
                    onChange={(e) => this.onChangeInput(e, "firstName")}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={lastName}
                    onChange={(e) => this.onChangeInput(e, "lastName")}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => this.onChangeInput(e, "phoneNumber")}
                  />
                </div>
                <div className="col-9">
                  <label>
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={address}
                    onChange={(e) => this.onChangeInput(e, "address")}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    class="form-control"
                    onChange={(e) => this.onChangeInput(e, "gender")}
                    value={gender}
                  >
                    {genderArr &&
                      genderArr.length > 0 &&
                      genderArr.map((item, index) => {
                        return (
                          <option key={index} value={item.key}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select
                    class="form-control"
                    onChange={(e) => this.onChangeInput(e, "position")}
                    value={position}
                  >
                    {positionArr &&
                      positionArr.length > 0 &&
                      positionArr.map((item, index) => {
                        return (
                          <option key={index} value={item.key}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select
                    class="form-control"
                    onChange={(e) => this.onChangeInput(e, "role")}
                    value={role}
                  >
                    {roleArr &&
                      roleArr.length > 0 &&
                      roleArr.map((item, index) => {
                        return (
                          <option key={index} value={item.key}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <div className="preview-img-container">
                    <input
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(e) => this.handleOnChangeImage(e)}
                    />
                    <label className="label-upload" htmlFor="previewImg">
                      Tải ảnh <i className="fas fa-upload"></i>
                    </label>
                    {this.state.previewImgUrl && (
                      <ModalImage
                        small={this.state.previewImgUrl}
                        large={this.state.previewImgUrl}
                        alt="Preview"
                        className="preview-image"
                      />
                    )}
                  </div>
                </div>
                <div className="col-12 my-3">
                  <button
                    className={
                      this.state.action === CRUD_ACTION.EDIT
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                    onClick={() => this.handleSaveUser()}
                  >
                    {this.state.action === CRUD_ACTION.EDIT ? (
                      <FormattedMessage id="manage-user.edit" />
                    ) : (
                      <FormattedMessage id="manage-user.save" />
                    )}
                  </button>
                </div>
                <div className="col-12">
                  <TableUser
                    handleEditParent={this.handleEditParent}
                    action={this.state.action}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    listUser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),

    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    CreateUserStart: (data) => dispatch(actions.fetchCreateUserStart(data)),
    getAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUserRedux: (data) => dispatch(actions.editUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

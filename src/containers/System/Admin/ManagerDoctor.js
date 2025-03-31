import React, { Component } from "react";

import { connect } from "react-redux";
import "./TableUser.scss";
import * as actions from "../../../store/actions";
import { Modal, notification } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import "./ManagerDoctor.scss";
const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
class ManagerDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
    };
  }
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
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleDelete = (id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this user?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          this.openNotification("success", "Delete Successfully");
          this.props.deleteUserRedux(id);
        } catch (e) {
          console.log(e);
        }
      },
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {};
  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };
  handleOnChangeDesc = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  render() {
    return (
      <div className="manager-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin bác sĩ</div>
        <div className="more-info">
          <div className="content-left">
            <label>Chọn bác sĩ</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChange}
              options={options}
            />
          </div>
          <div className="content-right">
            <label>Thông tin giới thiệu</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(e) => this.handleOnChangeDesc(e)}
              value={this.state.description}
            >
              Đời mà
            </textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className="save-content-doctor"
        >
          Lưu thông tin
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUser: state.admin.users,
    isLoadingUser: state.admin.isLoadingUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDoctor);

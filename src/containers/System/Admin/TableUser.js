import React, { Component } from "react";

import { connect } from "react-redux";
import "./TableUser.scss";
import * as actions from "../../../store/actions";
import { Modal, notification } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}
class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
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
  componentDidMount() {
    this.props.getAllUserRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUser !== this.props.listUser) {
      this.setState({
        userRedux: this.props.listUser,
      });
    }
  }
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
  handleEditUser = (user) => {
    this.props.handleEditParent(user);
  };
  render() {
    let { userRedux } = this.state;
    return (
      <>
        <table id="table-user">
          <tbody>
            <tr>
              <th>Email</th>
              <th>Fist Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th className="w-25">Action</th>
            </tr>
            {userRedux &&
              userRedux.length > 0 &&
              userRedux.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.email}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.address}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning custom-btn"
                        onClick={() => this.handleEditUser(user)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger custom-btn"
                        onClick={() => this.handleDelete(user.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);

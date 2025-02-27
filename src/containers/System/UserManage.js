import React, { Component } from "react";

import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUser, createUserAPI, deleteUserAPI, editUserAPI } from "../../services";
import ModalUser from "./ModalUser"
import ModalEditUser from "./ModalEditUser"
import { notification, Modal } from "antd";
import {emitter} from "../../utils/emitter"
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        arrayUsers: [],
        isOpenModal: false,
        isOpenModalEdit: false,
        userEdit: {},
        
    };
  }

  async componentDidMount() {
    await this.getAllUserFormReact();
  }
  getAllUserFormReact = async () => {
    let res = await getAllUser("All");

    if(res && res.errCode === 0) {
        this.setState({
            arrayUsers: res.users
        })
    }
  }
  handleCreateUser = () => {
    this.setState({
      isOpenModal: true,
    })
  }
  toggleModalUser = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    })
  }
  toggleModalUserEdit = () => {
    this.setState({
      isOpenModalEdit: !this.state.isOpenModalEdit
    })
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
  createNewUser = async (data) => {
    try {
      let res = await createUserAPI(data);
      if(res && res.errCode === 0) {
        this.openNotification("success", "User added successfully", res.errMessage);
        await this.getAllUserFormReact()
        this.setState({
          isOpenModal: false
        })
        emitter.emit("EVENT_CLEAR_MODAL_DATA")
      } else {
        this.openNotification("error", "User not added  successfully", res.errMessage);
      }
      
    } catch(e) {
      console.log(e);
      
    }
    
  }
  handleDeleteUser = async (userId) => {
    Modal.confirm({
        title: "Confirm Delete",
        content: "Are you sure you want to delete this user?",
        okText: "Delete",
        okType: "danger",
        cancelText: "Cancel",
        onOk: async () => {

          try {
              
              
            let res = await deleteUserAPI(userId);
            if(res && res.errCode === 0) {
              await this.getAllUserFormReact();
              this.openNotification("success", "Delete successfully", res.errMessage);
              
            } else {
              this.openNotification("error", "Delete failed", res.errMessage);
            }
            
          } catch (e) {
              console.log(e);
              
          }
        }
    })
  }
  handleEditUser = (user) => {
    this.setState({
      isOpenModalEdit: true,
      userEdit: user,
      
    })
  }
  doEditUser = async  (user) => {
      try {
        
        let res = await editUserAPI(user);
        if(res && res.errCode === 0) {
          this.setState({
            isOpenModalEdit: false,
          })
          await this.getAllUserFormReact()
          this.openNotification("success", "Updata Success", res.errMessage);
        } else {
          this.openNotification("error", "Error");

        }

      } catch(e) {
        console.log(e);
        
      }
       
      
  }

  render() {

    return (
      <div className="user-container">
        
        <ModalUser 
          isOpen={this.state.isOpenModal}
          toggleFromParent = {this.toggleModalUser}
          createNewUser = {this.createNewUser}
        /> 
        {this.state.isOpenModalEdit && 
        <ModalEditUser
          isOpen={this.state.isOpenModalEdit}
          toggleFromParent = {this.toggleModalUserEdit}
          userDate={this.state.userEdit}
          editUser ={this.doEditUser}
        />
        }
        <div className="title text-center">MANEGE USER WITH DEVTUYEN</div>
        <div className="mx-3">
          
          <button 
            onClick={() => {this.handleCreateUser()}}
            className="btn btn-primary px-2">
            <i className="fa fa-plus"></i>
            Add New User
          </button>
        </div>
        <div className="user-table mt-3 mx-3">
          <table id="customers">
            <tbody>

            <tr>
              <th>Email</th>
              <th>Fist Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th className="w-25">Action</th>
            </tr>
            
                {this.state.arrayUsers.map((item, index) => {
                  
                    return (
                        <tr key={index}>
                            <td>{item.email}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.address}</td>
                            <td >
                                <button 
                                  type="button" 
                                  className="btn btn-warning custom-btn"
                                  onClick={() => this.handleEditUser(item)}
                                >
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button 
                                  type="button" 
                                  className="btn btn-danger custom-btn"
                                  onClick={() => this.handleDeleteUser(item.id)}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                            
                        </tr>
                    )
                })}
            </tbody>
    
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

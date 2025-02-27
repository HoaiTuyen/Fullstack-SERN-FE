
import { notification } from "antd";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {emitter} from "../../utils/emitter"
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      gender: '',
      roleId: '',
    };
    this.listentoEmitter();
  }
  listentoEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        gender: '',
        roleId: '',
      })
      
    })
  }
  componentDidMount() {}
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleChangeInput = (e, id) => {
    let copyState = {...this.state};
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    }); 

    
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

  checkValidate = () => {
    let  isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for(let i = 0; i < arrInput.length; i++) {
      if(!this.state[arrInput[i]]) {
        isValid = false;
        this.openNotification("error", "Missing parameter", `Please Enter ${arrInput[i]}`);
        return isValid;

      }

    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(this.state.email)) {
        isValid = false;
        this.openNotification("error", "Invalid Email", "Please enter a valid email address");
        return isValid;
    }
    return isValid;
  }
  handleAddNewUser = () => {
    let isValid = this.checkValidate();
    
    if (!isValid) {
        return;  
    } else {
      
      
      this.props.createNewUser(this.state)
      
    }
    
  }
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body ">
                <div className="input-container">
                    <label>Email</label>
                    <input 
                      type="email" 
                      onChange={(e, id) => {this.handleChangeInput(e, "email")}} 
                      placeholder="Enter your Email...." 
                      value={this.state.email}
                    />
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input 
                      type="password" 
                      onChange={(e, id) => {this.handleChangeInput(e, "password")}} 
                      placeholder="Enter your Pass...."
                      value={this.state.password}
                    />
                </div>

          </div>
          <div className="modal-user-body ">
                <div className="input-container">
                    <label>First Name</label>
                    <input 
                      type="text" 
                      onChange={(e, id) => {this.handleChangeInput(e, "firstName")}} 
                      placeholder="Enter your First Name...." 
                      value={this.state.firstName}
                    />
                </div>
                <div className="input-container">
                    <label>Last Name</label>
                    <input 
                      type="text" 
                      onChange={(e, id) => {this.handleChangeInput(e, "lastName")}}  
                      placeholder="Enter your Last Name...." 
                      value={this.state.lastName}
                    />
                </div>
          </div>
        <div  className="modal-user-body ">
            <div className="input-container modal-width">
                <label>Address</label>
                <input 
                  type="text" 
                  onChange={(e, id) => {this.handleChangeInput(e, "address")}} 
                  placeholder="Enter your Last Name...." 
                  value={this.state.address}

                />
            </div>
        </div>
        <div className="modal-user-body ">
                <div className="input-container">
                    <label>Phone Number</label>
                    <input 
                      type="text" 
                      onChange={(e, id) => {this.handleChangeInput(e, "phoneNumber")}} 
                      placeholder="Enter your Phone Number...." 
                      value={this.state.phoneNumber}
                    />
                </div>
                <div className="input-container">
                    <label>Sex</label>
                    <select 
                      name="gender" 
                      onChange={(e) => this.handleChangeInput(e, "gender")} 
                      className="form-control"
                      value={this.state.gender}
                    >
                      <option value="1">Male</option>
                      <option value="0">Female</option>
                    </select>
                </div>
                <div className="input-container">
                <label for="inputZip">Role</label>
                    <select 
                      name="roleId" 
                      onChange={(e) => this.handleChangeInput(e, "roleId")} 
                      className="form-control"
                      value={this.state.roleId}
                    >
                        <option value="1">Admin</option>
                        <option value="2">Doctor</option>
                        <option value="3">Patient</option>
                    </select>
                </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="btn btn-success px-3"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            Add
          </Button>
          <Button
            color="secondary"
            className="btn btn-danger px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

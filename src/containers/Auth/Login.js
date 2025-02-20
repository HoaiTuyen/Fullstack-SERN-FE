import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import {handleLogin} from '../../services'
import { notification } from 'antd';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
        }
    }

    handleOnChangeInputUsername = (e) => {
        this.setState({
            username: e.target.value,
            
        })
        
        
    }
    handleOnChangeInputPassword = (e) => {
        this.setState({
            password: e.target.value
            
        })
     }
     openNotification = (type, message, des) => {
        notification[type]({
            message,
            des,
            placement: "topRight",
            duration: 3,
        });

     };
    handleLogin = async () => {
        try {
            const res = await handleLogin(this.state.username, this.state.password);
            console.log(res);
            
            if(res.errCode === 0) {
                this.props.userLoginSuccess(res.user);
                this.openNotification("success",res.errMessage)
            } else if (res.errCode === -1) {
                this.openNotification("error", res.errMessage)
            } 
            else {
                this.openNotification("error", res.errMessage);
            }
        } catch(error) {
            console.error("Login Error:", error.data);
            this.openNotification("error", "Không được để trống Email/Password", "Có lỗi xảy ra, vui lòng thử lại sau.");
            
            
        }
        
        
    }
    handleShowPass = () => { 
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-control row '>
                        <div className='col-12 text-center text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(e) => {
                                    this.handleOnChangeInputUsername(e)
                                }}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className="custom-input-password">
                                <input 
                                    type={this.state.isShowPassword ? 'text' : 'password'} 
                                    className='form-control' 
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(e) => {
                                        this.handleOnChangeInputPassword(e)
                                    }}
                                />
                                <span
                                    onClick={() => {this.handleShowPass()}}
                                >   
                                    {this.state.isShowPassword ? 
                                        <i class="fas fa-eye-slash"></i>
                                        :  
                                        <i class="far fa-eye"></i>

                                    } 

                                </span>
                            </div>
                        </div>
                        <div className='col-12 text-center'>
                            <button type="submit" className="btn-login" onClick={() => {this.handleLogin()}}>Login In</button>

                        </div>
                        <div className='col-12 forgot-password'>
                            <span className="">Forgot your password ?</span>
                        </div>
                        <div className='col-12 text-center mt-5'>
                            <span className="text-other-login">Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                    
                            <i className="fab fa-google-plus-g icon-gg"></i>
                            <i className="fab fa-facebook-f icon-f"></i>
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

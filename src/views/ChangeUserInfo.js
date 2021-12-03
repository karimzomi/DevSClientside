import Axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import '../assets/Styles/login_Signup.css'

class UserInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jwt: localStorage.getItem('jwt'),
            UserName: '',
            Email: '',
            Password: '',
            NewPassword: '',
            Message:'',
            Error:undefined
        }
    }
    Set_value = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }
    Updateinfo = (e) => {
        e.preventDefault()
        Axios.patch(this.props.api + "/users/UpdateUser", {
            name: this.state.UserName,
            email: this.state.Email,
            password: this.state.Password,
            NewPassword: this.state.NewPassword
        }, {
            headers: { authorization: this.state.jwt }
        })
            .then((res) => this.setState({Message:res.data.ErrorMessage}))
            .catch((err)=> this.setState({ Error: {status:err.response.status,message:err.response.data} }))
    }
    render() {
        if (!this.state.jwt) {
            return <Redirect to="/Login" />
        }
        if(this.state.Error){
            return  <Redirect to={{
                pathname:"/Error",
                state:this.state.Error
            }} />
          }
        return (
            <div className="login_container">

            <form onSubmit={this.Updateinfo} className="container">
                <h1>Change UserInfo</h1>
                <div className='Inputscontainer'>
                    <div className="inputbox">
                        <input type="text" id="UserName" placeholder="UserName" required value={this.state.UserName} onChange={this.Set_value} ></input>
                        <label htmlFor="Username" className="fas fa-user icons"></label>
                    </div>
                    <div className="inputbox">
                        <input type="email" id="Email" placeholder="Email" required value={this.state.Email} onChange={this.Set_value} ></input>
                        <label htmlFor="Email" className="fas fa-envelope icons"></label>
                        <div className="Inputeffect"></div>
                    </div>
                    <div className="inputbox">
                        <input type="password" id="Password" autoComplete="" placeholder="Password" required value={this.state.password} onChange={this.Set_value} ></input>
                        <label htmlFor="password" className="fas fa-lock icons"></label>
                    </div>
                    <div className="inputbox" >
                        <input type="password" autoComplete="" id="NewPassword" placeholder="New Password" required value={this.state.NewPassword} onChange={this.Set_value} ></input>
                        <label htmlFor="NewPassword" className="fas fa-lock icons"></label>
                    </div>
                </div>
                <p>{this.state.Message}</p>
                <button disabled={this.state.isLoading} type="submit">
                    {this.state.isLoading ? <i className="fas fa-spinner fa-spin" /> : 'Update User Info'}
                </button>
            </form>
        </div>
        )
    }

}
export default UserInfo
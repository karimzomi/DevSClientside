import React, { Component } from 'react'
import '../assets/Styles/login_Signup.css'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            Username: '',
            email: '',
            password: '',
            Confirm_password: '',
            error: '',
            redirect: ''
        }
        this.PreferedL= []

    }
    SetValueFct = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }
    SetPreferedL = (e) => {
        var index = this.PreferedL.indexOf(e.target.id);
        if (index === -1) {
            this.PreferedL.push(e.target.id)
        } else {
            this.PreferedL.splice(index, 1)
        }
    }
    SendInfo = async (e) => {
        this.setState({ isLoading: true })
        e.preventDefault()
        if (this.state.password !== this.state.Confirm_password) {
            this.setState({ error: <h3> Password and the confirm Password don't match</h3> })
            this.setState({ isLoading: false })
            return
        }
        const red = await axios.post(this.props.api + '/users/SignUp',
            {
                name: this.state.Username,
                email: this.state.email,
                password: this.state.password,
                Main_Prog_Langs:this.PreferedL
            })
            .then(res => {
                if (res) {
                    localStorage.setItem('jwt', res.data.token)
                    this.setState({ isLoading: false })
                    this.setState({ error: '' })
                    return <Redirect to="/" />
                }
            })
            .catch((err) => {
                this.setState({ isLoading: false })
                this.setState({ error: err.response.data.ErrorMessage })
                if (err.response.status === 500) {
                    return <Redirect to={{
                        pathname: "/Error",
                        state: { status: err.response.status, message: err.response.data }
                    }} />
                }
            })
        this.setState({ redirect: red })
    }
    render() {

        return (<div className="login_container">

            <form onSubmit={this.SendInfo} className="container">
                <h1>SIGNUP</h1>
                <div className='Inputscontainer'>
                    <div className="inputbox">
                        <input type="text" id="Username" placeholder="UserName" required value={this.state.Username} onChange={this.SetValueFct} ></input>
                        <label htmlFor="Username" className="fas fa-user icons"></label>
                    </div>
                    <div className="inputbox">
                        <input type="email" id="email" placeholder="Email" required value={this.state.email} onChange={this.SetValueFct} ></input>
                        <label htmlFor="Email" className="fas fa-envelope icons"></label>
                        <div className="Inputeffect"></div>
                    </div>
                    <div className="inputbox">
                        <input type="password" id="password" autoComplete="" placeholder="Password" required value={this.state.password} onChange={this.SetValueFct} ></input>
                        <label htmlFor="password" className="fas fa-lock icons"></label>
                    </div>
                    <div className="inputbox" >
                        <input type="password" autoComplete="" id="Confirm_password" placeholder="Confirm Password" required value={this.state.Confirm_password} onChange={this.SetValueFct} ></input>
                        <label htmlFor="cpassword" className="fas fa-lock icons"></label>
                    </div>
                    <h2 style={{ textAlign: "center" }}>Select your prefer/main Programming language</h2>
                    <div className="ProgList">
                        <div className="ICON">
                            <input onChange={this.SetPreferedL} type="checkbox" id="python"></input>
                            <label htmlFor="python" style={{ backgroundImage: 'url("https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png")' }}></label>
                        </div>
                        <div className="ICON">
                            <input onChange={this.SetPreferedL} type="checkbox" id="csharp"></input>
                            <label htmlFor="csharp" style={{ backgroundImage: 'url("https://cdn.jsdelivr.net/npm/programming-languages-logos/src/csharp/csharp.png")' }}></label>
                        </div>
                        <div className="ICON">
                            <input onChange={this.SetPreferedL} type="checkbox" id="cpp"></input>
                            <label htmlFor="cpp" style={{ backgroundImage: 'url("https://cdn.jsdelivr.net/npm/programming-languages-logos/src/cpp/cpp.png")' }}></label>
                        </div>
                        <div className="ICON">
                            <input onChange={this.SetPreferedL} type="checkbox" id="c"></input>
                            <label htmlFor="c" style={{ backgroundImage: 'url("https://cdn.jsdelivr.net/npm/programming-languages-logos/src/c/c.png")' }}></label>
                        </div>
                        <div className="ICON">
                            <input onChange={this.SetPreferedL} type="checkbox" id="javascript"></input>
                            <label htmlFor="javascript" style={{ backgroundImage: 'url("https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png")' }}></label>
                        </div>
                        <div className="ICON">
                            <input onChange={this.SetPreferedL} type="checkbox" id="java"></input>
                            <label htmlFor="java" style={{ backgroundImage: 'url("https://cdn.jsdelivr.net/npm/programming-languages-logos/src/java/java.png")' }}></label>
                        </div>
                    </div>
                </div>
                {this.state.error}
                <button disabled={this.state.isLoading} type="submit">
                    {this.state.isLoading ? <i className="fas fa-spinner fa-spin" /> : 'Register'}
                </button>
            </form>
            {this.state.redirect}
        </div>
        )
    }
}

export default Register;
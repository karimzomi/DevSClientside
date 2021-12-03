import React, { Component } from 'react'
import '../assets/Styles/login_Signup.css'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      Error: null,
      redirect: ''
    }
  }
  SendInfo = async (e) => {
    this.setState({ isLoading: true })
    e.preventDefault()
    const red = await axios.post(this.props.api + '/users/Login',
      {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        if (res) {
          localStorage.setItem('jwt', res.data.token)
          this.setState({ isLoading: false })
          this.setState({ Error: '' })
          return <Redirect to="/" />
        }
      })
      .catch((err) => {
        this.setState({ isLoading: false })
        this.setState({ Error: err.response.data.ErrorMessage })
        if (err.response.status === 500) {
          return <Redirect to={{
            pathname: "/Error",
            state:  { status: err.response.status, message: err.response.data }
          }} />
        }
      })
    this.setState({ redirect: red })
  }
  SetValueFct = (e) => {
    const name = e.target.id
    this.setState({ [name]: e.target.value })
  }
  render() {

    return (
      <div className="login_container">
        <form onSubmit={this.SendInfo} className="container">
          <h1>LOGIN</h1>
          <div className='Inputscontainer'>
            <div className="inputbox">
              <input type="text" id="email" placeholder="Email" required value={this.state.email} onChange={this.SetValueFct} ></input>
              <label htmlFor="Email" className="fas fa-envelope icons"></label>
              <div className="Inputeffect"></div>
            </div>
            <div className="inputbox">
              <input autoComplete="current-password" type="password" id="password" placeholder="Password" required value={this.state.password} onChange={this.SetValueFct} ></input>
              <label htmlFor="password" className="fas fa-lock icons"></label>
            </div>
          </div>
          <h5 style={{ color: 'red' }}>{this.state.Error}</h5>
          <button disabled={this.state.isLoading} type="submit">
            {this.state.isLoading ? <i className="fas fa-spinner fa-spin" /> : 'Login'}
          </button>
        </form>
        {this.state.redirect}
      </div>
    )

  }
}

export default Login;
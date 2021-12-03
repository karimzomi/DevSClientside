import Axios from 'axios';
import React, { Component } from 'react';
import '../assets/Styles/Effects.css'

class ContactUs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Name:'',
            Email:'',
            Subject:'',
            Content:'',
        }
    }
    Set_value = (e)=>{
        this.setState({[e.target.id]:e.target.value})
    }
    SendEmail = (e)=>{
        e.preventDefault()
        Axios.post(this.props.api+'/Email/SendEmail',{
            Name:this.state.Name,
            Email:this.state.Email,
            Subject:this.state.Subject,
            Content:this.state.Content,

        })
    }
    render() {
        return (
            <div className="Form_Container">
                <h2>Contact Us</h2>
                <form onSubmit={this.SendEmail}>
                    <h5 style={{color:'red',fontSize:'1rem'}}>Please determine what your problem or suggestion exatly is, To let us help you. Otherwise if you Spam Your Computer will be banned permantely </h5>
                <div className="inputs">
                        <label htmlFor="Name">Full Name</label>
                        <input type="text" id="Name" value={this.state.Name} onChange={this.Set_value}></input>
                    </div>
                    <div className="inputs">
                        <label htmlFor="Email">Email</label>
                        <input placeholder="Email that You can Receive Our Answer Into" type="Email" id="Email" value={this.state.Email} onChange={this.Set_value}></input>
                    </div>
                    <div className="inputs">
                        <label htmlFor="Subject">Subject</label>
                        <input type="text" id="Subject" value={this.state.Subject} onChange={this.Set_value}></input>
                    </div>
                    <label htmlFor="Content">Content</label>
                    <div className="Form_Content">
                        <textarea className="textarea" required id="Content" value={this.state.Content} onChange={this.Set_value} >
                        </textarea>
                    </div>
                    <button className="Send" type="submit" >
                        Send
                </button>
                   
                </form>
            </div>
        )
        
    }
}
export default ContactUs;
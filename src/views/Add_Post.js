import Axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import '../assets/Styles/Add_Ask.css'
import Swal from 'sweetalert2'
import TextArea from '../components/Textarea'

class Add_Component extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jwt: localStorage.getItem('jwt'),
            url: this.props.api,
            language_id: this.props.match.params.id,
            language_name:this.props.match.params.Name,
            Question: '',
            Subject: '',
            Content: '',
            Section: this.props.match.params.Section,
            Title: '',
            Error:undefined
        }

    }

    Add_post = (e) => {
        e.preventDefault()
        Axios.post(this.state.url + '/Post/addpost/' + this.state.language_id,
            {
                title: this.state.Subject,
                Content: this.state.Content,
                Question_Main: this.state.Question,
                Section: this.state.Section
            }
            , {
                headers: { authorization: this.state.jwt }

            })
            .then((res) => res)
            .catch((err) => this.setState({ Error: {status:err.response.status,message:err.response.data} }))
            Swal.fire({
                title: 'Your Post Has been Added Succesfully',
                icon: 'success',
                allowOutsideClick:false,
                confirmButtonText: 'Go Back to Forum',  
            }).then(()=>{
                window.location = "/Forum/"+this.state.language_name
            })
                
          

    }
    Set_value = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    title_component = () => {
        if (this.state.Section === "Ask") {
            this.setState({ Title: 'Questions & Problem Solving' })
        }
        else {
            this.setState({ Title: 'Post/Article' })
        }

    }
    componentDidMount() {
        this.title_component()

    }
    render() {
        if(this.state.Error){
            return  <Redirect to={{
                pathname:"/Error",
                state:this.state.Error
            }} />
          }
        if (this.state.Section !== "Add_Article" && this.state.Section !== "Ask") {
            return <Redirect to="/Error" />

        }
        return (
            <div className="Form_Container">
                <h2>{this.state.Title}</h2>
                <form onSubmit={this.Add_post}>
                    <div className="inputs">
                        <label htmlFor="Subject">Subject</label>
                        <input type="text" id="Subject" value={this.state.Subject} onChange={this.Set_value}></input>
                    </div>
                    <div className="inputs">
                        <label htmlFor="Question">Question</label>
                        <input required type="text" className="Subject" id="Question" value={this.state.Question} onChange={this.Set_value}></input>
                    </div>

                    <label htmlFor="Content">Content</label>
                    <TextArea value={this.state.Content} onChange={this.Set_value} />  
                    <button className="Send" type="submit" >
                        Send
                </button>
                   
                </form>
            </div>
        )
    }
}



export default Add_Component
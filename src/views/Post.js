import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import '../assets/Styles/Post.css'
import Axios from 'axios'
import Highlight from 'react-highlight.js';
import '../assets/Styles/Add_Ask.css'
import Load from '../components/Loading'
import JsxParser from 'react-jsx-parser'
import Swal from 'sweetalert2'
import TextArea from '../components/Textarea';


class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Post_id: this.props.match.params.id,
            PL_name: this.props.match.params.PL,
            Section: this.props.match.params.Section,
            url: this.props.api,
            icon: '',
            Post_data: {},
            isLoading: false,
            jwt: localStorage.getItem('jwt'),
            user: {},
            Content: '',
            auth: false,
            Comments: [],
            Error: false,
        }
        this.element = []
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        Axios.get(this.state.url + '/Post/getPost/' + this.state.Post_id)
            .then((res) => {
                this.setState({ Post_data: res.data })
            })
            .catch((err) => { this.setState({ Error: { status: err.response.status, message: err.response.data } }) })
        Axios.get(this.state.url + '/PL/GetInfo/' + this.state.PL_name)
            .then((res) => {
                this.setState({ icon: res.data.PL_icon }, () => { this.getComments() })
            })
            .catch((err) => { this.setState({ Error: { status: err.response.status, message: err.response.data } }) })
        Axios.get(this.state.url + '/users/UserInfo', {
            headers: { authorization: this.state.jwt }
        })
            .then((res) => {
                this.setState({ auth: true })
                this.setState({ user: res.data.UserInfo })
            })
            .catch((err) => {
                this.setState({ auth: false })
            })
        this.setState({ isLoading: false })

    }
    Add_Highlighter = () => {
        document.getElementById("Content").value += `\n<Highlight language="python hjls">{\` \n  your code NOTE you can change python to language that you want \n \`}</Highlight>`
    }
    Treatment = (Text) => {
        if (Text.indexOf('</Highlight>') !== -1) {
            return (
                <JsxParser components={{ Post, Highlight }} jsx={Text} />
            )
        }
        return (
            <JsxParser components={{ Post }} jsx={Text} />
        )
    }

    getComments = async () => {
        if (!this.state.Post_data.Comments || this.state.Post_data.Comments.length === 0) {
            return <h2>No Answer</h2>
        }
        let Result = []
        for (let i = 0; i < this.state.Post_data.Comments.length; i++) {
            const Comment = this.state.Post_data.Comments[i];
            var user = await Axios.get(this.props.api + "/users/GetUserById/" + Comment.PostedBy)
                .then((res) => res.data.UserInfo)
            Result.push(<div key={Comment._id} className="Post_Content" style={{ marginTop: "1rem" }}>
                <div className="Post_Info">
                    <h5 title={String(this.state.Post_data.Date)}> <span>Answered </span> {String(Comment.Date).slice(0, 10)} </h5>
                    <div className="data-title">
                        <p><b>/ BY</b>{user.name}</p>
                        <div className="data-info">
                            <div className="Picture">
                                <img src="https://images.unsplash.com/photo-1604511031316-05a3e9395b53?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" alt="sdsd" />
                            </div>
                            <div>
                                <Link to={`/UserInfo/${user._id}/` + user.name}> {user.name}</Link> <br />
                                {user.Joining_Date}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Post">
                    {Comment ? this.Treatment(Comment.Content) : 'nothing'}
                </div>
            </div>)
        }

        Result.unshift(<h2 key={'NOAnswers'}>{this.state.Post_data.Comments.length} Answers</h2>)
        this.setState({ Comments: Result })
    }
    AddComment = (e) => {
        e.preventDefault()
        Axios.patch(this.state.url + "/Post/" + this.state.Post_id + "/addComment",
            {
                Content: this.state.Content
            },
            { headers: { authorization: this.state.jwt } })
            .then((res) => { console.log(res)
                Swal.fire({
                    title: 'Your Answer Added Succesfully',
                    icon: 'success',
        
                }).then(() => {
                    window.location.reload();
                }) })
            .catch(()=>{
                Swal.fire({
                    title: 'Something Went Wrong Please Try again',
                    icon: 'error',
        
                }).then(() => {
                    window.location.reload();
                }) })
            
        
    }
    Set_value = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    Form = () => {

        if (!this.state.auth) {
            return (
                <div>
                    <h2>Login to Answer</h2>
                    <Link to="/Login"></Link>
                </div>
            )
        }
        return <form onSubmit={this.AddComment}>
            <TextArea value={this.state.Content} onChange={this.Set_value} />
            <button type="submit" className="Send"> Answer</button>
        </form>
    }
    render() {
        if (this.state.isLoading) {
            return (
                <div style={{ padding: '1rem', height: '75vh', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <Load />
                </div>
            )
        }
        if (this.state.Error) {
            return <Redirect to={{
                pathname: "/Error",
                state: this.state.Error
            }} />
        }
        return (
            <div className="Post_Container">
                <div className="Post_Side">
                    <Link to={"/Forum/" + this.state.PL_name}>
                        <img src={this.state.icon} alt={this.state.PL_name + ' Icon'} title={this.state.PL_name + ' Forum'} ></img>
                    </Link>
                </div>
                <div className="Post_Content">
                    <h1>{this.state.Post_data.title}</h1>
                    <div className="Post_Info">
                        <h5 title={String(this.state.Post_data.Date)}> <span> Asked on </span> {String(this.state.Post_data.Date).slice(0, 10)} </h5>
                        <h5>{this.state.Post_data.Comments ? this.state.Post_data.Comments.length : 0} <span>Replies</span></h5>
                    </div>
                    <div className="Post">
                        {this.state.Post_data.Content ? this.Treatment(this.state.Post_data.Content) : 'nothing'}
                    </div>
                    {this.state.Comments}
                    {this.Form()}
                </div>
            </div>
        )
    }

}

export default Post
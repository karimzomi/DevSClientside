import Axios from 'axios';
import React from 'react'
import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import '../assets/Styles/Forum.css'
import '../assets/Styles/Effects.css'
import Load from '../components/Loading'
class Forum extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: this.props.api,
            name: this.props.match.params.Name,
            data: [],
            PL_info: {},
            jwt: localStorage.getItem('jwt'),
            auth: false,
            QandA: [<Load key="QandALoading" />],
            Posts: [<Load key="PostsLoading" />],
            Error: false,
            isLoading: false,
            language_id: '',
            User: {},
        }
    }
    async componentDidMount() {
        this.setState({ isLoading: true })
        const lid = await Axios.get(this.state.url + '/PL/GetInfo/' + this.state.name)
            .then(res => {
                this.setState({ PL_info: res.data })
                return res.data._id
            })
            .catch((err) =>{ console.log(err); this.setState({ Error: { status: err.response.status, message: err.response.data }})
        })
        this.setState({ language_id: lid })
        Axios.get(this.props.api + '/Post/getPostByPLid/' + lid)
            .then((res) => {
                this.setState({ data: res.data }, () => {
                    this.QandA()
                    this.Posts()
                })
            })
            .catch((err) => {
                 this.setState({ Error: { status: err.response.status, message: err.response.data } }) })

        Axios.get(this.props.api + '/users/UserInfo', {
            headers: { authorization: this.state.jwt }
        })
            .then((res) => {
                this.setState({ auth: true })
                this.setState({ User: res.data.UserInfo })
            })
            .catch((err) => { this.setState({ auth: false }) })

        this.setState({ isLoading: false })


    }

    Add_Section = (props) => {
        if (this.state.auth) {
            return (
                <div className="Btn_Section">
                    <Link className="Btn_effect" to={"/Add/" + this.state.name + '/' + props.btn.replace(' ', '_') + "/" + this.state.language_id}>{props.btn}</Link>
                </div>
            )
        }
        return null

    }

    MyPosts = () => {
        let Result=[];
         Result = this.state.data.map((obj) => {
            if (obj.PostedBy === this.state.User._id)
                Result.push (
                    <div key={obj._id} className="Post flex">
                        <div className="Post_Content">
                            <Link to={"/Posts/" + this.state.name + "/" + obj.Section + "/" + obj._id + "/" + obj.title.replace(' ', '-')}><h4>{obj.title}</h4></Link>
                            <p>{obj.Date}</p>
                        </div>
                        <div className="Post_Stats flex">
                            <p>{obj.Comments.length} replies</p>
                        </div>

                    </div>
                )
            return null
        })
        if (Result[0] === null ) {
            Result=[]
            Result.push(<h3 key="12345648631">No Post in Here</h3>)

        }
        return Result
    }
    MyPosts_Component = () => {
        return (
            <div className="Section_container flex ">
                <h2 className="compo_title_notlink"> My Posts/Questions</h2>
                {this.MyPosts()}
            </div>
        )
    }
    QandA = async () => {
        if (this.state.QandA[0].key !== 'QandALoading') {
            return
        }
        console.log();
        let Result = []
        let numb = 0
        for (let i = 0; i < this.state.data.length; i++) {
            const obj = this.state.data[i];
            if (obj.Section === 'Ask') {
                numb++
                if (numb === 5) {
                    break;
                }
                var user = await Axios.get(this.state.url + "/users/GetUserById/" + obj.PostedBy)
                    .then((res) => { return res.data.UserInfo })
                Result.push(<div key={obj._id} className="Post flex">
                    <div className="Post_Content">
                        <Link to={"/Posts/" + this.state.name + "/" + obj.Section + "/" + obj._id + "/" + obj.title.replace(/ /g, '-')} ><h4>{obj.Question_Main}</h4></Link>
                        <p>Title: {obj.title}</p>
                        <p>Posted On {obj.Date}</p>
                    </div>
                    <div className="Post_Stats flex">
                        <p>{obj.Comments.length} replies</p>
                    </div>
                    <div className="Poster flex">
                        <div className="data-title">
                            <p> <b>BY</b> {user.name}</p>
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
                </div>)

            }
        }
        if (numb === 0) {
            this.setState({ QandA: [<p key="NoPosts">No Posts in Here</p>] })
        }
        else {
            this.setState({ QandA: Result })
        }

    }
    Posts = async () => {
        if (this.state.Posts[0].key !== 'PostsLoading') {
            return
        }
        let Result = []
        let numb = 0
        for (let i = 0; i < this.state.data.length; i++) {
            const obj = this.state.data[i];
            if (obj.Section === 'Add_Article') {
                numb++
                if (numb === 5) {
                    break;
                }
                var user = await Axios.get(this.state.url + "/users/GetUserById/" + obj.PostedBy)
                    .then((res) => res.data.UserInfo)
                Result.push(<div key={obj._id} className="Post flex">
                    <div className="Post_Content">
                        <Link to={"/Posts/" + this.state.name + "/" + obj.Section + "/" + obj._id + "/" + obj.title.replace(' ', '-')}><h4>{obj.Question_Main}</h4></Link>
                        <p>Title: {obj.title}</p>
                        <p>Posted on {obj.Date}</p>
                    </div>
                    <div className="Post_Stats flex">
                        <p>{obj.Comments.length} replies</p>
                    </div>
                    <div className="Poster flex">
                        <div className="data-title">
                            <div className="data-title">
                            <p> <b>BY</b> {user.name}</p>
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
                    </div>
                </div>)
            }
        }
        if (numb === 0) {
            this.setState({ Posts: [<p key="NoPosts">No Posts in Here</p>] })
        } else {
            this.setState({ Posts: Result })
        }



    }
    Beginner = () => {
        return (
            <div className="Section_container flex">
                <Link className="compo_title compo_main_title" to={"/Learn/" + this.state.name + "/" + this.state.language_id}> Beginner Section</Link>

                <div className="Post flex">
                    <div className="Post_Content">
                        <h3>Helpfull Links/Docs</h3>
                    </div>

                </div>
                <div className="Post flex">
                    <div className="Post_Content">
                        <h3>Tutorials/Recommended Channels</h3>
                    </div>
                </div>
                <div className="Post flex">
                    <div className="Post_Content">
                        <h3>And More <Link to={"/Learn/" + this.state.name + "/" + this.state.language_id} style={{ textDecoration: 'underline' }}>Click here</Link> or click the title</h3>
                    </div>
                </div>

            </div>)
    }
    render() {
        if (this.state.Error) {
            return <Redirect to={{
                pathname: "/Error",
                state: this.state.Error
            }} />
        }
        if (this.state.isLoading) {
            return (
                <div style={{ padding: '1rem', height: '75vh', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <Load />
                </div>
            )
        }

        return (
            <div className="Forum_container flex">
                <img src={this.state.PL_info.PL_icon} alt={this.state.PL_info.PL_name + ' Icon'} title={this.state.PL_info.PL_name + ' Icon'} ></img>
                <div className="Sections">
                    <this.Beginner />
                    <div className="Section_container flex">
                        <Link className="compo_title" to={"/Page/" + this.state.name + "/" + this.state.language_id + "/Questions_&_Problems_Solving"}> Questions & Problems Solving</Link>
                        {this.state.QandA}
                        <this.Add_Section btn='Ask' />
                    </div>

                    <div className="Section_container flex">
                        <Link className="compo_title" to={"/Page/" + this.state.name + "/" + this.state.language_id + "/Posts_Articles"}>Posts/Articles</Link>
                        {this.state.Posts}
                        <this.Add_Section btn='Add Article' />
                    </div>
                    {this.MyPosts_Component()}
                </div>

            </div>
        );
    }
}

export default Forum;
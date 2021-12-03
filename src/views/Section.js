import Axios from 'axios';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import Loading from '../components/Loading';
import '../assets/Styles/Forum.css'
import '../assets/Styles/Effects.css'

class Section extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Posts: [<Loading key='PostsLoading' />],
            data: [],
            SectionName: this.props.match.params.Section,
            language_id: this.props.match.params.PLid,
            name: this.props.match.params.Name,
            jwt: localStorage.getItem('jwt'),
            auth: false,
            User: {},
            Error:undefined
        }
    }
    componentDidMount() {
        Axios.get(this.props.api + '/Post/getPostByPLid/' + this.state.language_id)
            .then((res) => { this.setState({ data: res.data },()=>{this.Posts()}) })
            .catch((err) => { this.setState({ Error: {status:err.response.status,message:err.response.data} }) })
        Axios.get(this.props.api + '/users/UserInfo', {
            headers: { authorization: this.state.jwt }
        })
            .then((res) => {
                this.setState({ auth: true })
                this.setState({ User: res.data.UserInfo })
            })
            .catch((err) => { this.setState({ auth: false }) })
    }
    Add_Section = () => {
        if (this.state.auth) {
            if(this.state.SectionName === 'Posts_Articles')
            return (
                <div className="Btn_Section">
                    <Link className="Btn_effect" to={"/Add/" + this.state.name + "/Add_Article/" + this.state.language_id}>Add Article</Link>
                </div>
            )
            else{
             return(   <div className="Btn_Section">
                    <Link className="Btn_effect" to={"/Add/" + this.state.name + "/Ask/" + this.state.language_id}>Ask</Link>
                </div>)
            }
        }
        return null

    }
    Posts = async () => {
    
        if (this.state.Posts[0].key !== 'PostsLoading') {
            return
        }
        let Sec
        let Result = []
        for (let i = 0; i < this.state.data.length; i++) {
            if(this.state.SectionName === 'Posts_Articles'){
                 Sec = 'Add_Article'
            }
            else if(this.state.SectionName === "Questions_&_Problems_Solving"){
                 Sec = 'Ask'
            }
            const obj = this.state.data[i];
            if (obj.Section === Sec) {
                var user = await Axios.get(this.props.api + "/users/GetUserById/" + obj.PostedBy)
                    .then((res) => res.data.UserInfo)
                Result.push(<div key={obj._id} className="Post flex">
                    <div className="Post_Content">
                        <Link style={{fontSize:'1.25rem'}} to={"/Posts/" + this.state.name + "/" + obj.Section + "/" + obj._id + "/" + obj.title.replace(' ', '-')}><h4>{obj.Question_Main}</h4></Link>
                        <p style={{color:'ActiveBorder'}}>{obj.title}</p>
                        <p >Posted on {obj.Date}</p>
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
                                   <Link to={`/UserInfo/${user._id}/`+user.name}> {user.name}</Link> <br />
                                    {user.Joining_Date}
                                </div>
                            </div>
                    </div>
                    </div>
                </div>)
            }
        }
        if (Result.length === 0) {
            this.setState({ Posts: [<p key="NoPosts">No Posts in Here</p>] })
        } else {
            this.setState({ Posts: Result })
        }
    }
    render() {
        if(this.state.Error){
          return  <Redirect to={{
              pathname:"/Error",
              state:this.state.Error
          }} />
        }
        return (
            <div className="Section_container flex GlowingBackground" style={{margin:'1rem' ,color:'white'}}>
                <h2> {this.state.SectionName.replace(/_/g, ' ')} </h2>
                {this.state.Posts}
                <this.Add_Section/>
            </div>
        )
    }
}
export default Section;
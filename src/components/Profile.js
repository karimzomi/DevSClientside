import Axios from 'axios';
import React, { Component } from 'react';
import '../assets/Styles/Effects.css'
import '../assets/Styles/Profile.css'
import Load from '../components/Loading'
import { Redirect } from 'react-router-dom'



class User_Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: this.props.match.params.UserId,
            isLoading: false,
            Error: undefined,
            UserInfo: {}
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        Axios.get(this.props.api+'/users/GetUserById/' + this.state.userid)
            .then((res) => {
                this.setState({ UserInfo: res.data.UserInfo }, () => { this.setState({ isLoading: false }) })
            })
            .catch((err) => this.setState({ Error: { status: err.response.status, message: err.response.data } }))

    }
    SetLang = () =>{
        if(this.state.UserInfo.Main_Prog_Langs){
        return this.state.UserInfo.Main_Prog_Langs.map((Element)=>{
            return <img src={"https://cdn.jsdelivr.net/npm/programming-languages-logos/src/"+Element +"/"+Element+".png"} height='50' alt={Element}/>
         });
        }
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
                <div style={{ padding: '1rem', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <Load />
                </div>
            )
        }
        return (
            <div style={{ padding: '1rem' }}>
                <div className="UserInfoContainer GlowingBackground">
                    <div className="Profile_Picture">
                        <img src="https://images.unsplash.com/photo-1604511031316-05a3e9395b53?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" alt="" ></img>
                        <h2 className="Name">{this.state.UserInfo.name}</h2>
                    </div>
                    <div className="UserInfoContent">
                        <div className="Info">
                            <span style={{textAlign:'center',width:'100%',marginBottom:'1rem'}}>Profile Page is on test since we haven't added yet profile image add system etc...</span>
                        </div>
                        <div className="Info">
                            <h3><span>Email:</span>{this.state.UserInfo.email}</h3>
                        </div>
                        <div className="Info">
                            <p><span>About:</span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate numquam nisi ea facere beatae aliquam, suscipit harum perferendis minima fugiat, delectus soluta maxime fugit est. Architecto veritatis quos adipisci soluta delectus ipsum nam velit accusantium quasi! A consequuntur rerum aspernatur eos iusto, aliquid dolore voluptate similique, eaque, quae quibusdam illo ducimus? Numquam iusto sed sit dolore corrupti provident dolor maxime repudiandae quae praesentium laudantium beatae, accusamus obcaecati officia delectus saepe voluptatem doloremque odit non laborum sequi! Impedit laudantium cum ipsam, consectetur dolorum possimus sed. Itaque sunt explicabo nam suscipit libero molestiae quaerat culpa quibusdam quas dolore, modi, vel dolores blanditiis.</p>
                        </div>
                        <div className="Info">
                           <div className="flex"> <span>Main Languages:</span> {this.SetLang()} </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default User_Card;
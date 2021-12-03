import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
class Tutorials extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            Error: undefined,
            Videos: [],
            Stuff: [],
        }
    }
    componentDidMount() {
        Axios.get(this.props.api + "/PL/GetPlById/" + this.props.match.params.PLid)
            .then((res) => {
                this.setState({ data: res.data }, () => { this.GetUrls() })
            })
            .catch((err) => {
                this.setState({ Error: { status: err.response.status, message: err.response.data } })
            })
    }
    GetUrls = () => {
        let videos = []
        let result = []
        if(this.state.data.Links_docs.length === 0){
            videos.push(<p>Nothing here At the Moment </p>)
            result.push(<p>Nothing here At the Moment </p>)
            this.setState({ Videos: videos })
            this.setState({ Stuff: result })
            return
        }
        for (let i = 0; i < this.state.data.Links_docs.length; i++) {
            const element = this.state.data.Links_docs[i]
            if (element.url_type === 'video') {
                videos.push(
                    <iframe key={element._id} title={'t'}  src={element.url.replace("watch?v=", "embed/")} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                )
            }
            else {
                result.push(
                    <div className="UrlDocs">
                        <img src={"https://s2.googleusercontent.com/s2/favicons?domain_url=" + element.url} alt="Icon"></img>
                        <a href={element.url}>{element.url} </a>
                    </div>
                )
            }
            this.setState({ Videos: videos })
            this.setState({ Stuff: result })
        }
    }
    render() {
        if (this.state.Error) {
            return <Redirect to={{
                pathname: "/Error",
                state: this.state.Error
            }} />
        }
        return (
            <div className="Section_container flex GlowingBackground" style={{ margin: '1rem', color: 'white' }}>
                <div className="Post flex">
                    <h2>Usefull Sites/Docs</h2>
                        {this.state.Stuff}
                </div>
                <div className="Post flex">
                    <h2>Recommanded Tutorials</h2>
                    {this.state.Videos}
                </div>
            </div>
        )
    }

}
export default Tutorials;
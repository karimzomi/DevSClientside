import React, { Component } from 'react';
import Plcard from '../components/Plcard'
import axios from 'axios'
import '../assets/Styles/content.css'
import Load from '../components/Loading'


class Content extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Cards: [],
      isLoading: false,
    }
  }
  // setdate = (data) => {this.setState({[this.state.Cards]:data.map((language) => {
  //   return <Plcard key={language._id} {...language}></Plcard>})})}
  setdata = (data) => {
    
    this.setState({ Cards: data.map((prog) => { return <Plcard key={prog._id} {...prog}></Plcard> }) })
    this.setState({ isLoading: false })

  }
  componentDidMount() {
    this.setState({ isLoading: true })
    axios.get(this.props.api+'/PL')
      .then(res => this.setdata(res.data))
      .catch((err) => {
        this.setState({ isLoading: false })
        this.setState({ Cards: this.state.Cards.concat(<h1 style={{ color: 'red' }}>Nothing here Please Try again later</h1>) })
      })

  }

  render() {
    if (this.state.isLoading) {
      return (
        <div style={{ height: "25vh", width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <Load />
        </div>
      )
    }
    return (
      <main>
        <div className="cards" id="home">
          {this.state.Cards}
        </div>
      </main>
    );
  }
}


export default Content;

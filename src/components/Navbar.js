
import Axios from 'axios'
import React, { Component } from 'react'
import { Link, Redirect, NavLink } from 'react-router-dom'
import '../assets/Styles/dropdown.css'
import '../assets/Styles/Navbar.css'
import '../assets/Styles/ColorPicker.css'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            jwt: localStorage.getItem('jwt'),
            auth: false,
            required: '',
            search: '',
            Search_Res: [],
            isLoading: false,
        }
    }
    Logout = () => {
        localStorage.clear()
        this.setState({ required: <Redirect to="/" /> })
        window.location.reload()
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState({ isLoading: true })
        if (this.state.jwt) {
            Axios.get(this.props.api + '/users/UserInfo', {
                headers: { authorization: this.state.jwt }
            })
                .then((res) => {
                    this.setState({ auth: true })
                    this.setState({ user: res.data.UserInfo })
                })
                .catch((err) => {
                    this.setState({ auth: false })
                })
        }
        this.setState({ isLoading: false })

    }


    Navbr = () => {
        if (!this.state.auth) {
            return [<Link key="login" to="/Login">
                <li className="highlighted">Log in</li>
            </Link>,
            <Link key="signup" to="/SignUp">
                <li className="highlighted">Register Now</li>
            </Link>]
        }
        return [
            <div key="2" className="Dropdown">
                <input type="checkbox" id="user" className="checked " ></input>
                <label htmlFor="user" className="dropdown_btn fas fa-user " title="Account"></label>
                <div className="Dropdown-menu" >
                    <i className="fas fa-times" onClick={this.close_usernav} id="user_quit"></i>
                    <Link onClick={() => { this.Check(false) }} to={`/UserInfo/${this.state.user._id}/` + this.state.user.name}> <i className="fas fa-user"></i> {this.state.user.name}</Link>
                    <Link onClick={() => { this.Check(false) }} to="/User/Settings"> <i className="fas fa-cog"></i>Settings</Link>
                    <button className="red" key="logout" onClick={() => this.Logout()}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
               
            </div>

        ]
    }

    Set_value = (e) => {
        this.setState({ [e.target.id]: e.target.value })
        this.setState({ Search_Res: [] })
        if (e.target.value === '') {
            return
        }
        Axios.post(this.props.api + "/Post/Searching",
            {
                string: e.target.value
            })
            .then((res) => {
                res.data.map((obj) => {
                    Axios.get(this.props.api + "/PL/GetPlById/" + obj.Pl)
                        .then((res) => {
                            const link = <a href={"/Posts/" + res.data.PL_name + "/" + obj.Section + "/" + obj._id + "/" + obj.title.replace(/ /g, '-')} key={obj._id} >{obj.Question_Main}</a>
                            console.log(this.state.Search_Res.find(link => link.key));
                            if (this.state.Search_Res.find(element => element.key === link.key) === undefined) {
                                this.setState({ Search_Res: this.state.Search_Res.concat(link) })
                            }
                        })
                        .catch((err) => console.log(err))
                    return null
                })
            })
            .catch((err) => { console.log(err); })

    }
    /***************javascript for front_end****************** */
    Check = (Condition) => {
        document.getElementById('user').checked = Condition
    }
    close_usernav = () => {
        const dropdown = document.getElementById('user')
        if (dropdown.checked) {
            dropdown.checked = false
        }
    }
    Toggle_Nav = () => {
        const nav = document.getElementById('menu_list')
        nav.classList.toggle('ul_phone')
    }
    close_nav = () => {
        const nav = document.getElementById('menu_list')
        nav.classList.toggle('ul_phone')

    }
    Search_effect = () => {
        const Search = document.getElementById('main_search')
        Search.classList.toggle('Focus-input')
    }
    display_search = (check) => {
        const Search = document.getElementById('search_res')
        if (!check) {
            Search.style.display = 'none'
            this.setState({ Search_Res: [] })
        } else {
            Search.style.display = 'flex'
        }
    }
    SetTheme = (e) => {
        let root = document.querySelector(':root');
        root.style.setProperty(e.target.name, e.target.value)
    }
    Thememove = (e)=>{
        const Element = document.getElementById(e.target.id);
        const ColorPicker = document.getElementById('ColorPicker');
        const labelColor = document.getElementById('labelColor');
        if(Element.checked){
            ColorPicker.style.transform = "translateX(0%)"
            labelColor.classList.toggle('fa-angle-right');
            labelColor.classList.toggle('fa-times');
        }
        else{
            ColorPicker.style.transform = "translateX(-85%)";
            labelColor.classList.toggle('fa-times');
            labelColor.classList.toggle('fa-angle-right');

        }
    }
    /******************************************************** */
    render() {
        return (
            <nav className="navbar" >
                <span className="logo">Developer Source</span>
                <div title="Theme Changer" className="ColorPicker" id="ColorPicker">
                    <input type="checkbox" onChange={this.Thememove}  id="Colorbtn"/>
                    <input type="color" defaultValue="#e10c4a" name="--Color" onChange={this.SetTheme} id="Theme_chooser" />
                    <input type="color" defaultValue="#f34576" name="--Color2" onChange={this.SetTheme} id="Theme_chooser2" />
                    <label htmlFor="Colorbtn" id="labelColor" className="fas fa-angle-right"></label>
                </div>
                <div className="search" id="main_search">
                    <label htmlFor="search" className="fas fa-search"></label>
                    <input onFocus={(e) => { this.Search_effect(); this.Set_value(e); this.display_search(true) }} onBlur={(e) => { this.Search_effect(); }} autoComplete="off" type="text" id="search" placeholder="Search" spellCheck="true" onChange={this.Set_value} value={this.state.search}>
                    </input>
                    <div className="Search_results" id="search_res" >
                        {this.state.Search_Res}
                    </div>
                    <button>search</button>
                </div>
                <button className="Hamburger fas fa-bars" id="btn_menu" onClick={this.Toggle_Nav}></button>
                <ul id="menu_list">
                    <i className="fas fa-times" style={{ margin: '1rem' }} onClick={this.close_nav} id="user_quit"></i>
                    <NavLink exact to="/" className="navitems-effect" activeClassName="selected_nav">
                        <li>Home</li>
                    </NavLink>
                    <NavLink exact to="/ContactUs" activeClassName="selected_nav" className="navitems-effect">
                        <li>Contact Us</li>
                    </NavLink >

                    <this.Navbr />
                </ul>
                { this.state.required
                }
            </nav >)

    }
}

export default Navbar
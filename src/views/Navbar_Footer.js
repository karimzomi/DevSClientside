import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../assets/Styles/index.css'
function Nav_Footer(props){
    return (
        <>
        <Navbar api={props.api} />
        {props.children}
        <Footer/>
        </>
    )
}
export default Nav_Footer;
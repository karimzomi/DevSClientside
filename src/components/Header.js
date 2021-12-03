import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
    return (
            <header>
               
                <div className="content">
                    <h1>Developer Source</h1>
                    <p>Here! As a Beginner in the Web-Development/Programming World, you can find all the source and links to
                    sites that for sure will help you to raise your skills and make your life more easier...
            </p>
                    <div className="btns">
                       { localStorage.getItem('jwt') ? '' : <Link to="/SignUp" className="highlighted">Register Now </Link> }
                        <a href="/" className="btn-underline">Learn more</a>
                    </div>
                </div>
            </header>
    )
}
export default Header
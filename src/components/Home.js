import React from 'react'
import {Link} from "react-router-dom";


function Home() {
    return (
        <div>
           <img width="100%" src="layout.png" alt=""></img>
        {/* <h3>Register for free now!</h3> */}
        <Link to="/SignUp">
                    <button type="button" className="btn btn-secondary mt-4">Join us!</button>
        </Link>
        </div>
    )
}

export default Home

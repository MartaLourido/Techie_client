import React from 'react'
import { Link } from "react-router-dom";
// import { Card, CardGroup, Card.Footer, Icon, Image, Container } from 'semantic-ui-react'


function Home() {
    return (
        <div>
           <img width="100%" src="layout.png" alt=""></img>
        {/* <h3>Register for free now!</h3> */}

        
        <Link to="/signup">
                    <button type="button" className="btn btn-secondary mt-4">Join us!</button>
        </Link>


        </div>

    )
}

export default Home

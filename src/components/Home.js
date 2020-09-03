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

        // <CardGroup centered>
        //     <Card centered>
        //         <Card.Img variant="top" src="layout.png" alt="" />
            
        //         <Card.Footer>

        //             <Link to={`/signup`}>
        //             <button type="button" className="btn btn-secondary mt-4">Join us!</button>
        //             </Link>
        //         </Card.Footer>

        //     </Card>
        // </CardGroup>
    )
}

export default Home

// pages/dashboard.js
import React from 'react';
// import Nav from '../components/nav';
import withAuth from '../helpers/withAuth';
import { firebase } from "../firebase";

class Dashboard extends React.Component {
    render() {
        const user = firebase.auth().currentUser;
        return (
            <div>
                {/* <Nav /> */}
                <h1>Account Name</h1>
                {user.displayName}
                <img src={user.photoURL}></img>
            </div>
        )
    }
}
export default withAuth(Dashboard);
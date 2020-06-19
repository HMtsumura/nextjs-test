import React from 'react'
import Link from 'next/link'
import Head from '../components/Header'
import List from './list'
// import Nav from '../components/nav'
import { auth, firebase } from '../firebase'
class Home extends React.Component {
  handleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    auth.signInWithPopup(provider)
      .then(() => {
        alert('You are signed In');
      })
      .catch(err => {
        alert('OOps something went wrong check your console');
        console.log(err);
      });
  }
  handleLogout = () => {
    auth.signOut().then(function () {
      alert('Logout successful');
    }).catch(function (error) {
      alert('OOps something went wrong check your console');
      console.log(err);
    });
  }
  render() {
    return (
      <div>
        <Head title="Home" />
        <Link href="/list">
          <a>list</a>
        </Link>
        {/* <Nav /> */}
        <div className="hero">
          <h1 className="title">Welcome to Typing Game!</h1>
          <p className="description">
            Click on the Start link to start the typing game.
</p>
          <div className="row">
            <Link href="/test">
              <a className="card">
                <h3>Press to start&rarr;</h3>
                <p>Start Typing</p>
              </a>
            </Link>
            <button onClick={this.handleSignIn}>Sign In using google</button>
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        </div>
        <style jsx>{`
.hero {
width: 100%;
color: #333;
}
.title {
margin: 0;
width: 100%;
padding-top: 80px;
line-height: 1.15;
font-size: 48px;
}
.title,
.description {
text-align: center;
}
.row {
max-width: 880px;
margin: 80px auto 40px;
display: flex;
flex-direction: row;
justify-content: space-around;
}
.card {
padding: 18px 18px 24px;
width: 220px;
text-align: left;
text-decoration: none;
color: #434343;
border: 1px solid #9b9b9b;
}
.card:hover {
border-color: #067df7;
}
.card h3 {
margin: 0;
color: #067df7;
font-size: 18px;
}
.card p {
margin: 0;
padding: 12px 0 0;
font-size: 13px;
color: #333;
}
`}</style>
      </div>
    )
  }
}
export default Home
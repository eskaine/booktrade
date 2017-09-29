var React = require("react");
var Link = require("react-router-dom").Link;
var Route = require("react-router-dom").Route;

/*
const User = ({ match }) => {
  return <h1>Hello {match.params.username}!</h1>
}*/

class Name extends React.Component {

  render(){
    return(
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" id="name" name="name"  placeholder="Name"/>
      </div>
    );
  }

}

module.exports = Authenticate = ({
  match
}, state) => {
  //module.exports = class Signup extends React.Component {

  if (match.path === "/signup") {
    state = {

        title: "Sign Up",
        mainBtn: {
          label: "Create Account",
          classAttr: "btn btn-success"
        },
        secondaryBtn: {
          label: "Log In",
          to: "/login"
        }

    }

  } else {
    state = {

        title: "Log In",
        mainBtn: {
          label: "Log In",
          classAttr: "btn btn-primary"
        },
        secondaryBtn: {
          label: "Sign Up",
          to: "/signup"
        }

    }

  }

  //  render() {
  return (
    <div className="container">

      <div className="row">
        <div className="col-md-6">
          <h1>{state.title}</h1>
          <br/>
          <br/>
          <form action={match.path} method="POST">

            <Route path="/signup" component={Name} />

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" name="email" placeholder="Enter email"/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" name="password" placeholder="Password"/>
            </div>
            <br/>
            <button type="submit" className={state.mainBtn.classAttr}>{state.mainBtn.label}</button>
            <Link className="btn btn-dark btn-margin" to={state.secondaryBtn.to}>{state.secondaryBtn.label}</Link>
          </form>
        </div>
      </div>
    </div>

  );
}
//}

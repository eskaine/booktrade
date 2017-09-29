var React = require('react');
var ReactRouter = require('react-router-dom');
var Route = ReactRouter.Route;
var Head = require('../components/head.jsx');
var NavBar = require('../components/navbar.jsx');
var Footer = require('../components/footer.jsx');
var Home = require('../components/home.jsx');
var Authenticate = require('../components/authenticate.jsx');
//var Dashboard = require('../components/dashboard.jsx');
  //<PrivateRoute path="/dashboard" component={Dashboard} />

module.exports = class App extends React.Component {


  render() {
    return (
      <html>
        <Head/>

        <body>
          <NavBar/>

          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Authenticate} />
          <Route path="/login" component={Authenticate} />


          <Footer/>

          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossOrigin="anonymous"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossOrigin="anonymous"></script>

          <script src='/js/bundle.js'/>
        </body>
      </html>
    )
  }
}

var React = require('react');

module.exports = class Footer extends React.Component {

  render() {
    return (
      <footer className="footer">
        <div className="container">
          <span className="text-muted"><a href="https://github.com/eskaine/booktrade">GitHub</a></span>
        </div>
      </footer>
    );
  }
}

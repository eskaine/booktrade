var React = require('react');

module.exports = class MyComponent extends React.Component {
  handleClick() {
    console.log('clicking');
    alert();
  }

  render() {
    return (
      <html>
      <body>
        <div>
          <h1>yooholoo!</h1>
          <button onClick={this.handleClick}>click me</button>
        </div>
        <script src='/js/bundle.js' />
      </body>
      </html>
    );
  }
}

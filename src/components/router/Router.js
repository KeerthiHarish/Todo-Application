import React, {Component} from 'react';

const currentRoute = () => {
  const path = document.location.pathname;
  return path.substring(path.lastIndexOf('/'))
}

export class Router extends Component {
  state = {
    route: currentRoute()
  }

  handleLinkClicks = (route) => {
    this.setState({route:route});
    history.pushState(null, '', route);
  }

  static childContextTypes = {
    route: React.PropTypes.string,
    linkHandler: React.PropTypes.func
  }

  getChildContext() {
    return {
      route: this.state.route,
      linkHandler: this.handleLinkClicks
    }
  }

  componentDidMount() {
    window.onpopstate = () => {
      this.setState({
        route: currentRoute()
      });
    }
  }

  render(){
    return <div>{this.props.children}</div>
  }
}

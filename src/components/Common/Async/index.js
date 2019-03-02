import { loadTranslationWithComponent } from "services/translation";
import Preloader from "Preloader";

export default componentLoader => {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        Component: null
      };

      this.setComponent = this.setComponent.bind(this);
    }

    componentDidMount() {
      const { Component } = this.state;

      if (!Component) {
        loadTranslationWithComponent(componentLoader).then(this.setComponent);
      }
    }

    setComponent(Component) {
      this.setState({
        Component: Component.default
      });
    }

    render() {
      const { Component } = this.state;

      return Component ? <Component {...this.props} /> : <Preloader />;
    }
  }

  return AsyncComponent;
};

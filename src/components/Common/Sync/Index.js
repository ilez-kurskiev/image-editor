import { loadTranslation } from "services/translation";
import Preloader from "Preloader";

export default Component => {
  class SyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true
      };
    }

    componentDidMount() {
      if (this.state.loading) {
        loadTranslation().then(this.loaded.bind(this));
      }
    }

    loaded() {
      this.setState({
        loading: false
      });
    }

    render() {
      return this.state.loading ? <Preloader /> : <Component {...this.props} />;
    }
  }

  return SyncComponent;
};

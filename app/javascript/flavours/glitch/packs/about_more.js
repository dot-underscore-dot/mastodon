import 'packs/public-path';
import loadPolyfills from 'flavours/glitch/util/load_polyfills';
import { hydrateStore } from 'flavours/glitch/actions/store';
import configureStore from 'flavours/glitch/store/configureStore';
import initialState from 'flavours/glitch/util/initial_state';
import { Provider } from 'react-redux';

function loaded() {
  const Mascot            = require('flavours/glitch/components/mascot').default;
  const React             = require('react');
  const ReactDOM          = require('react-dom');
  const mountNode         = document.getElementById('mascot');

  const store = configureStore();
  const hydrateAction = hydrateStore(initialState);
  store.dispatch(hydrateAction);

  if (mountNode !== null) {
    const props = JSON.parse(mountNode.getAttribute('data-props'));
    ReactDOM.render(<Provider store={store}><Mascot {...props} /> </Provider>, mountNode);
  }
}

function main() {
  const ready = require('flavours/glitch/util/ready').default;
  ready(loaded);
}

loadPolyfills().then(main).catch(error => {
  console.error(error);
});

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Share from './page/sharePage';
// import Share from './page/posterVideo'
import * as serviceWorker from './serviceWorker';
import 'lib-flexible';
// import {Provider} from 'react-redux';

serviceWorker.unregister();

ReactDOM.render(<Share />,document.getElementById('root'))
import { observe } from 'mobx';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

import authStore from '../../---shared/authStore';
import routerStore from '../../---shared/routerStore';
import Toast from '../../---shared/Toast';
import UI from './ui';

@observer
class View extends React.Component {
  static contextTypes = {
    pbx: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.autoAuth();
    this.clearObserve = observe(authStore, 'pbxShouldAuth', this.autoAuth);
  }
  componentWillUnmount() {
    this.clearObserve();
    this.context.pbx.disconnect();
    authStore.set('pbxState', 'stopped');
  }

  auth = () => {
    this.context.pbx.disconnect();
    authStore.set('pbxState', 'connecting');
    this.context.pbx
      .connect(authStore.profile)
      .then(() => {
        authStore.set('pbxState', 'success');
      })
      .catch(err => {
        authStore.set('pbxState', 'failure');
        Toast.error(`Failed to login to pbx, err: ${err?.message}`);
      });
  };
  autoAuth = () => {
    if (!authStore.pbxShouldAuth) {
      return;
    }
    this.auth();
  };

  render() {
    return authStore.pbxState === 'success' ? null : (
      <UI
        retryable={!!authStore.profile}
        failure={this.props.failure}
        abort={routerStore.goToPageProfileSignIn}
        retry={this.auth}
      />
    );
  }
}

export default View;
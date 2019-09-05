import { action, computed, observable } from 'mobx';
import shortid from 'shortid';

import AsyncStorage from '../shared/AsyncStorage';
import { getUrlParams } from '../shared/deeplink';
import prompt from '../shared/prompt';
import { resetBadgeNumber } from '../shared/pushNotification';
import toast from '../shared/Toast';
import BaseStore from './BaseStore';
import routerStore from './routerStore';

const compareField = (p1, p2, field) => {
  const v1 = p1[field];
  const v2 = p2[field];
  return !v1 || !v2 || v1 === v2;
};
const compareProfile = (p1, p2) =>
  p1.pbxUsername && // Must have pbxUsername
  compareField(p1, p2, 'pbxUsername') &&
  compareField(p1, p2, 'pbxTenant') &&
  compareField(p1, p2, 'pbxHostname') &&
  compareField(p1, p2, 'pbxPort');

class AuthStore extends BaseStore {
  // 'stopped'
  // 'connecting'
  // 'success'
  // 'failure'
  @observable pbxState = 'stopped';
  @observable sipState = 'stopped';
  @observable ucState = 'stopped';
  @observable ucLoginFromAnotherPlace = false;
  @computed get pbxShouldAuth() {
    return !(!this.profile || this.pbxState !== 'stopped');
  }
  @computed get sipShouldAuth() {
    return !(this.pbxState !== 'success' || this.sipState !== 'stopped');
  }
  @computed get ucShouldAuth() {
    return !(
      !this.profile?.ucEnabled ||
      this.ucState !== 'stopped' ||
      this.ucLoginFromAnotherPlace
    );
  }

  // id
  // pbxHostname
  // pbxPort
  // pbxTenant
  // pbxUsername
  // pbxPassword
  // pbxPhoneIndex
  // pbxTurnEnabled
  // parks
  // ucEnabled
  // ucHostname
  // ucPort
  // ucPathname
  // accessToken
  @observable profile = null;
  @action signin = id => {
    const p = this.getProfile(id);
    if (!p) {
      return false;
    }
    if (!p.pbxPassword && !p.accessToken) {
      routerStore.goToProfileUpdate(p.id);
      toast.error('The profile password is empty');
      return true;
    }
    this.profile = p;
    routerStore.goToAuth();
    resetBadgeNumber();
    return true;
  };

  @observable allProfiles = [];
  loadProfilesFromLocalStorage = async () => {
    let arr = await AsyncStorage.getItem('authStore.allProfiles');
    if (arr && !Array.isArray(arr)) {
      try {
        arr = JSON.parse(arr);
      } catch (err) {
        arr = null;
      }
    }
    this.set('allProfiles', arr || []);
  };
  saveProfilesToLocalStorage = async (arr = this.allProfiles) => {
    try {
      await AsyncStorage.setItem('authStore.allProfiles', JSON.stringify(arr));
    } catch (err) {
      console.error('authStore.set.allProfiles:', err);
      toast.error('Can not save profiles to local storage');
    }
  };
  getProfile = id => {
    return this.allProfiles.find(p => p.id === id);
  };
  findProfile = _p => {
    return this.allProfiles.find(p => compareProfile(p, _p));
  };
  @action createProfile = _p => {
    this.allProfiles.push(_p);
    this.saveProfilesToLocalStorage();
  };
  @action updateProfile = _p => {
    const p = this.getProfile(_p.id);
    if (!p) {
      return;
    }
    Object.assign(p, _p);
    this.allProfiles = [...this.allProfiles];
    this.saveProfilesToLocalStorage();
  };
  @action removeProfile = id => {
    prompt('Remove profile', 'Do you want to remove this profile?', () => {
      this._removeProfile(id);
    });
  };
  @action _removeProfile = id => {
    this.allProfiles = this.allProfiles.filter(p => p.id !== id);
    this.saveProfilesToLocalStorage();
  };

  handleUrlParams = async () => {
    const urlParams = await getUrlParams();
    if (!urlParams) {
      return;
    }
    //
    const { tenant, user, _wn, host, port } = urlParams;
    if (!tenant || !user) {
      return;
    }
    const p = this.findProfile({
      pbxUsername: user,
      pbxTenant: tenant,
      pbxHostname: host,
      pbxPort: port,
    });
    //
    if (p) {
      if (_wn) {
        p.accessToken = _wn;
      }
      if (!p.pbxHostname) {
        p.pbxHostname = host;
      }
      if (!p.pbxPort) {
        p.pbxPort = port;
      }
      this.updateProfile(p);
      if (p.pbxPassword || p.accessToken) {
        this.signin(p.id);
      } else {
        routerStore.goToProfileUpdate(p.id);
      }
      return;
    }
    //
    const newP = {
      id: shortid(),
      pbxTenant: tenant,
      pbxUsername: user,
      pbxHostname: host,
      pbxPort: port,
      pbxPassword: '',
      pbxPhoneIndex: '4',
      pbxTurnEnabled: false,
      parks: [],
      ucEnabled: false,
      ucHostname: '',
      ucPort: '',
      accessToken: _wn,
    };
    //
    this.createProfile(newP);
    if (newP.accessToken) {
      this.signin(newP.id);
    } else {
      routerStore.goToProfileUpdate(newP.id);
    }
  };

  findProfileFromNotification = n => {
    return this.findProfile({
      ...n,
      pbxUsername: n.to,
      pbxTenant: n.tenant,
    });
  };
  signinByNotification = n => {
    const p = this.findProfileFromNotification(n);
    return p && this.signin(p);
  };

  // id
  // name
  // language
  // phones[]
  //   id
  //   type
  userExtensionProperties = null;
}

const authStore = new AuthStore();
authStore.loadProfilesFromLocalStorage();

export { compareProfile };
export default authStore;

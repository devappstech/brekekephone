import { createMemoryHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

import g from '../global';

const h = createMemoryHistory();
const r = new RouterStore();
syncHistoryWithStore(h, r);

// https://stackoverflow.com/a/24056766
let goBackTimeoutId = 0;
const goBack = fn => {
  const l = r.location;
  const h1 = l.pathname + l.search + l.hash;
  h.goBack();
  if (goBackTimeoutId) {
    clearTimeout(goBackTimeoutId);
  }
  goBackTimeoutId = setTimeout(() => {
    goBackTimeoutId = 0;
    const h2 = l.pathname + l.search + l.hash;
    return h1 === h2 && fn();
  }, 100);
};

setTimeout(() => {
  // wait until all global functions assigned
  Object.entries(r).forEach(([k, v]) => {
    if (/^goTo/.test(k)) {
      // Add backTo for all goTo helpers
      g[k] = g.waitKeyboard(v);
      g[k.replace(/^go/, `back`)] = g.waitKeyboard(() => goBack(v));
    }
  });
});

export default r;
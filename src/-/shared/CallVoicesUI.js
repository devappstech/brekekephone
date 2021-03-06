import { observer } from 'mobx-react'
import React from 'react'
import IncallManager from 'react-native-incall-manager'

@observer
class IncomingItem extends React.Component {
  componentDidMount() {
    IncallManager.startRingtone('_BUNDLE_')
  }

  componentWillUnmount() {
    IncallManager.stopRingtone()
  }

  render() {
    return null
  }
}

const IncomingList = observer(p =>
  p.ids.map(id => <IncomingItem key={id} {...p.resolve(id)} />),
)

class OutgoingItem extends React.Component {
  componentDidMount() {
    IncallManager.start({
      ringback: '_BUNDLE_',
    })
  }

  componentWillUnmount() {
    IncallManager.stopRingback()
  }

  render() {
    return null
  }
}

const OutgoingList = p =>
  p.ids.map(id => <OutgoingItem key={id} {...p.resolve(id)} />)

const CallVoicesUI = observer(p => (
  <React.Fragment>
    <IncomingList
      ids={p.incomingCallIds.filter(i => i !== undefined)}
      resolve={p.resolveCall}
    />
    <OutgoingList
      ids={p.outgoingCallIds.filter(i => i !== undefined)}
      resolve={p.resolveCall}
    />
  </React.Fragment>
))

export default CallVoicesUI

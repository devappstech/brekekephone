import React from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity as Button,
  View,
} from 'react-native';

import { rem, std } from '../styleguide';

const st = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: std.color.shade3,
  },

  navbar: {
    backgroundColor: std.color.shade1,
    alignItems: `center`,
    justifyContent: `center`,
    paddingVertical: std.gap.sm,
    borderColor: std.color.shade4,
    borderBottomWidth: 1,
  },

  navbarTitle: {
    fontFamily: std.font.text,
    fontSize: std.textSize.md,
    lineHeight: std.textSize.md + std.gap.md * 2,
    color: std.color.shade9,
  },

  navbarBack: {
    alignItems: `center`,
    justifyContent: `center`,
    position: `absolute`,
    left: std.gap.lg,
    top: 0,
    bottom: 0,
    paddingRight: std.gap.lg,
  },

  navbarLeave: {
    alignItems: `center`,
    justifyContent: `center`,
    position: `absolute`,
    right: std.gap.lg,
    top: 0,
    bottom: 0,
    paddingLeft: std.gap.lg,
  },

  navbarBackText: {
    fontFamily: std.font.text,
    fontSize: std.textSize.md,
    lineHeight: std.textSize.md + std.gap.md * 2,
    color: std.color.action,
  },

  navbarLeaveText: {
    fontFamily: std.font.text,
    fontSize: std.textSize.md,
    lineHeight: std.textSize.md + std.gap.md * 2,
    color: std.color.danger,
  },

  members: {
    ...Platform.select({
      web: {
        flex: 0,
      },

      ios: {
        flexGrow: 0,
      },

      android: {
        flexGrow: 0,
      },
    }),

    paddingVertical: std.gap.md,
    backgroundColor: std.color.shade1,
    borderColor: std.color.shade4,
    borderBottomWidth: 1,
  },

  member: {
    width: std.iconSize.md * 2 + std.gap.lg * 2,
    alignItems: `center`,
  },

  memberAvatar: {
    width: std.iconSize.md * 2,
    height: std.iconSize.md * 2,
    justifyContent: `center`,
    alignItems: `center`,
    borderRadius: std.iconSize.md,
    borderColor: std.color.shade4,
    borderWidth: 1,
    marginBottom: std.gap.md,
  },

  memberName: {
    fontFamily: std.font.text,
    fontSize: std.textSize.sm,
    color: std.color.shade5,
    textAlign: `center`,
  },

  inviteMemberIcon: {
    fontFamily: std.font.icon,
    fontSize: std.iconSize.sm,
    color: std.color.action,
  },

  inviteMemberText: {
    fontFamily: std.font.text,
    fontSize: std.textSize.sm,
    color: std.color.action,
  },

  chats: {
    paddingTop: std.gap.lg,
  },

  chatsFoot: {
    height: std.gap.lg,
  },

  chat: {
    alignSelf: `center`,
  },

  chatAvatar: {
    width: std.textSize.md + std.gap.md * 2,
    height: std.textSize.md + std.gap.md * 2,
    borderRadius: std.textSize.md / 2 + std.gap.md,
    borderColor: std.color.shade4,
    borderWidth: 1,
    position: `absolute`,
    top:
      std.textSize.sm + std.gap.lg + std.gap.md + (std.gap.lg + std.gap.sm) / 2,
    left: -(std.textSize.md + std.gap.md * 2 + std.gap.md),
  },

  chatCreator: {
    fontFamily: std.font.text,
    fontSize: std.textSize.md,
    fontWeight: `bold`,
    lineHeight: std.textSize.md + std.gap.sm * 2,
    color: std.color.shade5,
    marginBottom: std.gap.md,
  },

  chatCreated: {
    fontFamily: std.font.text,
    fontSize: std.textSize.sm,
    color: std.color.shade5,
    marginTop: std.gap.lg,
    marginBottom: std.gap.md,
    alignSelf: `flex-end`,
  },

  chatBody: {
    width: rem(320),
    padding: std.gap.lg,
    backgroundColor: std.color.shade0,
    borderRadius: std.gap.md,
    marginBottom: std.gap.sm,
  },

  chatText: {
    fontFamily: std.font.text,
    fontSize: std.textSize.md,
    lineHeight: std.textSize.md + std.gap.sm * 2,
    color: std.color.shade9,
  },

  edit: {
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
    backgroundColor: std.color.shade0,
    borderColor: std.color.shade4,
    borderTopWidth: 1,
  },

  editTextInput: {
    flex: 1,
    fontFamily: std.font.text,
    fontSize: std.textSize.md,
    color: std.color.shade9,
    paddingVertical: std.gap.lg * 2,
    paddingHorizontal: std.gap.lg,
    backgroundColor: std.color.shade0,
    borderRadius: std.gap.sm,
  },

  loadingRecent: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
  },

  loadMore: {
    width: rem(320),
    alignItems: `center`,
    padding: std.gap.lg,
    backgroundColor: std.color.shade0,
    borderRadius: std.gap.md,
    alignSelf: `center`,
    marginBottom: std.gap.sm,
  },

  loadMoreText: {
    fontFamily: std.font.text,
    fontSize: std.textSize.md,
    color: std.color.action,
    borderColor: std.color.shade4,
    borderBottomWidth: 1,
  },

  optIcon: {
    fontFamily: std.font.icon,
    fontSize: std.iconSize.md,
    color: std.color.action,
  },

  btnOptIcon: {
    justifyContent: `center`,
    alignItems: `center`,
    width: std.iconSize.md * 2,
    height: std.iconSize.md * 2,
    borderRadius: std.iconSize.md,
    borderColor: std.color.shade4,
    borderWidth: 1,
    marginHorizontal: std.gap.md,
  },

  flexRow: {
    flex: 1,
    flexDirection: `row`,
  },

  navbarCall: {
    paddingVertical: std.gap.lg,
  },
});

const pure = Component =>
  class extends React.PureComponent {
    render() {
      return <Component {...this.props} />;
    }
  };

const Navbar = pure(p => (
  <View style={st.navbar}>
    <Button style={st.navbarBack} onPress={p.back}>
      <Text style={st.navbarBackText}>Back</Text>
    </Button>
    <Text style={st.navbarTitle}>{p.groupName}</Text>
    <Button style={st.navbarLeave} onPress={p.leave}>
      <Text style={st.navbarLeaveText}>Leave</Text>
    </Button>
  </View>
));

const Member = pure(p => (
  <View style={st.member}>
    <Image
      style={st.memberAvatar}
      source={{
        uri: p.avatar,
      }}
    />
    {(() => {
      if (p.name) {
        return (
          <Text style={st.memberName} numberOfLines={2}>
            {p.name}
          </Text>
        );
      } else {
        return (
          <Text style={st.memberName} numberOfLines={2}>
            {p.id}
          </Text>
        );
      }
    })()}
  </View>
));

const NavbarCall = pure(p => (
  <View style={st.flexRow}>
    <Button style={st.btnOptIcon} onPress={p.callVoiceConference}>
      <Text style={st.optIcon}>icon_phone_pick</Text>
    </Button>
    <Button style={st.btnOptIcon} onPress={p.callVideoConference}>
      <Text style={st.optIcon}>icon_video_on</Text>
    </Button>
  </View>
));

const Invite = pure(p => (
  <View style={st.member}>
    <Button style={st.memberAvatar} onPress={p.invite}>
      <Text style={st.inviteMemberIcon}>icon_plus</Text>
    </Button>
    <Text style={st.inviteMemberText}>Invite</Text>
  </View>
));

const Members = pure(p => (
  <ScrollView style={st.members}>
    <View style={st.flexRow}>
      <Invite invite={p.invite} />
      {p.ids.map(id => (
        <Member key={id} {...p.resolve(id)} />
      ))}
    </View>
    <View style={st.navbarCall}>
      <NavbarCall
        callVoiceConference={p.callVoiceConference}
        callVideoConference={p.callVideoConference}
      />
    </View>
  </ScrollView>
));

const MiniChat = pure(p => (
  <View style={st.chat}>
    <View style={st.chatBody}>
      <Text style={st.chatText} numberOfLines={999}>
        {p.text}
      </Text>
    </View>
  </View>
));

const FullChat = pure(p => (
  <View style={st.chat}>
    <Image
      style={st.chatAvatar}
      source={{
        uri: p.creatorAvatar,
      }}
    />
    <Text style={st.chatCreated}>{p.created}</Text>
    <View style={st.chatBody}>
      <Text style={st.chatCreator}>{p.creatorName}</Text>
      <Text style={st.chatText} numberOfLines={999}>
        {p.text}
      </Text>
    </View>
  </View>
));

const Chat = p => (p.mini ? <MiniChat {...p} /> : <FullChat {...p} />);

class Scroll extends React.Component {
  _justMounted = true;
  _closeToBottom = true;

  render() {
    return (
      <ScrollView
        {...this.props}
        scrollEventThrottle={120}
        ref={this.setViewRef}
        onContentSizeChange={this.onContentSizeChange}
        onScroll={this.onScroll}
      />
    );
  }

  setViewRef = ref => {
    this.view = ref;
  };

  onContentSizeChange = () => {
    if (this._closeToBottom) {
      this.view.scrollToEnd({
        animated: !this._justMounted,
      });

      if (this._justMounted) {
        this._justMounted = false;
      }
    }
  };

  onScroll = ev => {
    ev = ev.nativeEvent;
    const layoutSize = ev.layoutMeasurement;
    const layoutHeight = layoutSize.height;
    const contentOffset = ev.contentOffset;
    const contentSize = ev.contentSize;
    const contentHeight = contentSize.height;
    const paddingToBottom = 20;
    this._closeToBottom =
      layoutHeight + contentOffset.y >= contentHeight - paddingToBottom;
  };
}

const Chats = p => (
  <Scroll style={st.chats}>
    {p.hasMore && (
      <Button style={st.loadMore} onPress={p.loadMore}>
        <Text style={st.loadMoreText}>Load More</Text>
      </Button>
    )}
    {p.loadingMore && <ActivityIndicator />}
    {p.ids.map((id, index) => (
      <Chat key={id} {...p.resolve(id, index)} />
    ))}
    <View style={st.chatsFoot} />
  </Scroll>
);

const Edit = pure(p => (
  <View style={st.edit}>
    <TextInput
      style={st.editTextInput}
      placeholder="Type your message"
      returnKeyType="send"
      blurOnSubmit={false}
      value={p.text}
      onChangeText={p.setText}
      onSubmitEditing={p.submitText}
    />
  </View>
));

const LoadingRecent = () => (
  <View style={st.loadingRecent}>
    <ActivityIndicator />
  </View>
);

const Main = p => (
  <React.Fragment>
    <Members
      ids={p.members}
      resolve={p.resolveMember}
      invite={p.invite}
      callVoiceConference={p.callVoiceConference}
      callVideoConference={p.callVideoConference}
    />
    <Chats
      hasMore={p.hasMore}
      loadingMore={p.loadingMore}
      ids={p.chatIds}
      resolve={p.resolveChat}
      loadMore={p.loadMore}
    />
    <Edit
      text={p.editingText}
      setText={p.setEditingText}
      submitText={p.submitEditingText}
    />
  </React.Fragment>
);

const GroupChatsRecent = p => (
  <KeyboardAvoidingView style={st.main}>
    <Navbar groupName={p.groupName} back={p.back} leave={p.leave} />
    {p.loadingRecent ? <LoadingRecent /> : <Main {...p} />}
  </KeyboardAvoidingView>
);

export default GroupChatsRecent;

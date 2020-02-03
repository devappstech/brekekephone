import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import { observer } from 'mobx-react';
import React from 'react';

import { StyleSheet, Text, View } from '../-/Rn';
import g from '../global';
import { groupByTimestamp } from './config';
import Message from './Message';

const css = StyleSheet.create({
  DateGroup: {
    marginTop: 20,
  },
  DateGroup__first: {
    marginTop: 0,
  },
  Date: {
    alignSelf: `center`,
    backgroundColor: `white`,
    paddingHorizontal: 10,
  },
  //
  Border: {
    position: `absolute`,
    top: g.lineHeight / 2,
    left: 2,
    right: 2,
    height: 1,
    backgroundColor: g.hoverBg,
  },
  //
  TimeGroup: {
    marginTop: 10,
  },
  TimeGroup__first: {
    marginTop: 0,
  },
  Time: {
    paddingHorizontal: 4,
    color: g.subColor,
    fontSize: g.fontSizeSmall,
  },
  //
  Creator: {
    flexDirection: `row`,
    flexWrap: `nowrap`,
    paddingLeft: 4,
  },
});

const MessageList = observer(
  ({
    acceptFile,
    fileType,
    isGroupChat,
    list,
    loadMore,
    rejectFile,
    resolveChat,
    showImage,
  }) => {
    // TODO unique and sort right after fetching
    if (!Array.isArray(list)) {
      list = [];
    }
    list = uniqBy(list, `id`);
    list = sortBy(list, `created`);
    //
    return groupByTimestamp(list).map(({ date, groupByTime }, i) => (
      <View key={date} style={[css.DateGroup, !i && css.DateGroup__first]}>
        <View style={css.Border} />
        <Text style={css.Date}>{date}</Text>
        {groupByTime.map(({ createdByMe, messages, time }, j) => {
          const id = messages[0]?.id;
          const c0 = resolveChat(id);
          const name = c0?.creatorName;
          return (
            <View
              key={`${time}${id}`}
              style={[css.TimeGroup, !j && css.TimeGroup__first]}
            >
              {isGroupChat && !createdByMe && name ? (
                <View style={css.Creator}>
                  <Text bold singleLine>
                    {name}
                  </Text>
                  <Text style={css.Time}>{time}</Text>
                </View>
              ) : (
                <Text right={createdByMe} style={css.Time}>
                  {time}
                </Text>
              )}
              {messages.map(m => (
                <Message
                  {...resolveChat(m.id)}
                  acceptFile={acceptFile}
                  fileType={fileType}
                  key={m.id}
                  loadMore={loadMore}
                  rejectFile={rejectFile}
                  showImage={showImage}
                />
              ))}
            </View>
          );
        })}
      </View>
    ));
  },
);

export default MessageList;
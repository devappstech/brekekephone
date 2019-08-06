import {
  Body,
  Button,
  Left,
  ListItem,
  Right,
  Text,
  Thumbnail,
} from 'native-base';
import React, { Component } from 'react';

import Icons from '../components-shared/Icon';

class User extends Component {
  render() {
    return (
      <ListItem listUser>
        <Left>
          <Thumbnail
            source={{
              uri:
                'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg',
            }}
          />
        </Left>
        <Body>
          <Text>Aong Bao</Text>
          <Text note>Missed at 6/8/2018</Text>
        </Body>
        <Right>
          <Button>
            <Icons name="call" />
          </Button>
        </Right>
      </ListItem>
    );
  }
}

export default User;
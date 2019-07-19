import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Left, Right, Body } from 'native-base';

export default class ListItemSelectedExample extends Component {

  static navigationOptions = {
    title: 'Contact Info',
  };

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Left>
                <Text>Telephone</Text>
              </Left>
              <Body>
                <Text>2616-7581</Text>
              </Body>
            </ListItem>
            <ListItem>
             <Left>
                <Text>Email</Text>
              </Left>
              <Body>
                <Text>tlc@ln.edu.hk</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Address</Text>
              </Left>
              <Body>
                <Text>LBY 201, Lingnan University</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
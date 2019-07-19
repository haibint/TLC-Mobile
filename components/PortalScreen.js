import React from 'react';
import { Text } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
import {WebBrowser, AppLoading} from 'expo';



export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      videos_data: [],
    };
    console.log(this.state.videos_data);
  }

  static navigationOptions = {
    title: 'TLC Portal',
  };

  componentDidMount() {
    console.log("component did mount")
    this._fetch_api();
  }

  render() {
    if (this.state.videos_data.length == 0) {
      return <AppLoading/>
    }
    let ele_array = this.state.videos_data.map((video_data) => (
        <ListItem thumbnail key={video_data.id} onPress={() => this._external_link_handler(video_data.url)}>
          <Left>
            <Thumbnail square source={{uri:"https://drive.google.com/uc?export=view&id="+video_data.img}} />
          </Left>
          <Body>
            <Text>{video_data.title}</Text>
          </Body>
        </ListItem>
      )
    )
    
    return (
      <Container>
        <Content>
          <List>
            {ele_array}
          </List>
        </Content>
      </Container>
    );
  }

  _fetch_api = () => {
    fetch("https://script.google.com/macros/s/AKfycbyHu6UYNRnRCgXX-tvibU0tnve6hxFqFlE-6cOPcmDw36c_ubI/exec")
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({videos_data:data.videos}, () => console.log(data.videos));
    })
    .catch(err => {
      console.log(err);
    });
  }

  _external_link_handler = (link) => {
    console.log(link);
    WebBrowser.openBrowserAsync(link);
  }
}
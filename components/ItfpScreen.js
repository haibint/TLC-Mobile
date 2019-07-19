import React from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, View } from 'native-base';
import { AppLoading} from 'expo';
import FlashMessage from "react-native-flash-message"; // the standalone import here is necessary.
import { showMessage } from "react-native-flash-message";


export default class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      questions: [],
      question_index: 0,
      got_corret_answer:true
    };
    console.log(this.state.videos_data);
  }

  static navigationOptions = {
    title: 'ITFP Training',
  };

  componentDidMount() {
    console.log("component did mount")
    this._fetch_api();
  }

  render() {
    if (this.state.questions.length == 0) {
      return <AppLoading/>
    }
    let ele_array = this.state.questions.map((question) => (
        <View>
            <CardItem>
              <Body>
                <Text style={{fontSize:24}}>{question.question}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button onPress={() => this._compare_answer(1)} textStyle={{color: '#87838B'}}>
                  <Text style={{fontSize:32}}>A</Text>
                </Button>
              </Left>
              <Body>
                <Text style={{fontSize:24}}>{question.option1}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button onPress={() => this._compare_answer(2)}textStyle={{color: '#87838B'}}>
                  <Text style={{fontSize:32}}>B</Text>
                </Button>
              </Left>
              <Body>
                <Text style={{fontSize:24}}>{question.option2}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button onPress={() => this._compare_answer(3)} textStyle={{color: '#87838B'}}>
                  <Text style={{fontSize:32}}>C</Text>
                </Button>
              </Left>
              <Body>
                <Text style={{fontSize:24}}>{question.option3}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button onPress={() => this._compare_answer(4)} textStyle={{color: '#87838B'}}>
                  <Text style={{fontSize:32}}>D</Text>
                </Button>
              </Left>
              <Body>
                <Text style={{fontSize:24}}>{question.option4}</Text>
              </Body>
            </CardItem>
          </View>
      )
    )
    return (
      <Container>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={require( '../assets/tlc-icon-transparent.png')} />
                <Body>
                  <Text>Teaching and Learning Center</Text>
                  <Text note>Training questions for IT Fluency Test</Text>
                </Body>
              </Left>
            </CardItem>
            {ele_array[this.state.question_index]}
            <CardItem>
              <Body>
                <Button success onPress={() => this.setState({question_index:Math.floor(Math.random() * 10)})}><Text>Next Question</Text></Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <FlashMessage ref="myLocalFlashMessage" position="bottom"/>
      </Container>
    );
  }

  _fetch_api = () => {
    fetch("https://script.google.com/macros/s/AKfycbxu3VAUkmYTvVyHfMxZtOqm5NMYYJrdmPowMvDU4zKN7UI7hZI5/exec")
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({questions:data.questions}, () => console.log(this.state.questions));
    })
    .catch(err => {
      console.log(err);
    });
  }

  _compare_answer = (answer) => {
      console.log(answer);
      if (answer==this.state.questions[this.state.question_index].answer) {
        showMessage({
          message: "You Got the answer correct!",
          type: "success",
        });
      }
      else {
        showMessage({
          message: "Hum... Please Try again.",
          type: "danger",
        });
      }
  }

}
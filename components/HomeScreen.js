import React from 'react';
import { StyleSheet, Image, TouchableHighlight, Text, Platform, Dimensions} from 'react-native';
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title, View  } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { WebBrowser, Font, AppLoading} from 'expo';


export default class HomeScreen extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            slider_counter: 0,
            sliders_array: null,
            FontisLoading: true
        };
        this._fetch_slider_images_links();
    }

    static navigationOptions = ({ navigation }) => {
        // if (this.state.FontisLoading) {
        //     return <AppLoading/>;
        // }
        // else {
            return {
                header: Platform.OS === 'ios' ? ( /* Your custom header */
                    // <View
                    //   style={{
                    //     height: 80,
                    //     marginTop: 20 /* only for IOS to give StatusBar Space */
                    //   }}
                    // >

                    <Header>
                        <Left></Left>
                        <Body>
                            <Title style={{color:"#f442f1"}}>TLC Mobile</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => navigation.navigate("SideMenu")}>
                                <Icon name='ios-more' style={{color:"grey"}}/>
                            </Button>
                        </Right>
                    </Header>
                    // </View>
                    ) : 
                    <View style={{height:80, marginTop:22}}>
                        <Header style={{backgroundColor:'white'}}>
                            <Left>
                            </Left>
                            <Body>
                                <Text style={{color:"#f442f1", fontSize:20, marginTop:10, fontFamily:"Roboto"}}>TLC Mobile</Text>
                            </Body>
                            <Right>
                                <Button transparent onPress={() => navigation.navigate("SideMenu")}>
                                    <Icon name='ios-more' style={{color:"grey"}}/>
                                </Button>
                            </Right>
                        </Header>
                    </View>
                }
        // }
    };

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({FontisLoading:false});
    }

    componentDidMount() {
        // console.log("component did mount")
        let self = this;
        setInterval( () => {
            if (self.state.slider_counter >4) {
                self.setState({slider_counter:0});
            }
            else {
                self.setState({slider_counter:self.state.slider_counter +1});
            }
        }, 2500);
    }

    render() {
        if (this.state.FontisLoading) {
            return <AppLoading/>;
        }
        else {
            let images_ids;
            const screen_width = Dimensions.get('window').width;
            const screen_height = Dimensions.get('window').height;
            const one_third_width = Dimensions.get('window').width/3;
            if (this.state.sliders_array==null) {
                //this is a five defalut image set for the app.
                // console.log("the sliders images come from local default.");
                images_ids = ["1pO2B9ZuCKNhqRsFGud0RzI4B6jhpIgBF","1sw7sKtag7FTujO6LpLlZgUDYrr38XWR9", "17P9W7p0pYUnx0rSC6GWimNyP8K0ZXsRp", "1Ws7N6ce6mIqxSSmrqFoiGlSOSUJK5oWt", "1DBaIUjkNw_nG4E5J6CRnwDwvo19VOGVA"];
            } else {
                // if we can fetch now urls from google spreadsheet, we will change them to the latest ones.
                images_ids = this.state.sliders_array.map(id => id.slider_image_ids);
                // console.log("the sliders images come google drive");
            }
            return (
                <Container>
		            <Content>
                        <Grid>
                            <Row>
                                <Image style={{width:screen_height*0.5, height:screen_height/15, marginLeft:(screen_width-screen_height*0.5)/2}} source={require( '../assets/LU_logo_short.png')}/>
                            </Row>    
                            
                            <Row>
                                <Col><TouchableHighlight onPress={() => this._external_link_handler_auth('https://tlcapp.ln.edu.hk/itreg/login')}><Image style={{ width:one_third_width, height:one_third_width}} source={require( '../assets/home_icons_jpg/itfp_reg.jpg')}/></TouchableHighlight></Col>
                                <Col style={{marginHorizontal:8}}><TouchableHighlight onPress={this._tlc_portal_handler}><Image style={{ width:one_third_width, height:one_third_width}} source={require( '../assets/home_icons_jpg/TL_portal.jpg')}/></TouchableHighlight></Col>
                                <Col><TouchableHighlight onPress={this._itfp_handler}><Image style={{ width:one_third_width, height:one_third_width}} source={require( '../assets/home_icons_jpg/itfp_tips.jpg')}/></TouchableHighlight></Col>
                            </Row>
                            
                            <Row style={{marginTop:3}}>
                                <Col><TouchableHighlight onPress={() => this._external_link_handler('https://tlc.ln.edu.hk/tlc/index.php/events/')}><Image style={{ width:one_third_width, height:one_third_width}} source={require( '../assets/home_icons_jpg/event.jpg')}/></TouchableHighlight></Col>
                                <Col style={{marginHorizontal:8}}><TouchableHighlight onPress={() => this._external_link_handler('http://tlc.ln.edu.hk/tlc/index.php/mobile-app-obatl/')}><Image style={{ width:one_third_width, height:one_third_width}} source={require( '../assets/home_icons_jpg/OBATL.jpg')}/></TouchableHighlight></Col>
                                <Col><TouchableHighlight onPress={() => this._external_link_handler('http://tlc.ln.edu.hk/tlc/index.php/mobile-app-ctle/')}><Image style={{ width:one_third_width, height:one_third_width}} source={require( '../assets/home_icons_jpg/CTLE.jpg')}/></TouchableHighlight></Col>
                            </Row>
                            <Row style={{marginVertical:3}}>
                                <Col><Image style={{ width:screen_width, height:screen_width*3/5}} source={{uri:"https://drive.google.com/uc?export=view&id="+images_ids[this.state.slider_counter]}}></Image></Col>
                            </Row>
                            <Row>
                                <Col ><TouchableHighlight onPress={() => this._external_link_handler('https://tlcapp.ln.edu.hk/plf/')}><Image style={{ width:one_third_width, height:one_third_width}} source={require( '../assets/home_icons_jpg/PLF.jpg')}/></TouchableHighlight></Col>
                                <Col style={{marginHorizontal:8}}><TouchableHighlight onPress={() => this._external_link_handler_auth('http://tlc.ln.edu.hk/tlc/index.php/mobile-app-tdg/')}><Image style={{ width:one_third_width, height:one_third_width}} source={require( '../assets/home_icons_jpg/TDG.jpg')}/></TouchableHighlight></Col>
                                <Col ><TouchableHighlight onPress={() => this._external_link_handler('https://pla.ln.edu.hk/')}><Image style={{ width:one_third_width, height:one_third_width}} source={require( '../assets/home_icons_jpg/plag.jpg')}/></TouchableHighlight></Col>
                            </Row>
                        </Grid>
		            </Content>
                </Container>
            );
        }
    }

    _external_link_handler = (link) => {
        console.log(link);
        WebBrowser.openBrowserAsync(link);
    }
    
    _external_link_handler_auth = (link) => { console.log(link); WebBrowser.openAuthSessionAsync(link); }

    _tlc_portal_handler = () => {
        //   console.log("tlc protal clicked.")
        this.props.navigation.navigate('TLC_Portal')
    }

    _itfp_handler = () => {
        //   console.log("itfp button clicked.")
        this.props.navigation.navigate('Itfp')
    }

    _fetch_slider_images_links = () => {
        fetch("https://script.googleusercontent.com/macros/echo?user_content_key=VX018NaZQ9MCUq_Cqn6jmMNJbLcUmXgI6PUbawsafNmGOIC-H4kv80J8azR8kRx7spvfh4dG-TM1dol1oUp6qKCgbRHbmBrym5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNPlwYEuDtfgxwS5rL2dREs5P-hsRCmoS0SiVwmrrMzUrWqUa7WX6y4_5Fp9gEGEI03pDlcxra7A&lib=Md378-qTooJljtBu50TWdamMzZM4CiPJO")
        .then(response => {
            return response.json();
        })
        .then(data => {
        // console.log(data.blog_urls);
        // console.log(data.blog_urls.length);
        // this.setState({blog_count:data.blog_urls.length-1});
        this.setState({sliders_array:data.blog_urls.slice(1)}, () => {
            // console.log("fetched datas set.")
            })
        })
        .catch(err => {
            console.log(err);
        });
    }    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

//   icon_image: {
//   //For some reason, display:block here will not work with styleSheet.create
//     display:"block",
//     width:100,
//     height:100,
//     marginLeft:"auto",
//     marginRight:"auto"
//   }
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Header, Spinner, Button, Card, CardSection } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
        apiKey: "AIzaSyB8Nu_UodIuXKdX7F26RZpPOb7y3ar2-Ro",
        authDomain: "testreactnative-f75bd.firebaseapp.com",
        databaseURL: "https://testreactnative-f75bd.firebaseio.com",
        projectId: "testreactnative-f75bd",
        storageBucket: "testreactnative-f75bd.appspot.com",
        messagingSenderId: "163873459102"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderCotent(){
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>
                Logout
              </Button>
            </CardSection>
        </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText={'Authentication'} />
        {this.renderCotent()}
      </View>
    );
  }
}

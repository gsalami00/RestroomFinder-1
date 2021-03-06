import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

//library imports
import { Icon, Container, Header, Content, Left } from "native-base";
//custom components imports
import CustomHeader from "./CustomHeader";
import Button from "react-native-button";
import getDirections from "react-native-google-maps-directions";
import { connect } from "react-redux";

class Go extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Nearest You",
    drawerIcon: () => <Ionicons name="md-home" size={24} />
    // (
    // <Image
    //   source="https://png.icons8.com/metro/1600/settings.png"
    //   style={[styles.icon]}
    // />
    //   <ion-icon ios="ios-log-in" md="md-log-in" />

    // )
  });
  handleGetDirections = () => {
    const data = {
      source: {
        latitude: this.props.userCurrentLocation.latitude,
        longitude: this.props.userCurrentLocation.longitude
      },
      destination: {
        latitude: this.props.allRestrooms[0].coordinates.latitude,
        longitude: this.props.allRestrooms[0].coordinates.longitude
      },
      params: [
        {
          key: "travelmode",
          value: "walking" // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate" // this instantly initializes navigation using the given travel mode
        }
      ]
    };

    getDirections(data);
  };
  render() {
    console.log(this.props);
    return (
      <Container style={{ backgroundColor: "#fba919" }}>
        <CustomHeader title="Nearest You" />
        <Content
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 10
          }}
        >
          <Text style={styles.text}>Take me to the nearest restroom!</Text>

          <Button style={styles.submit} onPress={this.handleGetDirections}>
            GO!
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    allRestrooms: state.restroom.allRestrooms,
    userCurrentLocation: state.restroom.userCurrentLocation
  };
};

export default connect(mapStateToProps)(Go);

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  },
  submit: {
    borderColor: "#ff8100",
    borderWidth: 10,
    backgroundColor: "#f15a29",
    overflow: "hidden",
    borderRadius: 125,
    width: 250,
    height: 250,
    fontSize: 100,
    color: "white",
    fontWeight: "bold",
    paddingTop: 60
  },
  text: {
    fontSize: 25,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 0,
    marginBottom: 15
  }
});

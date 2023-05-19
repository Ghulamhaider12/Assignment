/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";

import { getNewsFeed } from "../Services/Api";
import PostImage from "../components/postImage";
import { TextInput } from "react-native-gesture-handler";
const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
const Home: () => React$Node = () => {
  const [state, setState] = useState({
    isLoading: true,
    getNewFeedsArray: [],
    commentsModal: false,
  });
  //.....userEffect use for first call api...
  ///using components life cycle didmount and didupdate...//
  useEffect(() => {
    getNewsFeed()
      .then((res) => {
        setState({
          ...state,
          getNewFeedsArray: res.newsFeed,
          isLoading: false,
        });
      })
      .catch((error) => {
        setState({ ...state, isLoading: false });
      });
  }, []);
  ///NewsFeed renderitem Method......////
  const renderItem = ({ item, index }) => {
    console.log(item);
    return (
      <View style={{ flex: 1, backgroundColor: "white", marginTop: 2 }}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "70%",
              }}
            >
              <Image
                source={require("../Assets/Images/user.jpg")}
                style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
              />
              <View style={{ flexDirection: "column", marginLeft: "5%" }}>
                <Text style={{ fontWeight: "bold" }}>Ghulam Haider</Text>
                <Text numberOfLines={1}>{item.post_name}</Text>
              </View>
            </View>
            <Image
              source={require("../Assets/Images/rightMenu.png")}
              style={{ height: 24, width: 24 }}
            />
          </View>
          <PostImage post={item} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
              marginRight: 10,
              marginLeft: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Image
                source={require("../Assets/Images/heart.png")}
                style={{ height: 30, width: 30 }}
                resizeMode="contain"
              />
              <Image
                source={require("../Assets/Images/path.png")}
                style={{ height: 30, width: 30, marginLeft: 10 }}
                resizeMode="contain"
              />
              <TouchableOpacity
                onPress={() => setState({ ...state, commentsModal: true })}
              >
                <Image
                  source={require("../Assets/Images/comments.png")}
                  style={{ height: 30, width: 30, marginLeft: 10 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <Image
              source={require("../Assets/Images/bookmark.png")}
              style={{ height: 30, width: 30 }}
            />
          </View>
          <Text></Text>
          <View style={{ marginRight: 20, marginLeft: 20, paddingBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Ghulam Haider</Text>
            <Text>{item.post_description}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ backgroundColor: "white" }} />
      {state.isLoading == true ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      ) : (
        <View style={styles.container}>
          <View>
            <FlatList
              data={state.getNewFeedsArray}
              extraData={this.state}
              renderItem={renderItem}
              onEndReachedThreshold={0.03}
            />
          </View>
        </View>
      )}
      <Modal
        backdropOpacity={0.5}
        backdropColor={"#c4c4c4"}
        visible={state.commentsModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <SafeAreaView />

          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: "white", flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white",
                  alignItems: "center",
                  backdropColor: "white",
                  borderBottomColor: "grey",
                  borderBottomWidth: 0.5,
                  padding: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => setState({ ...state, commentsModal: false })}
                  style={{ marginRight: 20, marginLeft: 20 }}
                >
                  <Image
                    source={require("../Assets/Images/back.png")}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Comments
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "white",
                  position: "absolute",
                  flex: 1,
                  bottom: 0,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Image
                  source={require("../Assets/Images/user.jpg")}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 40 / 2,
                    flex: 0.1,
                  }}
                />
                <TextInput
                  placeholder="Add your Comments"
                  style={{ flex: 0.8, marginLeft: 5 }}
                  autoFocus={true}
                />
                <TouchableOpacity style={{ flex: 0.1 }}>
                  <Text style={{ color: "blue" }}>Post</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, height: "100%", width: "100%" },
  loadingContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {},
});

export default Home;

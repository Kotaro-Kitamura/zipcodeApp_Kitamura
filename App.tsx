import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Pressable,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";

const apiBaseURL = "https://zipcloud.ibsnet.co.jp/api/search";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height; 

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
      <View style={styles.inputs}>
        <TextInput style={styles.inputText} value="郵便番号入力欄" />
        <Pressable>
          <Text style={styles.buttonText}>住所を取得</Text>
        </Pressable>
      </View>
      <Text style={styles.resultText}>住所表示(result)</Text>

      <StatusBar style="auto" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "silver",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    flex: 0.8,
    flexDirection: "column",
    justifyContent: "center",
  },
  resultText: {
    textAlign: "left",
    padding: 10,
    fontSize: 15,
    marginBottom: 5,
  },
  inputs: {
    flexDirection: "row",
    marginBottom: 200,
    justifyContent: "space-between",
  },
  inputText: {
    textAlign: "right",
    padding: 10,
    fontSize: 15,
    backgroundColor: "white",
    color: "black",
    marginBottom: 10,
    borderColor: 'black',
    justifyContent: "space-between",
  },
  Pressable: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttons: {
    width: 300,
    height: 80,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "gray",
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontSize: 15,
    backgroundColor: "white",
    width: 90,
    height: 38,
    lineHeight: 40,
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "space-between",
  },
});

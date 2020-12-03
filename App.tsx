import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
} from "react-native";
import axios from "axios";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height; 

const apiBaseURL = "https://zipcloud.ibsnet.co.jp/api/search";

export default function App() {
    const [zipcode, setZipcode] = useState<string>("");
    const [addressList, setAddressList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const updateScreenAsyn = async() => {
      setIsLoading(true);

       try {
        const addressList = await getAddressInfo(zipcode);
        if (addressList === null ) {
          alert("住所が取得できません");
        } else {
          setAddressList(addressList);
        } 
      } catch(error) {
        alert(error);
      }
      setIsLoading(false);
    };
    const getAddressInfo = async (zipcode: string) => {
      const requestConfig = {
        baseURL: apiBaseURL,
        params: { zipcode: zipcode }
      };

        const response = await axios(requestConfig);
        console.log(response);
        const addressList = response.data.results;

        return addressList;
    };
      const loadingView = <Text>Loading</Text>;
      const renderAddressItem = ({ item }: ListRenderItemInfo<any>) => {
        return(
          <Text>
            {item.address1}
            {item.address2}
            {item.address3}
          </Text>
        );
      };

    const listContainerView = (
     <View>
       <FlatList
       data={addressList}
       renderItem={renderAddressItem}
       keyExtractor={(item, index) => `${index}`}
       />
      </View>
   );
   
  return (
      <SafeAreaView style={styles.container}>
         <View style={styles.userContainer}>
           <TextInput
           onChangeText={(postCode) => setZipcode(postCode)}
           style={styles.inputText}
           keyboardType="numeric"
           placeholder="郵便番号"
           maxLength={7}
           />
           
     <TouchableOpacity style={styles.button} onPress={updateScreenAsyn}>
       <Text style={styles.buttonText}>住所を取得</Text>
       </TouchableOpacity>
       </View>

       <View style={styles.list}>
         {isLoading ? loadingView : listContainerView}
         </View>

         <StatusBar style="auto"/>
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "silver",
    alignItems: "center",
    justifyContent: "center",
  },
  userContainer: {
    flexDirection: "row",
    position: "absolute",
    top: "30%",
    justifyContent: "center",
  },
  resultText: {
    textAlign: "left",
    padding: 10,
    fontSize: 15,
    marginBottom: 50,
  },
  inputText: {
    textAlign: "left",
    padding: 10,
    fontSize: 15,
    backgroundColor: "white",
    color: "black",
    width: "50%",
    borderColor: 'black',
    marginBottom: 60,
  },
  button: {
    width: 150,
    height: 80,
    padding: 10,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "black",
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 15,
     },
     list: {
    position: "absolute",
    top: "40%",
    backgroundColor: "#fff",
    width: screenWidth * 0.9,
    borderWidth: 3,
    borderColor: "#000000",
    height: screenHeight * 0.5,
},
})

  
     
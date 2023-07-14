import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export default function MainScreen({ navigation }) {
  const [messages, setMessages] = useState([{"role": "system", "content": "You are a helpful assistant."}]);
    // const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    console.log('inputText: ' + inputText)
    if (inputText.trim() !== '') {
     // setMessages([...messages, {"role": "system", "content": inputText}]);
      setInputText('');
      sendRequest(inputText);
    }
  };

  const sendRequest = (inputText) => {
  
    const requestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [...messages,{"role": "user", "content": inputText}],
        "temperature": 0.7,
        };
        console.log([...messages,{"role": "user", "content": inputText}],'error')

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'your api key here'
      };
  
      axios.post('https://api.openai.com/v1/chat/completions', requestBody, { headers })
        .then(async (response) => {
          
        //   response.data.message.map((item) => {

        //   })
        console.log(response.data);
          // console.log(response.data.data);
          if (!response.data.choices.length) {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Error',
              textBody: response.message,
              button: 'close',
            })
          } else {
            console.log(response.data.choices);
            console.log(response.data.choices[0].message);
            setMessages([...messages, response.data.choices[0].message]);
            // console.log('About Info: ' + response.data.data.aboutInfo)
            // await storeData(response.data.token)
            // Dialog.show({
            //   type: ALERT_TYPE.SUCCESS,
            //   title: 'Success',
            //   textBody: response.data.message,
            //   button: 'close',
            // })
            // if (response.data.data.aboutInfo == true) {
            //   navigation.navigate('Profile')
            // } else if (response.data.data.aboutInfo == false) {
            //   navigation.navigate('Main')
            // }
            // navigation.navigate('Profile')
          }
        })
        .catch((error, response) => {
          console.error(error);
          Dialog.show({
            type: ALERT_TYPE.False,
            title: 'Error',
            textBody: response.message,
            button: 'close',
          })
        });
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white',width:Dimensions.get('window').width,height:Dimensions.get('window').height  }}>
      <ImageBackground
        source={{
          uri: 'https://static.vecteezy.com/system/resources/previews/022/841/114/original/chatgpt-logo-transparent-background-free-png.png'
        }}
        style={{ flex: 1,zIndex: 0,width:Dimensions.get('window').width }}
        resizeMode="center"
       
      >
         <View style={{ flex: 1, alignItems:"bottom",zIndex: 1,width:Dimensions.get('window').width,height:Dimensions.get('window').height }}>
        <View style={{  alignItems:'bottom', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 16,width:Dimensions.get('window').width,height:Dimensions.get('window').height }}>
          <FlatList
            data={messages}
            style={{flex:1,height:Dimensions.get('window').height}}
            renderItem={({ item,index }) => (
                <>
                {index !== 0 &&
              <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>{item.content}</Text>
              </View>}</>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <TextInput
              style={{  height: 40, borderColor: '#ccc', borderWidth: 1, marginRight: 10, padding: 5 }}
              value={inputText}
              onChangeText={text => setInputText(text)}
              placeholder="Type a message..."
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={{ backgroundColor: '#007bff', padding: 10, borderRadius: 5 }}
              onPress={sendMessage}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </ImageBackground>
    </View>
  );
};

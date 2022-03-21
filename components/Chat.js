import React from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import {renderBubble, renderSystemMessage} from './MessageContainer';


export default class Chat extends React.Component {
   constructor(){
      super();
      this.state = {
         messages: [ ],
      }
   }

   componentDidMount(){

      //receiving and deconstructing props
      let {name}=this.props.route.params; 

      //set name props as title when entered in the input field of start
      this.props.navigation.setOptions({title: [name]}); 

      this.setState({
         //Added static messages to chat screen on launch
         messages: [
            {
               _id: 1,
               text: ['Hi',  name], // Name is from the props navigation from start screen
               createdAt: new Date(),
               user: {
               _id: 2,
               name: 'React Native',
               avatar: 'https://placeimg.com/140/140/any',
               },
            },
            {
               _id: 2,
               text: 'Last time online',
               createdAt: new Date(),
               system: true,
            },
         ],
      })
   }

   onSend(messages = []) {
      this.setState(previousState => ({
         messages: GiftedChat.append(previousState.messages, messages),
      }))
   }

   render () {
      let { backgroundColor}=this.props.route.params; 
      return (
         <View style={{flex: 1, backgroundColor: backgroundColor //use recieved props as style properties
            }}>
               <Text style={styles.text}>Welcome to Chat Room </Text>
               <GiftedChat
                  messages = {this.state.messages}
                  renderBubble = {renderBubble} //imported function from messageContainer
                  renderSystemMessage = {renderSystemMessage}
                  onSend = {(messages) => this.onSend(messages)}
                  user = {{
                  _id: 1,
               }}
               />
               {/* Avoid input field to be hidden under keyboard */}
               { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null} 
         </View>
      );
   }
}

const styles = StyleSheet.create({
   text: {
      textAlign: 'center',
      fontSize: 30,
      fontWeight: '100'
   }
})
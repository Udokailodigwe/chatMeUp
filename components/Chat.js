import React from 'react';
import { InputToolbar, GiftedChat } from 'react-native-gifted-chat';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import {renderBubble, renderSystemMessage} from './MessageContainer'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; //save data in native app storage
import NetInfo from '@react-native-community/netinfo'; //know a user is online

//require firebase to read/update/add data from firebase cloud database
const firebase = require('firebase');
require ('firebase/firestore'); // require firestore.

const firebaseConfig = { //firebase database credentials
            apiKey: "AIzaSyD30XCVl4DYp_5X0JjJm8V4tCwz3mIMmnU",
            authDomain: "chatmeup-539f0.firebaseapp.com",
            projectId: "chatmeup-539f0",
            storageBucket: "chatmeup-539f0.appspot.com",
            messagingSenderId: "66675199956"
   }

export default class Chat extends React.Component {
   constructor(){
      super();
      this.state = {
         messages: [ ],
         uid: 0,
         user: {
            _id: '',
            name: '',
            avatar: '',
         }
      };
         
      //connect to firestore database
      if(!firebase.apps.length){
         firebase.initializeApp(firebaseConfig);
      }
         //referencing the collection in firestore database
      this.referenceMessages = firebase.firestore().collection('messages'); 
   }

   //read and get messages from asyncStorage even at offline mode
   async getMessages() {
      let messages = ' ';
      try {
         messages = await AsyncStorage.getItem('messages') || [ ];
         this.setState({
            messages: JSON.parse(messages)
         });
      }catch(error){
         console.log(error.message);
      }
   };

   //saves the messages and reloads them from native app's asyncStorage, even at offline mode.
   async saveMessages() {
      try{
         await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
      }catch(error) {
            console.log(error.messages);
      }
   };

   //delete messages using key of an item
   async deleteMessages() {
      try{
         await AsyncStorage.removeItem('messages');
            this.setState({
               messages: [ ],
            });
      }catch(error) {
         console.log(error.messages);
      }
   };

   //fetch and display existing messages directly in the app
   componentDidMount(){
      let {name}=this.props.route.params; 

      //set name props as title when entered in the input field of start
      this.props.navigation.setOptions({title: [name]}); 
      
      //check users' online status
      NetInfo.fetch().then((connection) => {
         if(connection.isConnected){
            this.setState({isConnected: true});
            console.log('online');

        //take snapshot at every document update in the firestore database collection and pass to onCollectionUpdate function
         this.unsubscribe = this.referenceMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
      //check whether user is signed in
      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
         if (!user) {
            firebase.auth().signInAnonymously();
         }
         //update user state with currently active user 
         this.setState({
            uid: user.uid,
            messages: [ ],
            user: {
               _id: user.uid,
               name: name,
               avatar: "https://placeimg.com/140/140/any",
            },
         });
         
            //create a reference to the current active users' documents
         this.referenceMessageUser = firebase.firestore().collection('messages').where('uid', '==', this.state.uid);
            //listen  for collection update for a single user
         this.unsubscribeMessageUser = this.referenceMessageUser.onSnapshot(this.onCollectionUpdate);
      });
      this.saveMessages(); //save messages online
         }else{
            this.setState({ isConnected: false }); //set user offline
               console.log('offline');
      //loads messages from asyncStorage when user is offline
         this.getMessages(); 
         }
      });
   }

   //stop recieving update from messages collection
   componentWillUnmount(){
      this.unsubscribe(); //stop listnening for updates
      this.authUnsubscribe(); //stop listening for authentication
   }

   //retrieve data from messages collection in database and store it in state
   onCollectionUpdate = (querySnapshot) => {
      const messages = [ ];
      //iterate through each document in messages collection
      querySnapshot.forEach((doc) => {
         var data = doc.data(); //get the queryDocumentSnapshot's data
         messages.push({
            _id: data._id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user:{
               _id: data.user._id,
               name: data.user.name,
               avatar:data.user.avatar,
            },
         });
      });
         this.setState({
            messages: messages,
      });
   };

   
   onSend(messages = []) {
      this.setState((previousState) => ({
         messages: GiftedChat.append(previousState.messages, messages),
            }), 
            () => { 
      this.addMessages(); //called addMessage function to onSend to add/update messages on every send action
      this.saveMessages(); //save messages when new messages gets added to state
         }
      );
   }

   addMessages() {
         const messages = this.state.messages[0];
         //add new message to document field in the collection
         this.referenceMessages.add({
            _id: messages._id,
            text: messages.text || '',
            createdAt: messages.createdAt,
            user: this.state.user
      });
   }

   renderInputToolbar(props) {
      if (this.state.isConnected == false) {
      } else {
      return <InputToolbar {...props} />;
      }
   }

   render () {
       //receiving and deconstructing props
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
                  renderInputToolbar={this.renderInputToolbar.bind(this)}
                  user={{
                        _id: this.state.user._id,
                        name: this.state.name,
                        avatar: this.state.user.avatar
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
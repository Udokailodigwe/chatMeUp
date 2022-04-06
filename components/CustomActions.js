import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

//require firebase to read/update/add data from firebase cloud database
const firebase = require('firebase');
require ('firebase/firestore'); // require firestore.

export class CustomActions extends React.Component {

   //pick image from device library of user
   pickImage = async() => {
      //ask permission from user before selecting a file from their device library, using CAMERA_ROLL
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      //use async function (launchimagelibraryasync) from imagepicker api to open users device library
      try {
         if (status === 'granted'){ //if permmission is allowed, save picked files into result variable 
            let result = await ImagePicker.launchImageLibraryAsync({ //choose media types and catch errors
               mediaTypes:ImagePicker.MediaTypeOptions.Images,
            }).catch((error) => {
               console.log(error);
            });

            if(!result.cancelled){// if result isnt cancelled
               const imageUrl = await this.uploadImageFetch(result.uri);
               this.props.onSend({image: imageUrl});
               }
            }
      }catch(error){
         console.error(error);
      }
   };
   
   //take a photo with a user's device camera
   takePhoto = async() => {
         //seek permission from user before accessing camera and photo library
      const {status} = await Permissions.askAsync(
         Permissions.CAMERA_ROLL, 
         Permissions.CAMERA
         );
         //use async function (launchCameraAsync) from imagepicker api to open users device camera
         try{
         if(status === 'granted'){ //if permmission is allowed, acces users camera 
            let result = await ImagePicker.launchCameraAsync({//choose media types and catch errors
               mediaTypes: ImagePicker.MediaTypeOptions.Images
            }).catch((error) => {
               console.log(error);
            });

            if(!result.cancelled){
               const imageUrl = await this.uploadImageFetch(result.uri);
               this.props.onSend({ image: imageUrl });
            }
         }
      }catch(error){
         console.error(error);
      }
   };

      //use this method to get location of the user
   getLocation = async() => {
      //request permission to access the device's location
      const {status} = await Permissions.askAsync(Permissions.LOCATION);
      //use async function (getCurrentPositionAsync) from location api to get users location
      try {
      if(status === 'granted'){
      // getCurrentPositionAsync reads current location data and returns object with coordinates of location
         let result = await Location.getCurrentPositionAsync({})
            .catch((error) => {
               console.error(error);
            });

         if(result) {
            // update the state location through onSend props
            this.props.onSend({
               location: {
                  longitude: result.coords.longitude,
                  latitude: result.coords.latitude,
                  },
               });
            }
         }
      }catch (error){
         console.error(error);
      }
   };

  //create and store images as Blob(binary large object) into firebase storage
   uploadImageFetch = async (uri) => {
      //create a new XMLHttpRequest and set its responseType to 'blob'
      const blob = await new Promise ((resolve, reject) => {
         const xhr = new XMLHttpRequest();
         xhr.onload = function () {
            resolve(xhr.response);
         };
         xhr.onerror = function(e){
            console.log(e);
            reject(new TypeError('Network request failed'));
         };
         //open the connection and retrieve the URI’s data (the image) via GET
         xhr.responseType = 'blob';
         xhr.open('GET', uri, true);
         xhr.send(null);
      });

      //creating a reference to the storage
      const imageNameBefore = uri.split('/');
      const imageName = imageNameBefore[imageNameBefore.length - 1];

      const ref = firebase.storage().ref().child(`images/${imageName}`);
      
      //use put to store the retrived content(image) from the Ajax request
      const snapshot = await ref.put(blob);

      //close the connection
      blob.close();

      //retrieve the image’s URL from the server.
      return await snapshot.ref.getDownloadURL();
   };

   //function that handles communication features
   onActionPress = () => {
      const options = [
         'Choose From Library', 
         'Take Picture', 
         'Send Location', 
         'Cancel'
      ];
       // determine position of cancel button in ActionSheet, which closes the view
      const cancelButtonIndex = options.length -1;
      // used to hand down data (the options to display) to the ActionSheet component
      this.context.actionSheet().showActionSheetWithOptions(
         {
            options,
            cancelButtonIndex,
         },
         async(buttonIndex) => {
            switch(buttonIndex) {
               case 0:
                  console.log('user wants to pick an image');
                  return this.pickImage();
               case 1:
                  console.log('user wants to take a photo');
                  return this.takePhoto();
               case 2:
                  console.log('user wants to get their location');
                  return this.getLocation();
            }
         }
      );
   };

   render() { 
         return (
         <TouchableOpacity 
         accessible={true}
         accessibilityLabel="More options"
         accessibilityHint="Let's you choose to send an image or your geolocation."   
         style = {[styles.container]} onPress = {this.onActionPress}
         >
            <View style={[styles.wrapper, this.props.wrapperStyle]}>
               <Text style={[styles.iconText, this.props.iconTextStyle]}>
                  +
               </Text>
            </View>
         </TouchableOpacity>
      );
   }
}

CustomActions.contextTypes = {
   actionSheet: PropTypes.func,
};

const styles = StyleSheet.create({
   container: {
   width: 26,
   height: 26,
   marginLeft: 10,
   marginBottom: 10,
   },
   wrapper: {
   borderRadius: 13,
   borderColor: '#b2b2b2',
   borderWidth: 2,
   flex: 1,
   },
   iconText: {
   color: '#b2b2b2',
   fontWeight: 'bold',
   fontSize: 16,
   backgroundColor: 'transparent',
   textAlign: 'center',
   },
});

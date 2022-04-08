import React from 'react';
import { Bubble, SystemMessage } from 'react-native-gifted-chat';



export const renderBubble = (props) => (
   <Bubble
   {...props}
      wrapperStyle={{
         left: { backgroundColor: 'white'   },
         right: {backgroundColor: 'teal'},
      }}
   />
);

// export const renderSystemMessage = (props) => (
//    <SystemMessage
//       {...props}      
//       wrapperStyle={{marginBottom: 33, marginTop: -10 }}
//       textStyle={{ color: 'white',  fontStyle: 'italic'}}
//    />
// );


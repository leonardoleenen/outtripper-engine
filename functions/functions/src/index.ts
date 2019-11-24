import * as functions from 'firebase-functions';
import {login as loginFunc} from './service'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


/* export const helloWorld = functions.https.onRequest((request, response) => {
  admin.firestore().collection('JURASSICLAKE')
  .doc('notifications')
  .collection('userid1')
  .add({
    message: "Este viene del servicio",
    eventDate: 123123,
    hasReaded: false, 
    collectionKind: "notifications"
  }).then( () => )
  .catch( err =>  response.send(err) ) 
}); */

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });

 export const login = functions.https.onRequest((request, response) => {
  const {uid,cn,email} = request.body
  loginFunc(uid,cn,email).then( result => {
    response.json(result)
  }).catch( err => response.status(422).json({errorMessage: err}) )
 });

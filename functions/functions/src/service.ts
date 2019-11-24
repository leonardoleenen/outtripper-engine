import * as admin from 'firebase-admin'
import * as uuid4 from 'uuid4'

const  serviceAccount = require("../keys/outtripper_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://norse-carport-258615.firebaseio.com"
});


const createUser = (uid: string, cn: string, email: string) : void => {
  admin.firestore().collection('users').doc(uid).set({
    uid,cn,email
  }).catch(err => {throw err})
}
export const login = (uid: string, cn:string, email: string  ) : Promise<TokenOuttripper> => {
  // const token : TokenOuttripper ={} 
  let  user : User
  let deal : DealAccess
  const usersCollection = admin.firestore().collection('users')
  const dealAccessCollection = admin.firestore().collection('dealAccess')
  const organizationCollection = admin.firestore().collection('organizations')



  return usersCollection.doc(uid).get().then( doc => {
    return doc
  }).then( doc => {
    user = doc.data() as User
    if (!user){
      createUser(uid,cn,email)
      user = {
        cn: cn,
        email: email,
        status: 'ENABLED'
      } as User
    }
    return dealAccessCollection.doc(uid).get()
  }).then( doc => {
    deal = doc.data() as DealAccess
    if (deal)
      return organizationCollection.doc(deal.organization).get()
    else 
      return doc
  }).then( doc  => {
    // Compleatamos el token
    const organization = doc.data() as Organization
    return {
      id :  uuid4(),
      userCn: user.cn,
      rol: deal ? deal.rol : 'CONSUMER',
      organizationId: organization ? organization.cn : null,
      organizationCn : deal ? deal.organization : null
    } as TokenOuttripper
  })


  // return token
}
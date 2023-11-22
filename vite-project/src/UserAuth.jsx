// import { auth } from './firebaseconfig'
// import { onAuthStateChanged, signOut } from 'firebase/auth'
// import { useState } from 'react'


// const authDetails = () => {
//     const [authUser, setAuthUser] = useState(null)
//     const [isLoggedIn, setIsLoggedIn] = useState(false)
//     useEffect(() => {
//     const listen = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setAuthUser(user)
//         setIsLoggedIn(true)
//       } else {
//       setAuthUser(null)
//       setIsLoggedIn(falses)
//       }
//     })

//     return () => {
//         listen()
//     }
//   }, [])

//   const userSignOut = () => {
//     signOut(auth).then(() => {
//         console.log('Sign out successful.')
//     }).catch(err => console.log(err))
//   }

//   return (
//     isLoggedIn
//   )
// }


// export default authDetails

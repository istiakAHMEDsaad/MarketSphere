import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { app } from '../config/firebase.config';
import { AppContext } from './AppContext';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user:
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in:
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign in with google:
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // log out:
  const logout = async () => {
    setLoading(true);
    return signOut(auth);
  };

  // update user:
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // reset password mail:
  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // setting an observer:
  useEffect(() => {
    const observer = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
      setLoading(false);
    });

    // unmount the observer
    return () => {
      observer();
    };
  });

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logout,
    updateUserProfile,
    forgetPassword,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node,
};
export default AppProvider;

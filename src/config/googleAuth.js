import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Config } from 'react-native-config';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: Config.WEB_CLIENT_ID,
    forceCodeForRefreshToken: true,
    offlineAccess: true,
  });
};

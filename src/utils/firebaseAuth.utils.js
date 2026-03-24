export const getAuthError = code => {
  switch (code) {
    case 'auth/invalid-email':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      // Generic message prevents attackers from guessing valid emails
      return 'Invalid email or password.';
    case 'auth/unknown':
      return 'Email and password cannot be empty.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

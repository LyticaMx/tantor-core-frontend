export interface SignIn {
  email: string;
  password: string;
}

export interface Profile {
  name: string;
}

export interface Auth {
  isLoggedIn: boolean;
  token: string;
  rToken: string;
  profile: Profile;
}

export interface ContextType {
  auth: Auth;
  actions?: {
    signIn: (values: SignIn) => Promise<void>;
    signOut: () => Promise<void>;
  };
}

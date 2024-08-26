export interface PropsBody {
  email: string;
  password: string;
}

export interface PropsLogin {
  loading: boolean;
  newLogin: (body: PropsBody) => void;
  navigationNewAccount: () => void;
};
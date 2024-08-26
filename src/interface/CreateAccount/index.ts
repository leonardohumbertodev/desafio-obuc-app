export interface PropsBody {
  name: string;
  email: string;
  password: string;
}

export interface PropsAccount {
  loading: boolean;
  createAccountUser: (body: PropsBody) => void;
  navigationBack: () => void;
};
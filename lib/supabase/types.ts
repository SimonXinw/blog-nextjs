export interface User {
  id?: number;
  username: string;
  password: string;
  loginType?: string;
}

export interface DBUser {
  id: number;
  password: string;
  username: string;
  loginType: "account";
  created_time: Date;
}

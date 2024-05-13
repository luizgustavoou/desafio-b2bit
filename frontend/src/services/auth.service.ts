import { IAuthApi, ILoginResponse } from "@/apis/auth.api";

export interface IAuthService {
  login(email: string, password: string): Promise<ILoginResponse>;
}

export class AuthServiceImpl implements IAuthService {
  constructor(private readonly authApi: IAuthApi) {}

  async login(email: string, password: string): Promise<ILoginResponse> {
    const output = await this.authApi.login(email, password);

    return output;
  }
}

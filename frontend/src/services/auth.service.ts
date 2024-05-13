import { IAuthApi, ILoginResponse, IProfileResponse } from "@/apis/auth.api";

export interface IAuthService {
  login(email: string, password: string): Promise<ILoginResponse>;
  getProfile(): Promise<IProfileResponse>;
}

export class AuthServiceImpl implements IAuthService {
  constructor(private readonly authApi: IAuthApi) {}

  async login(email: string, password: string): Promise<ILoginResponse> {
    const output = await this.authApi.login(email, password);

    return output;
  }

  async getProfile(): Promise<IProfileResponse> {
    const output = await this.authApi.getProfile();

    return output;
  }
}

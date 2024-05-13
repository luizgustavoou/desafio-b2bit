import { IAuthApi, ILoginResponse, IProfileResponse } from "@/apis/auth.api";
import { ILoginParams } from "@/types/ILoginParams";

export interface IAuthService {
  login(params: ILoginParams): Promise<ILoginResponse>;
  getProfile(): Promise<IProfileResponse>;
  
}

export class AuthServiceImpl implements IAuthService {
  constructor(private readonly authApi: IAuthApi) {}

  async login(params: ILoginParams): Promise<ILoginResponse> {
    const output = await this.authApi.login(params);

    return output;
  }

  async getProfile(): Promise<IProfileResponse> {
    const output = await this.authApi.getProfile();

    return output;
  }
}

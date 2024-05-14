import { IAuthApi, ILoginResponse, IProfileResponse } from "@/apis/auth.api";
import { ILoginParams } from "@/types/ILoginParams";
import { IStorageService } from "./storage.service";

export interface IAuthService {
  login(params: ILoginParams): Promise<ILoginResponse>;
  getProfile(): Promise<IProfileResponse>;
}

export class AuthServiceImpl implements IAuthService {
  constructor(
    private readonly authApi: IAuthApi,
    private storageService: IStorageService
  ) {}

  async login(params: ILoginParams): Promise<ILoginResponse> {
    const output = await this.authApi.login(params);

    this.storageService.setItem("accessToken", output.tokens.access);
    this.storageService.setItem("refreshToken", output.tokens.refresh);
    this.storageService.setItem("user", JSON.stringify(output.user));

    return output;
  }

  async getProfile(): Promise<IProfileResponse> {
    const output = await this.authApi.getProfile();

    return output;
  }
}

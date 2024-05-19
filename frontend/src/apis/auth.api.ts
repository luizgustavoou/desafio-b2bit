import { api } from "@/network/api";
import { ILoginParams } from "@/types/ILoginParams";

export interface IAvatar {
  id: number;
  high: string;
  medium: string;
  low: string;
}

export interface IRole {
  value: number;
  label: string;
}
export interface IStaffRole {
  value: number;
  label: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  avatar: IAvatar | null;
  type: string;
  created: string;
  modified: string;
  role: string;
}

export interface ITokens {
  refresh: string;
  access: string;
}

export interface ILoginResponse {
  user: IUser;
  tokens: ITokens;
}

export interface IProfileResponse {
  id: string;
  avatar: IAvatar;
  name: string;
  last_name: string;
  email: string;
  role: IRole;
  last_login: string;
  staff_role: IStaffRole;
}

export interface IAuthApi {
  login(params: ILoginParams): Promise<ILoginResponse>;
  getProfile(): Promise<IProfileResponse>;
}

export class AuthApiImpl implements IAuthApi {
  async login(params: ILoginParams): Promise<ILoginResponse> {
    const res = await api.post<ILoginResponse>("/auth/login/", params);

    return res.data;
  }

  async getProfile(): Promise<IProfileResponse> {
    const res = await api.get<IProfileResponse>("/auth/profile/");

    return res.data;
  }
}

export class AuthApiMock implements IAuthApi {
  async login(_: ILoginParams): Promise<ILoginResponse> {
    const output: ILoginResponse = {
      user: {
        id: 4,
        name: "Cliente",
        email: "cliente@youdrive.com",
        is_active: true,
        avatar: null,
        type: "StoreUser",
        created: "2023-09-20T11:42:54.515946-03:00",
        modified: "2024-04-26T11:45:26.768591-03:00",
        role: "OWNER",
      },
      tokens: {
        refresh:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Njg4MTc0NywiaWF0IjoxNzE1MzQ1NzQ3LCJqdGkiOiIyMTRkOTEyNmJhYWY0YzY1ODMwYzcxODU4ZWNkYjdiNSIsInVzZXJfaWQiOjR9.22g5QzHO5SoN92dNYQV67oWVN8uV42Q8-c4qT_3lrHs",
        access:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1NDMyMTQ3LCJpYXQiOjE3MTUzNDU3NDcsImp0aSI6IjAyZTBmZTY2YmQ2MDRkMmY5MjJhNGRiMzIxNmFiYzU2IiwidXNlcl9pZCI6NH0.L4H2FEKlhM5RXeqX0o0xiszBYe5uH7SyEABAnhOSf1A",
      },
    };

    return output;
  }

  async getProfile(): Promise<IProfileResponse> {
    const output: IProfileResponse = {
      id: "445e138e-99c6-4055-91d1-ebc2fb6165ee",
      avatar: {
        id: 8,
        high: "https://cognuro-app-assets.s3.amazonaws.com/media/images/IMG_4452_0spsnuL.jpg",
        medium:
          "https://cognuro-app-assets.s3.amazonaws.com/media/images/IMG_4452_medium_VjJtnel.jpg",
        low: "https://cognuro-app-assets.s3.amazonaws.com/media/images/IMG_4452_low_5Vh2hYj.jpg",
      },
      name: "Miguel",
      last_name: "Rocha",
      email: "miguel@b2bit.company",
      role: {
        value: 0,
        label: "Staff",
      },
      last_login: "2022-03-08T14:28:39.781811Z",
      staff_role: {
        value: 0,
        label: "Admin",
      },
    };

    return output;
  }
}

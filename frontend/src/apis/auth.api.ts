export interface IAvatar {}

export interface ILoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    avatar: IAvatar | null;
    type: string;
    created: string;
    modified: string;
    role: string;
  };
  tokens: {
    refresh: string;
    access: string;
  };
}

export interface IAuthApi {
  login(email: string, password: string): Promise<ILoginResponse>;
}

export class AuthApiMock implements IAuthApi {
  async login(email: string, password: string): Promise<ILoginResponse> {
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
}

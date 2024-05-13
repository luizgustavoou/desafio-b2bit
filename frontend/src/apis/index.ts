import { AuthApiMock, IAuthApi } from "./auth.api";

const authApi: IAuthApi = new AuthApiMock();

export { authApi };

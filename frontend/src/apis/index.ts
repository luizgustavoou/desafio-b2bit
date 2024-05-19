import { AuthApiImpl, IAuthApi } from "./auth.api";

const authApi: IAuthApi = new AuthApiImpl();

export { authApi };

import { IStorageService, LocalStorageServiceImpl } from "./storage.service";
import { AuthServiceImpl, IAuthService } from "./auth.service";
import { authApi } from "@/apis";

const storageService: IStorageService = new LocalStorageServiceImpl();

const authService: IAuthService = new AuthServiceImpl(authApi);

export { storageService, authService };

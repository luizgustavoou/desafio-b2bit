import { IStorageService, LocalStorageServiceImpl } from "./storage.service";

const storageService: IStorageService = new LocalStorageServiceImpl();

export { storageService };

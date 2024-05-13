import { Injectable } from '@nestjs/common';

export abstract class AuthService {}

@Injectable()
export class AuthServiceImpl implements AuthService {}

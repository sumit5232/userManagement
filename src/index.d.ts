import 'express';
import { CustomJwtPayload } from './user-management/jwt/jwt.strategy';

declare module 'express' {
    interface ExpressRequest {
        user?: CustomJwtPayload;
    }
}

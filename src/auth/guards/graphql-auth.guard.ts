import {
    ExecutionContext,
    Injectable,
    CanActivate,
    UnauthorizedException
} from '@nestjs/common';
import {Reflector} from "@nestjs/core";
import {GqlExecutionContext} from '@nestjs/graphql';
import {ConfigService} from '@nestjs/config';
import {requestApi} from "../../config/utils/utils";
import {verifyTokenQuery} from "../../config/utils/queries";

@Injectable()
export class GqlAuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly configService: ConfigService
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const headers = ctx.getContext().req.headers;
        const aiSecurityDir = this.configService.get<string>('AISECURITY_API_DIR');
        let permissions = this.reflector.get<string[]>('permissions', context.getHandler());
        const variables = {
            permissions: (permissions) ? permissions : []
        };
        const apiResponse: any = await requestApi(aiSecurityDir, verifyTokenQuery, headers, variables);
        const {verifyToken} = apiResponse;
        if (!verifyToken)
            throw new UnauthorizedException(
                'Usted no tiene permisos para acceder a esta operación',
            );
        return verifyToken;
    }
}

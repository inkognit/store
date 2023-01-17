import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.getArgByIndex(0);
        return data ? request.cookies?.[data] : request.cookies;
    },
);

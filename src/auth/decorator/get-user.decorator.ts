import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

// This code will receive the request. Do something with the reuqest data then return
// Param that decorator pass in. If call @GetUser('userId') then data = 'userId'.
// Ctx is context of the request (Like HttpContext in .Net)
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx
      // Define that is using http. It can be websocket, rpc
      .switchToHttp()
      // Get the request data. It's ExpressJS Request instance in this case
      .getRequest();

    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);

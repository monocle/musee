import type { DefaultBodyType, DelayMode } from "msw";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { handlers } from "./handlers";

interface ServeDataProps {
  path: string;
  method?: "get" | "post" | "put" | "delete";
  status?: 200 | 400 | number;
  data?: DefaultBodyType;
  delay?: DelayMode | number;
}

export function serveData({
  path,
  method = "get",
  status = 200,
  data = [],
  delay = 0,
}: ServeDataProps) {
  const fullPath = "api/" + path;

  server.use(
    rest[method](fullPath, (_, res, ctx) => {
      return res(ctx.status(status), ctx.json(data), ctx.delay(delay));
    })
  );
}

const server = setupServer(...handlers);

export default server;

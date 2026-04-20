import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  root(@Res() res: Response) {
    res.send(`<!DOCTYPE html>
<html>
<body>
  <p>API 문서: <a href="/docs">/docs</a></p>
</body>
</html>`);
  }
}

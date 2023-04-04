import { HttpStatus } from '@nestjs/common';

  enum STATUS  {
    BUSSION_ERROR=666

}

export const HTTP_STATUS= {...STATUS,...HttpStatus}

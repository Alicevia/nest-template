import { HttpStatus } from '@nestjs/common';

enum STATUS  {
    BUSINESS_ERROR=666
}

export const HTTP_STATUS= {...STATUS,...HttpStatus}


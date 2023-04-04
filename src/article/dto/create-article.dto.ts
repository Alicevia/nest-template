import { IsNotEmpty } from "class-validator";
function notEmpty(params: string) {
  return { message: params + "不能为空" };
}

export class CreateArticleDto {
  @IsNotEmpty(notEmpty("标题"))
  readonly title: string;

  readonly description: string = "descr默认值";

  @IsNotEmpty(notEmpty("内容"))
  readonly content: string;
}

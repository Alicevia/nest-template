import { existsSync } from 'fs';
import { resolve } from 'path';
const isProd = process.env.NODE_ENV === 'production';

function parseEnv() {
  const localEnv = resolve('.env');
  const prodEnv = resolve('.env.prod');

  if (!existsSync(localEnv) && existsSync(prodEnv)) {
    throw new Error('缺少环境配置文件');
  }

  const filePath = isProd && existsSync(prodEnv) ? prodEnv : localEnv;
  return { path: filePath };
}
export default parseEnv();

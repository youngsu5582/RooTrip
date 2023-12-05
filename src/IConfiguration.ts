import path from 'path';

import { IGlobal } from './IGlobal';

export class IConfiguration {
  public static get ROOT() {
    const splitted: string[] = __dirname.split(path.sep);
    return splitted.at(-1) === 'src' && splitted.at(-2) === 'bin'
      ? path.resolve(__dirname + '/../..')
      : path.resolve(__dirname + '/..');
  }

  public static get API_PORT() {
    return Number(IGlobal.env.API_PORT);
  }
}

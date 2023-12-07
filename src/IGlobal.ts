import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { Singleton } from './lib/stl/Singleton';
import typia from 'typia';

/**
 * Global variables of the server.
 *
 * @links https://github.com/samchon/backend/blob/master/src/MyGlobal.ts
 */
type EnvironmentMode = 'local' | 'dev' | 'prod';
export class IGlobal {
  public static testing = false;
  public static get env(): IEnvironments {
    return environments.get();
  }

  /**
   * Current mode.
   *
   *   - local: The server is on your local machine.
   *   - dev: The server is for the developer.
   *   - prod: The server is for the real service.
   */
  public static get mode(): EnvironmentMode {
    return modeWrapper.value ?? environments.get().MODE;
  }

  /**
   * Set current mode.
   *
   * @param mode The new mode
   */
  public static setMode(mode: typeof IGlobal.mode): void {
    typia.assert<typeof mode>(mode);
    modeWrapper.value = mode;
  }
}
interface IEnvironments {
  MODE: EnvironmentMode;
  API_PORT: `${number}`;

  POSTGRES_HOST: string;
  POSTGRES_PORT: `${number}`;
  POSTGRES_DATABASE: string;
  POSTGRES_USERNAME: string;
  POSTGRES_PASSWORD: string;
}

interface IMode {
  value?: EnvironmentMode;
}

const modeWrapper: IMode = {};

const environments = new Singleton(() => {
  const env = config();
  expand(env);
  return typia.assert<IEnvironments>(process.env);
});

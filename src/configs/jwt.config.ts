import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      signOptions: { expiresIn: process.env.JWT_EXP },
      secret: process.env.JWT_SECRET,
    };
  },
};

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
constructor(private readonly configService: ConfigService) {
   const supabaseUrl = configService.get<string>('SUPABASE_URL') ?? '';
   super({
       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
       secretOrKeyProvider: passportJwtSecret({
           cache: true,
           rateLimit: true,
           jwksRequestsPerMinute: 10,
           jwksUri: `${supabaseUrl}/auth/v1/.well-known/jwks.json`,
       }),
       algorithms: ['ES256'],
   });
}

async validate(payload: { sub: string; email?: string }) {
   return { userId: payload.sub, email: payload.email };
}

}
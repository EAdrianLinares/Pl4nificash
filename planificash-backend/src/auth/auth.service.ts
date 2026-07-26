import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { UsuariosService } from '../usuarios/usuarios.service';

type SupabaseAuthUser = {
  id: string;
  email: string;
  user_metadata?: {
    nombre?: string;
  };
};

type SupabaseSignInResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: SupabaseAuthUser;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly configService: ConfigService,
  ) {}

  private get supabaseUrl(): string {
    const url = this.configService.get<string>('SUPABASE_URL');

    if (!url) {
      throw new BadGatewayException('SUPABASE_URL no está configurado');
    }

    return url;
  }

  private get supabaseAnonKey(): string {
    const key = this.configService.get<string>('SUPABASE_ANON_KEY');

    if (!key) {
      throw new BadGatewayException('SUPABASE_ANON_KEY no está configurado');
    }

    return key;
  }

  private get supabaseServiceRoleKey(): string {
    const key = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    if (!key) {
      throw new BadGatewayException(
        'SUPABASE_SERVICE_ROLE_KEY no está configurado',
      );
    }

    return key;
  }

  private async readErrorMessage(response: Response): Promise<string> {
    const payload = (await response.json().catch(() => null)) as
      | { msg?: string; message?: string; error_description?: string }
      | null;

    return (
      payload?.msg ??
      payload?.message ??
      payload?.error_description ??
      'Error en Supabase'
    );
  }

  async validateUser(email: string, password: string) {
    const response = await fetch(
      `${this.supabaseUrl}/auth/v1/token?grant_type=password`,
      {
        method: 'POST',
        headers: {
          apikey: this.supabaseAnonKey,
          Authorization: `Bearer ${this.supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as SupabaseSignInResponse;
    const profile = await this.usuariosService.findById(data.user.id);

    return {
      id: data.user.id,
      email: data.user.email,
      nombre: profile?.nombre ?? data.user.user_metadata?.nombre ?? '',
      accessToken: data.access_token,
    };
  }

  async login(user: {
    id: string;
    email: string;
    nombre: string;
    accessToken: string;
  }) {
    return {
      access_token: user.accessToken,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
      },
      supabase_access_token: user.accessToken,
    };
  }

  async register(createUsuarioDto: CreateUsuarioDto) {
    const response = await fetch(`${this.supabaseUrl}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        apikey: this.supabaseServiceRoleKey,
        Authorization: `Bearer ${this.supabaseServiceRoleKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: createUsuarioDto.email,
        password: createUsuarioDto.password,
        email_confirm: true,
        user_metadata: {
          nombre: createUsuarioDto.nombre,
        },
      }),
    });

    if (!response.ok) {
      throw new BadRequestException(await this.readErrorMessage(response));
    }

    const data = (await response.json()) as {
      user: SupabaseAuthUser;
    };

    await this.usuariosService.upsertProfile({
      id: data.user.id,
      nombre: createUsuarioDto.nombre,
    });

    return {
      id: data.user.id,
      nombre: createUsuarioDto.nombre,
      email: createUsuarioDto.email,
    };
  }
}

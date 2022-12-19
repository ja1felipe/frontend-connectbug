export type UserJwtType = {
  id: string;
  email: string;
  name: string;
  role: string;
  external_id: string;
  iat: number;
  exp: number;
};

export type UserType = {
  id: string;
  email: string;
  name: string;
  role: Role;
  external_id: string;
  created_at: string;
  updated_at: string;
};

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  DEV = 'DEV',
  QA = 'QA',
}

export const roleTranslated = {
  [Role.ADMIN]: 'Administrador',
  [Role.USER]: 'Usuário',
  [Role.DEV]: 'Desenvolvedor',
  [Role.QA]: 'QA',
};

export type CreateUserRequestType = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

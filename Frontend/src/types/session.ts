export type userResponse = {
  name: string;
  rol: string;
  alias: string;
};

export type SessionUser = userResponse & {
  id: number;
};

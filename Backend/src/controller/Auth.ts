import Users from "../model/Users";

export const Auth = ({ idAuth }: { idAuth: number }) => {
  const user = Users()._find(idAuth);
  if (!user) return false;
  const { _rowIndex, _save, _delete, id, ...data } = user;
  return data;
};

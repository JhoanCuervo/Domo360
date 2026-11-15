import Users from "../../model/Users";

export const Auth = ({ idAuth }: { idAuth: number }) => {
  const user = Users()._find(idAuth);
  if (!user) return JSON.stringify(false);
  const { _rowIndex, _save, _delete, id, ...data } = user;
  return JSON.stringify(data);
};

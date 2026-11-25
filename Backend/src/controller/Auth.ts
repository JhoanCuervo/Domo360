import Apartments from "../model/Apartments";
import Contracts from "../model/Contracts";
import Users from "../model/Users";
import DeletePropierties from "../utils/DeletePropierties";

export const Auth = ({ idAuth }: { idAuth: number }) => {
  const user = Users()._find(idAuth);

  if (!user) return false;

  const userReturn = DeletePropierties(user);

  if (user.rol !== "User") {
    return JSON.stringify(userReturn);
  }

  const contract = Contracts()._firstByQuery(
    `{}.user_id === ${user.id} && {}.status === true`,
  );
  if (!contract) return false;

  const apartment = Apartments()._find(contract.apartment_id);
  if (!apartment) return false;

  return JSON.stringify({
    ...userReturn,
    apartment: { ...DeletePropierties(apartment) },
  });
};

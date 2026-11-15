import Apartments from "../../model/Apartments";
import Contracts from "../../model/Contracts";
import Users from "../../model/Users";
import type {
  Apartment as ApartmentType,
  Contract,
  User,
} from "../../types/tables";
import DeletePropierties from "../../utils/DeletePropierties";

type returnDataProps = {
  apartment: ApartmentType;
  contract: Contract | { status: boolean };
  tenant?: User | null;
};

export const Apartment = (
  { id }: { id: string } = { id: "1J17mA9stq0AwEXNKDg01iQLu9etFOtnj" },
) => {
  const apartmentData = Apartments()._find(id);
  if (!apartmentData)
    return JSON.stringify({ error: "No existe apartamento con ese ID" });
  const apartment = DeletePropierties(apartmentData);

  let returnData: returnDataProps = {
    apartment,
    contract: { status: false },
  };

  const contractData = Contracts()._firstByQuery(
    `{}.apartment_id === '${id}' && {}.status === true`,
  );
  console.log("🚀 ~ Apartment ~ contractData:", contractData);

  if (contractData) {
    const tenantData = Users()._find(contractData.user_id);

    returnData = {
      ...returnData,
      contract: DeletePropierties(contractData),
      tenant: tenantData ? DeletePropierties(tenantData) : null,
    };
  }

  return JSON.stringify(returnData);
};

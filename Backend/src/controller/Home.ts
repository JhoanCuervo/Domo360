import Apartments from "../model/Apartments";

export const Home = () => {
  const { data: allApartments } = Apartments()._all();
  if (!allApartments.length) return false;
  // const dataApartments = allApartments.map((apartment) => {
  //   const { id, torre, number } = apartment;
  //   const img = `<img src="https://drive.google.com/thumbnail?id=${id}&sz=w1000" alt="${torre}-${number}">`;
  //   return { ...apartment, img };
  // });

  return allApartments;
};

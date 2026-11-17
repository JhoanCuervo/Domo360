import { FaWhatsapp } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";

const BtnAccions = ({ phone }: { phone: number }) => {
  const classBtn =
    "btn btn-domo btn-domo-outline tenant-action d-inline-flex align-items-center justify-content-center gap-2";

  const onClickWhatsapp = () => {
    const url = `https://wa.me/${phone}`;
    window.open(url, "_blank");
  };

  const onClickCall = () => (window.location.href = `tel:${phone}`);

  return (
    <div className="tenant-actions d-flex flex-wrap gap-2 mt-auto pt-4 ms-auto">
      <button type="button" className={classBtn} onClick={onClickCall}>
        <LuPhone size={16} strokeWidth={2} aria-hidden />
        Llamar
      </button>
      <button type="button" className={classBtn} onClick={onClickWhatsapp}>
        <FaWhatsapp size={16} strokeWidth={2} aria-hidden />
        WhatsApp
      </button>
    </div>
  );
};

export default BtnAccions;

import { useEffect, useState } from "react";
import Modal from "../Modal";

const InfoCard = (props) => {
  const {info, setInfoOpen} = props;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, [info])

  return (
    <>{info &&(
      <Modal isOpen={showModal} onClose={() => setInfoOpen('')}>
        <div className="m-5 outline-2 outline-gray-400 rounded-md">
        <div>
          <span className="cursor-pointer" onClick={() => setInfoOpen('')}>
            &times;
          </span>
        </div>
        <div>
          <h2 className="font-bold">Info-kortti</h2>
          <h2>{info.name}</h2>
          <p>Ruoan kuvaus lukee tässä </p>
          <p>Ainesosat: </p>
          <p>Allergeenit: </p>
        </div>
      </div>


      </Modal>


    )}
    </>
  );
};

export default InfoCard;

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
        <div>
        <div>
          <h2 className="font-bold">Info-kortti</h2>
          <h2>{info.name}</h2>
          <p>{info.description}</p>
          <p>{info.ingridiens}</p>
          <p>Allergeenit: </p>
        </div>
      </div>


      </Modal>


    )}
    </>
  );
};

export default InfoCard;

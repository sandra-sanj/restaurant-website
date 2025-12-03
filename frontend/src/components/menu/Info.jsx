const Info = (props) => {
  const {item, setSelectedItem} = props;

  return (
    <>
      {item && (
        <dialog open>
          <div>{item.name}</div>
          <div>{item.description}</div>

          <button onClick={() => setSelectedItem('')}>Close dialog</button>
        </dialog>
      )}
    </>
  );
};

export default Info;
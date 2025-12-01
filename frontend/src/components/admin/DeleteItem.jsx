const DeleteItem = ({onClose}) => {
  return (
    <>
      <div className="m-5 outline-2 outline-gray-400 rounded-md">
        <div>
          <span className="cursor-pointer" onClick={onClose}>
            &times;
          </span>
          <p className="font-bold">Poista tuote (header)</p>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Poista</th>
                <th>Tuote</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <button>x</button>
                </td>
                <td>Maissilastut</td>
              </tr>
              <tr>
                <td>
                  <button>x</button>
                </td>
                <td>Maissilastut</td>
              </tr>
              <tr>
                <td>
                  <button>x</button>
                </td>
                <td>Maissilastut</td>
              </tr>
              <tr>
                <td>
                  <button>x</button>
                </td>
                <td>Maissilastut</td>
              </tr>
              <tr>
                <td>
                  <button>x</button>
                </td>
                <td>Maissilastut</td>
              </tr>
              <tr>
                <td>
                  <button>x</button>
                </td>
                <td>Maissilastut</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DeleteItem;

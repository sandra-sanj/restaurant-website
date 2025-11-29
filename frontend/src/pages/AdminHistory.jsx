import HistoryRow from './../components/admin/HistoryRow';

const AdminHistory = () => {
  return (
    <>
      <h1>Tilaushistoria</h1>
      <div className="flex flex-row">
        <button>Tämän päivän tilaukset</button>
        <button>Kaikki tilaukset</button>
      </div>

      <p>Tähän populoidaan dataa tietokannasta</p>
      <br />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tuote</th>
            <th>Lisätiedot</th>
            <th>Määrä</th>
            <th>Tilauspäivä</th>
          </tr>
        </thead>

        <tbody>
          <HistoryRow />
          <HistoryRow />
          <HistoryRow />
        </tbody>
      </table>

      <br />
      <footer>
        <p>Tilauksia yhteensä 99</p>
      </footer>
    </>
  );
};

export default AdminHistory;

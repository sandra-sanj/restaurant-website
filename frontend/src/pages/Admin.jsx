import TableRowAdmin from './../components/admin/tableRow';
import EditMenu from './../components/admin/EditMenu';
import AddItem from '../components/admin/AddItem';
import EditItem from './../components/admin/EditItem';
import DeleteItem from '../components/admin/DeleteItem';
import {useState} from 'react';
import DeleteConfirmation from '../components/admin/DeleteConfirmation';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";

// TODO: lisää admin-navigaatio: button: historia/avoimet tilaukset, p: Ylläpito ja p: käyttäjänimi

const Admin = () => {
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [editItemOpen, setEditItemOpen] = useState(false);
  const [deleteItemOpen, setDeleteItemOpen] = useState(false);

  const handleButtonCloseClick = () => {
    console.log('handleButtonClick');
    setAddItemOpen(false);
    setEditItemOpen(false);
    setDeleteItemOpen(false);
  };

  const handleAddItemClick = () => {
    setAddItemOpen(true);
  };

  const handleEditItemClick = () => {
    setEditItemOpen(true);
  };

  const handleDeleteItemClick = () => {
    setDeleteItemOpen(true);
  };

  return (
    <>
    
      <h1>Admin</h1>

      <div className="flex flex-row">
        <h2>Avoimet tilaukset</h2>
        <p>5</p>
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
            <th>Tehty</th>
          </tr>
        </thead>

        <tbody>
          <TableRowAdmin />
          <TableRowAdmin />
          <TableRowAdmin />
        </tbody>
      </table>

      <br />
      <footer>
        <EditMenu addItemClick={handleAddItemClick} editItemClick={handleEditItemClick} deleteItemClick={handleDeleteItemClick}/>
      </footer>

      <div></div>

      {addItemOpen && <AddItem onClose={handleButtonCloseClick} />}

      {editItemOpen && <EditItem onClose={handleButtonCloseClick} />}

      {deleteItemOpen && <DeleteItem onClose={handleButtonCloseClick} />}

      <DeleteConfirmation onClose={handleButtonCloseClick} />
    </>
  );
};

export default Admin;

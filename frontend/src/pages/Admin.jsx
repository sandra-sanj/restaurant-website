import TableRowAdmin from './../components/admin/tableRow';
import EditMenu from './../components/admin/EditMenu';
import AddItem from '../components/admin/AddItem';
import EditItem from './../components/admin/EditItem';
import DeleteItem from '../components/admin/DeleteItem';
import {useState} from 'react';
import DeleteConfirmation from '../components/admin/DeleteConfirmation';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table';

// TODO: lisää admin-navigaatio: button: historia/avoimet tilaukset, p: Ylläpito ja p: käyttäjänimi

const Admin = () => {
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [editItemOpen, setEditItemOpen] = useState(false);
  const [deleteItemOpen, setDeleteItemOpen] = useState(false);

  const handleButtonCloseClick = () => {
    //console.log('handleButtonClick');
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

  // mock-data // TODO: korvaa tietokannan tilauksilla (käytä order_items = tuotteet tilausten sisällä)
  const orders = [
    {
      id: 1,
      product: 'Tuote A',
      details: 'Lisätieto 1',
      quantity: 3,
    },
    {
      id: 2,
      product: 'Tuote B',
      details: 'Lisätieto 2',
      quantity: 5,
    },
    {
      id: 3,
      product: 'Tuote C',
      details: 'Lisätieto 3',
      quantity: 2,
    },
  ];

  return (
    <>
      <h1>Admin</h1>

      <div className="flex flex-row">
        <h2>Avoimet tilaukset:</h2>
        <p>{orders.length}</p>
      </div>
      <p>Tähän populoidaan dataa tietokannasta</p>
      <br />

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Id</TableHead>
            <TableHead className="text-center">Tuote</TableHead>
            <TableHead className="text-center">Lisätiedot</TableHead>
            <TableHead className="text-center">Määrä</TableHead>
            <TableHead className="text-center">Tehty</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.details}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell><input type='checkbox' name='done'></input></TableCell>

            </TableRow> 
          ))}
        </TableBody>
      </Table>

      <footer className="mt-4 ">
        <EditMenu
          addItemClick={handleAddItemClick}
          editItemClick={handleEditItemClick}
          deleteItemClick={handleDeleteItemClick}
          
        />
      </footer>


      {addItemOpen && <AddItem onClose={handleButtonCloseClick} />}

      {editItemOpen && <EditItem onClose={handleButtonCloseClick} />}

      {deleteItemOpen && <DeleteItem onClose={handleButtonCloseClick} />}

      <DeleteConfirmation onClose={handleButtonCloseClick} />
    </>
  );
};

export default Admin;

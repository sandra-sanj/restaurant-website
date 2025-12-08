import EditMenu from './../components/admin/EditMenu';
import AddItem from '../components/admin/AddItem';
import EditItem from './../components/admin/EditItem';
import DeleteItem from '../components/admin/DeleteItem';
import {useState} from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table';
import {useOrders} from '../hooks/orderHook';


const Admin = () => {
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [editItemOpen, setEditItemOpen] = useState(false);
  const [deleteItemOpen, setDeleteItemOpen] = useState(false);

  const {orders, loading, error} = useOrders();

  const handleButtonCloseClick = () => {
    setAddItemOpen(false);
    setEditItemOpen(false);
    setDeleteItemOpen(false);
  };

  const handleAddItemClick = () => {
    setAddItemOpen(true);
    setEditItemOpen(false);
    setDeleteItemOpen(false);
  };

  const handleEditItemClick = () => {
    setAddItemOpen(false);
    setEditItemOpen(true);
    setDeleteItemOpen(false);
  };

  const handleDeleteItemClick = () => {
    setAddItemOpen(false);
    setEditItemOpen(false);
    setDeleteItemOpen(true);
  };

  const openOrders = orders.filter((order) => order.status === 'pending');
  if (loading) return <p>Ladataan tilauksia...</p>;
  if (error) return <p>{error}</p>;

  // Get open orders id's to calculate total open orders count
  const openOrderIds = [];
  openOrders.forEach((item) => {
    if (!openOrderIds.includes(item.orderId)) {
      openOrderIds.push(item.orderId);
    }
  });

  return (
    <>
      <h1 className="m-3">Ylläpito</h1>
      <div className="flex flex-row mt-5">
        <h2 className="pr-1">Avoimet tilaukset:</h2>
        <p className="">{openOrderIds.length}</p>
      </div>

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Tilauksen id</TableHead>
            <TableHead className="text-center">Tuote</TableHead>
            <TableHead className="text-center">Lisätiedot</TableHead>
            <TableHead className="text-center">Määrä</TableHead>
            <TableHead className="text-center">Tehty</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {openOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.details}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>
                <input type="checkbox" name="done"></input>
              </TableCell>
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
    </>
  );
};

export default Admin;

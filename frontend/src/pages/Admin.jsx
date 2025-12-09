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

// TODO: napit/kaikki keskelle, hover taulukon riveihin
// TODO: vuorottelevat värit taulukkoon id:n mukaan?
// TODO: avaa delete confirmation taulukon viereen, ei ylös

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
      {/* Fixed min height to push footer to bottom */}
      <div className="w-full max-w-full min-h-[calc(100vh-64px-208px)] flex flex-col items-center">
        <h1 className="mt-6">Ylläpito</h1>
        <div className="flex flex-row mt-5 items-center justify-center gap-2">
          <h2 className="">Avoimet tilaukset:</h2>
          <p className="font-bold py-2">{openOrderIds.length}</p>
        </div>

        <div className="w-full flex justify-center">
          <Table className="mt-4 mb-8 max-w-[80vw] mx-auto border border-stone-500">
            <TableHeader className="bg-[#982A2A] text-white">
              <TableRow>
                <TableHead className="text-center">Tilauksen id</TableHead>
                <TableHead className="text-center">Tuote</TableHead>
                <TableHead className="text-center">Lisätiedot</TableHead>
                <TableHead className="text-center">Määrä</TableHead>
                <TableHead className="text-center">Tehty</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {openOrders.map((order) => {
                const isEven = order.orderId % 2 === 0;

                return (
                <TableRow key={order.id}
                  className={isEven ? 'bg-[#FFFFFF]' : 'bg-[#982a2a24]'
                }>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.details}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <input type="checkbox" name="done"></input>
                  </TableCell>
                </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <footer className="flex flex-col items-center justify-center bg-[#FFFFFF] w-full h-52 border-t bottom-0 sticky">
        <div className="w-full mb-6 text-3xl font-bold">
          <h2>Muokkaa ruokalistaa</h2>
        </div>

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

import { useState } from 'react';
import HistoryRow from './../components/admin/HistoryRow';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';

const AdminHistory = () => {
  const [filter, setFilter] = useState('today');

  const handleFilterClick = (type) => {
     setFilter(type);
  };

  // mock-data
  const orders = [
    { id: 1, product: 'Tuote A', details: 'Lisätieto 1', quantity: 3, date: '2025-12-06' },
    { id: 2, product: 'Tuote B', details: 'Lisätieto 2', quantity: 5, date: '2025-12-05' },
    { id: 3, product: 'Tuote C', details: 'Lisätieto 3', quantity: 2, date: '2025-12-04' },
    { id: 4, product: 'Tuote C', details: 'Lisätieto 3', quantity: 2, date: '2025-12-04' },
  ];

  return (
    <>
      <h1>Tilaushistoria</h1>

      <div className="flex flex-row gap-2 mb-4">
        <button className={`px-3 py-1 rounded border ${filter === "today" ? "bg-[#2A4B11]! text-white" : "bg-white text-black"}`} onClick={() => handleFilterClick("today")}>Tämän päivän tilaukset</button>
        <button className={`px-3 py-1 rounded border ${filter === "all" ? "bg-[#2A4B11]! text-white" : "bg-white text-black"}`} onClick={() => handleFilterClick("all")}>Kaikki tilaukset</button>
      </div>

      <p>Tähän populoidaan dataa tietokannasta</p>
      <br />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Id</TableHead>
            <TableHead className="text-center">Tuote</TableHead>
            <TableHead className="text-center">Lisätiedot</TableHead>
            <TableHead className="text-center">Määrä</TableHead>
            <TableHead className="text-center">Tilauspäivä</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.details}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <br />
      <footer>
        <p>Tilauksia yhteensä {orders.length}</p>
      </footer>
    </>
  );
};

export default AdminHistory;

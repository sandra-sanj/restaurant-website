function Cart() {
  // TODO: lisää nav-bar: linkki menuun, h1 Ostoskori

  return (
    <>
      <div className="m-5 outline-2 outline-gray-400 rounded-md">
        <div>
          <h1>Ostoskori</h1>
        </div>
        <div>
          <h2>Toimitustapa</h2>
          <button>Toimitus</button>
          <button>Nouto</button>
        </div>
        <div>
          <h2>Tuotteet</h2>
          <div>
            <p>Tähän kuva, tuotteen nimi, hinta €</p>
            <button>x</button>
            <button>- 1 +</button>
          </div>
          <div>
            <p>Tähän kuva, tuotteen nimi, hinta €</p>
            <button>x</button>
            <button>- 1 +</button>
          </div>
        </div>
        <div>
          <p>Subtotal 30,80 €</p>
          <p>Toimitusmaksu 4,90 €</p>
          <p>Yhteensä xx,xx €</p>
        </div>
        <div>
          <button>Kassalle</button>
        </div>
      </div>
    </>
  );
}
export default Cart;

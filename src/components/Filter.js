import { useEffect } from "react";

function Filter({ activeBrand, setActiveBrand, setFiltered, products }) {
  useEffect(() => {
    if (activeBrand.checked) {
      setFiltered(products);
      return;
    } else {
    }
    const filtered = products.filter((products) =>
      products.brand.includes(activeBrand)
    );

    setFiltered(filtered);
  }, [activeBrand, products, setFiltered]);

  return (
    <div className="filter-container">
      <label for="Samsung">Samsung</label>
      <input
        type="checkbox"
        value="Samsung"
        onClick={() => setActiveBrand("Samsung")}
      />
      <label for="Apple">Apple</label>
      <input
        type="checkbox"
        value="Apple"
        onClick={() => setActiveBrand("Apple")}
      />
    </div>
  );
}

export default Filter;

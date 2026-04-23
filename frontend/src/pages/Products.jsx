import { useEffect, useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../features/productSlice";
import { getProducts, deleteProduct, updateProduct } from "../services/productService";
import { createProduct } from "../services/productService";

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const [form, setForm] = useState({ name: "", price: "" });
    const [editId, setEditId] = useState(null);
    const handleAdd = async () => {
    await createProduct(form);
    setForm({ name: "", price: "" });
    loadProducts();
    }; 

    const loadProducts = async () => {
        const res = await getProducts();
        dispatch(setProducts(res.data));
    };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };
  const handleEdit = (p) => {
  setForm({ name: p.name, price: p.price });
  setEditId(p.id);
};

const handleUpdate = async () => {
  await updateProduct(editId, form);
  setEditId(null);
  setForm({ name: "", price: "" });
  loadProducts();
};

  return (
    <div>
      <h2>Products</h2>
        <input
  placeholder="Name"
  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/>

<input
  placeholder="Price"
  value={form.price}
  onChange={(e) => setForm({ ...form, price: e.target.value })}
/>

 <button onClick={editId ? handleUpdate : handleAdd}>
                {editId ? "Update" : "Add"}
                </button>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>               
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
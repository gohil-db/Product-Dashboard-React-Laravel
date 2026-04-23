import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { useState, useEffect } from "react";
import { getCategories } from "../services/categoryService";
import { setCategories } from "../features/categorySlice";
import { getProducts, deleteProduct, updateProduct } from "../services/productService";
import { createProduct } from "../services/productService";
import { setProducts } from "../features/productSlice";
const Dashboard = () => {
  const dispatch = useDispatch();
  const categoriesDynamic = useSelector((state) => state.category.categories);

  // const categories = ["Electronics", "Accessories", "Footwear", "Appliances", "Sports", "Clothing", "Books", "Home"];

    const loadProducts = async () => {
      const res = await getProducts();    
        dispatch(setProducts(res.data));    
    };

    const loadCategory = async () => {
        const res = await getCategories();
        dispatch(setCategories(res.data));        
    };

  useEffect(() => {
    loadCategory();
    loadProducts()
  }, []);



  const initialProducts = [
    { id: 1, name: "Wireless Headphones", category_id: "Electronics", price: 129.99, stock_qty: 45, status: "Active" },
    { id: 2, name: "Leather Wallet", category_id: "Accessories", price: 49.99, stock_qty: 120, status: "Active" },
    { id: 3, name: "Running Shoes", category_id: "Footwear", price: 89.99, stock_qty: 30, status: "Low Stock" },
    { id: 4, name: "Coffee Maker", category_id: "Appliances", price: 199.99, stock_qty: 0, status: "Out of Stock" },
    { id: 5, name: "Yoga Mat", category_id: "Sports", price: 34.99, stock_qty: 75, status: "Active" },
  ];

  const EMPTY_FORM = { name: "", category_id: "", price: "", stock_qty: "", status: "Active" };

  const user = { name: "Dharmendra B", email: "gohildharmendrab@gamil.com", initials: "DB", role: "Super Admin" };
const products = useSelector((state) => state.product.products);

  const [modal, setModal] = useState(null); // null | "add" | product obj
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [notifCount] = useState(3);

  const totalProducts = products.length;
  const totalValue = products.reduce((s, p) => s + p.price * p.stock_qty, 0);
  const avgPrice = products.length ? products.reduce((s, p) => s + p.price, 0) / products.length : 0;
  const outOfStock = products.filter(p => p.stock_qty === 0).length;
    const handleLogout = () => {
      dispatch(logout())
    setShowLogoutModal(false);
    setLoggedOut(true);
  };



  const handleSave = async (data) => {
    if (data.id) {      
      const payload = {
        name: data.name,
        price: data.price,
        category_id: data.category_id,
        stock_qty: data.stock_qty,
        status: data.status,
      };
      await updateProduct(data.id, payload);   
    } else {     
      await createProduct(data);
    }
    setModal(null);
    await loadProducts(); 
  };

  const handleDelete = async (id) => {
    // setProducts(ps => ps.filter(p => p.id !== id));
    await deleteProduct(id);
    setDeleteId(null);
    await loadProducts(); 
  };

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "All" || p.category?.name === filterCat;
    return matchSearch && matchCat;
  });

  // const allCats = ["All", ...Array.from(new Set(products.map(p => p.category_id)))];
  const allCats = ["All", ...Array.from(new Set(categoriesDynamic.map(c => c.name)))];

  const statusColor = { "Active": "#22c55e", "Low Stock": "#f59e0b", "Out of Stock": "#ef4444" };
  const statusBg = { "Active": "#f0fdf4", "Low Stock": "#fffbeb", "Out of Stock": "#fef2f2" };

   if (loggedOut) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #f5f0e8; font-family: 'DM Sans', sans-serif; }
          @keyframes fadeUp { from { opacity:0; transform:translateY(20px);} to { opacity:1; transform:none;} }
        `}</style>
        <div style={{ minHeight: "100vh", background: "#f5f0e8", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
          <div style={{ textAlign: "center", animation: "fadeUp 0.4s ease" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>👋</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#1a1612", marginBottom: 8 }}>You've been logged out</h2>
            <p style={{ color: "#9e9589", fontSize: 15, marginBottom: 28 }}>Thanks for using AdminPanel. See you next time!</p>
            <button onClick={() => setLoggedOut(false)} style={{
              padding: "12px 32px", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #c9a96e, #a07850)", color: "#fff",
              fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 6px 24px rgba(160,120,80,0.35)",
            }}>Sign back in</button>
          </div>
        </div>
      </>
    );
  }

  function Modal({ product, onSave, onClose }) {
    const [form, setForm] = useState(product || EMPTY_FORM);
    const isEdit = !!product?.id;

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = () => {
      if (!form.name || !form.category_id || !form.price) return;
      onSave({ ...form, price: parseFloat(form.price), stock_qty: parseInt(form.stock_qty) || 0 });
    };

    return (
      <div style={{
        position: "fixed", inset: 0, background: "rgba(26,22,18,0.55)", zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(4px)",
      }} onClick={onClose}>
        <div style={{
          background: "#faf8f5", borderRadius: 20, padding: "36px 40px", width: 480, maxWidth: "95vw",
          boxShadow: "0 32px 80px rgba(0,0,0,0.18)", border: "1.5px solid #e8e3dc",
          animation: "slideUp 0.22s cubic-bezier(.22,1,.36,1)",
        }} onClick={e => e.stopPropagation()}>
          <h2 style={{ margin: "0 0 24px", fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#1a1612" }}>
            {isEdit ? "Edit Product" : "Add New Product"}
          </h2>

          {[
            { label: "Product Name", name: "name", type: "text", placeholder: "e.g. Wireless Earbuds" },
            { label: "Price (₹)", name: "price", type: "number", placeholder: "0.00" },
            { label: "Stock Quantity", name: "stock_qty", type: "number", placeholder: "0" },
          ].map(f => (
            <div key={f.name} style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9e9589", marginBottom: 6 }}>{f.label}</label>
              <input
                name={f.name} type={f.type} placeholder={f.placeholder}
                value={form[f.name]} onChange={handleChange}
                style={{
                  width: "100%", padding: "10px 14px", border: "1.5px solid #e8e3dc",
                  borderRadius: 10, fontSize: 14, background: "#fff", color: "#1a1612",
                  outline: "none", boxSizing: "border-box",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "border-color 0.15s",
                }}
                onFocus={e => e.target.style.borderColor = "#c9a96e"}
                onBlur={e => e.target.style.borderColor = "#e8e3dc"}
              />
            </div>
          ))}

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9e9589", marginBottom: 6 }}>Category</label>
            <select name="category_id" value={form.category_id} onChange={handleChange}
              style={{
                width: "100%", padding: "10px 14px", border: "1.5px solid #e8e3dc",
                borderRadius: 10, fontSize: 14, background: "#fff", color: "#1a1612",
                outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif",
                appearance: "none",
              }}>
              <option value="">Select category</option>
              {/* {categories.map(c => <option key={c} value={c}>{c}</option>)} */}
              {categoriesDynamic.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9e9589", marginBottom: 6 }}>Status</label>
            <div style={{ display: "flex", gap: 10 }}>
              {["Active", "Low Stock", "Out of Stock"].map(s => (
                <button key={s} onClick={() => setForm(f => ({ ...f, status: s }))}
                  style={{
                    flex: 1, padding: "8px 0", borderRadius: 8, fontSize: 12, fontWeight: 600,
                    border: `1.5px solid ${form.status === s ? "#c9a96e" : "#e8e3dc"}`,
                    background: form.status === s ? "#c9a96e" : "#fff",
                    color: form.status === s ? "#fff" : "#9e9589",
                    cursor: "pointer", transition: "all 0.15s",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={onClose} style={{
              flex: 1, padding: "12px 0", borderRadius: 10, border: "1.5px solid #e8e3dc",
              background: "#fff", color: "#9e9589", fontSize: 14, fontWeight: 600, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}>Cancel</button>
            <button onClick={handleSubmit} style={{
              flex: 2, padding: "12px 0", borderRadius: 10, border: "none",
              background: "linear-gradient(135deg, #c9a96e, #a07850)", color: "#fff",
              fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 4px 16px rgba(160,120,80,0.3)",
            }}>
              {isEdit ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  function StatCard({ label, value, sub, accent }) {
    return (
      <div style={{
        background: "#fff",
        border: "1.5px solid #e8e3dc",
        borderRadius: 16,
        padding: "24px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: 80, height: 80,
          background: accent + "18",
          borderRadius: "0 16px 0 80px",
        }} />
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9e9589" }}>{label}</span>
        <span style={{ fontSize: 32, fontWeight: 800, color: "#1a1612", fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}>{value}</span>
        {sub && <span style={{ fontSize: 12, color: accent, fontWeight: 600 }}>{sub}</span>}
      </div>
    );
  }

  return (
    <>
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f5f0e8; font-family: 'DM Sans', sans-serif; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes dropDown {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }
        .product-row { animation: fadeIn 0.3s ease both; }
        .product-row:hover { background: #faf8f5 !important; }
        .action-btn:hover { opacity: 0.8; transform: scale(1.08); }
        .nav-btn:hover { background: #f5f0e8 !important; }
        .logout-btn:hover { background: #fff1f2 !important; color: #ef4444 !important; border-color: #fecdd3 !important; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d4c9b8; border-radius: 10px; }
      `}</style>

      {/* ── STICKY HEADER ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1.5px solid #e8e3dc",
        boxShadow: "0 2px 16px rgba(26,22,18,0.06)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>

          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #c9a96e, #a07850)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 18, color: "#fff",
              boxShadow: "0 4px 12px rgba(160,120,80,0.3)",
            }}>A</div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, color: "#1a1612", letterSpacing: "-0.01em" }}>AdminPanel</span>
          </div>

          {/* Nav links */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, justifyContent: "center" }}>
            {[
              { label: "Dashboard", icon: "⊞", active: true },
              { label: "Products", icon: "◈", active: false },
              { label: "Orders", icon: "◎", active: false },
              { label: "Settings", icon: "⚙", active: false },
            ].map(item => (
              <button key={item.label} className="nav-btn" style={{
                display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8,
                border: "none", background: item.active ? "#faf3e8" : "transparent",
                color: item.active ? "#a07850" : "#9e9589", fontSize: 13, fontWeight: item.active ? 700 : 500,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
              }}>
                <span style={{ fontSize: 14 }}>{item.icon}</span>
                <span style={{ display: window.innerWidth < 600 ? "none" : "inline" }}>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>

            {/* Notification bell */}
            <button className="nav-btn" style={{
              position: "relative", width: 38, height: 38, borderRadius: 10,
              border: "1.5px solid #e8e3dc", background: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 16, transition: "all 0.15s",
            }}>
              🔔
              {notifCount > 0 && (
                <span style={{
                  position: "absolute", top: 6, right: 6,
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#ef4444", border: "2px solid #fff",
                }} />
              )}
            </button>

            {/* User avatar + dropdown */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowDropdown(v => !v)} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "5px 10px 5px 5px",
                borderRadius: 10, border: "1.5px solid #e8e3dc", background: "#fff",
                cursor: "pointer", transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#c9a96e"}
                onMouseLeave={e => { if (!showDropdown) e.currentTarget.style.borderColor = "#e8e3dc"; }}
              >
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: "linear-gradient(135deg, #c9a96e, #a07850)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 12, color: "#fff", letterSpacing: "0.03em",
                }}>{user.initials}</div>
                <div style={{ textAlign: "left", display: window.innerWidth < 480 ? "none" : "block" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1612", lineHeight: 1.2 }}>{user.name}</div>
                  <div style={{ fontSize: 10, color: "#9e9589", fontWeight: 500 }}>{user.role}</div>
                </div>
                <span style={{ fontSize: 10, color: "#c5bdb4", marginLeft: 2 }}>▾</span>
              </button>

              {/* Dropdown */}
              {showDropdown && (
                <div style={{
                  position: "absolute", top: "calc(100% + 10px)", right: 0,
                  width: 220, background: "#fff", borderRadius: 14,
                  border: "1.5px solid #e8e3dc", boxShadow: "0 16px 48px rgba(26,22,18,0.12)",
                  overflow: "hidden", animation: "dropDown 0.18s cubic-bezier(.22,1,.36,1)",
                  zIndex: 200,
                }} onMouseLeave={() => setShowDropdown(false)}>

                  {/* User info */}
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid #f0ece6" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1612" }}>{user.name}</div>
                    <div style={{ fontSize: 11, color: "#9e9589", marginTop: 2 }}>{user.email}</div>
                    <span style={{
                      display: "inline-block", marginTop: 6, padding: "2px 8px",
                      background: "#faf3e8", borderRadius: 100, fontSize: 10,
                      fontWeight: 700, color: "#a07850", letterSpacing: "0.06em",
                    }}>{user.role}</span>
                  </div>

                  {/* Menu items */}
                  {[
                    { icon: "👤", label: "My Profile" },
                    { icon: "⚙️", label: "Account Settings" },
                    { icon: "🔔", label: "Notifications", badge: notifCount },
                    { icon: "🌙", label: "Dark Mode" },
                  ].map(item => (
                    <button key={item.label} className="nav-btn" style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 16px", background: "transparent", border: "none",
                      fontSize: 13, color: "#4a4540", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500, transition: "background 0.12s", textAlign: "left",
                    }}>
                      <span>{item.icon}</span>
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {item.badge && (
                        <span style={{ background: "#ef4444", color: "#fff", borderRadius: 100, fontSize: 10, fontWeight: 700, padding: "1px 6px" }}>{item.badge}</span>
                      )}
                    </button>
                  ))}

                  <div style={{ height: 1, background: "#f0ece6", margin: "4px 0" }} />

                  {/* Logout */}
                  <button className="logout-btn" onClick={() => { setShowDropdown(false); setShowLogoutModal(true); }} style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 16px", margin: "4px 0", background: "transparent", border: "none",
                    fontSize: 13, color: "#9e9589", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600, transition: "all 0.12s", textAlign: "left", borderRadius: 0,
                  }}>
                    <span>🚪</span> Sign out
                  </button>
                </div>
              )}
            </div>

            {/* Logout button (always visible) */}
            <button className="logout-btn" onClick={() => setShowLogoutModal(true)} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 16px", borderRadius: 10,
              border: "1.5px solid #e8e3dc", background: "#fff",
              color: "#7a6e64", fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div style={{ minHeight: "calc(100vh - 64px)", background: "#f5f0e8", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Page title + Add button */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 4 }}>
                ◆ Admin Panel
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 800, color: "#1a1612", lineHeight: 1 }}>
                Product Dashboard
              </h1>
            </div>
            <button onClick={() => setModal("add")} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "12px 24px", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #c9a96e, #a07850)",
              color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 6px 24px rgba(160,120,80,0.35)",
              fontFamily: "'DM Sans', sans-serif",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(160,120,80,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(160,120,80,0.35)"; }}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add Product
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
            <StatCard label="Total Products" value={totalProducts} sub={`${outOfStock} out of stock`} accent="#c9a96e" />
            <StatCard label="Inventory Value" value={`₹${totalValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`} sub="Total stock worth" accent="#22c55e" />
            <StatCard label="Average Price" value={`₹${avgPrice.toFixed(2)}`} sub="Across all products" accent="#6366f1" />
            <StatCard label="Categories" value={allCats.length - 1} sub="Distinct categories" accent="#f59e0b" />
          </div>

          {/* Filters */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e8e3dc", padding: "20px 24px", marginBottom: 16, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#c9a96e", fontSize: 15 }}>⌕</span>
              <input
                placeholder="Search products…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%", padding: "9px 12px 9px 34px", borderRadius: 10,
                  border: "1.5px solid #e8e3dc", fontSize: 14, background: "#faf8f5",
                  color: "#1a1612", outline: "none", fontFamily: "'DM Sans', sans-serif",
                }}
                onFocus={e => e.target.style.borderColor = "#c9a96e"}
                onBlur={e => e.target.style.borderColor = "#e8e3dc"}
              />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {allCats.map(c => (
                <button key={c} onClick={() => setFilterCat(c)} style={{
                  padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${filterCat === c ? "#c9a96e" : "#e8e3dc"}`,
                  background: filterCat === c ? "#c9a96e" : "#faf8f5",
                  color: filterCat === c ? "#fff" : "#9e9589",
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
                }}>{c}</button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e8e3dc", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
                <thead>
                  <tr style={{ background: "#faf8f5", borderBottom: "1.5px solid #e8e3dc" }}>
                    {["#", "Product", "Category", "Price", "Stock", "Status", "Actions"].map(h => (
                      <th key={h} style={{
                        padding: "14px 20px", textAlign: "left", fontSize: 10,
                        fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9e9589",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: "48px", textAlign: "center", color: "#c5bdb4", fontSize: 15 }}>
                        No products found.
                      </td>
                    </tr>
                  ) : filtered.map((p, i) => (
                    <tr key={p.id} className="product-row"
                      style={{ borderBottom: "1px solid #f0ece6", transition: "background 0.12s", animationDelay: `${i * 0.04}s` }}>
                      <td style={{ padding: "16px 20px", color: "#c5bdb4", fontSize: 13, fontWeight: 600 }}>
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ fontWeight: 700, color: "#1a1612", fontSize: 14 }}>{p.name}</div>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{
                          padding: "4px 10px", borderRadius: 6, background: "#f5f0e8",
                          fontSize: 12, fontWeight: 600, color: "#7a6e64",
                        }}>{p.category?.name}</span>
                      </td>
                      <td style={{ padding: "16px 20px", fontWeight: 700, color: "#1a1612", fontSize: 14 }}>
                        ₹{p.price.toFixed(2)}
                      </td>
                      <td style={{ padding: "16px 20px", color: p.stock_qty === 0 ? "#ef4444" : "#1a1612", fontWeight: 600, fontSize: 14 }}>
                        {p.stock_qty}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{
                          padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700,
                          background: statusBg[p.status], color: statusColor[p.status],
                        }}>● {p.status}</span>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button className="action-btn" onClick={() => setModal(p)} style={{
                            padding: "6px 14px", borderRadius: 8, border: "1.5px solid #e8e3dc",
                            background: "#faf8f5", color: "#7a6e64", fontSize: 12, fontWeight: 600,
                            cursor: "pointer", transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif",
                          }}>Edit</button>
                          <button className="action-btn" onClick={() => setDeleteId(p.id)} style={{
                            padding: "6px 14px", borderRadius: 8, border: "1.5px solid #fecdd3",
                            background: "#fff1f2", color: "#ef4444", fontSize: 12, fontWeight: 600,
                            cursor: "pointer", transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif",
                          }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: "14px 24px", background: "#faf8f5", borderTop: "1px solid #f0ece6", fontSize: 12, color: "#9e9589", fontWeight: 600 }}>
              Showing {filtered.length} of {products.length} products
            </div>
          </div>
        </div>
      </div>
   

      {/* Add/Edit Modal */}
      {modal && (
        <Modal
          product={modal === "add" ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(26,22,18,0.55)", zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)",
        }} onClick={() => setDeleteId(null)}>
          <div style={{
            background: "#faf8f5", borderRadius: 20, padding: "36px 40px", width: 380,
            boxShadow: "0 32px 80px rgba(0,0,0,0.18)", border: "1.5px solid #e8e3dc",
            animation: "slideUp 0.22s cubic-bezier(.22,1,.36,1)", textAlign: "center",
          }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🗑️</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#1a1612", marginBottom: 10 }}>Delete Product?</h3>
            <p style={{ color: "#9e9589", fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>
              This action cannot be undone. The product will be permanently removed.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setDeleteId(null)} style={{
                flex: 1, padding: "12px 0", borderRadius: 10, border: "1.5px solid #e8e3dc",
                background: "#fff", color: "#9e9589", fontSize: 14, fontWeight: 600,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              }}>Cancel</button>
              <button onClick={() => handleDelete(deleteId)} style={{
                flex: 1, padding: "12px 0", borderRadius: 10, border: "none",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 4px 16px rgba(239,68,68,0.3)",
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}
      {/* Logout Confirm Modal */}
      {showLogoutModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(26,22,18,0.55)", zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)",
        }} onClick={() => setShowLogoutModal(false)}>
          <div style={{
            background: "#faf8f5", borderRadius: 20, padding: "40px", width: 400, maxWidth: "92vw",
            boxShadow: "0 32px 80px rgba(0,0,0,0.18)", border: "1.5px solid #e8e3dc",
            animation: "slideUp 0.22s cubic-bezier(.22,1,.36,1)", textAlign: "center",
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              width: 64, height: 64, borderRadius: 16, background: "#fff1f2", border: "1.5px solid #fecdd3",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 28,
            }}>🚪</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#1a1612", marginBottom: 8 }}>Sign out?</h3>
            <p style={{ color: "#9e9589", fontSize: 14, marginBottom: 8, lineHeight: 1.6 }}>
              You're signed in as
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "#fff", border: "1.5px solid #e8e3dc", borderRadius: 10, marginBottom: 28 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #c9a96e, #a07850)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>{user.initials}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1612" }}>{user.name}</div>
                <div style={{ fontSize: 11, color: "#9e9589" }}>{user.email}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setShowLogoutModal(false)} style={{
                flex: 1, padding: "12px 0", borderRadius: 10, border: "1.5px solid #e8e3dc",
                background: "#fff", color: "#9e9589", fontSize: 14, fontWeight: 600,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              }}>Stay</button>
              <button onClick={handleLogout} style={{
                flex: 1, padding: "12px 0", borderRadius: 10, border: "none",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 16px rgba(239,68,68,0.3)",
              }}>Yes, sign out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
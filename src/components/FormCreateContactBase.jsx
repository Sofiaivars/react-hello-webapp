import { useEffect, useState } from "react";
// import { useGlobalReducer } from "../../hooks/useGlobalReducer";
import { useParams, useNavigate } from "react-router-dom";
import { createContact } from "../service/service.api";

export const FormCreateContactBase = () => {
  // const { store } = useGlobalReducer();
  const { contactId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchContact = async () => {
      if (contactId) {
        setContactCode(contactInfo[0]?.id);
        setForm({
          slug: "",
        });
      }
      setLoading(false);
    };
    fetchContact();
  }, [contactId]);

  const handleChange = (e) => {
    setForm({
      ...form.slug,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createContact(form.slug);
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <div className="mb-3">
        <label className="form-label"> Slug</label>
        <input
          type="text"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="slug"
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Crear
      </button>
    </form>
  );
};

export default FormCreateContactBase;

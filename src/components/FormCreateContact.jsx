import { useEffect, useState } from "react";
// import { useGlobalReducer } from "../../hooks/useGlobalReducer";
import { useParams, useNavigate } from "react-router-dom";
import { getContactInfo, updateContact } from "../service/service.api";

export const FormCreateContact = () => {
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
  const [contactCode, setContactCode] = useState(null);
  useEffect(() => {
    const fetchContact = async () => {
      if (contactId) {
        const contactInfo = await getContactInfo(contactId);
        setContactCode(contactInfo[0]?.id);
        setForm({
          name: contactInfo[0]?.name || "",
          email: contactInfo[0]?.email || "",
          phone: contactInfo[0]?.phone || "",
          address: contactInfo[0]?.address || "",
        });
      }
      setLoading(false);
    };
    fetchContact();
  }, [contactId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateContact(form, contactId, contactCode);
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <div className="mb-3">
        <label className="form-label"> Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Edit Contact
      </button>
    </form>
  );
};

export default FormCreateContact;

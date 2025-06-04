import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getListAgendas, deleteAgendaContact } from "../service/service.api";

export const ContactList = () => {
  const { store, dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [dispatch]);
  const fetchData = async () => {
    await getListAgendas(store, dispatch);
    setLoading(false);
  };
  const deleteContact = async (slug) => {
    setLoading(true);
    await deleteAgendaContact(slug);
    setLoading(false);
    fetchData();
  };

  if (loading) return <p className="text-center mt-5">Cargando contactos...</p>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Contact List</h1>
        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = "/add-contact-at-list/")}
        >
          + Add contact
        </button>
      </div>

      <div className="list-group">
        {store.contacts.map((contact) => (
          <li key={contact.id} className="list-group-item fl">
            <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <p>{contact.id}</p>
              <p className="mb-1">{contact.slug}</p>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() =>
                    (window.location.href = "/edit/" + contact.slug)
                  }
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteContact(contact.slug)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ContactList;

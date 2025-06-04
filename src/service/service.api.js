const API_URL = "https://playground.4geeks.com/contact";

async function createContact(contact) {
  return await fetch(`${API_URL}/agendas/${contact}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  }).then((response) => response.json());
}
async function addInfoContact(form, slug) {
  return await fetch(`${API_URL}/agendas/${slug}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then((response) => response.json());
}
async function getContactInfo(slug) {
  return await fetch(`${API_URL}/agendas/${slug}/contacts`)
    .then((response) => response.json())
    .then((data) => data.contacts);
}

async function updateContact(form, contactId, contactCode) {
  return await fetch(
    `${API_URL}/agendas/${contactId}/contacts/${contactCode}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }
  ).then((response) => response.json());
}

async function getListAgendas(store, dispatch) {
  try {
    const response = await fetch(`${API_URL}/agendas`);
    const { agendas } = await response.json();
    store.contacts = agendas;
    {
      dispatch;
    }
    ({ type: "SET_CONTACTS", payload: agendas });
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
  return store.contacts;
}

async function deleteAgendaContact(slug) {
  await fetch(`${API_URL}/agendas/${slug}`, { method: "DELETE" });
}

export {
  createContact,
  deleteAgendaContact,
  updateContact,
  getListAgendas,
  addInfoContact,
  getContactInfo,
};

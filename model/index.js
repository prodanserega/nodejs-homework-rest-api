const crypto = require("crypto");

const DB = require("./db");
const db = new DB("contacts.json");

const listContacts = async () => {
  return await db.read();
};

const getContactById = async (id) => {
  const contacts = await db.read();
  const [contact] = contacts.filter((contact) => contact.id === id);
  return contact;
};

const removeContact = async (id) => {
  const contacts = await db.read();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    const [result] = contacts.findIndex((contact) => contact.id === id);
    await db.write(contacts);
    return result;
  }
  return null;
};

const addContact = async (body) => {
  const contacts = await db.read();
  const newContact = {
    id: crypto.randomUUID(),
    ...body,
    ...(body.isVaccinated ? {} : { isVaccinated: false }),
  };
  contacts.push(newContact);
  await db.write(contacts);
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await db.read();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    const contact = contacts[index];
    contacts[index] = { ...contact, ...body };
    await db.write(contacts);
    return contacts[index];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

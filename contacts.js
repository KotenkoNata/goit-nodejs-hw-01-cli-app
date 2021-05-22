const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data.toString());
    console.table(result);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data.toString());

    const result =
      parseData.find(contact => contact.id === contactId) ||
      `No contact with ID ${contactId} found.`;
    console.table(result);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data.toString());

    const filteredContacts = parseData.filter(
      contact => contact.id !== contactId,
    );

    if (filteredContacts.length !== parseData.length) {
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
      console.log(`The contact with ID ${contactId} was deleted`);
    } else {
      console.log(`Contact with ID ${contactId} wasn't found`);
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data.toString());

    const contactsList = JSON.stringify(
      [...parseData, { id: parseData.length + 1, name, email, phone }],
      null,
      '\t',
    );

    fs.writeFile(contactsPath, contactsList);

    console.log('Contact added successfully');
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, addContact, removeContact };

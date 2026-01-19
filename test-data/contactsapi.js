const ContactsAPI = {
  contacts: [],
  getAll: function () {
    return this.contacts;
  },

  get: function (id) {
    return this.contacts.find((contact) => contact.id === id);
  },

  addContact: function (contact) {
    this.contacts.push(contact);
  },
  updateContact: function (updatedContact) {
    this.contacts = this.contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact,
    );
  },

  deleteContact: function (id) {
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
  },
};

export default ContactsAPI;

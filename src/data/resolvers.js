import { Contacts } from './dbConnectors';

export const resolvers = {
    Query: {
        getContacts: async () => {
            return await Contacts.find();
        },
        getOneContact: async  (root, { id }) => {
            return await Contacts.findById(id).exec();
        }
    },
    Mutation: {
        createContact: async (root, { input}) => {
            const newContact = new Contacts({
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                company: input.company,
            });
            return await newContact.save();
        },
        updateContact: async (root, { input}) => {
            return await Contacts.findOneAndUpdate({_id:input.id},input, {
                new: true
            });
        },
        deleteContact:async (root, {id}) => {
             const result =  await Contacts.findByIdAndRemove(id);
             if (result)
                 return "Successfully deleted contact";
             else
                 return "delete operation failed ";
        }
    }
}

import { mutationType } from "nexus";

export const Mutation = mutationType({
  definition(t) {
    // Create mutations
    t.crud.createOneUser();
    t.crud.createOneProduct();
    t.crud.createOneRental();

    // Update mutations
    t.crud.updateOneUser();
    t.crud.updateOneProduct();
    t.crud.updateOneRental();

    // Delete mutations
    t.crud.deleteOneUser();
    t.crud.deleteOneProduct();
    t.crud.deleteOneRental();
  },
});

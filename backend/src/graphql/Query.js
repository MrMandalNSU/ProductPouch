import { queryType } from "nexus";

export const Query = queryType({
  definition(t) {
    t.crud.user();
    t.crud.users();
    t.crud.product();
    t.crud.products();
    t.crud.rental();
    t.crud.rentals();
  },
});

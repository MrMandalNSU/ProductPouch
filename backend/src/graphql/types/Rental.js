import { objectType } from "nexus";

export const Rental = objectType({
  name: "Rental",
  definition(t) {
    t.int("id");
    t.string("rent_from");
    t.string("rent_to");

    t.field("product", { type: "Product" });
    t.field("renter", { type: "User" });
  },
});

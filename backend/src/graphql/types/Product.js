import { objectType } from "nexus";

export const Product = objectType({
  name: "Product",
  definition(t) {
    t.int("id");
    t.string("title");
    t.list.string("categories");
    t.string("description");
    t.float("price");
    t.float("rent_price");
    t.string("rent_period");
    t.int("views", { nullable: true });
    t.string("status", { nullable: true });
    t.date("createdAt");
    t.date("updatedAt");

    t.field("owner", { type: "User" });
    t.field("buyer", { type: "User", nullable: true });
    t.list.field("rental", { type: "Rental" });
  },
});

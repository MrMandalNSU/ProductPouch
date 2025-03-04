import { objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("first_name");
    t.string("last_name", { nullable: true });
    t.string("address", { nullable: true });
    t.string("email");
    t.string("phone", { nullable: true });
    t.string("password"); // Don't expose this in queries!
    t.list.field("owner", { type: "Product" });
    t.list.field("buyer", { type: "Product" });
    t.list.field("rental", { type: "Rental" });
  },
});

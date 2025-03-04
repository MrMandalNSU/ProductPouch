import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany();
    },
    user: async (_, { id }) => {
      return prisma.user.findUnique({
        where: { id },
      });
    },
    products: async () => {
      return prisma.product.findMany();
    },
    product: async (_, { id }) => {
      return prisma.product.findUnique({
        where: { id },
      });
    },
    rentals: async () => {
      return prisma.rental.findMany();
    },
    rental: async (_, { id }) => {
      return prisma.rental.findUnique({
        where: { id },
      });
    },
  },

  User: {
    owner: async (parent) => {
      return prisma.product.findMany({
        where: { owner_id: parent.id },
      });
    },
    buyer: async (parent) => {
      return prisma.product.findMany({
        where: { buyer_id: parent.id },
      });
    },
    rental: async (parent) => {
      return prisma.rental.findMany({
        where: { renter_id: parent.id },
      });
    },
  },

  Product: {
    owner: async (parent) => {
      return prisma.user.findUnique({
        where: { id: parent.owner_id },
      });
    },
    buyer: async (parent) => {
      if (parent.buyer_id) {
        return prisma.user.findUnique({
          where: { id: parent.buyer_id },
        });
      }
      return null;
    },
    rental: async (parent) => {
      return prisma.rental.findMany({
        where: { product_id: parent.id },
      });
    },
  },

  Rental: {
    product: async (parent) => {
      return prisma.product.findUnique({
        where: { id: parent.product_id },
      });
    },
    renter: async (parent) => {
      return prisma.user.findUnique({
        where: { id: parent.renter_id },
      });
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      return prisma.user.create({
        data: input,
      });
    },
    updateUser: async (_, { id, input }) => {
      return prisma.user.update({
        where: { id },
        data: input,
      });
    },
    deleteUser: async (_, { id }) => {
      return prisma.user.delete({
        where: { id },
      });
    },

    createProduct: async (_, { input }) => {
      return prisma.product.create({
        data: input,
      });
    },
    updateProduct: async (_, { id, input }) => {
      return prisma.product.update({
        where: { id },
        data: input,
      });
    },
    deleteProduct: async (_, { id }) => {
      return prisma.product.delete({
        where: { id },
      });
    },

    createRental: async (_, { input }) => {
      return prisma.rental.create({
        data: input,
      });
    },
    deleteRental: async (_, { id }) => {
      return prisma.rental.delete({
        where: { id },
      });
    },

    // Login mutation
    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("No user found with this email");
      }

      if (password !== user.password) {
        throw new Error("Invalid password");
      }

      // Simple-Token
      const token = `token-${user.id}-${Date.now()}`;

      return {
        token,
        user,
      };
    },
  },
};

export default resolvers;

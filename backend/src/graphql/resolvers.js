const resolvers = {
  Query: {
    user: async (_, { id }, { prisma }) => {
      return await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
    },
  },
  Mutation: {
    createUser: async (
      _,
      { first_name, last_name, address, email, phone, password },
      { prisma }
    ) => {
      return await prisma.user.create({
        data: { first_name, last_name, address, email, phone, password },
      });
    },
  },
};

export default resolvers;

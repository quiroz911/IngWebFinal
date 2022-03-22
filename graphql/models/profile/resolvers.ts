import prisma from 'config/prisma';

const ProfileResolvers = {
  Mutation: {
    updateProfileImage: async (parent, args) => {
      return await prisma.user.update({
        where: {
          id: args.user,
        },
        data: {
          // profile: {
          //   upsert: {
          //     create: {
          //       customImage: args.image,
          //     },
          //     update: {
          //       customImage: {
          //         set: args.image,
          //       },
          //     },
          //   },
          // },
        },
      });
    },
  },
};

export { ProfileResolvers };

import prisma from 'config/prisma';

const ProfileResolvers = {
  Profile: {
    user: async (parent) => {
      return await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      });
    },
  },
  Query: {
    getProfile: async (parent, args) => {
      return await prisma.user.findUnique({
        where: { ...args.where },
      });
    },
  },
  Mutation: {
    updateProfile: async (_, args) => {
      return await prisma.user.update({
        where: {
          id: args.where.id,
        },
        data: {
          profile: {
            upsert: {
              create: {
                address: args?.data?.address,
                phone: args?.data?.phone,
                customImage: args?.data?.customImage,
              },
              update: {
                ...(args.data.phone && {
                  phone: {
                    set: args.data.phone,
                  },
                }),
                ...(args.data.address && {
                  address: {
                    set: args.data.address,
                  },
                }),
                ...(args.data.customImage && {
                  customImage: {
                    set: args.data.customImage,
                  },
                }),
              },
            },
          },
        },
      });
    },
    updateProfileImage: async (parent, args) => {
      return prisma.user.update({
        where: {
          id: args.where.id,
        },
        data: {
          profile: {
            upsert: {
              create: {
                customImage: args.image,
              },
              update: {
                customImage: {
                  set: args.image,
                },
              },
            },
          },
        },
      });
    },
  },
};

export { ProfileResolvers };

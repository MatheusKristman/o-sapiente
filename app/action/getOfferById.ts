import { prisma } from "@/libs/prismadb";

const getOfferById = async (offerId: string) => {
  try {
    const offer = await prisma.offer.findUnique({
      where: {
        id: offerId,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            profilePhoto: true,
          },
        },
        request: true,
      },
    });

    return offer;
  } catch (error) {
    return null;
  }
};

export default getOfferById;

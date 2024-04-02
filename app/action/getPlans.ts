import { prisma } from "@/libs/prismadb";

const getPlans = async () => {
  try {
    const plans = await prisma.plan.findMany();

    return plans;
  } catch (error) {
    return [];
  }
};

export default getPlans;

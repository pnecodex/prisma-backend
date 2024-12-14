const { PrismaClient } = require("@prisma/client");
const { catalogue } = require("./catalogue");
const prisma = new PrismaClient();
const load = async () => {
  try {
    const catalogues = await prisma.catalog.createMany({
      data: catalogue
    })
    console.log(catalogues, 'catalogues are created');
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }

}

load();
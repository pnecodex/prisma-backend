const { PrismaClient } = require('@prisma/client');
const { CatalogueFilter } = require('../helpers/helpers');
const prisma = new PrismaClient();

class CategoriesController {
  constructor() {}
  async index(req, res, next) {
    try {
      const catalogues = await prisma.catalog.findMany();
      if (catalogues) {
        const categories = CatalogueFilter(catalogues);
        return res.status(200).send({ data: categories, message: { success: 'fetch all catalogues successfully!' } });
      }
    } catch (error) {
      return res.send(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  async create(req, res, next) {
    try {
      let images = null;
      const { titles, slugs, parentId } = req.body;
      if (req.file) {
        images = req.file.filename;
      } else {
        images = null;
      }

      const catalogue = await prisma.catalog.create({
        data: {
          titles: titles,
          slugs: slugs,
          parentId: Number(parentId) || null,
          image: images
        }
      });
      return res.status(201).send({ data: catalogue, message: { success: 'catalogue created successfully!' }, status: true });
    } catch (error) {
      return res.send(error);
    } finally {
      await prisma.$disconnect();
    }
  }
}
module.exports = new CategoriesController();

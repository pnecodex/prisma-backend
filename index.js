const fs = require('fs');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { urlencoded, json } = require('body-parser');
const { config } = require('dotenv');
const cors = require('cors');
const { uploadFiles } = require('./services/multer');
const { setUploadFilPath } = require('./middleware/middleware');
const axios = require('axios');
const ip = require('ip');
const path = require('path');
const cheerio = require('cheerio');
const morgan = require('morgan');
const routes = require('./routes/routes');
const { CatalogueFilter } = require('./helpers/helpers');
const events = require("events");
const app = express();
const prisma = new PrismaClient();

config();
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    optionsSuccessStatus: 200
  })
);
app.use(urlencoded({ extended: false }));
app.use(json());

if (app.get('env') === 'DEVELOPMENT') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}
app.post('/api/create_reviews', async (req, res) => {
  try {
    const count = 0;
    const { rating, views, productId } = req.body;
    // const productCount = ip.address();
    // console.log(productCount,'productCount');
    // if (productCount) {
    //   console.log(count+2,'count');
    // }else{
    //   console.log('count not increment');
    // }
    // return console.log(productCount,count, 'data');
    const productRating = await prisma.rating.create({ data: { rating, views: count + 1, productId } });
    console.log(productRating, 'create');
    return res.send(productRating);
  } catch (error) {
    return res.send(error);
  } finally {
    await prisma.$disconnect();
  }
});
app.post('/api/create_product', setUploadFilPath('./public/uploads/product'), uploadFiles.single('image'), async (req, res) => {
  try {
    const { title, description, price, userId, cataloguId } = req.body;
    // const images = req.file.filename;
    const product = await prisma.product.create({ data: { title, description, price, image: req.file ? req.file.filename : '', userId, cataloguId } });
    return res.send(product);
  } catch (error) {
    return res.send(error);
  } finally {
    await prisma.$disconnect();
  }
});
app.get('/api/all_product', async (req, res) => {
  try {
    const product = await prisma.product.findMany({
      include: {
        Ratings: true
      }
    });
    return res.send({ product, message: { success: 'all product show successfully!' } });
  } catch (error) {
    return res.send(error);
  } finally {
    await prisma.$disconnect();
  }
});
app.get('/api/product/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const product = await prisma.product.findUnique({
      where: {
        id: id
      }
    });

    return res.status(200).send({ data: product, message: 'item fetch successfuly!' });
  } catch (error) {
    return res.send(error);
  } finally {
    await prisma.$disconnect();
  }
});
app.put('/api/product/:id', setUploadFilPath('./public/uploads/product'), uploadFiles.single('image'), async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const id = req.params.id;
    const product = await prisma.product.findFirst({
      where: {
        id: id
      }
    });
    if (!product) {
      return res.status(404).send({ error: 'item does not exist' });
    } else {
      if (req.file) {
        fs.unlink('public/uploads/product/' + product.image, (error) => {
          if (error) {
            console.log(error, 'error');
          } else {
            console.log('file deleted successful');
          }
        });
      } else {
        console.log('file not change');
      }

      const updateItem = await prisma.product.update({
        data: { title, description, price, image: req.file ? req.file.filename : product.image },
        where: {
          id: id
        }
      });
      return res.status(200).send({ data: updateItem, message: 'your data updated successfuly!' });
    }
  } catch (error) {
    return res.send(error);
  } finally {
    await prisma.$disconnect();
  }
});
app.delete('/api/product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, 'delete');
    const product = await prisma.product.delete({
      where: {
        id: id
      }
    });
    fs.unlink('public/uploads/product/' + product.image, (error) => {
      if (error) {
        console.log(error, 'error');
      } else {
        console.log('file deleted successful');
      }
    });
    return res.status(200).send({ data: product, message: 'your data deleted successfuly!' });
  } catch (error) {
    return res.send(error);
  } finally {
    await prisma.$disconnect();
  }
});

app.get('/api/all_category', async (req, res) => {
  try {
    const catalogues = await prisma.catalog.findMany();
    if (catalogues) {
      const categoryList = CatalogueFilter(catalogues);
      return res.status(201).send({ categoryList, message: { success: 'fetch all catalogues successfully!' } });
    }
  } catch (error) {
    return res.send(error);
  } finally {
    await prisma.$disconnect();
  }
});
app.get('/api/find-catalogue-by-id/:id', async (req, res) => {
  try {
    const catalogues = await prisma.catalog.findMany({
      where: { parentId: Number(req.params.id) }
    });
    return res.send({ catalogues, message: { success: 'all categories show successfully!' } });
  } catch (error) {
    return res.send(error);
  } finally {
    await prisma.$disconnect();
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/image', express.static('public/uploads'));
const port = process.env.PORT;
routes(app);
app.get('/', async (req, res) => {
  try {
    const serverConnected = await 'server connected!';
    return res.status(200).json({ data: serverConnected, message: 'connecting...', success: true });
  } catch (error) {
    return res.status(500).json({ data: error, message: error.message, success: false });
  }
});

const url = 'https://www.thebluebook.com/search.html?region=1&searchsrc=thebluebook&searchTerm=Electrical+Contractors&regionLabel=New+York%2C+NY&geographicarea=New+York+City&class=1680';
app.get('/api/data-scrapping', (req, res) => {
  console.log('functio here');

  axios
    .get(url)
    .then((response) => {
      const html = response.data;
      console.log(html);
      const $ = cheerio.load(html);
      const companies = [];

      $('.company-name').each((i, element) => {
        const name = $(element).text();

        const address = $(element).siblings('.company-address').text();
        companies.push({ name, address });
      });

      return res.json(companies);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('An error occurred while fetching data');
    });
});
const event = new events.EventEmitter();

event.on("click", function(name,am){
  console.log(name,am, "is clicking");
});
event.on("clicks", function(name){
  console.log(name, "is clickings");
});
event.emit('click','i',"am");
event.emit('clicks','i');
app.listen(port, () => {
  const arr = [1, 2, 3, 4, 5];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == 4) {
      console.log('four digits comes up', arr[i]);
    } else {
      console.log('other digits here', arr[i]);
    }
  }
  console.log(`Example app listening on port ${port}!`);
});

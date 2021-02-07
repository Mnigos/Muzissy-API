import mongoose from 'mongoose';
import assert from 'assert';
import app from './app';

require('dotenv').config();

['MONGO_URI'].forEach(variable => {
  assert(process.env[variable], `process.env${variable} is undefined!`);
});
mongoose.set('useFindAndModify', false);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongoose is connected');
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Listening on ${process.env.PORT}`);
    });
  });

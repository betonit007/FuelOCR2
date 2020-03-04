import mongoose from 'mongoose';
import config from 'config';
const db: string = config.get('mongoURI');

const connection = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true, //suggested options by mongodb response to be passed in
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log('MongoDB connect');
  } catch (error) {
    console.error(error.message);

    process.exit(1); //exit process with failure
  }
};

export default connection;

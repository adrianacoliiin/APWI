import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/orders.routes';
import rolRoutes from './routes/rol.routes';
import connectDB from './config/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/rols', rolRoutes);

connectDB().then(() => {
    console.log("El servidor esta en el puerto: ", PORT);
})


app.listen(PORT, () => {
    console.log("El servidor esta en el puerto: ", PORT);
});
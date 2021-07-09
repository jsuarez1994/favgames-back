import mongoose from 'mongoose';


export class DatabaseConnection {

    private url: string;

    constructor() {
        this.url = process.env.DATABASE_URL || '';
    }

    async connection() {
        try {
            await mongoose.connect( 
                this.url, 
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false
                });
        
            console.log('Base de datos online');
        } catch (error) {
            console.error(error);
            throw new Error('Error a la hora de iniciar la base de datos');
        }
    }

}

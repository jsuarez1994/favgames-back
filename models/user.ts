import mongoose, { Schema, Document } from 'mongoose';
import { USER_ERRORS } from '../utils/errors';

export interface IHome extends Document {
    country: string;
    town: string;
}

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    surname: string;
    home?: IHome;
    active: boolean;
    image?: string; 
}

const UserSchema: Schema = new Schema({
    email:      {   type: String, 
                    required: [true, USER_ERRORS.EMAIL_REQUIRED], 
                    unique: true },
    password:   {   type: String, 
                    required: [true, USER_ERRORS.PASSWORD_REQUIRED],
                    validators: { 
                        validator: (pwd:string = '') => {
                            return pwd === '' || pwd.length < 8
                        },
                        message: (pwd:string) => `${USER_ERRORS.PASSWORD_BAD}:${pwd}`}
                },
    name:       {   type: String, 
                    required: [true, USER_ERRORS.NAME_REQUIRED] 
                },
    surname:    {   type: String, 
                    required: [true, USER_ERRORS.SURNAME_REQUIRED] 
                },
    home:       {   country: { type: String, default: '' },
                    town: { type: String, default: '' }
                },
    active:     {   type: Boolean, default: true},
    image:      {   type: String, default: ''}
  });
  
  // Export the model and return your IUser interface
  export default mongoose.model<IUser>('User', UserSchema);
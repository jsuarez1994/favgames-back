import mongoose, { Schema, Document } from 'mongoose';
import { FAVOURITE_GAMES_ERRORS } from '../utils/errors';

export interface IFavouriteGame extends Document {
    id: number;
    name: string;
    platforms: string;
    rating: number;
    release_dates: string;
    screenshots: string;
    summary: string;
}
  
const FavouriteGameSchema: Schema = new Schema({
    user:           {   type: Schema.Types.ObjectId,
                        ref: 'User',
                        required: [true, FAVOURITE_GAMES_ERRORS.USER_REQUIRED]
                    },
    id:             {   type: Number, 
                        required: [true, FAVOURITE_GAMES_ERRORS.ID_REQUIRED]
                    },
    name:           {   type: String, 
                        required: [true, FAVOURITE_GAMES_ERRORS.NAME_REQUIRED] 
                    },
    platforms:      {   type: String, default: '' },
    rating:         {   type: Number, 
                        required: [true, FAVOURITE_GAMES_ERRORS.RATING_REQUIRED]
                    },
    release_dates:  {   type: String, default: '' },
    screenshots:    {   type: String, default: '' },
    summary:        {   type: String, 
                        required: [true, FAVOURITE_GAMES_ERRORS.SUMMARY_REQUIRED]
                    }
  });
  
  // Export the model and return your IFavouriteGame interface
  export default mongoose.model<IFavouriteGame>('FavouriteGame', FavouriteGameSchema);
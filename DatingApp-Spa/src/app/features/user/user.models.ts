import {PhotosForDetailedDto} from '@app/features/photo/photo.models';

export interface UserForListDto {
  id: string;
  username: string;
  gender: string;
  age: string;
  knownAs: string;
  created: string;
  lastActive: Date;
  city: string;
  country: string;
  photoUrl: string;
}

export interface UserForDetailedDto {
  id: string;
  username: string;
  gender: string;
  age: string;
  knownAs: string;
  created: string;
  lastActive: Date;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  photoUrl: string;
  photos: Array<PhotosForDetailedDto>;
}

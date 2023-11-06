// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Song, Album, Artist } = initSchema(schema);

export {
  Song,
  Album,
  Artist
};
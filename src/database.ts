
import { MongoClient, ObjectId } from 'mongodb';
import { MONGODB_URL } from './config';

interface Breed {
  id: number;
  name: string;
  description: string;
  origin: string;
  temperament: string;
}

// To prevent Regex DDOS attacks
function escapeRegex(query : string) : string {
  return query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

async function getDB() : Promise<any> {
  try {
    const client:MongoClient = await MongoClient.connect(MONGODB_URL, { useNewUrlParser: true });
    return client.db('catapi');
  }
  catch(e) {
    console.log("Mongodb failed to connect!")
    // Failed to connect!
    return false;
  }
}

export default async function() {
  try {
    let db = await getDB();

    while (!db) {
      // Database failed to connect, retry in 10 seconds.
      await (new Promise(resolve => setTimeout(resolve, 1000 * 10)));
      db = await getDB();
    }

    return {
      async getAllBreeds() : Promise<Breed[]> {
        return await db.collection('breed').find().toArray();
      },
      async getBreedById(id : string) : Promise<Breed> {
        return await db.collection('breed').findOne({_id: new ObjectId(id)});
      },
      async searchBreedByName(name : string) : Promise<Breed> {
        let regex = new RegExp(escapeRegex(name), 'gi');
        return await db.collection('breed').find({name: regex}).toArray();
      }
    }
  }
  catch(e) {
    console.log("Failed to connect to Mongodb");
    return false;
  }
}

import {Client, Databases, ID, Query} from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;
const ENDPOINT_ID = import.meta.env.VITE_APPWRITE_ENDPOINT;

const client = new Client()
    .setEndpoint(ENDPOINT_ID)
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    // 1. Use Appwrite SDK to check if search term exists
    try{
        const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
            Query.equal('searchTerm', searchTerm),
        ]);

        // 2. If it does, increment the count by 1
        if(result.documents.length > 0){
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, TABLE_ID, doc.$id, {
                count: doc.count + 1
            });
        }
        else
        {
            await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(),
                {
                    searchTerm: searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
            )
        }
    } catch(error) {
        console.log(error);
    }

    // 3. If it doesn't, create a new document with the search term and count of 1

}
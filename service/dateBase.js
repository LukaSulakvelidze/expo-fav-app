import * as SQLite from 'expo-sqlite'

export default function dateBase() { }


export const createDbIfNeeded = async (db) => {
    console.log("Creating database");
    try {
        const response = await db.execAsync(
            "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, imageUri TEXT, address TEXT, location TEXT);"
        );
        console.log("Database created", response);
    } catch (error) {
        console.error("Error creating database:", error);
    }
};


export const insertPlace = async (place) => {


};


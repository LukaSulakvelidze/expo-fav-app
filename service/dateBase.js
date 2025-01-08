export const createDbIfNeeded = async (db) => {
  console.log("Creating database");
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`
    );
    console.log("Database schema verified or created.");
    const verifyResponse = await db.execAsync(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='places'`
    );
    if (verifyResponse) {
      console.log("Table 'places' exists:", verifyResponse);
    } else {
      console.log("Table 'places' was not found.");
    }
  } catch (error) {
    console.error("Error creating database:", error);
  }
};

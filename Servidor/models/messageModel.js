const Message = {
  // Store a new message
  storeMessage: async (db, userID, text) => {
    const query = 'INSERT INTO messages (userID, text) VALUES (?, ?)';
    const values = [userID, text];

    try {
      const [result] = await db.promise().query(query, values);
      return result.insertId; // Assuming you want to return the inserted message ID
    } catch (error) {
      throw error;
    }
  },

  // Get all messages
  // In your messageModel.js
 getAllMessages : async (db) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT messages.*, users.userName FROM messages INNER JOIN users ON messages.userID = users.userID', (err, results) => {
          if (err) {
            reject(err);
          } else {
            // Map the results to match the frontend's expected structure
            const formattedMessages = results.map((message) => ({
              messageID: message.messageID,
              userID: message.userID,
              text: message.text,
              created_at: message.created_at,
              author: message.userName, // Rename userName to author
            }));
    
            resolve(formattedMessages);
          }
        });
      });
  },
  
};

module.exports = Message;

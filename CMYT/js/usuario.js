// this is the model for the class user, it is supposed to store the class's atributes, getters and setters
// functions and etc.
class User {
    constructor(username, email, password, userLevel, uniqueId, jobRole, fullName, birthday) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.userLevel = userLevel;
      this.uniqueId = uniqueId;
      this.jobRole = jobRole;
      this.fullName = fullName;
      this.birthday = birthday;
    }


  // Getters
  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getUserLevel() {
    return this.userLevel;
  }

  getUniqueId() {
    return this.uniqueId;
  }

  getJobRole() {
    return this.jobRole;
  }

  getFullName() {
    return this.fullName;
  }

  getBirthday() {
    return this.birthday;
  }

  // Setters
  setUsername(username) {
    this.username = username;
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(password) {
    this.password = password;
  }

  setUserLevel(userLevel) {
    this.userLevel = userLevel;
  }

  setUniqueId(uniqueId) {
    this.uniqueId = uniqueId;
  }

  setJobRole(jobRole) {
    this.jobRole = jobRole;
  }

  setFullName(fullName) {
    this.fullName = fullName;
  }

  setBirthday(birthday) {
    this.birthday = birthday;
  }
  
    static createUser(username, email, password, userLevel, uniqueId, jobRole, fullName, birthday) {
      // Allow only predefined user levels: 'master', 'admin', 'user'
      const allowedLevels = ['master', 'admin', 'user'];
      if (!allowedLevels.includes(userLevel)) {
        console.error('Invalid user level.');
        return null;
      }
  
      // Prevent creation of 'master' user outside the code
      if (userLevel === 'master') {
        console.error('Cannot create a master user during runtime.');
        return null;
      }
  
      return new User(username, email, password, userLevel, uniqueId, jobRole, fullName, birthday);
    }
  
    deleteUser(user) {
      if (this.userLevel !== 'master') {
        console.error('Insufficient privileges to delete a user.');
        return null;
      }
  
      // Logic to delete the user
      console.log(`User '${user.username}' has been deleted.`);
    }
  }
  
  // Singleton to handle master user creation
  const MasterUserSingleton = (() => {
    let masterUser = null;
  
    function createMasterUser() {
      if (!masterUser) {
        masterUser = User.createUser('master', 'master@example.com', 'masterpassword', 'master', '123456', 'Master Role', 'Master User', '1970-01-01');
      }
      return masterUser;
    }
  
    return {
      getMasterUser: () => createMasterUser()
    };
  })();
  
  // Example usage
  
  // Create the master user (singleton)
  const masterUser = MasterUserSingleton.getMasterUser();
  console.log('Master User:', masterUser);
  
  // Attempting to create another master user will return the existing master user instance
  const duplicateMasterUser = MasterUserSingleton.getMasterUser();
  console.log('Are master users the same instance?', masterUser === duplicateMasterUser);
  
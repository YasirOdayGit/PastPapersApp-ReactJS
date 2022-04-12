class UserModule {
  constructor(map) {
    this.accountType = map["accountType"];
    this.banned = map["banned"];
    this.email = map["email"];
    this.favDocuments = map["favDocuments"];
    this.favLimit = map["favLimit"];
    this.id = map["id"];
    this.profilePicture = map["profilePicture"];
    this.uploadedPapers = map["uploadedPapers"];
    this.userName = map["userName"];
    this.verified = map["verified"];
  }
}

export default UserModule;

class DocumentModule {
  constructor(map) {
    this.category = map["category"];
    this.deleted = map["deleted"];
    this.dislikes = map["dislikes"];
    this.files = map["files"];
    this.id = map["id"];
    this.likes = map["likes"];
    this.tags = map["tags"];
    this.title = map["title"];
    this.university = map["university"];
    this.uploadDate = map["uploadDate"];
    this.uploaderId = map["uploaderId"];
    this.uploaderName = map["uploaderName"];
  }
  //     constructor(
  //     category,
  //     deleted,
  //     dislikes,
  //     files,
  //     id,
  //     likes,
  //     tags,
  //     title,
  //     university,
  //     uploadDate,
  //     uploaderId,
  //     uploaderName
  //   ) {
  //     this.category = category;
  //     this.deleted = deleted;
  //     this.dislikes = dislikes;
  //     this.files = files;
  //     this.id = id;
  //     this.likes = likes;
  //     this.tags = tags;
  //     this.title = title;
  //     this.university = university;
  //     this.uploadDate = uploadDate;
  //     this.uploaderId = uploaderId;
  //     this.uploaderName = uploaderName;
  //   }
  fromJSON(map) {
    return DocumentModule(
      map["category"],
      map["deleted"],
      map["dislikes"],
      map["files"],
      map["id"],
      map["likes"],
      map["tags"],
      map["title"],
      map["university"],
      map["uploadDate"],
      map["uploaderId"],
      map["uploaderName"]
    );
  }
}

export default DocumentModule;

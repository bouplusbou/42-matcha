const Tag = require('../models/Tag');

const allTags = (req, res) => {
    Tag.getTags()
          .then( tags => {
                const formatedTags = tags.map((tag, key) => {
                      return { value: key, label: tag}
                });
                return formatedTags;
          })
          .then( formatedTags => { res.json({message : "List of formatedTags", data: formatedTags}) })
          .catch( error => { console.log(error) })
}

const createTag = async (req, res) => {
      Tag.createTag(req.body)
            .then(() => { res.json({message: "ca marche"})})
            .catch(err => { console.log(err)})
}

module.exports = {
    allTags,
    createTag
}
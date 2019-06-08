const Tag = require('../models/Tag')

const allTags = (req, res) => {
    Tag.getTags()
          .then( tags => {
                for (tag of tags) {
                      tag['value'] = tag['id_tag']
                      delete tag['id_tag']
                      tag['label'] = tag['name']
                      delete tag['name']
                }
                return tags
          })
          .then( tags => { res.json({message : "List of tags", data: tags}) })
          .catch( error => { console.log(error) })
}

module.exports = {
    allTags
}
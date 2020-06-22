//Library
const remove = require("./remove");

const insert = require("./insert");

module.exports= function(model, newObj, callback, filter = {}){ // filter have to select one obj
	remove(model, () => {
		insert(newObj, ()=>{
		});
	}, filter);
}

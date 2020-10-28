let path = require("path");
let fs = require("fs");
let notes = [{
    title: "Hello, Everyone",
    text: "Testing 1, 2, 3",
    id: 0 
}]


module.exports = function (app){
    app.get("/api/notes", function (req,res) {
        res.sendFile(path.join (__dirname,"./db/db.json"));
    });

    app.get("/api/notes/:id", function(req,res) {
        let savedNotes = JSON.parse(fs.readFileSync( "../db/db.json", "utf8"));
        return res.json(savedNotes[Number(req.params.id)]);
    });

    app.post("/api/notes", function(req,res) { 
        console.log("Inside POST\n", req.body);
        let saveNote = JSON.parse(fs.readFileSync(path.join(__dirname,"./db/db.json"), "utf8"));
        let newNote = req.body;
        let id =(saveNote.length).toString();
        
        newNote.id = id;
        saveNote.push(newNote);
        fs.writeFileSync(path.join(__dirname,"./db/db.json"), JSON.stringify(saveNote));
        console.log("Congradulations! Your note has been saved");
        res.json(saveNote);
    });

    app.delete("/api/notes/:id", function(req,res){
        let saveNote = JSON.parse(fs.readFileSync(path.join(__dirname,"./db/db.json"), "utf8"));
        let noteId = req.params.id;
        console.log(noteId)
        

        console.log('Note: ${noteId successfully removed');
        saveNote = saveNote.filter(currNote => {
            return currNote.id != noteId;
        });

        fs.writeFileSync(path.join(__dirname,"./db/db.json"), JSON.stringify(saveNote));
        res.json(saveNote);
    })
}
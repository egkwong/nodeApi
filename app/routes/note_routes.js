var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db){

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
            db.collection('notes').findOne(details, (err, item) => {
                if (err) {
            res.send({'error': 'An error has occured' })
        } else{
            res.send(item)
        }
            });
           
    });

       app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
            db.collection('notes').remove(details, (err, item) => {
                if (err) {
            res.send({'error': 'An error has occured' })
        } else{
            res.send('Note ' + id  + ' deleted!!');
        }
            });
           
    });
    
       app.put('/notes/:id', (req, res) => {


           ///todo put some logic to not delete stuff if the form is sent null
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title, name: req.body.name };
            db.collection('notes').update(details, note, (err, item) => {
                if (err) {
            res.send({'error': 'An error has occured' })
        } else{
            res.send(item)
        }
            });
           
    });

    app.post('/notes', (req, res ) => {
      //req.body.***key goes here***
      const note = { text: req.body.body, title: req.body.title, name: req.body.name };
      db.collection('notes').insert(note, (err, result) => {
        if (err){
            res.send({'error': 'An error has occured' });
        } else{
            res.send(result.ops[0])
        }
      });
    });
};
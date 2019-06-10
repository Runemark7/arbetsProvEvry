const mongodb = require('mongodb');

module.exports = (app)=>{
    app.get('/kommuner', async (req,res) =>{
        const posts = await loadPostsCollection();
        res.send(await posts.find().toArray());
    });
    
    async function loadPostsCollection(){
        const client = await mongodb.MongoClient.connect('mongodb+srv://jensa123:jensa123@evryarbetsprov-l2rzl.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true});
        return client.db('arbetsTest').collection('kommuner');
    }
}
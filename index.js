const { ApolloServer,PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const {MONGODB} = require('../config/config')
const typeDefs = require('./graphql/typeDef');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context : ({req})=>({req,pubsub})
});
mongoose
    .connect(MONGODB, { useNewUrlParser:true,useUnifiedTopology: true })
    .then(()=>{
        console.log('MONGODB Connected Successfully.')
        return server.listen({port:PORT});

    }).then((res)=>{
        console.log(`Server Running at ${res.url}`);
    })
    .catch(err=>{
        console.error(err)
    })
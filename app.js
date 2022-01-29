const fastify = require('fastify')({logger: true});
const request = require('request-promise');
const R = require('ramda');
const NodeCache = require('node-cache');
const cache = new NodeCache({ttl: 600});
const validator = (payload) => {
   return payload;
};

const stock = (payload) =>{
    console.log('payload', payload);
}
const ajaxCall = async ({token,url,method}) => {
    return request({
        url:'https://quotes-gw.webullfintech.com/api/bgw/crypto/list',
        method:'GET'
    });
};

fastify.get("/", async (data, reply) => {

    return {health: 'true'};
  
});

fastify.get("/crypto", async (data, reply) => {
    const content = cache.get('content');
    if (!content) {
        return ajaxCall({}).then(d => {
            cache.set('content', d);
            return d;
        });  
    }
    return content;
  
});

fastify.listen(process.env.PORT || 1500);
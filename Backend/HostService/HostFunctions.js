const host = require("../Models/HostProfile")
const Events = require("../Models/EventModel")


async function createHost(data){
const newHost = await host.createHost(data)
return newHost
}

async function getHostEvents(id){
    const events = await Events.findAll({where:{hostId:id}})
    if(!events){return null}
    return events
}

module.exports = {createHost,getHostEvents}
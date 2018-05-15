var serviceController = function(Service){

    var post = function(req, res){
        var service = new Service(req.body);

        if(!req.body.name){
            res.status(400);
            res.send('Name is required');
        }
        else {
            service.save();
            res.status(201);
            res.send(service);
        }
    }

    var get = function(req,res){

        var query = {};

        if(req.query.profession)
        {
            query.profession = req.query.profession;
        }
        Service.find(query, function(err,services){

            if(err)
                res.status(500).send(err);
            else {

                var returnServices = [];
                services.forEach(function(element, index, array){
                    var newService = element.toJSON();
                    newService.links= {};
                    newService.links.self = 'http://' + req.headers.host + '/api/services/' + newService._id
                    returnServices.push(newService);
                });
                res.json(returnServices);
            }
        });
    }

    return {
        post: post,
        get:get
    }
}

module.exports = serviceController;
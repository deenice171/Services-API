var express = require('express');

var routes = (Service) => {


    var serviceRouter = express.Router();
    var serviceController = require('../controllers/serviceController')(Service);
    serviceRouter.route('/')
        .post(function (req, res) {
            var service = new Service(req.body);

            service.save();
            res.status(201).res.send(service);

        })
        .get(function (req, res) {

            var query = {};

            if (req.query.profession) {
                query.profession = req.query.profession;
            }
            Service.find(query, function (err, services) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(services);
            });
        });
    serviceRouter.use('/id/:serviceID', function (req, res, next) {
        Service.findById(req.params.serviceID, function (err, service) {
            if (err)
                res.status(500).send(err);
            else if (service) {
                req.service = service;
                next();
            }
            else {
                res.status(404).send('no service found');

            }

        });
    });
    serviceRouter.route('/id/:serviceID')
        .get(function (req, res) {

            res.json(req.service);

        })
        .put(function (req, res) {
            var newService = {};
            // newService.service = req.body.service
            // newService.name = req.body.name;
            // newService.profession = req.body.profession;
            // newService.cost = req.body.cost;
            // Object.assign(req.body);
            Service.update(req.body, function (err, resp) {
                console.log('res fro put resp:', resp);
                console.log('err fro put err:', err);

                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.body);
                }

            });

        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.service[p] = req.body[p];
            }
            req.service.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.service);
                }
            });
        })
        .delete(function (req, res) {
            req.service.remove(function (err) {
                if (err)

                    res.status(500).send.apply(err);
                else {
                    res.status(204).send('removed');
                }
            });
        });
    return serviceRouter;
}

module.exports = routes;
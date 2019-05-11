const routes = require("next-routes")();

routes.add("/jobs/new", "/jobs/new");
routes.add("/jobs/:address", "/jobs/show");
routes.add("/jobs/:address/bids", "/jobs/bids/index");
routes.add("/campaigns/:address/requests/new", "/campaigns/requests/new");

module.exports = routes;

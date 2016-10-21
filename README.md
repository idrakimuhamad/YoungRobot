# Sample Booking with Meteor and React

+ Clone/fork it.
+ `npm install`
+ `meteor`
+ Launch at [localhost:3000](http://localhost:3000)

### NOTE
- This app doesn't have any DB. It relies on RESTful API (which doesn't exists in this repo). If you run it on those pages that requires data, it'd be blank and probably some exception too
- Meteor was used as a build tools and also as the API caller.
- All API call made using the `HTTP` package on the server, instead of using AJAX on the client
  (Client ---> Method ---> Server ---> Request ---> API server)
- To set the endpoints of the API server, edit the endpoints.js file (imports/api/endpoints.js)
- And also alter some of the URL in the methods, as some has been hardcoded with prefixes I'm using (imports/api/methods.js)
- No, no Redux (yet). It will require some mental consuming to wrap around the Redux arch.

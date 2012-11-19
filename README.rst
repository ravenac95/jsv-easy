JSV Made Easy!
==============

A simple library to make JSV a little bit easier to use.

Usage
-----

At the moment jsv-easy provides a single public api method,
``jsveasy.validate``. Use it like this::
    
    var jsveasy = require('jsv-easy');
    var report = jsveasy.validate([input], [schema]);

    console.log(report);
    .. on success
    {
      valid: true,
      errors: []
    }
    ... on failure
    {
      valid: false,
      errors: [{
        property: "#/some/property",
        message: "some error message"
      }]
    }


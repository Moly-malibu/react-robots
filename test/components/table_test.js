process.env.NODE_ENV = 'test';
var expect = require('expect');
var browser = require('../../helpers/test_browser');
var db = require("../../db.js");
var recycleRobots = require('../../db/recycle_robots');
var defaultRobots = require('../../db/default_robots').defaultRobots();

describe("Table", function(){
  before(function(done){
    recycleRobots()
      .then(function(results){  console.log("RESULTS", results);  })
      .catch(function(err){  console.log("ERROR", err);  })
      .then(function(){
        console.log("DONE");
        db.disconnect().then(done());
      })
  })

  //
  // INDEX PAGE
  //

  context("when visited on the 'index' page", function(){
    before(function(){  return browser.visit('/');  });

    it("page should contain a heading", function(){
      expect(browser.query("h2").innerHTML).toEqual("Robots");
    });

    it("page should contain a table", function(){
      browser.assert.element('table');
    });

    it("table should contain a row per record", function(){
      var rows = browser.queryAll("tbody tr");
      expect(rows.length).toEqual(defaultRobots.length)
    });

    describe("Row", function(){
      it("should contain a 'show page' link", function(){
        var robotId = browser.query("tbody tr td").innerHTML;
        var showPageLink = browser.query("tbody tr td a");
        expect(showPageLink.href).toInclude("/robots/"+robotId);
      });
    });
  });

  //
  // SHOW PAGE
  //

  context("when visited on the 'show' page", function(){
    before(function(){  return browser.visit('/');  });
    before(function(){  return browser.clickLink('bb8');  });

    it("page should contain a heading", function(){
      var robotId = browser.location._url.split("robots/")[1].split("/")[0];
      expect(browser.query("h2").innerHTML).toEqual("Robot #"+robotId);
    });

    it("table should contain only one row", function(){
      var rows = browser.queryAll("tbody tr");
      expect(rows.length).toEqual(1)
    });
  });
});

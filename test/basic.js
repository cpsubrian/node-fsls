describe('tree', function () {
  var cwd = path.join(__dirname, 'fixtures');
  var sep = path.sep;

  it('generates the nodes tree', function (done) {
    fsls({cwd: cwd}, function (err, nodes) {
      assert.ifError(err);
      assert.deepEqual(nodes, {
        "nodes": [
          {
            "label": "more"+ sep,
            "nodes": [
              "bar.txt",
              "foo.js",
              {
                "label": "deeper"+ sep,
                "nodes": [
                  "baz.js"
                ]
              }
            ]
          },
          "test.js"
        ]
      });
      done();
    });
  });

  it('respects depth option', function (done) {
    fsls({cwd: cwd, depth: 1}, function (err, nodes) {
      assert.ifError(err);
      assert.deepEqual(nodes, {
        "nodes": [
          {
            "label": "more"+ sep
          },
          "test.js"
        ]
      });
      done();
    });
  });

   it('respects structure option', function (done) {
    fsls({cwd: cwd, structure: true}, function (err, nodes) {
      assert.ifError(err);
      assert.deepEqual(nodes, {
        "nodes": [
          {
            "label": "more"+ sep,
            "nodes": [
              {
                "label": "deeper"+ sep,
              }
            ]
          }
        ]
      });
      done();
    });
  });

   it('should be able to expand tilde in cwd', function (done) {
     var options = {cwd: '~', pattern: '*.foo'};

     fsls(options, function (err, nodes) {
       assert.notEqual(options.cwd[0], '~');

       done();
     });
   });

   it('should be able to expand tilde in pattern', function (done) {
     var options = {cwd: '~', pattern: '~/*.foo'};

     fsls(options, function (err, nodes) {
       assert.notEqual(options.cwd[0], '~');

       done();
     });
   });

});
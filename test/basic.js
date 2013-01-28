describe('tree', function () {
  var cwd = path.join(__dirname, 'fixtures');

  it('generates the nodes tree', function (done) {
    fsls({cwd: cwd}, function (err, nodes) {
      assert.ifError(err);
      assert.deepEqual(nodes, {
        "nodes": [
          {
            "label": "more/",
            "nodes": [
              "bar.txt",
              "foo.js",
              {
                "label": "deeper/",
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
            "label": "more/"
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
            "label": "more/",
            "nodes": [
              {
                "label": "deeper/",
              }
            ]
          }
        ]
      });
      done();
    });
  });

});
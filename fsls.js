var glob = require('glob')
  , fs = require('fs')
  , path = require('path');

// Build node tree expected by archy.
module.exports = function (options, cb) {
  options = options || {};
  if (!options.pattern) {
    options.pattern = '**/*';
  }

  var globOpts = {
    stat: true,
    mark: true
  };
  if (options.cwd) {
    globOpts.cwd = options.cwd;
  }

  glob(options.pattern, globOpts, function (err, files) {
    if (err) return cb(null);
    cb(null, glob_to_nodes(files, options));
  });
};

// Convert glob() results to archy nodes structure.
function glob_to_nodes(files, options) {
  var tree = {};

  files.forEach(function (file) {
    var parts = file.split('/')
      , file = parts.pop();

    var trunk = parts.reduce(function (trunk, part) {
      if (!trunk[part]) {
        trunk[part] = {};
      }
      return trunk[part];
    }, tree);

    if (!trunk._files) {
      trunk._files = [];
    }

    if (file) {
      trunk._files.push(file);
    }
  });

  return {nodes: tree_to_nodes(tree, options)};
}

// Convert tree to nodes structure.
function tree_to_nodes(tree, options, depth) {
  var nodes = [];
  if (!depth) depth = 0;
  if (options.depth && depth >= options.depth) return nodes;

  Object.keys(tree).forEach(function (key) {
    if (key === '_files') {
      if (!options.structure) {
        nodes = nodes.concat(tree[key]);
      }
    }
    else {
      var node = {label: key + path.sep};
      node.nodes = tree_to_nodes(tree[key], options, depth+1);
      if (node.nodes.length === 0) {
        delete node.nodes;
      }
      nodes.push(node);
    }
  });

  return nodes;
}
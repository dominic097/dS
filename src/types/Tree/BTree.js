/**
 * Created by dominic on 24/11/16.
 */

'use strict';

let dS = require('../../dS');
const LEFT = Symbol('left'); //'left';
const RIGHT = Symbol('right'); //'right';
const PARENT = Symbol('parent'); //'parent';


class BTree extends dS {

    constructor(init) {
        super();
        this.setDefaultValue(init);
    }

    setDefaultValue(_default) {
        this.root = false;
        this.visiting = null;
        this.traversing = [];
        this.length = 0;
        this.nodePropName = _default && _default.nodePropName ? _default.nodePropName : false;

        //Overriding comparison callback function
        this.compare = _default && _default.compare ? _default.compare : this.lessThanEquals;
        this.equals = _default && _default.equals ? _default.equals : this.equals;
    }

    /**
     * represent a NODE in a BTree
     * @param d dataSet value
     * @param left LEFT ~Pointer
     * @param right RIGHT ~Pointer
     * @returns {{data: *}}
     */
    node(d, left, right) {

        var _node = {[LEFT]: left, 'data': d, [RIGHT]: right};

        return _node;
    }

    /**
     * Function to Added data / element in the form of BTree
     * @param d
     * @returns {BTree}
     */
    add(d) {
        var _nodeToAdd = this.node(d),
            _currentNode = this.root;

        if (!this.root) {
            this.root = _nodeToAdd;
        }
        else {
            let breakLoop = false,
                _index = 0;
            while (_currentNode && !breakLoop) {
                let cmp = this.compare(_nodeToAdd.data, _currentNode.data, this.nodePropName);

                if (cmp) {
                    if (!_currentNode[LEFT]) {
                        _currentNode[LEFT] = _nodeToAdd;
                        breakLoop = true;
                    }
                    _currentNode = _currentNode[LEFT];
                }
                else {
                    if (!_currentNode[RIGHT]) {
                        _currentNode[RIGHT] = _nodeToAdd;
                        breakLoop = true;
                    }
                    _currentNode = _currentNode[RIGHT];
                }
                _index++;
            }

        }
        this.length++;
        return this;
    }

    /**
     * Search for existence of a Node in Btree
     * @param d
     * @returns {boolean|*|{data: *}}
     */
    search(d) {
        if (this.equals(this.root.data, d, this.nodePropName)) {
            return this.root;
        }
        else {
            let _currentNode = this.root,
                _nodeToReturn = this.root;
            while (_currentNode) {
                if (this.equals(_currentNode.data, d, this.nodePropName)) {
                    _nodeToReturn = _currentNode;
                    _currentNode = null;
                }
                else {
                    let cmp = this.compare(d, _currentNode.data, this.nodePropName);
                    if (cmp)
                        _currentNode = _currentNode[LEFT];

                    else
                        _currentNode = _currentNode[RIGHT];
                }
            }
            return _nodeToReturn;
        }
    }

    /**
     * Returns True if Node exist in Btree
     * @param d Node to check its existence
     * @returns {boolean}
     */
    contains(d) {
        if (this.isUndefined(d)) {
            return false;
        }
        return this.search(d) !== undefined;
    }

    /**
     * Reset BTree - will clear all data
     * @param cf
     */
    reset(cf) {
        this.setDefaultValue(cf ? cf : false);
    }

    /**
     * Gets Node with minimum value of BTree
     * @returns {{data} | false}
     */
    getMinimumValue(node) {

        if (this.isEmpty())
            return false;

        var node = node ? node : this.root;
        while (node[LEFT] !== undefined) {
            node = node[LEFT];
        }
        return node;
    }

    /**
     * Gets Node with maximum value of BTree
     * @returns {{data} | false}
     */
    getMaximumValue(node) {

        if (this.isEmpty())
            return false;

        var node = node ? node : this.root;
        while (node[RIGHT] !== undefined) {
            node = node[RIGHT];
        }
        return node;
    }

    /**
     * Executes the provided function once per element present in the tree in in-order.
     * @param {function(Object):*} callback Function to execute, invoked with an element as
     * argument. To break the iteration you can optionally return false in the callback.
     */
    inorderTraversal(callback) {

        function inorderRecursive(node, callback, signal) {
            if (node === undefined || signal.stop) {
                return;
            }
            inorderRecursive(node[LEFT], callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.data) === false;
            if (signal.stop) {
                return;
            }
            inorderRecursive(node[RIGHT], callback, signal);
        }

        inorderRecursive(this.root, callback, {
            stop: false
        });
    }

    /**
     * Executes the provided function once per element present in the tree in pre-order.
     * @param {function(Object):*} callback Function to execute, invoked with an element as
     * argument. To break the iteration you can optionally return false in the callback.
     */
    preorderTraversal(callback) {

        function preorderRecursive(node, callback, signal) {
            if (node === undefined || signal.stop) {
                return;
            }
            signal.stop = callback(node.data) === false;
            if (signal.stop) {
                return;
            }
            preorderRecursive(node[LEFT], callback, signal);
            if (signal.stop) {
                return;
            }
            preorderRecursive(node[RIGHT], callback, signal);
        }

        preorderRecursive(this.root, callback, {
            stop: false
        });
    };

    /**
     * Executes the provided function once per element present in the tree in post-order.
     * @param {function(Object):*} callback Function to execute, invoked with an element as
     * argument. To break the iteration you can optionally return false in the callback.
     */

    postorderTraversal(callback) {

        function postorderRecursive(node, callback, signal) {
            if (node === undefined || signal.stop) {
                return;
            }
            postorderRecursive(node[LEFT], callback, signal);
            if (signal.stop) {
                return;
            }
            postorderRecursive(node[RIGHT], callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.data) === false;
        }


        postorderRecursive(this.root, callback, {
            stop: false
        });
    };


    delete(d) {

        function traverse(d, node) {

            if (this.equals(d, node.data, this.nodePropName)) {
                removeNode.apply(this, node);
            }
            if (this.compare(d, node, this.nodePropName)) {
                node[PARENT] = node;
                traverse.apply(this, [d, node[LEFT]]);
            }
            else {
                node[PARENT] = node;
                traverse.apply(this, [d, node[RIGHT]]);
            }
        }

        function removeNode(node) {

            // case #1 if node to remove has both child's
            if (!this.isUndefined(node[LEFT]) && !this.isUndefined(node[RIGHT])) {
                let _successor = this.getMinimumValue(node[RIGHT]);
                node.data = _successor.data;
                traverse.apply(this, [_successor.data, _successor]);
            }
            // case #2 if node has only left child
            else if (!this.isUndefined(node[LEFT])) {
                if (!node[PARENT]) {
                    this.root[LEFT] = node[LEFT];
                }
                else
                    node[PARENT][LEFT] = node[LEFT];
            }
            // case #3 if node has only right child
            else if (!this.isUndefined(node[RIGHT])) {
                if (!node[PARENT]) {
                    this.root[LEFT] = node[LEFT];
                }
                else
                    node[PARENT][RIGHT] = node[RIGHT];
            }

        }


        traverse.apply(this, [d, this.root]);

    }

    get(d) {
        if (this.isUndefined(d)) {
            return false;
        }
        return this.search(d);
    }

    has(d) {
        return this.contains(d);
    }

}

// var bT = new BTree({nodePropName: 'name'});
// var lst = [87, 45, 25, 36, 54, 85, 100, 26, 31, 34, 56, 75];
// for (var i = 0; i < 10; i++) {
//     bT.add({name: lst[i]});
// }
//
// bT.inorderTraversal(function (d) {
//     console.log(d);
// });
//
// bT.delete(31)
//
// bT.inorderTraversal(function (d) {
//     console.log(d);
// });
//
// bT.search({name: lst[5]});
// console.log(bT);

module.exports = BTree;
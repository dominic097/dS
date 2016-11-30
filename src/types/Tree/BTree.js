/**
 * Created by dominic on 24/11/16.
 */

'use strict';

import {dS} from '../../dS';
const LEFT = Symbol('left'); //'left';
const RIGHT = Symbol('right'); //'right';


export default class BTree extends dS {

    constructor(init) {
        super();
        this.setDefaultValue(init);
    }

    setDefaultValue(_default) {
        this.root = false;
        this.visiting = null;
        this.traversing = [];
        this.length = 0;

        //Overriding comparison callback function
        this.compare = _default && _default.compare ? _default.compare : this.lessThanEquals;
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
                let cmp = this.lessThanEquals(_nodeToAdd.data, _currentNode.data);

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
        if (this.equals(this.root.data, d)) {
            return this.root;
        }
        else {
            let _currentNode = this.root,
                _nodeToReturn = this.root;
            while (_currentNode) {
                if (this.equals(_currentNode.data, d)) {
                    _nodeToReturn = _currentNode;
                    _currentNode = null;
                }
                else {
                    let cmp = this.compare(d, _currentNode.data);
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
    getMinimumValue() {

        if (this.isEmpty())
            return false;

        var node = this.root;
        while (node[LEFT] !== undefined) {
            node = node[LEFT];
        }
        return node;
    }

    /**
     * Gets Node with maximum value of BTree
     * @returns {{data} | false}
     */
    getMaximumValue() {

        if (this.isEmpty())
            return false;

        var node = this.root;
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


    delete(k) {
        // return this._wm.delete(k)
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
// var lst = [87, 45, 25, 36, 54, 85, 100, 25, 31, 34, 56, 75];
// for (var i = 0; i < 10; i++) {
//     bT.add({name: lst[i]});
// }
//
// bT.search({name: lst[5]});
// console.log(bT);

/**
 * Created by dominic on 19/11/16.
 */

'use strict';

import {dS} from '../../dS';
const PREV = Symbol('prev'); //'prev';
const NEXT = Symbol('next'); //'next';

export default class linkedList extends dS {

    constructor() {
        super();
        this.first = null;
        this.last = null;
        this.length = 0;
        this.currentNode = 0;
        this.doubleLinkedLst = false;
    }

    [Symbol.iterator]() {
        var i = 0, _nodeToReturn = this.getFirst(), _this = this;
        return {
            next: () => {
                if (i++ > 0)
                    _nodeToReturn = (_nodeToReturn[NEXT] ? _nodeToReturn[NEXT] : null);
                return {
                    value: _nodeToReturn,
                    done: _nodeToReturn == null && !_this.hasNext(_nodeToReturn)
                }
            }
        };
    }

    /**
     * represent a NODE in a linked list
     * @param d dataSet value
     * @param prev PREV ~Pointer
     * @param next NEXT ~Pointer
     * @returns {{data: *}}
     */
    node(d, prev, next) {
        return {[PREV]: prev, 'data': d, [NEXT]: next};
    }

    /**
     * Utility fn
     * @param link dataStructure of type node
     * @returns {boolean}
     */
    hasNext(link) {
        return (link && link[NEXT] != null) ? true : false;
    }

    /**
     * get the first Element of Linked List
     */
    getFirst() {
        return this.return(this.first);
    };

    /**
     * get the last Element of Linked List
     */
    getLast() {
        return this.return(this.last);
    };

    /**
     * reset the linkedList dataStructure
     */
    reset() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }

    /**
     * return True if dataSet is not empty
     * @returns {boolean}
     */
    isEmpty() {
        return this.length <= 0;
    }

    /**
     * get the size of give dataSet
     * @returns {number|*}
     */
    size() {
        return this.length;
    }

    /**
     * helper method to compute dataSet Addition
     * @param value dataSet value
     * @returns {null|{data}}
     */
    add(value) {
        if (!this.first) {
            this.first = this.last = this.node(value, null, null);
        }
        else if (this.last) {
            let prev = this.doubleLinkedLst ? this.last[NEXT] : null;
            let _node = this.node(value, prev, null);
            this.last[NEXT] = _node;
            this.last = _node;
        }
        this.length++;
        return this;
    }

    /**
     * helper method to remove and return dataSet
     * @param position index / valueAt() from where to remove. default value is set be zero
     * @returns {null|{data}}
     */
    remove(position) {
        let _nodeToRemove = this.getFirst(),
            _prevNode = _nodeToRemove,
            i = 0;
        position = position ? position : 0;
        if (position === 0) {
        }
        else {
            position = position >= this.length ? this.length - 1 : position;
            while (i++ < position && i < this.length) {
                _prevNode = _nodeToRemove;
                _nodeToRemove = _nodeToRemove[NEXT];
            }
            if (position === this.length - 1) {
                this.last = _prevNode;
            }
        }
        this.length -= _nodeToRemove ? 1 : 0;
        return _nodeToRemove;
    }

    /**
     * Return / to get the element @position <index-INT>
     * @param position Index at which data to be returned
     * @returns {{data}}
     */
    nodeAtIndex(position) {
        let i = 0, _nodeToRetrun = this.getFirst();
        while (i++ < position) {
            _nodeToRetrun = _nodeToRetrun[NEXT];
        }
        return _nodeToRetrun;
    }

    /**
     * finds the index of give dataSet
     * @param datum
     * @param equalsCB
     */
    indexOf(datum, equalsCB) {
        let _index = 0,
            _equals = equalsCB || this.equals,
            _node = this.first,
            _break = false;
        while (_node && !_break) {
            if (_equals(datum, _node.data)) {
                _break = true;
            }
            _node = _node[NEXT];
            _index++;
        }
        return _break ? _index : -1;
    }

    /**
     * returns true if datum is present in give linked List
     * @param datum
     * @param equalsCB
     * @returns {boolean}
     */
    has(datum, equalsCB) {
        return (this.indexOf(datum, equalsCB) >= 0);
    }

}



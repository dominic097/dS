/**
 * Created by dominic on 19/11/16.
 * Unit Test Case for linkedList data Type
 */

import {should} from 'should';
import {assert} from 'assert';
import {LinkedList} from '../types/LinkedList/singleList';

describe("UT for linkedList", function () {
    "use strict";

    it("basic function exist Check ", function (done) {
        var linkedList = new LinkedList();
        should.exist(linkedList.node);
        should.exist(linkedList.hasNext);
        should.exist(linkedList.getFirst);
        should.exist(linkedList.getLast);
        should.exist(linkedList.reset);
        should.exist(linkedList.isEmpty);
        should.exist(linkedList.size);
        should.exist(linkedList.add);
        should.exist(linkedList.remove);
        should.exist(linkedList.nodeAtIndex);
        should.exist(linkedList.indexOf);
        should.exist(linkedList.has);
        Object.getOwnPropertySymbols(linkedList.node({})).length.should.equal(2);
        done();
    });

    describe("single linked list ", function () {
        it("add / remove data", function (done) {
            var _link = new LinkedList();
            for (var i = 0; i < 10; i++)
                _link.add(i);
            _link.length.should.equal(i);
            for (var i = 0; i < 10; i++)
                _link.add(i);
            _link.remove(5).should.containEql({data: 5});
            done();
        });
    });

    describe("testing iterability of type single linked list ", function () {
        it("iterate 10 Elements", function (done) {
            var _link = new LinkedList(), length = 0;
            for (var i = 0; i < 10; i++)
                _link.add(i);

            for (var o of _link) {
                length++;
            }

            length.should.equal(_link.length);
            done();
        })
    })

    it("single linked List nodeAtIndex ", function (done) {
        var _link = new LinkedList(), length = 0;
        for (var i = 0; i < 10; i++)
            _link.add(i);

        _link.nodeAtIndex(5).should.containEql({data: 5});
        done();
    });

    it("single linked List indexOf  ", function (done) {
        var _link = new LinkedList(), length = 0;
        for (var i = 1; i < 10; i++)
            _link.add(i);

        _link.indexOf(5).should.equal(5);
        done();
    });

    it("single linked List has  ", function (done) {
        var _link = new LinkedList(), length = 0;
        for (var i = 1; i < 10; i++)
            _link.add(i);

        _link.has(5).should.equal(true);
        done();
    });

    it("single linked List reset  ", function (done) {
        var _link = new LinkedList(), length = 0;
        for (var i = 1; i < 10; i++)
            _link.add(i);

        _link.reset();
        _link.length.should.equal(0);
        done();
    });

    it("single linked List get size", function (done) {
        var _link = new LinkedList(), length = 0;
        for (var i = 0; i < 10; i++)
            _link.add(i);
        _link.size().should.equal(10);
        done();
    });

    it("single linked List isEmpty", function (done) {
        var _link = new LinkedList(), length = 0;
        _link.isEmpty().should.equal(true);
        for (var i = 1; i < 10; i++)
            _link.add(i);
        _link.isEmpty().should.equal(false);
        done();
    });

    it("single linked List getLast", function (done) {
        var _link = new LinkedList(), length = 0;
        for (var i = 1; i < 10; i++)
            _link.add(i);
        _link.getLast().data.should.equal(9);
        done();
    });

});


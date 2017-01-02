/**
 * Created by dominic on 28/11/16.
 * Unit Test Case for BTree data Type
 */

"use strict";
var should = require("should"),
    assert = require("assert"),
    BTree = require('../types/Tree/BTree');


describe("UT for BTree", function () {

    it("basic function exist Check ", function (done) {
        var bTree = new BTree();
        should.exist(bTree.node);
        should.exist(bTree.setDefaultValue);
        should.exist(bTree.add);
        should.exist(bTree.search);
        should.exist(bTree.contains);
        should.exist(bTree.reset);
        should.exist(bTree.getMinimumValue);
        should.exist(bTree.getMaximumValue);
        should.exist(bTree.inorderTraversal);
        should.exist(bTree.preorderTraversal);
        should.exist(bTree.postorderTraversal);
        should.exist(bTree.get);
        should.exist(bTree.has);
        done();
    });

    it("UT for BTree setDefaultValue", function (done) {
        var fn = ()=> {
                return 2
            },
            bTree_withConfig = new BTree({compare: fn});
        bTree_withConfig.compare().should.equal(2);
        done();
    });

    it("UT for BTree addition", function (done) {
        var _bTree = new BTree();

        for (var i = 0; i < 10; i++)
            _bTree.add(Math.random() * 100);

        _bTree.size().should.equal(10);
        done();
    });

    it("UT for BTree search", function (done) {
        var _bTree = new BTree();

        for (var i = 0; i < 10; i++)
            _bTree.add(i);

        _bTree.search(8).should.containEql({data: 8});
        done();
    });

    it("UT for BTree get", function (done) {
        var _bTree = new BTree();

        for (var i = 0; i < 10; i++)
            _bTree.add(i);

        _bTree.get(8).should.containEql({data: 8});
        done();
    });

    it("UT for BTree get-ve", function (done) {
        var _bTree = new BTree();

        _bTree.get(8).should.equal(false);
        done();
    });

    it("UT for BTree contains", function (done) {
        var _bTree = new BTree();

        for (var i = 0; i < 10; i++)
            _bTree.add(i);

        _bTree.contains(8).should.equal(true);
        done();
    });

    it("UT for BTree has", function (done) {
        var _bTree = new BTree();

        for (var i = 0; i < 10; i++)
            _bTree.add(i);

        _bTree.has(8).should.equal(true);
        done();
    });

    it("UT for BTree reset", function (done) {
        var _bTree = new BTree();

        for (var i = 0; i < 10; i++)
            _bTree.add(i);

        _bTree.reset();
        _bTree.size().should.equal(0);
        done();
    });

    it("UT for BTree getMinimumValue", function (done) {
        var _bTree = new BTree();

        for (var i = 0; i < 10; i++)
            _bTree.add(i);

        _bTree.getMinimumValue().should.containEql({data: 0});
        done();
    });

    it("UT for BTree getMinimumValue-ve", function (done) {
        var _bTree = new BTree();

        _bTree.getMinimumValue().should.equal(false);
        done();
    });

    it("UT for BTree getMaximumValue", function (done) {
        var _bTree = new BTree();

        for (var i = 0; i < 10; i++)
            _bTree.add(i);

        _bTree.getMaximumValue().should.containEql({data: 9});
        done();
    });

    it("UT for BTree getMinimumValue-ve", function (done) {
        var _bTree = new BTree();

        _bTree.getMaximumValue().should.equal(false);
        done();
    });

    it("UT for BTree inorderTraversal", function (done) {
        var _bTree = new BTree();

        for (var i = 0; i < 10; i++)
            _bTree.add(i);

        _bTree.inorderTraversal(new Function());
        done();
    });

    it("UT for BTree preorderTraversal", function (done) {
        var _bTree = new BTree();

        for (var i = 0; i < 10; i++)
            _bTree.add(i);

        _bTree.preorderTraversal(new Function());
        done();
    });

    it("UT for BTree postorderTraversal", function (done) {
        var _bTree = new BTree();

        for (var i = 0; i < 10; i++)
            _bTree.add(i);

        _bTree.postorderTraversal(new Function());
        done();
    });

    it("UT for BTree remove", function (done) {
        var _bTree = new BTree({nodePropName: 'name'}),
            lst = [87, 45, 25, 36, 54, 85, 100, 26, 31, 34, 56, 75];

        for (var i = 0; i < 10; i++) {
            _bTree.add({name: lst[i]});
        }

        _bTree.delete({name: 87});

        if (!_bTree.contains({name: 87}))
            done();
        else {
            done("UT for BTree remove --> failed to remove node")
        }
    });

});
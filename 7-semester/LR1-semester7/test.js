import 'jsdom-global';
import {JSDOM} from 'jsdom';
global.document = new JSDOM();
let dom;
let window;
import fetchMock from 'fetch-mock';

const fetchData = require('./src/fetchData');

import {assert} from 'chai';
import sinon from 'sinon';
import {data} from './src/data-for-test/test-data';
import {unsuccessfulData} from "./src/data-for-test/unsuccessful-result";

describe (('fetch testing'), () => {

    it('output data is correct', ()=> {
        fetchMock.mock('url', 200);

        new Promise(resolve => {
            fetchData.fetchData('url')
        })
            .then(function (res) {
                assert.equal(res.success, true)
                })
            .catch(function (e) {
                console.log(e);
            });

        fetchMock.restore();
    });

    it('output data is uncorrect', ()=> {
        fetchMock.mock('url', 500);

        new Promise(resolve => {
            fetchData.fetchData('url')
        })
            .then(function (res) {
                assert.equal(res.success, false)
            })
        .catch(function (e) {
            console.log(e);
        });

    fetchMock.restore();
});

    it('fetch happen by right url', ()=>{
        sinon.stub(fetchData, 'fetchData').callsFake(function (url) {
            assert.equal(url, 'http:lala')
        });

        new Promise(resolve => fetchData.fetchData('http:lala'))
            .catch(function (e) {
                console.log(e);
            });
        fetchData.fetchData.restore();
    });

    it('fetch successful', ()=>{
        sinon.stub(fetchData, 'fetchData').callsFake(function () {
            return data;
        });
        new Promise(resolve => {
            fetchData.fetchData()
        })
            .then(function (res) {
                fetchData.handleResponse(res, function (err, data) {
                    assert.equal(data.data.name, 'London')
                })
        })
            .catch(function (e) {
                console.log(e);
            });
        fetchData.fetchData.restore();
    });

    it('fetch is not successful', ()=>{
        sinon.stub(fetchData, 'fetchData').callsFake(function () {
            return {'success': false, 'err': 'some error'};
        });
        new Promise(reject => {
            fetchData.fetchData()
        })
            .then(function (res) {
                fetchData.handleResponse(res, function (err, data) {
                    assert.equal(err, 'some error')
                })
            })
            .catch(function (e) {
                console.log(e);
            });
    })
});

describe (('help function testing'), () => {
    it('load testing: handleResponse called', ()=> {
        sinon.stub(fetchData, 'handleResponse').callsFake(function (res) {
            assert.equal(res.error, 500)
        });
        fetchMock.mock('url', 500);
        fetchData.load('url', () => {});
        fetchMock.restore();
        sinon.restore();
    });
    it('handleResponse: callback is called', ()=> {
        let callback = sinon.spy();
        fetchData.handleResponse(data, callback);
        assert(callback.calledOnce);
    });
    it('handleResponse: result is successful', ()=> {
        let callback = sinon.spy();
        fetchData.handleResponse(data, callback);
        assert.equal(callback.args[0][0], null);
    });
    it('handleResponse: result is unsuccessful', ()=> {
        let callback = sinon.spy();
        fetchData.handleResponse(unsuccessfulData, callback);
        assert.equal(callback.args[0][0], 500);
    });
});
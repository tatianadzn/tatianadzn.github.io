import 'jsdom-global';
import {JSDOM} from 'jsdom';
global.document = new JSDOM();

const fetchData = require('./src/fetchData');

import {assert} from 'chai';
import sinon from 'sinon';
import {data} from './src/test-data';

describe (('fetch testing'), () => {

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
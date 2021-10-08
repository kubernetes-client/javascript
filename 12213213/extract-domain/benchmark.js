const bench = require('nanobench');
const extractDomainDist = require('./dist/extract-domain');
const extractDomain = require('./index');
const url = 'https://www.npmjs.com/package/extract-domain';

const times = 10000;

const timesToLocale = times.toLocaleString();

function extractDomainArray(url) {
    let domain;

    if (url.indexOf('://') > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }

    return domain.split(':')[0].replace('www.', '');
}

function extractDomainRegEx(url) {
    const matches = url.match(/([^\/?#.]+\.[^\/?#.:]+)(?:[\/?#:]|$)/i);

    return matches[1];
}

bench(`extract domain dist ${timesToLocale} times`, b => {
    b.start();

    for (let i = 0; i < times; i++) {
        extractDomainDist(url) === 'npmjs.com';
    }

    b.end();
});

bench(`extract domain ${timesToLocale} times`, b => {
    b.start();

    for (let i = 0; i < times; i++) {
        extractDomain(url) === 'npmjs.com';
    }

    b.end();
});

bench(`extract domain with tld ${timesToLocale} times`, b => {
    b.start();

    for (let i = 0; i < times; i++) {
        extractDomain(url, { tld: true }) === 'npmjs.com';
    }

    b.end();
});

bench(`extract domain regex ${timesToLocale} times`, b => {
    b.start();

    for (let i = 0; i < times; i++) {
        extractDomainRegEx(url) === 'npmjs.com';
    }

    b.end();
});

bench(`extract domain array hack ${timesToLocale} times`, b => {
    b.start();

    for (let i = 0; i < times; i++) {
        extractDomainArray(url) === 'npmjs.com';
    }

    b.end();
});

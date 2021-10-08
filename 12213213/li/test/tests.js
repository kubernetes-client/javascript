var should = require('chai').should();
var li     = require('../lib');

var fixture = '</api/users?page=0&per_page=2>; rel="first", ' +
              '</api/users?page=1&per_page=2>; rel="next", ' +
              '</api/users?page=3&per_page=2>; rel="last", ' +
              '</api/users/123>; rel="self", ' +
              '</api/users/123?filter=my;ids=1,2,3>; rel="filtered", ' +
              '</api/users/12345>; rel="related alternate", ' +
              '</api/users?name=Joe+Bloggs>; rel="http://example.org/search-results", ' +
              '</api/users?status=registered>; rel="http://example.org/status-result collection", ' +
              '</api/users?q=smith&fields=fname,lname>; rel="search"';

var quotfixture = '</api/users/1>; rel=home,'+
                  '</api/users/2>; rel=only one';



describe('parse-links', function () {
  describe('parse the links!', function(){
    it('it should parse a links string into an object', function () {
      var parsed = li.parse(fixture);
      parsed.first.should.eql('/api/users?page=0&per_page=2');
      parsed.next.should.eql('/api/users?page=1&per_page=2');
      parsed.last.should.eql('/api/users?page=3&per_page=2');
      parsed.self.should.eql('/api/users/123');
      parsed.alternate.should.eql('/api/users/12345');
      parsed.related.should.eql('/api/users/12345');
      parsed['http://example.org/search-results'].should.eql('/api/users?name=Joe+Bloggs');
      parsed['http://example.org/status-result'].should.eql('/api/users?status=registered');
      parsed.collection.should.eql('/api/users?status=registered');
      parsed.search.should.eql('/api/users?q=smith&fields=fname,lname');
      Object.keys(parsed).length.should.eql(11);
    });
  });

  describe('parse links without quotes!', function() {
    it('should parse a links string without rels into an object', function () {
      var parsed = li.parse(quotfixture);
      parsed.home.should.eql('/api/users/1');
      parsed.only.should.eql('/api/users/2');
      parsed.one.should.eql('/api/users/2');
    });
  });

  describe('with extra param (issue #6)', function() {
    it('should return the links', function() {
      var parsed = li.parse('</3>; rel="next", </2>; rel="prev", </home>; rel="up"; rev="home", </void>; rel="ignored"');
      parsed.next.should.eql('/3');
      parsed.prev.should.eql('/2');
      parsed.up.should.eql('/home');
    });

    it('should return the complete parsed object when using extended true', function() {
      var parsed = li.parse('</3>; rel="next", </2>; rel="prev", </home>; rel="up"; rev="home", </void>; rel="ignored"', { extended: true });
      parsed[0].link.should.equal('/3');
      parsed[0].rel[0].should.equal('next');

      parsed[1].link.should.equal('/2');
      parsed[1].rel[0].should.equal('prev');

      parsed[2].link.should.equal('/home');
      parsed[2].rel[0].should.equal('up');
      parsed[2].rev[0].should.equal('home');
    });
  });

  describe('links without rel (issue #7)', function() {
    it('should return the links', function() {
      var parsed = li.parse('</3>; rel="next", </2>; rel="prev", </home>, </void>; rel="ignored"');
      parsed.next.should.eql('/3');
      parsed.prev.should.eql('/2');
      parsed.ignored.should.eql('/void');
    });

    it('should return the links with extended param', function() {
      var parsed = li.parse('</3>; rel="next", </2>; rel="prev", </home>, </void>; rel="ignored"', { extended: true });
      parsed[0].rel[0].should.eql('next');
      parsed[0].link.should.eql('/3');
      parsed[1].rel[0].should.eql('prev');
      parsed[1].link.should.eql('/2');
      parsed[2].link.should.eql('/home');
    });
  });


});

describe('stringify link object', function(){
  it('should return a string with the links', function() {
    var linksObject = {
      first                                        : '/api/users?page=0&per_page=2',
      next                                         : '/api/users?page=1&per_page=2',
      last                                         : '/api/users?page=3&per_page=2',
      self                                         : '/api/users/123',
      filtered                                     : '/api/users/123?filter=my;ids=1,2,3',
      'related alternate'                          : '/api/users/12345',
      'http://example.org/search-results'          : '/api/users?name=Joe+Bloggs',
      'http://example.org/status-result collection': '/api/users?status=registered',
      'search'                                     : '/api/users?q=smith&fields=fname,lname'
    };
    var stringified = li.stringify(linksObject);
    stringified.should.equal(fixture);
  });

  it('should group links', function() {
    var linksObject = {
      last : '/things?page=10&per_page=20',
      next : '/things?page=10&per_page=20',
    };
    var stringified = li.stringify(linksObject);
    stringified.should.equal('</things?page=10&per_page=20>; rel="last next"');
  });
});

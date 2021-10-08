var output = {};
output.newConcatenator = function(initial){
  if (initial==null) {
    initial="";
  }
  initial=initial+"";
  this.head = {
    value: initial,
    next: null
  };
  this.end = this.head;
  this.append = function(addition){
    this.end.next = {
      value: addition,
      next: null
    };
    this.end = this.end.next;
  };
  this.getResult = function(){
    while(this.head.next != null) {
      var workingNode = this.head;
      while (workingNode != null) {
        if (workingNode.next != null) {
          workingNode.value = workingNode.value + workingNode.next.value;
          workingNode.next = workingNode.next.next;
        }
        workingNode = workingNode.next;
      }
    }
    return this.head.value;
  };
};
module.exports = exports = output;

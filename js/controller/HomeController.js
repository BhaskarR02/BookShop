
/*module.exports = function currentTime(){
  var dt  = new Date();
  return dt;


};
module.exports = function add(a,b){
  return a+b;

}*/
module.exports = {
  currentTime:function(){
     var dt  = new Date();
         return dt;
  },

  add : function(a,b){
  	  console.log(a+b);
      return a+b;
  },
  subtract:function(a,b){
   console.log()
   return a-b;
  }
};

module.exports={
  _storeUserInfo:function(userName,userId){
      if(typeof(Storage) !== "undefined"){
          localStorage.setItem('_bookShop_123UserId', userId);
          localStorage.setItem('_bookShop_123UserName', userName);
       }
      else{
        console.log(" Storage is not supported by Browser");
      }
    
  },

  _removeUserInfo:function(){
       localStorage.removeItem('_bookShop_123UserId');
       localStorage.removeItem('_bookShop_123UserName');

  },

  isUserLogged :function(){
      var userObject ={
        userId:localStorage._bookShop_123UserId,
        userName:localStorage._bookShop_123UserName
       }
       return userObject;

  }





}
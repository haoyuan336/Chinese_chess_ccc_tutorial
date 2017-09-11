/**
 * Created by chu on 2017/9/11 0011.
 */
const EventListener = function (obj) {
  var Regisiter = {};
  obj.on = function (name, method) {
    if (!Regisiter.hasOwnProperty(name)){
      Regisiter[name] = [];
    }
    Regisiter[name].push(method);
  };
  obj.fire = function (name) {
    if (Regisiter.hasOwnProperty(name)){
      var handlerList = Regisiter[name];
      for (let i = 0 ; i < handlerList.length ; i ++){
        var handler = handlerList[i];
        var args = [];
        for (let j = 1 ; j < arguments.length ; j ++){
          args.push(arguments[j]);
        }
        handler.apply(this, args);
      }
    }
  };
  obj.off = function (name, method) {
    if (Regisiter.hasOwnProperty(name)){
      var handler = Regisiter[name];
      for (let i = 0 ; i < handler.length ; i ++){
        if (handler[i] === method){
          handler.splice(i ,  1);
        }
      }
    }
  };
  obj.removeAllListeners = function () {
    Regisiter = {};
  };

  return obj;
};
export default EventListener;
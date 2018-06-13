(function($) {
    $.LocalData = function(action,data_name,data_value) {
        
        if(('localStorage' in window && window['localStorage'] !== null) && typeof(Storage) !== "undefined") {
            this.CheckLocalStorage = true;
        }
        
    }
    $.LocalData.CheckLocalStorage = false;
})(jQuery);
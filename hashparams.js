// """"""""""hashParams.js""""""""""

// """""Object"""""
function HashParams(hashParams) {
    var hashParams = hashParams || "#";
    
    if (typeof hashParams === "string") {
        if (hashParams.length <= 0 || !hashParams.match(/#/) )
            hashParams = "#";
        
        this.params = HashParams.Helpers.parseHashParams(hashParams);
    }
    if (typeof hashParams === "object")
        this.params = hashParams;
    
    return this;
}
HashParams.prototype.getHash = function () {
    return HashParams.Helpers.getHash(this.params);
};
HashParams.prototype.addParams = function (objOrKey, value) {
    var objOrKey = objOrKey || {};
    
    if (typeof objOrKey === "string") {
        var key = objOrKey;
        value = value || "";
        
        this.params[key] = this.params[key] || [];
        this.params[key][this.params[key].length] = value;
    }
    else {
        for (var key in objOrKey) {
            value = objOrKey[key];
            this.params[key] = this.params[key] || [];
            
            if (typeof value == "object") {
                for (var i = 0; i < value.length; i++) {
                    this.params[key][this.params[key].length] = value[i];
                }
            }
            else {
                this.params[key][this.params[key].length] = value;
            }
        }
    }
    return this;
};
HashParams.prototype.removeParams = function (arrOrKey) {
    var arrOrKey = arrOrKey || "";
    
    if (typeof paramsOrKey === "string") {
        var key = arrOrKey;
        delete this.params[key];
    }
    else {
        for (var i = 0; i < arrOrKey.length; i++) {
            var key = arrOrKey[i];
            delete this.params[key];
        }
    }
    return this;
};

// """""Helpers"""""
HashParams.Helpers = {};
HashParams.Helpers.parseHashParams = function(url) {
    if (typeof url === "object")
        return url;
    
    var url = url || window.location.href,
        queryStart = url.indexOf("#") + 1, 
        queryEnd   = url.length + 1, 
        query = url.slice(queryStart, queryEnd - 1); 
    
    if (query === url || query === "" || queryStart === 0)
        return {};
    
    var pairs = query.replace(/\+/g, " ").split("&"), // seperate URL params
        parms = {}, i, pairKey, pairValue, pair; // prepare for the output
    
    for (i = 0; i < pairs.length; i++) {
        pair = pairs[i].split("="); // seperate the pair into its key & value
        pairKey   = decodeURIComponent(pair[0]); // decode the URL
        pairValue = decodeURIComponent(pair[1]); // decode the URL
        
        if (!parms.hasOwnProperty(pairKey)) // check if the parms array not has the pair
            parms[pairKey] = []; // if not, add it as a blank array
        
        parms[pairKey].push(pair.length === 2 ? pairValue : null); // push value to the parms array
    }
    return parms; // finally, return the parms array
};
HashParams.Helpers.getHash = function(params) {
    var params = params || {},
        hash = "#";

    for (var property in params) {
        property = encodeURIComponent(property);
        
        if (hash !== "#") 
            hash += "&";
        
        if (typeof params[property] == "object" && params[property].length > 1) 
            for (var i = 0; i < params[property].length; i++) {
                if (hash !== "#" && !hash.match(/&$/) ) 
                    hash += "&";
                
                params[property][i] = encodeURIComponent(params[property][i]);
                hash += property + "=" + params[property][i];
            }
        else {
            params[property] = encodeURIComponent(params[property]);
            hash += property + "=" + params[property];
        }
    }
    return hash;
};





























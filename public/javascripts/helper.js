var helper = (function() {
    var createRowDiv = function() {
        var row = document.createElement('div');
        row.setAttribute('class', 'row');
        return row;
    }

    var createColDiv = function(additionalClass, width) {
        var col = document.createElement('div');
        col.setAttribute('class', additionalClass + ' col-md-' + width);
        return col;
    }

    var createInput = function(type, placeholder, className) {
        var input = document.createElement('input');
        input.setAttribute('type', type);
        input.setAttribute('placeholder', placeholder);
        input.setAttribute('class', 'form-control ' + className);
        return input;
    }

    var makePOSTRequest = function(requestURL, data, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', requestURL);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(data));
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === XMLHttpRequest.DONE) {
                callback(null, JSON.parse(xmlhttp.responseText));
            }
        }
    }

    var makeGETRequest = function(requestURL, param, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', requestURL + '?q=' + param);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(null);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === XMLHttpRequest.DONE) {
                callback(null, JSON.parse(xmlhttp.responseText));
            }
        }
    }

    var clearChildrenNodes = function(dom) {
        dom.innerHTML = '';
    }

    return {
        createRowDiv,
        createColDiv,
        createInput,
        makePOSTRequest,
        makeGETRequest,
        clearChildrenNodes
    }
}());
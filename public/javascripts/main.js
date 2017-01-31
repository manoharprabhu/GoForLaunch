var service = (function(helper) {
    'use strict';

    var removeDom = function(dom) {
        dom.parentNode.removeChild(dom);
    }

    var createANewStepDom = function() {
        var step = document.createElement('div');
        step.setAttribute('class', 'step');

        var stepNameRow = helper.createRowDiv();
        var stepNameCol = helper.createColDiv('form-group', 8);
        var stepNameInput = helper.createInput('text', 'Name of the step', 'stepName');
        stepNameRow.appendChild(stepNameCol);
        stepNameCol.appendChild(stepNameInput);

        var stepDescRow = helper.createRowDiv();
        var stepDescCol = helper.createColDiv('form-group', 8);
        var stepDescInput = helper.createInput('text', 'Describe the step', 'stepDesc');
        stepDescRow.appendChild(stepDescCol);
        stepDescCol.appendChild(stepDescInput);

        var stepTimeRow = helper.createRowDiv();
        var stepTimeCol = helper.createColDiv('form-group', 8);
        var stepTimeInput = helper.createInput('number', 'How many seconds does it take to perform this step?', 'stepTime');
        stepTimeRow.appendChild(stepTimeCol);
        stepTimeCol.appendChild(stepTimeInput);

        var removeStepButton = document.createElement('a');
        removeStepButton.setAttribute('href', 'javascript:void(0)');
        removeStepButton.setAttribute('class', 'btn btn-danger btn-sm');
        removeStepButton.textContent = 'Remove Step';
        removeStepButton.onclick = function() {
            removeDom(removeStepButton.parentNode);
        }

        step.appendChild(stepNameRow);
        step.appendChild(stepDescRow);
        step.appendChild(stepTimeRow);
        step.appendChild(removeStepButton);
        return step;
    }

    var addStep = function() {
        var stepDom = createANewStepDom();
        document.getElementById('step-wrapper').appendChild(stepDom);
    }

    var collectStepsData = function() {
        var steps = document.getElementsByClassName('step');
        var stepsArray = [];
        for (var index = 0; index < steps.length; index++) {
            var stepName = steps[index].getElementsByClassName('stepName')[0].value;
            var stepDesc = steps[index].getElementsByClassName('stepDesc')[0].value;
            var stepTime = steps[index].getElementsByClassName('stepTime')[0].value;
            stepsArray.push({
                name: stepName,
                desc: stepDesc,
                time: stepTime
            });
        }
        return stepsArray;
    }

    var collectChecklistData = function() {
        var checklistName = document.getElementById('checklistname').value;
        var checklistDesc = document.getElementById('checklistdesc').value;
        return {
            name: checklistName,
            description: checklistDesc
        }
    }

    var blinkModalWithMessage = function(message, delay) {
        document.getElementsByClassName('modal-box')[0].getElementsByClassName('modal-text')[0].textContent = message;
        document.getElementsByClassName('modal-box')[0].setAttribute('class', 'modal-box visible');
        setTimeout(function() {
            document.getElementsByClassName('modal-box')[0].setAttribute('class', 'modal-box invisible');
        }, delay);
    }

    var finish = function() {
        var steps = collectStepsData();
        var checklistData = collectChecklistData();
        checklistData['steps'] = steps;
        helper.makePOSTRequest('/checklist/create', checklistData, function(error, response) {
            if (error) {
                blinkModalWithMessage('An error occured: ' + error, 2000);
            } else {
                blinkModalWithMessage('Checklist created successfully', 2000);
            }
        });
    }

    var constructChecklistDisplayDOM = function(data) {
        var row = helper.createRowDiv();
        var wrapper = document.createElement('div');
        var nameAndDescCol = helper.createColDiv('', 4);
        var editCol = helper.createColDiv('', 5);
        var playCol = helper.createColDiv('', 1);

        nameAndDescCol.innerText = data.name + ' : ' + data.description;
        editCol.innerHTML = '<a class="btn btn-default btn-lg" href="#">Edit</a>';
        playCol.innerHTML = '<a class="btn btn-success btn-lg" href="#">Play</a>';
        wrapper.setAttribute('class', 'checklist-display-wrapper');

        wrapper.appendChild(row);
        row.appendChild(nameAndDescCol);
        row.appendChild(editCol);
        row.appendChild(playCol);

        return wrapper;
    }

    var getChecklists = function(event) {
        var inputText = event.target.value;
        if (inputText.length < 2) {
            return;
        }
        helper.makeGETRequest('/browse/getChecklists', inputText, function(error, response) {
            if (error) {
                console.log(error);
                return;
            }

            helper.clearChildrenNodes(document.getElementsByClassName('checklist-wrapper')[0]);
            for (var index = 0; index < response.length; index++) {
                var checklist = response[index];
                var checklistDom = constructChecklistDisplayDOM(checklist);
                document.getElementsByClassName('checklist-wrapper')[0].appendChild(checklistDom);
            }
        });
    }

    return {
        addStep,
        finish,
        getChecklists
    }
}(helper));
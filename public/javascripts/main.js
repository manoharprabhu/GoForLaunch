var service = (function(helper) {
    'use strict';

    var removeDom = function(dom) {
        dom.parentNode.removeChild(dom);
    }

    var createANewStepDom = function() {
        var step = document.createElement('div');
        step.setAttribute('class', 'step');

        var stepNameRow = helper.createRowDiv();
        var stepNameCol = helper.createColDiv(8);
        var stepNameInput = helper.createInput('text', 'Name of the step', 'stepName');
        stepNameRow.appendChild(stepNameCol);
        stepNameCol.appendChild(stepNameInput);

        var stepDescRow = helper.createRowDiv();
        var stepDescCol = helper.createColDiv(8);
        var stepDescInput = helper.createInput('text', 'Describe the step', 'stepDesc');
        stepDescRow.appendChild(stepDescCol);
        stepDescCol.appendChild(stepDescInput);

        var stepTimeRow = helper.createRowDiv();
        var stepTimeCol = helper.createColDiv(8);
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

    var finish = function() {
        var steps = collectStepsData();
        var checklistData = collectChecklistData();
        checklistData['steps'] = steps;
        helper.makePOSTRequest('/checklist/create', checklistData, function(error, response) {
            console.log(response);
        });
    }

    var getChecklists = function(event) {
        var inputText = event.target.value;
        helper.makeGETRequest('/browse/getChecklists', inputText, function(error, response) {
            //TODO: populate dom here with the checklists
        });
    }

    return {
        addStep,
        finish,
        getChecklists
    }
}(helper));
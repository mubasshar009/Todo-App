var list = document.getElementById("list");

function addItem() {

    var input = document.getElementById("input");

    if (input.value == "") {
        alert("Enter Something");
    } else {
        //Create li 
        var li = document.createElement("li");
        var text = document.createTextNode(input.value);

        li.appendChild(text);
    }

    //Edit Button;
    var editBtn = document.createElement("button");
    var textEdit = document.createTextNode("Edit");

    editBtn.appendChild(textEdit);

    editBtn.setAttribute("onclick", "editValue(this)")


    //Create Delete Button;
    var delBtn = document.createElement("button");
    var textDel = document.createTextNode("Delete");
    delBtn.appendChild(textDel);

    delBtn.setAttribute("onclick", 'deleteItem(this)')

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
    var key = Math.random() * 999999999999;
    key = key.toFixed();
    var data = {
        key: key,
        value: input.value
    }
    delBtn.setAttribute("id", key)
    editBtn.setAttribute("id", key)

    firebase.database().ref('todo/' + key).set(data)

    input.value = "";

}
function delAll() {
    list.innerHTML = ""
    firebase.database().ref('todo/').remove()
}

function deleteItem(e) {
    e.parentNode.remove()

    var id = e.id;

    firebase.database().ref('todo/').once('child_added', function (data) {
        var Data = data.val()
        if (Data.key === id) {
            firebase.database().ref('todo/' + id).remove()

        }

        else {
            //console.log("Not Done");
        }


    })

}
function editValue(e) {
    var before = e.parentNode.firstChild.nodeValue;
    var after = prompt("Enter New Value");
    e.parentNode.firstChild.nodeValue = after;
    var id = e.id;

    firebase.database().ref('todo/' + id).set({
        key: id,
        value: after
    })
}


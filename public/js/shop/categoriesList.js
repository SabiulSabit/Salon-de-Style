function addNew() {
    let val = document.getElementById('newVal').value 
    //console.log(val)
    document.getElementById('newVal').value =""

    document.getElementById('addNew').innerHTML += `
                            <div class="form-group">
                                <div class="form-check form-control p-2 form-check-inline">
                                    <input class="form-check-input material-inputs" type="checkbox" id="${val}" name="cat" value="${val}" checked>
                                    <label class="form-check-label" for="${val}">${val}</label>
                                </div>
                            </div>
                            `
}
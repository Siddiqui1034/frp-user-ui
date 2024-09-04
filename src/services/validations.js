

const regExpValidations    = {
    "REQUIRED": {
        pattern: /./,
        error: "Input Required"
    },
    "EMAIL": {
        pattern: /^[a-z0-9]{3}[a-zA-Z0-9_$]{0,}@[a-z]{3,7}\.[a-z]{2,3}$/,
        error: "Must be in a valid email address "
    },
    "MIN5CHARS": {
        pattern: /.{5}/,
        error: "Atleast 5 Chars!!!"
    },
    "PHONE_NUMBER": {
        pattern: /^[0-9]{10}$/,
        error: "Must be in 10 digit"
    }
}

function validate(inputControlObj   , inputControls   ) {
    const { criteria, value, compare } = inputControlObj;
    inputControlObj.error = ""

    for (let text of criteria) {
        switch (text) {
            case "SIZE":
                const { size } = value;  // 86
                if (size > 6144) {
                    inputControlObj.error = "File should not exceed 6kb";
                    break;
                } break;
            case "TYPE":
                const { type } = value;
                console.log(type)
                if(!type?.includes('image')){
                    inputControlObj.error = "File should be an image";
                    break;
                }
                break;
            case "COMPARE":
                const compareObj1 = inputControls.find((obj   ) => obj.name === compare[0])
                const compareObj2 = inputControls.find((obj   ) => obj.name === compare[1])
                compareObj1.error = " "
                compareObj2.error = " "
                if (compareObj1.value && compareObj2.value && compareObj1.value !== compareObj2.value) {
                    inputControlObj.error = "Password Mismatch";
                }
                break;
            default:
                const { pattern, error } = regExpValidations[text]
                // debugger;
                if (!pattern.test(value)) {
                    inputControlObj.error = error;
                    break;                   
                }
        }

        if(inputControlObj.error){
            break;
        }
    }
}

export function formValidation(formControls   , setFromControls   ) {
    //    let isFormValid = true
    // const clonedFormControl    = JSON.parse(JSON.stringify(formControls))
    const clonedFormControl = Object.values(Object.assign({}, formControls))
    const dataObj    = {}
    clonedFormControl.forEach((obj   ) => {
       const {name, value, error} = obj;
        dataObj[name] = value;
        if(!value && !error){
            validate(obj, clonedFormControl)
        }
        // validate(obj, dataObj)
        // if(!obj.value){
        //     isFormValid = false;
        //     obj.error = "Please Enter Input Fields"
        // }
    })
    const isFormValid = !clonedFormControl.some((obj   ) => obj.error)
    setFromControls(clonedFormControl)
    return [isFormValid, dataObj]
}

export function fieldValidation(eve   , formControls   , setFromControls   ) {
    const { name, value, type, files } = eve.target
    // console.log(files)  // FileList {0: File, length: 1}
    const clonedFormControl    = JSON.parse(JSON.stringify(formControls))
    const inputControlObj    = clonedFormControl.find((obj   ) => {
        return obj.name === name;
    })
    inputControlObj.error = "";

    if (type === "file") {
        const file = files['0']
        // console.log(file)  // File {name: 'profile.jpg', type: "image/jpeg" lastModified: 1719065542934, lastModifiedDate: Sat Jun 22 2024 19:42:22 GMT+0530 (India Standard Time), webkitRelativePath: '', size: 26260, …}
        // const { type, size } = file
        if(!file){
            console.log(1, inputControlObj)
            return;
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            inputControlObj.src = reader.result;
            inputControlObj.value = file;
            validate(inputControlObj, clonedFormControl)
            setFromControls(clonedFormControl)
        }
        reader.onerror = () => {

        }
    }
    else{
        inputControlObj.value = value;
        validate(inputControlObj, clonedFormControl)
        setFromControls(clonedFormControl)
    }
}

export function setValuesToForm(formControls   , setFormControls   , data   , properties   ) {
    const clonedFormControl    = JSON.parse(JSON.stringify(formControls))
    clonedFormControl.forEach((obj   ) => {
        if (properties && properties[obj.name]) {
            for (const key in properties[obj.name]) {
                obj[key] = properties[obj.name]?.[key]
            }
        }
        if(obj.type === 'file'){
            obj.src = "http://localhost:5000" + data['path'] + "?" + new Date().getTime();
            obj.value = data['path']
        }else{
            obj.value = data[obj.name]
        }       
    })
    setFormControls(clonedFormControl);
}

export function clearValuesFromForm(formControls   , setFormControls   , properties   ) {
    const clonedFormControl    = JSON.parse(JSON.stringify(formControls))
    clonedFormControl.forEach((obj   ) => {
        if (properties && properties[obj.name]) {
            for (const key in properties[obj.name]) {
                obj[key] = properties[obj.name]?.[key]
            }
        }
        if(obj.type === 'file'){
            obj.src = "";
        }
        obj.value = "";
    })
    setFormControls(clonedFormControl);
}
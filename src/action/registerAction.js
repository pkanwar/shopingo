
export function createUserMap(firstName,lastName,emailId,mobileNumber,address,loginId,password,confirmPassword)
{
    let userMap = {};
    userMap['firstName'] = firstName;
    userMap['lastName'] = lastName;
    userMap['email'] = emailId;
    userMap['mobileNumber'] = mobileNumber;
    userMap['address'] = address; 
    userMap['loginId'] = loginId;
    userMap['password'] = password;
    userMap['confirmPassword'] = confirmPassword;
    return userMap;
}

export function postUserMap(e,postUserMap)
{
    e.preventDefault();
    console.log('user map : ' + postUserMap);
    
    fetch('/api/users/',{
        method: 'POST',
         body: JSON.stringify(postUserMap),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
         }
    }).then(res=>{
        console.log('status : ',res.status);
        console.log('res : ' + res);
        if(res.status === 201){
            let msg = "Your account is successfully created . Please login to continue";
            let location = "";
            const redirect = '/error/' + msg + '|' + location;
            window.location = redirect;
        }
        
        return res.json();
    }).then(error => {

        console.log('error json',error);

        // if(error.errorCode === 'ER004'){
        //     this.setState({
        //         loginMsg : error.message
        //     })
        //     alert()
        // }
        // if(error.errorCode === 'ER003'){
        //     this.setState({
        //         mobileNumberMsg : error.message
        //     })
        // }
        // if(error.errorCode === 'ER002'){
        //     this.setState({
        //         emailIdMsg : error.message
        //     })
        // }
        alert(error.message)

    })
}

function getMsg(field,value)
{
    let msg = "";
    if(value==="")
    {
        msg = "Please enter " + field;
    }else{
        msg = "Invalid " + field;
    }
    return msg;
}

function getLoginIdMsg(field,value)
{
    let msg = "";
    if(value==="")
    {
        msg = "Please enter " + field;
    }else{
        msg = field + " should have atleast 3 characters";
    }
    return msg;
}

function getPasswordMsg(field,value)
{
    let msg = "";
    if(value==="")
    {
        msg = "Please enter " + field;
    }else{
        msg = field + " should be b/w 7 to 16 characters.";
    }
    return msg;
}

export function validateFieldsOnInput(field,value,isSubmitValidation){

    let isValid = true;
    console.log('isSubmitValidation : ',isSubmitValidation)
    if(isSubmitValidation===true || field === "firstName"){
        if(isSubmitValidation===true){
            field = "firstName"
            value = this.state.firstName;
        }
        if(value===""){
            this.setState({
                firstNameMsg : "Please enter " + field
            })
            isValid = false;
        }else{
            this.setState({
                firstNameMsg : ""
            })
        }
    }
    if(isSubmitValidation===true || field === "lastName"){
        if(isSubmitValidation===true){
            field = "lastName"
            value = this.state.lastName;
        }
        if(value===""){
            this.setState({
                lastNameMsg : "Please enter " + field
            })
            isValid = false;
        }else{
            this.setState({
                lastNameMsg : ""
            })
        }
    }
    if(isSubmitValidation===true || field === 'emailId'){
        if(isSubmitValidation===true){
            field = "emailId"
            value = this.state.emailId;
        }
        if(emailValidation(value)){
            this.setState({
                emailIdMsg : ""
            })
        }else{
            this.setState({
                emailIdMsg : getMsg(field,value)
            })
            isValid = false;
        }
    }
    if(isSubmitValidation===true || field === 'mobileNumber'){
        if(isSubmitValidation===true){
            field = "mobileNumber"
            value = this.state.mobileNumber;
        }
        if(mobileNumberValidation(value)){
            this.setState({
                mobileNumberMsg : ""
            })
        }else{
            this.setState({
                mobileNumberMsg : getMsg(field,value)
            })
            isValid = false;
        }
    }
    if(isSubmitValidation===true || field === "loginId"){
        if(isSubmitValidation===true){
            field = "loginId"
            value = this.state.loginId;
        }
        if(loginIdValidation(value)){
            this.setState({
                loginMsg : ""
            })
        }else{
            this.setState({
                loginMsg : getLoginIdMsg(field,value)
            })
            isValid = false;
        }
    }

    if(isSubmitValidation===true || field === "address"){
        if(isSubmitValidation===true){
            field = "address"
            value = this.state.address;
        }
        if(value.length === 0){
            this.setState({
                addressMsg : "Please enter address"
            })
            isValid = false;
        }else{
            this.setState({
                addressMsg : ""
            })
        }
    }

    if(isSubmitValidation===true || field === "password"){
        if(isSubmitValidation===true){
            field = "password"
            value = this.state.password;
        }
        if(passwordValidation(value)){
            this.setState({
                passwordMsg : ""
            })
        }else{
            this.setState({
                passwordMsg : getPasswordMsg(field,value)
            })
            isValid = false;
        }
    }
    if(isSubmitValidation===true || field === "confirmPassword"){
        let password = this.state.password;
        field = "password"
        if(value!==password){
            this.setState({
                confirmPasswordMsg : "passwords do not match"
            })
            isValid = false;
        }else{
            if(value.length === 0){
                this.setState({
                    confirmPasswordMsg : "Please enter " + field
                })
                isValid = false;
            }else{
            this.setState({
                confirmPasswordMsg : ""
            })
             }
        }
    }
    console.log('isValid : ',isValid);
    if(isValid === false){
        return false;
    }
    return true;
}


export function emailValidation(value)
{
    let mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    console.log('mail format match : ',value.match(mailformat));
    if (!value.match(mailformat))
    {      
        return false;
    }  
    return true;
}

function mobileNumberValidation(value)
{
    let phoneno = /^\d{10}$/;
    if (!value.match(phoneno))
    {       
        return false;
    }
    return true;
}

function loginIdValidation(value)
{
    if (value.length < 3)
    {       
        return false;
    }
    return true;
}

function passwordValidation(value)
{
    if (value.length<7 || value.lenght>16)
    {       
        return false;
    }
    return true;
}
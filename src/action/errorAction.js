import ErrorPage from '../util/ErrorPage';

export function getErrorPage(isError)
{
    let errorSection = null;
    let errorObject = this.state.errorObject;
    
    let errorClassName = "errorpage-container-passive";
    if(isError === true){
        errorClassName = "errorpage-container-active"
        errorSection = <ErrorPage errorObject={errorObject} onClick={this.setErrorShow.bind(this,false)} />;
    }
    return <div className={errorClassName} onClick={this.setErrorShow.bind(this,false)} >
        {errorSection}
    </div>
}

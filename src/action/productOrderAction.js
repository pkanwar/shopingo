import {initiatePayment} from '../util/Payment';

export function getOrder()
{
    const fetchOrderUrl = '/api/orders/';
        fetch(fetchOrderUrl).then((res)=>{
            return res.json();
        }).then((orderItem)=>{
            //ER013
            console.log("orderItem : " + orderItem.status)
            if(orderItem.status === "SUCCEEDED"){
                this.setState({
                    items : orderItem.items,
                    cartQuantity : orderItem.cartQuantity,
                    actualPrice : orderItem.actualPrice,
                    discount : orderItem.discount,
                    totalPrice : orderItem.totalPrice
                });
            }else if (orderItem.errorCode === 'ER008'){
                let msg = "";
                let location = "";
                msg = orderItem.message;
                const redirect = '/error/' + msg + '|' + location;
                window.location = redirect;
            }else if (orderItem.errorCode === 'ER013'){
                let msg = "";
                let location = "";
                msg = "No orders Present. Please add some books";
                const redirect = '/error/' + msg + '|' + location;
                window.location = redirect;
            }
        })
}


export function makePayment(e)
{
    e.preventDefault();
        const paymentHandlers = {
            onSuccess: (options)=>{
                //console.log('options : ',options);
                fetch(`/api/orders/${options.id}`,{
                    method : 'PUT',
                    body : JSON.stringify(options),
                    headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                         }
                }).then((res) => {
                    let msg = "";
                    let location = "";
                    if(res.status === 204){
                        msg = 'order completed successfully. Thank you for shopping';
                    }else{
                        msg = 'could not complete your order. please try again';
                    }
                    const redirect = '/error/' + msg + '|' + location;
                    window.location = redirect;
                })
            },
            onDismiss: () => {

            }
        }
        const onOrderCreateFailure = (err)=>{

        }
        initiatePayment(paymentHandlers,onOrderCreateFailure);
}
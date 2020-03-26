import React from "react";
import useStore from './somaReducer'
import './index.scss';

function ReducerHook() {

    const [store, dispatch] = useStore()

    //   useEffect(() => {
    //     if(state.operation) {
    //       console.log(state.operation+' has been clicked')
    //     } else if (state.continue) {
    //       console.log(state.continue+' has been setted')
    //     }
    //   }, [state.operation, state.continue])

    const soma = () => {
        let n1;
        let n2;
        let res = undefined;
        if (!store.numero || !store.result) {
            return
        }
        if (store.continue) {
            n2 = parseFloat(store.numero.replace(/,/g, '.'));
            n1 = parseFloat(store.result.replace(/,/g, '.'));
        } else {
            n1 = parseFloat(store.numero.replace(/,/g, '.'));
            n2 = parseFloat(store.result.replace(/,/g, '.'));
        }
        switch (store.operation) {
            case "-":
                res = n1 - n2;
                break;
            case "+":
                res = n1 + n2;
                break;
            case "/":
                res = n2 / n1;
                break;
            case "*":
                res = n1 * n2;
                break;
            case "%":
                res = n1 * (n2 / 100);
                break;
            default:
                res = undefined;
        }
        dispatch({type:'RESULT', payload: res.toString().replace(/\./g, ',')})
    };

    const verifyComma = (value) => {
        return value.indexOf(',') === -1 ? false : true;
    }

    const clickButton = valor => {
        if (typeof valor == "number") {
            let value = valor.toString()
            dispatch({type:'NUMBER', payload: store.numero + value})
        } else if (valor === ",") {
            if (verifyComma(store.numero)) {
                return;
            }
            if (store.numero) {
                dispatch({type:'NUMBER', payload: store.numero + valor})
            } else {
                dispatch({type:'NUMBER', payload: store.numero + "0" + valor})
            }
        } else {
            if (valor === "CE") {
                dispatch({type:'NUMBER', payload: ''})
            } else if (valor === "C") {
                dispatch({type:'RESET', payload: undefined})
            } else {
                if (store.result) {
                    dispatch({type:'OP', payload: valor})
                } else {
                    dispatch({type:'CONTINUE', payload: valor})
                }
            }
        }
    };

    return (
    <div className="calc">
        <div className="result">
            <span>{store.result}</span>
            <span>{store.operation}</span>
            <span>{store.numero || 0}</span>
        </div>
        <button onClick={e => clickButton("%")}>%</button>
        <button onClick={e => clickButton("CE")}>CE</button>
        <button onClick={e => clickButton("C")}>C</button>
        <button onClick={e => clickButton("/")}>/</button>
        <button onClick={e => clickButton(7)}>7</button>
        <button onClick={e => clickButton(8)}>8</button>
        <button onClick={e => clickButton(9)}>9</button>
        <button onClick={e => clickButton("*")}>x</button>
        <button onClick={e => clickButton(4)}>4</button>
        <button onClick={e => clickButton(5)}>5</button>
        <button onClick={e => clickButton(6)}>6</button>
        <button onClick={e => clickButton("-")}>-</button>
        <button onClick={e => clickButton(1)}>1</button>
        <button onClick={e => clickButton(2)}>2</button>
        <button onClick={e => clickButton(3)}>3</button>
        <button onClick={e => clickButton("+")}>+</button>
        <button onClick={e => console.log(store)}>+/-</button>
        <button onClick={e => clickButton(0)}>0</button>
        <button onClick={e => clickButton(",")}>,</button>
        <button onClick={e => soma()}>=</button>
    </div>
    );
}

export default ReducerHook;
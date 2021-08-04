import React, {useState} from 'react'
import {firstLineData, initialState, secondLineData, thirdLineData} from "./calculatorData";
// import {useDispatch, useSelector} from "react-redux";

export const Calculator = ({unMountProject}) => {
    const [state, setState] = useState({
        curDisplay: '0',
        curNumber: '',
        formula: '',
        prevInput: ''
    })
    const {formula, prevInput, curDisplay, curNumber} = state;
    let newFormulaValue = "";
    let newCurDisplayValue = "";
    let newCurNumber = "";
    let newPrevInput = "";
    const updateState = () => {
        setState({
            ...state,
            curDisplay: newCurDisplayValue,
            curNumber: newCurNumber,
            formula: newFormulaValue,
            prevInput: newPrevInput
        })
    }
    const handleClick = (e) => {
        const {value} = e.target;
        registerLastInput(value);
        if(curDisplay.length <= 6) {
            if (value === 'AC') {
                reinitialize();
            }
            if (/\d/.test(value)) {
                handleNumbers(value);
            }
            if (value === '.') {
                handleDecimal(value);
            }
            if (/[=]/.test(value)) {
                handleEqual();
            }
            if (/[+-/x]/.test(value)) {
                handleOperators(value);
            }
            updateState();
        }
    }
    const handleEqual = () => {
        if (prevInput !== "=") {
            let answer = eval(formula);
            const newValue = answer.toString();
            newCurNumber = newValue;
            newCurDisplayValue = newValue;
            newFormulaValue = formula + "=" + newValue;
        } else {
            console.log("error equal");
        }
    }
    const reinitialize = () => {
        setState(initialState);
        newFormulaValue = "";
        newCurDisplayValue = "";
        newCurNumber = "";
        newPrevInput = "";
    }
    const registerLastInput = (newInput) => {
        newPrevInput = newInput;
    }
    const handleNumbers = (newNumber) => {
        if (/^0/.test(curNumber) && (newNumber !== '0')) {
            newCurDisplayValue = newNumber;
            newFormulaValue = newNumber;
            newCurNumber = newNumber;
        }

        if (/\d/.test(newNumber) && prevInput === '=') {
            newCurDisplayValue = newNumber;
            newFormulaValue = newNumber;
            newCurNumber = newNumber;
        } else if (/\d/.test(newNumber) && prevInput !== '=') {
            newCurDisplayValue = curNumber + newNumber;
            newFormulaValue = formula + newNumber;
            newCurNumber = curNumber + newNumber;
        }
    }
    const handleDecimal = (decimalPoint) => {
        const {curNumber, formula, curDisplay} = state;
        if (curNumber.indexOf('.') === -1) {
            newFormulaValue = formula + decimalPoint;
            newCurDisplayValue = curDisplay + decimalPoint;
            newCurNumber = curNumber + decimalPoint;
        } else {
            console.log(curNumber, curNumber.indexOf('.'), "operation not allow");
        }
    }
    const handleOperators = (newOperator) => {
        const newOperatorInput = newOperator === "x" ? "*" : newOperator
        if (newOperator === prevInput) {
            newCurDisplayValue = curDisplay;
            newFormulaValue = formula;
            newCurNumber = curNumber;
            console.log("error");
        } else {
            newCurDisplayValue = newOperatorInput;
            if (/[x/]/.test(newOperator) && /[x/]/.test(prevInput)) {
                newFormulaValue = formula.replace(/[*/]$/, newOperatorInput)
            } else {
                newFormulaValue = (prevInput === "=" ? curNumber : formula) + newOperatorInput;
            }
        }
    }
    return (
        <div id="calculator" className="project">
            <div id="board">
                <div id="screen" className="container">
                    <div className="display">{state.formula}</div>
                    <div id="display">{state.curDisplay}</div>
                </div>
                <div id="main-board">
                    <div className="row">
                        <div className="col-6">
                            <button id="clear"
                                    type="button"
                                    value="AC"
                                    onClick={handleClick}>
                                AC
                            </button>
                        </div>
                        <div className="col-6">
                            <button id="divide"
                                    type="button"
                                    className="btn-circle float-right"
                                    onClick={handleClick}
                                    value="/">
                                /
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        {firstLineData.map((item, idx) => {
                            return (
                                <RoundButton innerText={item.symbol}
                                             innerID={item.ID}
                                             key={idx}
                                             className="col-3"
                                             handleButtonClick={handleClick}/>
                            )
                        })}
                    </div>
                    <div className="row">
                        {secondLineData.map((item, idx) => {
                            return (
                                <RoundButton innerText={item.symbol}
                                             innerID={item.ID}
                                             key={idx}
                                             className="col-3"
                                             handleButtonClick={handleClick}/>
                            )
                        })}
                    </div>
                    <div className="row">
                        {thirdLineData.map((item, idx) => {
                            return (
                                <RoundButton innerText={item.symbol}
                                             innerID={item.ID}
                                             key={idx}
                                             className="col-3"
                                             handleButtonClick={handleClick}/>
                            )
                        })}
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button type="button"
                                    id="zero"
                                    value="0"
                                    onClick={handleClick}>
                                0
                            </button>
                        </div>
                        <div className="col-3">
                            <button type="button"
                                    id="decimal"
                                    className="btn-circle"
                                    value="."
                                    onClick={handleClick}>
                                .
                            </button>
                        </div>
                        <div className="col-3 ">
                            <button type="button" id="equals"
                                    className="btn-circle"
                                    value="="
                                    onClick={handleClick}>
                                =
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const RoundButton = (props) => {
    return (
        <div className="col-3">
            <button type="button"
                    id={props.innerID}
                    value={props.innerText}
                    className="btn-circle"
                    onClick={props.handleButtonClick}>{props.innerText}</button>
        </div>
    );
}
export default Calculator
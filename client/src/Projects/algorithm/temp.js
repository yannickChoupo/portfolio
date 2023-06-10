import React, { useState } from 'react'
// import { firstLineData, initialState, secondLineData, thirdLineData } from "./calculatorData";
// import {useDispatch, useSelector} from "react-redux";
const initialState = {
    curDisplay: '0',
    curNumber: '',
    formula: '',
    prevInput: ''
}
const firstLineData = [{ symbol: "7", ID: "seven" },
{ symbol: "8", ID: "eight" },
{ symbol: "9", ID: "nine" },
{ symbol: "x", ID: "multiply" }];

const secondLineData = [{ symbol: "4", ID: "four" },
{ symbol: "5", ID: "five" },
{ symbol: "6", ID: "six" },
{ symbol: "-", ID: "subtract" }]

const thirdLineData = [{ symbol: "1", ID: "one" },
{ symbol: "2", ID: "two" },
{ symbol: "3", ID: "three" },
{ symbol: "+", ID: "add" }]

const Calculator = () => {
    const [state, setState] = useState({
        curDisplay: '0',
        curNumber: '',
        formula: '',
        prevInput: '',
        curInput: ''
    })
    const { formula, prevInput, curDisplay, curNumber, curInput } = state;
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
        const { value } = e.target;
        // register the newly pressed 
        // registerLastInput(value);
        newPrevInput = value;
        console.log("curDisplay.length : ", curDisplay, curDisplay.length);
        if (value === 'AC') {
            reinitialize();
        }
        // if (curDisplay.length <= 8) {
            if (/[=]/.test(value)) {
                handleEqual();
            }
            if (/[+-/x]/.test(value)) {
                handleOperators(value);
            }
            if (/\d/.test(value)) {
                handleNumbers(value);
            }
            if (value === '.') {
                handleDecimal(value);
            }
            updateState();
        // }
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
        console.log("reinitialize");
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
        } else if(/\d/.test(newNumber) && (prevInput !== '=')) {
            newCurDisplayValue = curNumber + newNumber;
            newFormulaValue = formula + newNumber;
            newCurNumber = curNumber + newNumber;
        } 
    }
    const handleDecimal = (decimalPoint) => {
        const { curNumber, formula, curDisplay } = state;
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
        <div id="calculator">
            <div id="board">
                <div id="screen">
                    <div className="display">{state.formula}</div>
                    <div className="display">{state.curDisplay}</div>
                </div>
                <div id="main-board">
                    <div className="row first">
						<button 
							id="clear"
							className="btn btn-wide"
							type="button"
							value="AC"
							onClick={handleClick}>
							AC
						</button>
						<button 
							id="divide"
							type="button"
							className="btn btn-small btn-circle"
							onClick={handleClick}
							value="/">
							/
						</button>
                    </div>
                    <div className="row">
                        {firstLineData.map((item, idx) => {
                            return (
                                <button 
									id={item.ID}
                                    className="btn btn-circle"
									value={item.symbol}
                                    key={idx}
                                    onClick={handleClick} 
								>
									{item.symbol}
								</button>
                            )
                        })}
                    </div>
                    <div className="row">
                        {secondLineData.map((item, idx) => {
                            return (
								<button 
									id={item.ID}
									className="btn btn-circle"
									value={item.symbol}
									key={idx}
									onClick={handleClick} 
								>
									{item.symbol}
								</button>
                            )
                        })}
                    </div>
                    <div className="row">
                        {thirdLineData.map((item, idx) => {
                            return (
								<button 
									id={item.ID}
									className="btn btn-circle"
									value={item.symbol}
									key={idx}
									onClick={handleClick} 
								>
									{item.symbol}
								</button>
                            )
                        })}
                    </div>
                    <div className="row last">
						<button type="button"
							id="zero"
                            className="btn"
							value="0"
							onClick={handleClick}>
							0
						</button>
						<button type="button"
							id="decimal"
							className="btn btn-circle"
							value="."
							onClick={handleClick}>
							.
						</button>
						<button type="button" id="equals"
							className="btn btn-circle"
							value="="
							onClick={handleClick}>
							=
						</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calculator;
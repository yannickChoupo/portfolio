// import { useState } from 'react';
// import $ from 'jquery'
// // import { firstLineData, initialState, secondLineData, thirdLineData } from "./calculatorData";
// // import {useDispatch, useSelector} from "react-redux";

// const initialState = {
//     curDisplay: '0',
//     curNumber: '',
//     formula: '',
//     prevInput: '',
    
// }
// const firstLineData = [{ symbol: "7", ID: "seven" },
// { symbol: "8", ID: "eight" },
// { symbol: "9", ID: "nine" },
// { symbol: "x", ID: "multiply" }];

// const secondLineData = [{ symbol: "4", ID: "four" },
// { symbol: "5", ID: "five" },
// { symbol: "6", ID: "six" },
// { symbol: "-", ID: "subtract" }]

// const thirdLineData = [{ symbol: "1", ID: "one" },
// { symbol: "2", ID: "two" },
// { symbol: "3", ID: "three" },
// { symbol: "+", ID: "add" }]

// const Calculator = () => {
//     const [state, setState] = useState({
//         curDisplay: '0',
//         curNumber: '',
//         formula: '',
//         prevInput: '',
//         curInput: '',
//         newFormulaValue: "",
//         newCurDisplayValue: "",
//         newCurNumber: "",
//         newPrevInput: "",
//     })

//     let { formula, prevInput, curDisplay, curNumber, newFormulaValue, newCurDisplayValue, newCurNumber, newPrevInput } = state;
//     const updateState = () => {
//         if(newFormulaValue.length >= 15) {
//             $('.display.formula').css('font-size', "25px")
//         } else {
//             $('.display.formula').css('font-size', "30px")
//         }
//         setState({
//             ...state,
//             curDisplay: newCurDisplayValue,
//             curNumber: newCurNumber,
//             formula: newFormulaValue,
//             prevInput: newPrevInput
//         })
//     }

//     const handleClick = (e) => {
//         const { value } = e.target;
//         newPrevInput = value;
//         if (value === 'AC') {
//             reinitialize();
//             updateState();

//         }
//         if (/[+-/x]/.test(value)) {
//             handleOperators(value);
//             updateState();

//         }
//         if (/[=]/.test(value)) {
//             handleEqual();
//             updateState();

//         }

//         if (curDisplay.length <= 8) {
//             if (/\d/.test(value)) {
//                 handleNumbers(value);
//             }
//             if (value === '.') {
//                 handleDecimal(value);
//             }
//             updateState();

//         } else {
//             return;
//         }
//     }
//     const handleEqual = () => {
//         if (prevInput !== "=") {
//             let answer = eval(formula);
//             const newValue = answer.toString();
//             newCurNumber = newValue;
//             newCurDisplayValue = newValue;
//             newFormulaValue = formula + "=" + newValue;
//         } else {
//             console.error("error equal");
//         }
//     }
//     const reinitialize = () => {
//         setState(initialState);
//         newFormulaValue = "";
//         newCurDisplayValue = "";
//         newCurNumber = "";
//         newPrevInput = "";
//     }
//     // const registerLastInput = (newInput) => {
//     //     newPrevInput = newInput;
//     // }
//     const handleNumbers = (newNumber) => {
//         if (/^0/.test(curNumber) && (newNumber !== '0')) {
//             newCurDisplayValue = newNumber;
//             newFormulaValue = newNumber;
//             newCurNumber = newNumber;
//         }

//         if (/\d/.test(newNumber) && prevInput === '=') {
//             newCurDisplayValue = newNumber;
//             newFormulaValue = newNumber;
//             newCurNumber = newNumber;
//         } else if (/\d/.test(newNumber) && (prevInput !== '=')) {
//             newCurDisplayValue = curNumber + newNumber;
//             newFormulaValue = formula + newNumber;
//             newCurNumber = curNumber + newNumber;
//         }
//     }
//     const handleDecimal = (decimalPoint) => {
//         const { curNumber, formula, curDisplay } = state;
//         if (curNumber.indexOf('.') === -1) {
//             newFormulaValue = formula + decimalPoint;
//             newCurDisplayValue = curDisplay + decimalPoint;
//             newCurNumber = curNumber + decimalPoint;
//         } else {
//             console.error(curNumber, curNumber.indexOf('.'), "operation not allow");
//         }
//     }
//     const handleOperators = (newOperator) => {
//         const newOperatorInput = newOperator === "x" ? "*" : newOperator
//         if (newOperator === prevInput) {
//             newCurDisplayValue = curDisplay;
//             newFormulaValue = formula;
//             newCurNumber = curNumber;
//         } else {
//             newCurDisplayValue = newOperatorInput;
//             newFormulaValue = (prevInput === "=" ? curNumber : formula) + newOperatorInput;
//         }
//     }
//     return (
//         <div id="calculator">
//             <div id="board">
//                 <div id="screen">
//                     <div className="display formula">{state.formula}</div>
//                     <div className="display">{state.curDisplay}</div>
//                 </div>
//                 <div id="main-board">
//                     <div className="row first">
//                         <button
//                             id="clear"
//                             className="btn btn-wide"
//                             type="button"
//                             value="AC"
//                             onClick={handleClick}>
//                             AC
//                         </button>
//                         <button
//                             id="divide"
//                             type="button"
//                             className="btn btn-small btn-circle"
//                             onClick={handleClick}
//                             value="/">
//                             /
//                         </button>
//                     </div>
//                     <div className="row">
//                         {firstLineData.map((item, idx) => {
//                             return (
//                                 <button
//                                     id={item.ID}
//                                     className="btn btn-circle"
//                                     value={item.symbol}
//                                     key={idx}
//                                     onClick={handleClick}
//                                 >
//                                     {item.symbol}
//                                 </button>
//                             )
//                         })}
//                     </div>
//                     <div className="row">
//                         {secondLineData.map((item, idx) => {
//                             return (
//                                 <button
//                                     id={item.ID}
//                                     className="btn btn-circle"
//                                     value={item.symbol}
//                                     key={idx}
//                                     onClick={handleClick}
//                                 >
//                                     {item.symbol}
//                                 </button>
//                             )
//                         })}
//                     </div>
//                     <div className="row">
//                         {thirdLineData.map((item, idx) => {
//                             return (
//                                 <button
//                                     id={item.ID}
//                                     className="btn btn-circle"
//                                     value={item.symbol}
//                                     key={idx}
//                                     onClick={handleClick}
//                                 >
//                                     {item.symbol}
//                                 </button>
//                             )
//                         })}
//                     </div>
//                     <div className="row last">
//                         <button type="button"
//                             id="zero"
//                             className="btn"
//                             value="0"
//                             onClick={handleClick}>
//                             0
//                         </button>
//                         <button type="button"
//                             id="decimal"
//                             className="btn btn-circle"
//                             value="."
//                             onClick={handleClick}>
//                             .
//                         </button>
//                         <button type="button" id="equals"
//                             className="btn btn-circle"
//                             value="="
//                             onClick={handleClick}>
//                             =
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Calculator;

import { useState } from "react";

interface CalculatorState {
    curDisplay: string;
    curNumber: string;
    formula: string;
    prevInput: string;
}

interface CalculatorButton {
    symbol: string;
    ID: string;
}

const initialState: CalculatorState = {
    curDisplay: "0",
    curNumber: "",
    formula: "",
    prevInput: "",
};

const firstLineData: CalculatorButton[] = [
    { symbol: "7", ID: "seven" },
    { symbol: "8", ID: "eight" },
    { symbol: "9", ID: "nine" },
    { symbol: "x", ID: "multiply" },
];

const secondLineData: CalculatorButton[] = [
    { symbol: "4", ID: "four" },
    { symbol: "5", ID: "five" },
    { symbol: "6", ID: "six" },
    { symbol: "-", ID: "subtract" },
];

const thirdLineData: CalculatorButton[] = [
    { symbol: "1", ID: "one" },
    { symbol: "2", ID: "two" },
    { symbol: "3", ID: "three" },
    { symbol: "+", ID: "add" },
];

const Calculator = () => {
    const [state, setState] = useState<CalculatorState>(initialState);

    // const updateState = (
    //     newFormulaValue: string,
    //     newCurDisplayValue: string,
    //     newCurNumber: string,
    //     newPrevInput: string
    // ) => {
    //     setState({
    //         curDisplay: newCurDisplayValue,
    //         curNumber: newCurNumber,
    //         formula: newFormulaValue,
    //         prevInput: newPrevInput,
    //     });
    // };

    const reinitialize = () => {
        setState(initialState);
    };

    const handleEqual = (): CalculatorState => {
        const {
            formula,
            prevInput,
        } = state;

        if (prevInput === "=") {
            return state;
        }

        try {
            const answer = eval(formula);
            const newValue = answer.toString();

            return {
                curDisplay: newValue,
                curNumber: newValue,
                formula: `${formula}=${newValue}`,
                prevInput: "=",
            };
        } catch {
            console.error("Invalid formula:", formula);
            return state;
        }
    };

    const handleNumbers = (newNumber: string): CalculatorState => {
        const {
            curNumber,
            formula,
            prevInput,
        } = state;

        if (/^0/.test(curNumber) && newNumber !== "0") {
            return {
                ...state,
                curDisplay: newNumber,
                curNumber: newNumber,
                formula: newNumber,
                prevInput: newNumber,
            };
        }

        if (prevInput === "=") {
            return {
                ...state,
                curDisplay: newNumber,
                curNumber: newNumber,
                formula: newNumber,
                prevInput: newNumber,
            };
        }

        return {
            ...state,
            curDisplay: curNumber + newNumber,
            curNumber: curNumber + newNumber,
            formula: formula + newNumber,
            prevInput: newNumber,
        };
    };

    const handleDecimal = (decimalPoint: string): CalculatorState => {
        const {
            curNumber,
            formula,
            curDisplay,
        } = state;

        if (curNumber.indexOf(".") !== -1) {
            console.error(
                curNumber,
                curNumber.indexOf("."),
                "operation not allowed"
            );

            return state;
        }

        return {
            ...state,
            curDisplay: curDisplay + decimalPoint,
            curNumber: curNumber + decimalPoint,
            formula: formula + decimalPoint,
            prevInput: decimalPoint,
        };
    };

    const handleOperators = (operator: string): CalculatorState => {
        const {
            prevInput,
            curDisplay,
            curNumber,
            formula,
        } = state;

        const newOperator = operator === "x" ? "*" : operator;

        if (newOperator === prevInput) {
            return {
                ...state,
                curDisplay,
                curNumber,
                formula,
            };
        }

        const newFormula =
            prevInput === "="
                ? curNumber + newOperator
                : formula + newOperator;

        return {
            ...state,
            curDisplay: newOperator,
            formula: newFormula,
            prevInput: newOperator,
        };
    };

    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        const { value } = e.currentTarget;

        if (value === "AC") {
            reinitialize();
            return;
        }

        if (value === "=") {
            setState(handleEqual());
            return;
        }

        if (/[+\-/x]/.test(value)) {
            setState(handleOperators(value));
            return;
        }

        if (/\d/.test(value)) {
            if (state.curDisplay.length <= 8) {
                setState(handleNumbers(value));
            }
            return;
        }

        if (value === ".") {
            if (state.curDisplay.length <= 8) {
                setState(handleDecimal(value));
            }
        }
    };

    return (
        <div id="calculator">
            <div id="board">
                <div id="screen">
                    <div className="display formula">
                        {state.formula}
                    </div>

                    <div className="display">
                        {state.curDisplay}
                    </div>
                </div>

                <div id="main-board">
                    <div className="row first">
                        <button
                            id="clear"
                            className="btn btn-wide"
                            type="button"
                            value="AC"
                            onClick={handleClick}
                        >
                            AC
                        </button>

                        <button
                            id="divide"
                            type="button"
                            className="btn btn-small btn-circle"
                            onClick={handleClick}
                            value="/"
                        >
                            /
                        </button>
                    </div>

                    <div className="row">
                        {firstLineData.map((item) => (
                            <button
                                id={item.ID}
                                className="btn btn-circle"
                                value={item.symbol}
                                key={item.ID}
                                onClick={handleClick}
                            >
                                {item.symbol}
                            </button>
                        ))}
                    </div>

                    <div className="row">
                        {secondLineData.map((item) => (
                            <button
                                id={item.ID}
                                className="btn btn-circle"
                                value={item.symbol}
                                key={item.ID}
                                onClick={handleClick}
                            >
                                {item.symbol}
                            </button>
                        ))}
                    </div>

                    <div className="row">
                        {thirdLineData.map((item) => (
                            <button
                                id={item.ID}
                                className="btn btn-circle"
                                value={item.symbol}
                                key={item.ID}
                                onClick={handleClick}
                            >
                                {item.symbol}
                            </button>
                        ))}
                    </div>

                    <div className="row last">
                        <button
                            type="button"
                            id="zero"
                            className="btn"
                            value="0"
                            onClick={handleClick}
                        >
                            0
                        </button>

                        <button
                            type="button"
                            id="decimal"
                            className="btn btn-circle"
                            value="."
                            onClick={handleClick}
                        >
                            .
                        </button>

                        <button
                            type="button"
                            id="equals"
                            className="btn btn-circle"
                            value="="
                            onClick={handleClick}
                        >
                            =
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;

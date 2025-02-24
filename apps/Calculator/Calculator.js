import React, { useState } from "react";
import Window from "@/components/Window";
import CalcBtn from "./CalcBtn";
import { CalculatorIcon, Cross, Delete, Diff, Divide, Equal, Minus, Percent, Plus } from "lucide-react";
import { RxCross2 } from "react-icons/rx";

const Calculator = ({ fileStructure, setFileStructure, isMaximized, toggleMaximize, ...props }) => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("0");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        const evalResult = parseFloat(eval(expression).toFixed(8));
        console.log(evalResult);
        setResult(evalResult.toString());
        setDisplay(evalResult.toString());
        setExpression(expression);
      } catch (error) {
        setResult("Error");
        setDisplay("Error");
        setExpression(expression + "=Error");
      }
    } else if (value === "C") {
      setDisplay("0");
      setExpression("");
      setResult("");
    } else if (value === "DEL") {
      setDisplay(display.slice(0, -1) || "0");
      setExpression(expression.slice(0, -1));
    } else if (value === "%") {
      try {
        const percentResult = eval(expression) / 100;
        setResult(percentResult.toString());
        setDisplay(percentResult.toString());
        setExpression(expression + "%=" + percentResult.toString());
      } catch (error) {
        setResult("Error");
        setDisplay("Error");
        setExpression(expression + "%=Error");
      }
    } else {
        console.log(expression+value);
      if (result !== "") {
        setDisplay(value);
        setExpression(value);
        setResult("");
      } else {
        if(display === "0" && value in ["1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
          setDisplay(value);
          setExpression(value);
        }
        else {
          setDisplay(display + value);
          setExpression(expression + value);
        }
      }
    }
  };

  return (
    <Window isCustomized={true} customSize={{ width: "215px", height: "375px" }} {...props}>
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 flex flex-col text-white items-end justify-end px-3">
          <p className="text-xl text-[#9f9fa1] whitespace-nowrap overflow-x-auto">{result && expression}</p>
          <p className="text-3xl overflow-x-auto">{display}</p>
        </div>
        <div className="grid grid-cols-4 gap-1 p-2">
          <CalcBtn isIcon={true} Icon={Delete} onClick={() => handleButtonClick("DEL")} />
          <CalcBtn isIcon={true} Icon={Diff} onClick={() => handleButtonClick("C")} />
          <CalcBtn isIcon={true} Icon={Percent} onClick={() => handleButtonClick("%")} />
          <CalcBtn isDifColor={true} isIcon={true} Icon={Divide} onClick={() => handleButtonClick("/")} />
          <CalcBtn text="7" onClick={() => handleButtonClick("7")} />
          <CalcBtn text="8" onClick={() => handleButtonClick("8")} />
          <CalcBtn text="9" onClick={() => handleButtonClick("9")} />
          <CalcBtn isDifColor={true} isIcon={true} Icon={RxCross2} onClick={() => handleButtonClick("*")} />
          <CalcBtn text="4" onClick={() => handleButtonClick("4")} />
          <CalcBtn text="5" onClick={() => handleButtonClick("5")} />
          <CalcBtn text="6" onClick={() => handleButtonClick("6")} />
          <CalcBtn isDifColor={true} isIcon={true} Icon={Minus} onClick={() => handleButtonClick("-")} />
          <CalcBtn text="1" onClick={() => handleButtonClick("1")} />
          <CalcBtn text="2" onClick={() => handleButtonClick("2")} />
          <CalcBtn text="3" onClick={() => handleButtonClick("3")} />
          <CalcBtn isDifColor={true} isIcon={true} Icon={Plus} onClick={() => handleButtonClick("+")} />
          <CalcBtn isIcon={true} Icon={CalculatorIcon} onClick={() => handleButtonClick("C")} />
          <CalcBtn text="0" onClick={() => handleButtonClick("0")} />
          <CalcBtn text="." onClick={() => handleButtonClick(".")} />
          <CalcBtn isDifColor={true} isIcon={true} Icon={Equal} onClick={() => handleButtonClick("=")} />
        </div>
      </div>
    </Window>
  );
};

export default Calculator;
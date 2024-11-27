import { useEffect, useRef, useState } from "react";

// 定义组件的属性类型
interface CalendarProps {
  value?: Date; // 受控模式的日期值
  defaultValue?: Date; // 非受控模式下的默认日期
  onChange?: (date: Date) => void; // 日期改变时触发的回调函数
}

function Calendar(props: CalendarProps) {
  const {
    value: propsValue, // 受控模式下的日期值
    defaultValue, // 非受控模式下的默认日期
    onChange, // 日期改变时的回调函数
  } = props;

  // 本地状态 value 初始化，优先使用受控值 propsValue，否则使用 defaultValue
  const [value, setValue] = useState(() => {
    if (propsValue !== undefined) {
      return propsValue; // 使用受控值
    } else {
      return defaultValue; // 使用默认值
    }
  });

  // 用于跟踪是否是组件的首次渲染
  const isFirstRender = useRef(true);

  // 监听 propsValue 的变化，且只在非首次渲染时执行
  useEffect(() => {
    if (propsValue === undefined && !isFirstRender.current) {
      setValue(propsValue); // 更新本地状态
    }
    isFirstRender.current = false; // 设置首次渲染状态为 false
  }, [propsValue]);

  // 决定最终显示的日期值，优先使用 propsValue
  const mergedValue = propsValue === undefined ? value : propsValue;

  // 处理日期变化的函数
  function changeValue(date: Date) {
    if (propsValue === undefined) {
      setValue(date); // 非受控模式下更新状态
    }
    onChange?.(date); // 触发回调函数
  }

  // 渲染组件的界面
  return (
    <div>
      {mergedValue?.toLocaleDateString()} {/* 显示当前日期 */}
      {/* 预设日期的点击事件用于测试和演示 */}
      <div onClick={() => changeValue(new Date("2024-5-1"))}>2023-5-1</div>
      <div onClick={() => changeValue(new Date("2024-5-2"))}>2023-5-2</div>
      <div onClick={() => changeValue(new Date("2024-5-3"))}>2023-5-3</div>
    </div>
  );
}

function App() {
  return (
    <Calendar
      defaultValue={new Date("2024-5-1")}
      onChange={(date) => {
        console.log(date.toLocaleDateString());
      }}
    />
  );
}

export default App;

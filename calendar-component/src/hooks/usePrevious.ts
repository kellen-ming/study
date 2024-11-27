import { ComponentState, PropsWithoutRef, useEffect, useRef } from 'react';


/**
 * 返回给定 value 属性/状态的前一个值。
 * @param value 
 * @returns 
 */
export default function usePrevious<T>(value: PropsWithoutRef<T> | ComponentState) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
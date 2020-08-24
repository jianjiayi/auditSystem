/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-08-07 15:35:09
 * @LastEditTime: 2020-08-24 14:25:25
 */
import React, {useState, useRef, useCallback, useEffect} from 'react';
import Interval from 'real-interval';

function useDebounce(fn, delay) {
   const { current } = useRef({ fn, timer: null });
    useEffect(function () {
      current.fn = fn;
    }, [fn]);
  
    return useCallback(function f(...args) {
      args[0].persist() // 这里需要这样设置是因为会警告
      if (current.timer) {
        clearTimeout(current.timer);
      }
      current.timer = setTimeout(() => {
        current.fn.call(this, ...args);
      }, delay);
    })
}

export default useDebounce;

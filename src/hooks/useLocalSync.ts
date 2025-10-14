/*
 * 同步数据到本地存储
 */
export const useLocalSync = <T>(key: string, defaultValue?: T) => {
  const value = ref<T>(GM_getValue(key, defaultValue));

  watch(
    value,
    () => {
      GM_setValue(key, value.value);
    },
    {
      immediate: true,
      deep: true,
    },
  );

  return value;
};

/*
 * 返回唯一id
 */

export const getId = () => {
  return `${performance.now()}-${Math.random()}`;
};

/*
 * 薪水提取，还要提取单位
 * 5-9K, 10-12K·13薪
 * 150-250元/天
 * 10000-15000元/月
 */
export const extractSalary = (salaryDesc: string) => {
  const salaryReg = /(\d+)-(\d+)(.)/;
  const match = salaryDesc.match(salaryReg);

  const unit = match?.[3] || null;
  const minSalary = match?.[1] ? Number(match[1]) : null;
  const maxSalary = match?.[2] ? Number(match[2]) : null;

  return {
    minSalary: unit === 'K' && minSalary ? minSalary * 1000 : minSalary,
    maxSalary: unit === 'K' && maxSalary ? maxSalary * 1000 : maxSalary,
  };
};

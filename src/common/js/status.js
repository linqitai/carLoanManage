export function statusFormatter(value, n) {
  if (value === 1) {
    return '待还款'
  } else if (value === 2) {
    return '待还款'
  } else if (value === 3) {
    return `已逾期(${n}天)`
  } else if (value === 5) {
    return `已代还（逾期${n}天）`
  }
}
export function statusFormatters(value) {
  switch (value) {
    case 0:
      return '待分期';
    case 1:
      return '审核中';
    case 2:
      return '还款中';
    case 3:
      return '有逾期';
    case 4:
      return '需代还(逾期超10天)';
    case 5:
      return '已代还';
    case 6:
      return '已结清';
    case 7:
      return '已结清';
  }
}

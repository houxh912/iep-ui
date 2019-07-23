const subjectLength = 15 // 话题的长度

export const getSubject = (data) => {
  let first = data.indexOf('#')
  // 不存在起始符号
  if (first === -1) return {
    type: false,
  }
  let second = data.slice(first + 1).indexOf('#')
  if (second === -1 // 不存在终止符号
    || second > subjectLength // 字符长度
  ) {
    return {
      type: false,
    }
  } else {
    return {
      type: true,
      first,
      second: first + second + 2,
      data: data.slice(first + 1, first + second + 1),
    }
  }
}
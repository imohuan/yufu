import XLSX from 'xlsx'

export function readXLSX(files) {
  return new Promise((resove, reject) => {
    let outputs = []
    const fileReader = new FileReader()
    fileReader.onload = (ev) => {
      try {
        const data = ev.target.result
        const workbook = XLSX.read(data, {
          type: 'binary'
        }) // 读取数据

        let fromTo = ''
        // 遍历每张表读取
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            fromTo = workbook.Sheets[sheet]['!ref']
            outputs = outputs.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
        resove(outputs)
        // https://blog.csdn.net/jarisMA/article/details/100106526
      } catch (e) {
        reject(e)
      }
    }
    fileReader.readAsBinaryString(files[0])
  })
}

export function parseList(data, grade) {
  let dataContent = data
  const length = dataContent.length
  dataContent = dataContent.map(f => {
    return {
      code: f['单词'],
      soundMark: f['音标'],
      paraphrase: f['释义'],
      comprehensive: f['综合法'],
      association: f['联想法'],
      example: f['例句'],
      translate: f['翻译'],
      grade: grade,
      picture: ''
    }
  })
  console.log(dataContent)
  return function(page, size, bool) {
    if (bool) {
      return dataContent
    }
    const start = (page - 1) * size
    const end = start + size
    return {
      content: [].slice.call(dataContent, start, end),
      total: length,
      totalPage: Math.ceil(length / size)
    }
  }
}

import axios from 'axios'

export const generateFromOllama = async (prompt) => {
  const res = await axios.post('http://localhost:11434/api/generate', {
    model: 'deepseek-r1',
    prompt,
    stream: false
  })
  return res.data.response
}


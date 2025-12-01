import axios from 'axios'

const API_URL = 'https://fruitmanagementapi.onrender.com/api/Fruits'

export async function fetchFruits() {
  try {
    const res = await axios.get(API_URL)
    return res.data
  } catch (err) {
    console.error('Failed !!!', err)
    return []
  }
}

export async function getFruitById(id) {
  try {
    const res = await axios.get(`${API_URL}/${id}`)
    return res.data
  } catch (err) {
    console.error('Failed !!!', err)
    return null
  }
}

export async function addFruit(fruit) {
  try {
    const res = await axios.post(API_URL, fruit)
    return res.data
  } catch (err) {
    console.error('Failed !!!', err)
    return null
  }
}

export async function updateFruit(fruit) {
  try {
    const res = await axios.put(`${API_URL}/${fruit.id}`, fruit)
    return res.data
  } catch (err) {
    console.error('Failed !!!', err)
    return null
  }
}

export async function deleteFruit(id) {
  try {
    await axios.delete(`${API_URL}/${id}`)
    return true
  } catch (err) {
    console.error('Failed !!!', err)
    return false
  }
}
